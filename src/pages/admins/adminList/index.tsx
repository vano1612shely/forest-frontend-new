import { useSuspenseQuery } from "@tanstack/react-query";
import { adminListQueryOptions } from "@/api/admin/adminList.ts";
import { Card } from "@mui/material";
import { DataTable } from "@/pages/admins/adminList/table/data-table.tsx";
import { columns } from "@/pages/admins/adminList/table/columns.tsx";
import { Button } from "@/components/ui/button.tsx";
import { AdminListPagination } from "@/pages/admins/adminList/pagination.tsx";
import { useEffect } from "react";
import { useRouter, useSearch } from "@tanstack/react-router";
import { Add } from "@mui/icons-material";
import { AdminFilters } from "@/pages/admins/adminList/filters.tsx";
export const AdminListPage = () => {
  const { page } = useSearch({ strict: false }) as any;
  const { navigate } = useRouter();
  const { data, refetch } = useSuspenseQuery(
    adminListQueryOptions({ page: page }),
  );
  const setPage = (page: number) => {
    navigate({
      search: {
        page: page,
      },
    });
  };
  useEffect(() => {
    if (page !== data.result.current_page) refetch();
  }, [page]);
  useEffect(() => {
    if (data.result.result.length === 0) {
      setPage(1);
    }
  }, [data]);
  return (
    <>
      <h1 className="text-center text-[#1D1D1D] text-[32px] font-bold leading-[40px] mb-[30px]">
        Управління адміністраторами
      </h1>
      <div className="flex flex-col lg:flex-row gap-2 items-start">
        <Card className="p-3 order-1 lg:order-0 lg:basis-3/4 border">
          <div className="flex justify-between mb-5">
            <div>
              <AdminListPagination
                current_page={data.result.current_page}
                last_page={data.result.last_page}
                setPage={setPage}
              />
            </div>
            <Button className="flex items-center gap-2">
              Створити Адміністратора <Add />
            </Button>
          </div>
          <DataTable columns={columns} data={data.result.result} />
        </Card>
        <div className="order-0 lg:order-1 lg:basis-1/4 border rounded">
          <AdminFilters />
        </div>
      </div>
    </>
  );
};
