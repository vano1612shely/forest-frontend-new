import { useQuery } from "@tanstack/react-query";
import { adminListQueryOptions } from "@/api/admin/adminList";
import { Card } from "@mui/material";
import { AdminListTable } from "@/pages/admins/adminList/table/data-table.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { ListPagination } from "@/components/pagination.tsx";
import { useEffect } from "react";
import { Link, useRouter, useSearch } from "@tanstack/react-router";
import { Add } from "@mui/icons-material";
import { AdminFilters } from "@/pages/admins/adminList/filters.tsx";
import _ from "lodash";
export const AdminListPage = () => {
  const { page, search, status } = useSearch({ strict: false }) as any;
  const { navigate } = useRouter();
  const { data, refetch, isLoading } = useQuery(
    adminListQueryOptions({
      page: page,
      filters: [{ status }],
      search: search,
    }),
  );
  const setPage = (page: number) => {
    navigate({
      search: {
        page: page,
      },
    });
  };
  useEffect(() => {
    if (page !== data?.result.current_page) refetch();
  }, [page]);
  useEffect(() => {
    if (search || status) {
      refetch();
    }
  }, [search, status]);
  useEffect(() => {
    if (data?.result.result.length === 0) {
      setPage(1);
    }
  }, [data]);
  return (
    <>
      <h1 className="pageTitle">Управління адміністраторами</h1>
      <div className="flex flex-col lg:flex-row gap-5 items-start">
        <Card className="p-5 order-1 lg:order-0 lg:basis-3/4 self-stretch">
          <div className="flex justify-between mb-5">
            <div>
              {!isLoading ? (
                data && (
                  <ListPagination
                    current_page={data.result.current_page}
                    last_page={data.result.last_page}
                    setPage={setPage}
                  />
                )
              ) : (
                <Skeleton className="w-[300px] h-[50px]" />
              )}
            </div>
            <Link to="/createAdmin">
              <Button className="flex items-center gap-2">
                Створити Адміністратора <Add />
              </Button>
            </Link>
          </div>
          {isLoading && <Skeleton className="w-full h-[600px]" />}
          {data && <AdminListTable data={data.result.result} />}
        </Card>
        <Card className="order-0 self-stretch lg:self-auto lg:order-1 lg:basis-1/4 p-5">
          <AdminFilters
            submitFilters={(filters) => {
              const searchParams = _.mapValues(filters, (value) => {
                if (value) return value.toString();
              });
              navigate({
                search: searchParams,
              });
            }}
          />
        </Card>
      </div>
    </>
  );
};
