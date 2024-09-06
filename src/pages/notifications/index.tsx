import { Card } from "@/components/ui/card.tsx";
import { ListPagination } from "@/components/pagination.tsx";
import { useRouter, useSearch } from "@tanstack/react-router";
import { notificationPageOptions } from "@/api/notifications";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { NotificationsTable } from "@/pages/notifications/table/data-table.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";

export const NotificationsPage = () => {
  const { page } = useSearch({ strict: false }) as any;
  const { navigate } = useRouter();
  const { data, refetch, isLoading } = useQuery(
    notificationPageOptions({
      page: page,
      to_read: true,
      limit: 25,
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
    if (data?.result.result.length === 0) {
      setPage(1);
    }
  }, [data]);
  return (
    <>
      <h1 className="pageTitle">Сповіщення</h1>
      <Card className="flex flex-col gap-5 items-start p-5">
        <div className="w-auto">
          {isLoading && <Skeleton className="w-[300px] h-[50px]" />}
          {data && (
            <ListPagination
              last_page={data.result.last_page}
              current_page={data.result.current_page}
              setPage={setPage}
            />
          )}
        </div>
        {isLoading && <Skeleton className="w-full h-[600px]" />}
        {data && <NotificationsTable data={data.result.result} />}
      </Card>
    </>
  );
};
