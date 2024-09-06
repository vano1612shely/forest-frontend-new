import { ColumnDef } from "@tanstack/react-table";
import { Admin } from "@/types/Admin.ts";
import dayjs from "dayjs";
import { getStatusName } from "@/lib/utils.ts";
export const columns: ColumnDef<Admin>[] = [
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Роль",
    cell: () => {
      return "Адміністратор";
    },
  },
  {
    accessorKey: "status",
    header: "Статус",
    cell: ({ row }) => {
      return getStatusName(row.original.status);
    },
  },
  {
    accessorKey: "date_last_activity_at",
    header: "Остання активність",
    cell: ({ row }) => {
      return dayjs(row.original.date_last_activity_at).format(
        "DD.MM.YYYY о HH:mm",
      );
    },
  },
];
