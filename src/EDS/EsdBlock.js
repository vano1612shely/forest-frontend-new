import React, { useEffect, useState } from "react";
import { CircularProgress } from "@material-ui/core";
import { EndUser } from "./eusign";
import {
  LOG_ENS_LOADED,
  sendLogProtocol,
  setLocalStorageKeySessionEsdExpired,
} from "./utis";
import { useAppDispatch } from "../store";
import { closeEsdPopup, logoutCustomer } from "../store/slices/authCustomer";
import { httpClient } from "../api/httpClient/httpClient";
import { toast } from "react-hot-toast";
import { serialize } from "object-to-formdata";

const SIGN_WIDGET_PARENT_ID = "sign-widget-parent";
const SIGN_WIDGET_ID = "sign-widget";
const SIGN_WIDGET_URI = "https://eu.iit.com.ua/sign-widget/v20240301/";

// prev https://eu.iit.com.ua/sign-widget/v20200922/
/* eslint-disable react/prop-types */

const STATUS_SIGNING = {
  LOADING: "LOADING",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
};

let preventRequest = false;
let preventRequestSignatureCheck = false;

const EsdBlock = ({ isPopup, isOpen }) => {
  const [statusSigning, setStatusSigning] = useState("");
  const [triggerLoad, setTriggerLoad] = useState(false);
  const [error, setError] = useState("");
  const [currentSerial, setCurrentSerial] = useState("");

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isOpen) {
      setTriggerLoad(true);

      setTimeout(() => {
        setTriggerLoad(false);
      }, 100);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!triggerLoad) {
      document.getElementById("sign-widget-parent").style.display = "block";
      document.getElementById("sign-data-block").style.display = "none";
      setStatusSigning("");
      euSign.appendIframe(
        SIGN_WIDGET_PARENT_ID,
        SIGN_WIDGET_ID,
        SIGN_WIDGET_URI,
      );
      onLoad();
    }
  }, [triggerLoad]);

  useEffect(() => {
    if (statusSigning === STATUS_SIGNING.SUCCESS) {
      setTimeout(() => {
        const holder = document.querySelector("#esd-block-login-holder");

        if (holder) {
          holder.style.height = "200px";
        }

        if (window.location.pathname !== "/customer/login") {
          dispatch(closeEsdPopup());
        }
      }, 2000);
    }

    if (
      statusSigning === STATUS_SIGNING.SUCCESS ||
      statusSigning === STATUS_SIGNING.LOADING
    ) {
      setError("");
      setCurrentSerial("");
    }
  }, [statusSigning]);

  useEffect(() => {
    return () => {
      dispatch(closeEsdPopup());
    };
  }, []);

  const euSign = new EndUser(
    SIGN_WIDGET_PARENT_ID,
    SIGN_WIDGET_ID,
    SIGN_WIDGET_URI,
    EndUser.FormType.ReadPKey,
  );

  const createGlobalEuSignData = async () => {
    const external = false;
    const asBase64String = true;
    const signAlgo = EndUser.SignAlgo.DSTU4145WithGOST34311;
    const signType = EndUser.SignType.CAdES_X_Long;

    window.SIGN_DATA_BY_ESD = (string, isBase64String = false) => {
      let stringForSign = string;

      if (isBase64String) {
        stringForSign = new Uint8Array(
          atob(string)
            .split("")
            .map((c) => c.charCodeAt(0)),
        );
      }

      try {
        return euSign.SignData(
          stringForSign,
          external,
          asBase64String,
          signAlgo,
          null,
          signType,
        );
      } catch (e) {
        alert(
          "Виникла помилка при підписі даних. Опис помилки: " +
            (e.message || e),
        );
        window.SIGN_DATA_BY_ESD = null;
      }
    };

    try {
      if (window.location.pathname !== "/customer/login") {
        const testSignedString =
          await window.SIGN_DATA_BY_ESD("signature_check");

        if (!preventRequestSignatureCheck) {
          preventRequestSignatureCheck = true;

          await httpClient.post({
            url: "/api/v1/customer/signature_check",
            payload: serialize({ signed_string: testSignedString }),
          });

          setError("");
          setCurrentSerial("");
          preventRequestSignatureCheck = false;
        }
      }

      setLocalStorageKeySessionEsdExpired();

      if (window.CALLBACK_SIGN_DATA_BY_ESD) {
        window.CALLBACK_SIGN_DATA_BY_ESD();

        window.CALLBACK_SIGN_DATA_BY_ESD = null;
      }

      const signatureText = await window.SIGN_DATA_BY_ESD(LOG_ENS_LOADED);
      if (window.location.pathname !== "/customer/login" && !preventRequest) {
        preventRequest = true;

        sendLogProtocol({
          slug: LOG_ENS_LOADED,
          entity: {
            signature: signatureText,
          },
          callback() {
            preventRequest = false;
          },
        });
      }

      setStatusSigning(STATUS_SIGNING.SUCCESS);
    } catch (error) {
      preventRequestSignatureCheck = false;
      window.SIGN_DATA_BY_ESD = null;

      if (error.response?.data?.error === "CUSTOMER_IS_BLOCKED") {
        dispatch(logoutCustomer());
        toast.error("Користувач заблокований", {
          duration: 10000,
        });
        return;
      }

      if (error?.status === 422 || error?.response?.status === 422) {
        const serials = error.response?.data?.serials || [];
        const currentSerialError = error.response?.data?.current_serial;

        const errorText = `Завантажений ключ не відповідає номерам сертифікату: ${serials.join(", ")}. `;
        const errorTextToast = `Завантажений ключ не відповідає номерам сертифікату: ${serials.join(", ")}. Підвантажений сертифікат ${currentSerialError}`;

        toast.error(errorTextToast, {
          style: {
            maxWidth: 500,
          },
          duration: 30000,
          autoClose: 30000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });

        setError(errorText);
        setCurrentSerial(`Підвантажений сертифікат ${currentSerialError}`);
      }

      setTriggerLoad(true);

      setTimeout(() => {
        setTriggerLoad(false);
      }, 100);
    }
  };

  const onLoad = () => {
    euSign
      .ReadPrivateKey()
      .then(function (e) {
        localStorage.setItem("signature_serial", e[0].infoEx?.serial);
        document.getElementById("sign-widget-parent").style.display = "none";
        document.getElementById("sign-data-block").style.display = "block";
        setStatusSigning(STATUS_SIGNING.LOADING);
        createGlobalEuSignData();
      })
      .catch(function (e) {
        alert(
          "Виникла помилка при зчитуванні ос. ключа. Опис помилки: " +
            (e.message || e),
        );
      });
  };

  if (triggerLoad) {
    return null;
  }

  return (
    <div id="esd-block">
      {error ? (
        <div
          style={{
            padding: "20px",
            width: 600,
            fontSize: "18px",
            color: "red",
          }}
        >
          <p
            style={{
              marginBottom: 15,
            }}
          >
            {error}
          </p>
          <p>{currentSerial}</p>
        </div>
      ) : null}
      <div
        id="sign-widget-parent"
        style={{
          width: 600,
          height: isPopup ? 640 : 590,
          padding: isPopup ? 20 : 0,
        }}
      />
      <div id="sign-data-block" style={{ display: "none" }}>
        {statusSigning === STATUS_SIGNING.LOADING ? (
          <div
            style={{
              width: 600,
              height: 500,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress />
          </div>
        ) : null}

        {statusSigning === STATUS_SIGNING.SUCCESS ? (
          <div
            style={{
              width: 600,
              height: 200,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              color: "#27AE60",
            }}
          >
            Підпис завантажений успішно
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default EsdBlock;
