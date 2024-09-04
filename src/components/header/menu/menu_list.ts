import { Roles } from "@/types/Roles.ts";
import { ParseRoute } from "@tanstack/react-router";
import { routeTree } from "@/routeTree.gen.ts";

export type MenuListItem = {
  title: string;
  link: ParseRoute<typeof routeTree>["fullPath"] | string;
  isExternalLink?: boolean;
  roles: Roles[];
};

export const menuList: MenuListItem[] = [
  {
    title: "Адміністратори",
    link: "/adminList",
    isExternalLink: false,
    roles: [Roles.Administrator],
  },
  {
    title: "Активні Аукціони",
    link: "/tradingList",
    isExternalLink: false,
    roles: [
      Roles.Agent,
      Roles.Anonymous,
      Roles.Customer,
      Roles.Administrator,
      Roles.Observer,
    ],
  },
  {
    title: "Агенти",
    link: "https://www.uub.com.ua/torgy-ta-auktsiony/neobroblena-derevna-ta-plomaterial/agenty-v-regionah_17322329_61881553/",
    isExternalLink: true,
    roles: [
      Roles.Agent,
      Roles.Anonymous,
      Roles.Customer,
      Roles.Administrator,
      Roles.Observer,
    ],
  },
];
