import { ColumnDef } from "@tanstack/react-table";
import { Admin } from "@/types/Admin.ts";
import dayjs from "dayjs";
import { UserState } from "@/types/User.ts";
const statusName = (status: string) => {
  switch (status) {
    case UserState.STATUS_ACTIVE:
      return "Активний";
    case UserState.STATUS_NOT_CONFIRMED:
      return "Не підтверджений";
  }
};
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
      return statusName(row.original.status);
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
