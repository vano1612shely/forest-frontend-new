import { Link, LinkProps, ParseRoute } from "@tanstack/react-router";
import { FC } from "react";
import { routeTree } from "@/routeTree.gen.ts";
import { menuList } from "@/components/header/menu/menu_list.ts";
import "./style.scss";
import { cn } from "@/lib/utils.ts";
import { useAuthStore } from "@/store/auth.store.ts";
import { Roles } from "@/types/Roles.ts";
interface INavItemProps extends LinkProps {
  path: ParseRoute<typeof routeTree>["fullPath"] | string;
  title: string;
  roles: Roles[];
  isExternalLink?: boolean;
}
export const NavItem: FC<INavItemProps> = ({
  path,
  title,
  roles,
  isExternalLink = false,
  ...props
}) => {
  const userRoles = useAuthStore((state) => state.roles);
  if (userRoles.some((role) => roles.includes(role)))
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
              roles={item.roles}
              isExternalLink={item.isExternalLink}
            />
          );
        })}
      </ul>
    </nav>
  );
};
