import { useCallback, useState } from 'react';

export interface PaginationOptions {
  total: number;
  pageSize?: number;
  initialPage?: number;
}

function pageCountOf(total: number, pageSize: number) {
  if (pageSize <= 0) return 1;
  return Math.max(1, Math.ceil(Math.max(0, total) / pageSize));
}

export const usePagination = ({
  total,
  pageSize: initialPageSize = 10,
  initialPage = 1,
}: PaginationOptions) => {
  const [pageSize, setPageSizeState] = useState(initialPageSize);
  const pageCount = pageCountOf(total, pageSize);
  const [page, setPageState] = useState(initialPage);
  const safePage = Math.min(page, pageCount);

  if (safePage !== page) setPageState(safePage);

  const setPage = useCallback(
    (nextPage: number) => {
      setPageState(Math.min(pageCount, Math.max(1, nextPage)));
    },
    [pageCount],
  );

  const setPageSize = useCallback((nextSize: number) => {
    setPageSizeState(Math.max(1, nextSize));
    setPageState(1);
  }, []);

  const next = useCallback(() => {
    setPage(safePage + 1);
  }, [safePage, setPage]);

  const prev = useCallback(() => {
    setPage(safePage - 1);
  }, [safePage, setPage]);

  return {
    page: safePage,
    pageSize,
    total,
    pageCount,
    offset: (safePage - 1) * pageSize,
    canNext: safePage < pageCount,
    canPrev: safePage > 1,
    setPage,
    setPageSize,
    next,
    prev,
  } as const;
};
