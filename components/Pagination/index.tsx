'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  Pagination as PaginationBase,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../ui/pagination';
import { getPagesToDisplay } from './utils';

export default function Pagination({
  currentPage,
  onChange,
  firstPage = 1,
  lastPage,
  maxPagesToDisplay = 4,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pages = Array.from({ length: lastPage }, (_, i) => i + 1);
  const pagesToDisplay = getPagesToDisplay({ pages, currentPage, maxPagesToDisplay });

  const handlePageChange = (p: number) => {
    if (onChange) {
      onChange(p);
    } else {
      const params = new URLSearchParams(searchParams.toString());
      params.set('page', `${p}`);
      router.push(`${pathname}?${params.toString()}`);
    }
  };

  const moveToPage = (p: number) => handlePageChange(p);

  const moveToPrevPage = () => {
    const prevPage = Math.max(currentPage - 1, firstPage);
    handlePageChange(prevPage);
  };
  const moveToNextPage = () => {
    const nextPage = Math.max(currentPage + 1, lastPage);
    handlePageChange(nextPage);
  };

  return (
    <PaginationBase>
      <PaginationContent>
        <PaginationItem onClick={moveToPrevPage}>
          <PaginationPrevious aria-disabled={currentPage === firstPage} />
        </PaginationItem>
        {!pagesToDisplay.includes(firstPage) && (
          <PaginationItem onClick={() => moveToPage(firstPage)}>
            <PaginationLink isActive={firstPage === currentPage}>{firstPage}</PaginationLink>
          </PaginationItem>
        )}
        {!pagesToDisplay.includes(firstPage) && !pagesToDisplay.includes(firstPage + 1) && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {pagesToDisplay.map((p) => (
          <PaginationItem key={p} onClick={() => moveToPage(p)}>
            <PaginationLink isActive={p === currentPage}>{p}</PaginationLink>
          </PaginationItem>
        ))}
        {!pagesToDisplay.includes(lastPage) && !pagesToDisplay.includes(lastPage - 1) && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {!pagesToDisplay.includes(lastPage) && (
          <PaginationItem onClick={() => moveToPage(lastPage)}>
            <PaginationLink isActive={lastPage === currentPage}>{lastPage}</PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem onClick={moveToNextPage}>
          <PaginationNext aria-disabled={currentPage === lastPage} />
        </PaginationItem>
      </PaginationContent>
    </PaginationBase>
  );
}

type Props = {
  currentPage: number;
  onChange?: (page: number) => void;
  firstPage?: number;
  lastPage: number;
  maxPagesToDisplay?: number;
};
