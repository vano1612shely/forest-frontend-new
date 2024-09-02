import { httpClient } from "../api/httpClient/httpClient";

export const LOG_TRADING_REQUEST_TRY_CREATE = "LOG_TRADING_REQUEST_TRY_CREATE";
export const LOG_ENS_LOADED = "LOG_ENS_LOADED";
export const LOG_TRADING_REQUEST_CONFIRMED_WITHOUT_SIGNATURE =
  "LOG_TRADING_REQUEST_CONFIRMED_WITHOUT_SIGNATURE";
export const LOG_TRADING_REQUEST_TRY_DELETE = "LOG_TRADING_REQUEST_TRY_DELETE";
export const LOG_TRADING_REQUEST_TRY_DELETE_INIT =
  "LOG_TRADING_REQUEST_TRY_DELETE_INIT";
export const LOG_TRADING_REQUEST_TRY_INIT = "LOG_TRADING_REQUEST_TRY_INIT";
export const LOG_AGREE_PART_TRY_SIGN = "LOG_AGREE_PART_TRY_SIGN";
export const LOG_CERTIFICATE_TRY_SIGN = "LOG_CERTIFICATE_TRY_SIGN";
export const LOG_CONTRACT_TRY_SIGN = "LOG_CONTRACT_TRY_SIGN";

export const LOCAL_STORAGE_KEY_SESSION_ESD_EXPIRED = "session_esd_expired";

export const sendLogProtocol = ({ slug, entity, callback = null }) => {
  try {
    // setTimeout is needed to remove code from the main thread
    setTimeout(() => {
      httpClient
        .postJSON({
          url: "/api/v1/pending_log",
          payload: {
            slug,
            entity,
          },
        })
        .finally(() => {
          if (typeof callback === "function") {
            callback();
          }
        });
    });
  } catch (e) {
    // empty block
  }
};

export const removeLocalStorageKeySessionEsdExpired = () => {
  localStorage.removeItem(LOCAL_STORAGE_KEY_SESSION_ESD_EXPIRED);
};

export const setLocalStorageKeySessionEsdExpired = () => {
  const date = new Date();

  date.setDate(date.getDate() + 1);
  date.setHours(7);
  date.setMinutes(0);
  date.setSeconds(0);

  localStorage.setItem("session_esd_expired", date.valueOf().toString());
};

export const getIsValidSessionEsd = () => {
  let result = false;

  try {
    const fromStorage = localStorage.getItem(
      LOCAL_STORAGE_KEY_SESSION_ESD_EXPIRED,
    );
    result = parseInt(fromStorage, 10) - Date.now() > 0;
  } catch (e) {
    // empty block
  }

  return result;
};

export const getLogProtocol = () =>
  httpClient.get({ url: "/api/v1/signature/log_protocol" });

export const sendSignedLogProtocol = (payload) =>
  httpClient.postJSON({
    url: "/api/v1/signature/log_protocol",
    payload,
  });

export const singLogProtocol = async () => {
  try {
    if (window.SIGN_DATA_BY_ESD) {
      const logProtocol = await getLogProtocol();

      const logs = await Promise.all(
        Object.values(logProtocol).map(async (item) => {
          const message = await window.SIGN_DATA_BY_ESD(item.message);

          return { ...item, message };
        }),
      );

      await sendSignedLogProtocol({ logs });
    }
  } catch (e) {
    // empty block
  }
};
