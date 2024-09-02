import { Link, LinkProps, ParseRoute } from "@tanstack/react-router";
import { FC } from "react";
import { routeTree } from "@/routeTree.gen.ts";
import { menuList } from "@/components/header/menu/menu_list.ts";
import "./style.scss";
import { cn } from "@/lib/utils.ts";
interface INavItemProps extends LinkProps {
  path: ParseRoute<typeof routeTree>["fullPath"] | string;
  title: string;
  isExternalLink?: boolean;
}
export const NavItem: FC<INavItemProps> = ({
  path,
  title,
  isExternalLink = false,
  ...props
}) => {
  return (
    <li className="menu__item">
      <Link
        className={cn("menu__link")}
        to={path as ParseRoute<typeof routeTree>["fullPath"]}
        target={isExternalLink ? "_blank" : "_self"}
        {...props}
      >
        {title}
      </Link>
    </li>
  );
};

export const Menu = () => {
  return (
    <nav className="menu">
      <ul className="menu__list">
        {menuList.map((item, index) => {
          return (
            <NavItem
              key={index}
              path={item.link}
              title={item.title}
              isExternalLink={item.isExternalLink}
            />
          );
        })}
      </ul>
    </nav>
  );
};
