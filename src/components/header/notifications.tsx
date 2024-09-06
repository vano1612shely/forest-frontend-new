import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { useQuery } from "@tanstack/react-query";
import { notificationOptions } from "@/api/notifications";
import { Badge } from "@/components/ui/badge.tsx";
import EventNoteIcon from "@mui/icons-material/EventNote";
import { INotification } from "@/api/notifications/types.ts";
import { findTitleByLang } from "@/lib/utils.ts";
import { Link } from "@tanstack/react-router";
import { useAuthStore } from "@/store/auth.store.ts";
import _ from "lodash";

export const Notifications = () => {
  const { data } = useQuery(
    notificationOptions({
      to_read: false,
      limit: 5,
    }),
  );
  const lang = useAuthStore((state) => state.lang_key);
  const generateName = (message: INotification) => {
    if (!message.contract) {
      const title = findTitleByLang(message.trading?.title, lang);
      const msg = message.message[lang]?.replace("%trading%", title);
      return msg ? msg : "undefined";
    }
    return message.message[lang] ? message.message[lang] : "undefined";
  };
  if (data)
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="relative">
            <NotificationsNoneIcon className="text-[#68737E]" />
            <Badge className="text-[10px] absolute -top-2 -right-3 px-1 py-0">
              {data.result.total_unread > 99 ? "99+" : data.result.total_unread}
            </Badge>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[300px]">
          {data.result.result.map((message) => {
            if (!message.contract)
              return (
                <Link to="/adminList" key={message.id}>
                  <DropdownMenuItem className="flex gap-2 items-center">
                    <EventNoteIcon
                      className="text-[#68737E]"
                      fontSize="small"
                    />
                    <p className="truncate">{generateName(message)}</p>
                  </DropdownMenuItem>
                </Link>
              );
            else
              return (
                <DropdownMenuItem className="flex gap-2 items-center">
                  <EventNoteIcon className="text-[#68737E]" fontSize="small" />
                  <p className="truncate">{generateName(message)}</p>
                </DropdownMenuItem>
              );
          })}
          <DropdownMenuSeparator />
          <Link to="/notifications">
            <DropdownMenuItem>Показати всі</DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  else return <NotificationsNoneIcon className="text-[#68737E]" />;
};
