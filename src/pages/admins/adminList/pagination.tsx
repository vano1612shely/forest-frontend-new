import { FC } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination.tsx";

export interface IAdminListPaginationProps {
  current_page: number;
  last_page: number;
  setPage: (page: number) => void;
}

export const AdminListPagination: FC<IAdminListPaginationProps> = ({
  current_page,
  last_page,
  setPage,
}) => {
  const generatePagination = () => {
    const pages = [];
    const startPage = Math.max(2, current_page - 2);
    const endPage = Math.min(last_page - 1, current_page + 2);

    // First page
    pages.push(
      <PaginationItem key={1}>
        <PaginationLink onClick={() => setPage(1)}>1</PaginationLink>
      </PaginationItem>,
    );

    // Ellipsis if startPage is greater than 2
    if (startPage > 2) {
      pages.push(
        <PaginationItem key="ellipsis-start">
          <PaginationEllipsis />
        </PaginationItem>,
      );
    }

    // Middle pages
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink onClick={() => setPage(i)}>{i}</PaginationLink>
        </PaginationItem>,
      );
    }

    // Ellipsis if endPage is less than last_page - 1
    if (endPage < last_page - 1) {
      pages.push(
        <PaginationItem key="ellipsis-end">
          <PaginationEllipsis />
        </PaginationItem>,
      );
    }

    // Last page
    if (last_page > 1) {
      pages.push(
        <PaginationItem key={last_page}>
          <PaginationLink onClick={() => setPage(last_page)}>
            {last_page}
          </PaginationLink>
        </PaginationItem>,
      );
    }

    return pages;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => setPage(Math.max(1, current_page - 1))}
          />
        </PaginationItem>
        {generatePagination()}
        <PaginationItem>
          <PaginationNext
            onClick={() => setPage(Math.min(last_page, current_page + 1))}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
