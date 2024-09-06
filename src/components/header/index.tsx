import { Button } from "@/components/ui/button.tsx";
import Logo from "@/assets/logoGreen.png";
import "./style.scss";
import Viber from "@/assets/img/header/greenViber.png";
import Telegram from "@/assets/img/header/greenTelegram.png";
import Facebook from "@/assets/img/header/greenFacebook.png";
import { useServerTimeStore } from "@/store/serverTime.store.ts";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import "dayjs/locale/uk.js";
import { Link } from "@tanstack/react-router";
import { useAuthStore } from "@/store/auth.store.ts";
import { Menu } from "@/components/header/menu";
import { UserBlock } from "@/components/header/userBlock";
import { Notifications } from "@/components/header/notifications";
dayjs.extend(localizedFormat);
dayjs.locale("uk");
const Header = () => {
  const currentTime = useServerTimeStore((state) => state.current_datetime);
  const is_auth = useAuthStore((state) => state.is_auth);
  return (
    <header>
      <div className="py-3 px-10 flex justify-evenly md:justify-between items-center border-b border-[#E4E4E4] flex-wrap gap-[30px]">
        <div className="lg:w-[300px]">
          {!is_auth ? (
            <Link to="/customer/login">
              <Button className="text-[0.875rem] leading-[1.75] font-[500]">
                Увійти
              </Button>
            </Link>
          ) : (
            <UserBlock />
          )}
        </div>
        <Link to="/">
          <img src={Logo} alt="logo" className="h-[50px]" />
        </Link>
        <div className="flex gap-[30px] items-center w-[300px] flex-wrap justify-evenly md:justify-normal">
          <ul className="social">
            <li className="social__item">
              <a href="/">
                <img src={Facebook} alt="" />
              </a>
            </li>
            <li className="social__item viber">
              <a href="/">
                <img src={Viber} alt="" />
              </a>
            </li>
            <li className="social__item">
              <a href="/">
                <img src={Telegram} alt="" />
              </a>
            </li>
          </ul>
          {is_auth && <Notifications />}
          <p className="text-[12px] text-[#68737E]">
            {currentTime && "Київ " + dayjs(currentTime).format("MMM D, HH:mm")}
          </p>
        </div>
      </div>
      <Menu />
    </header>
  );
};

export default Header;
