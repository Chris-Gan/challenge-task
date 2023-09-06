'use client';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import React, { FC, useState } from 'react';
import SinglePageIconButton from './SinglePageIconButton';

interface Props {
  totalPages: number;
}
export const CircularPagination: FC<Props> = ({ totalPages }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage =
    searchParams.get('page') !== null ? Number(searchParams.get('page')) : 1;
  const [active, setActive] = useState(currentPage);

  const isFirstPage = active === 1;
  const isLastPage = active === totalPages;

  const paramsObj: Record<string, string> = {};
  const initialParamsObj: Record<string, string> = {};
  searchParams.forEach((value, key) => {
    paramsObj[key] = value;
  });
  const handlePageOnClick = (page: number) => {
    setActive(page);
  };

  const next = () => {
    if (active + 1 > totalPages) return;
    setActive((prev) => prev + 1);
  };
  const prev = () => {
    if (active - 1 <= 0) return;
    setActive((prev) => prev - 1);
  };
  return (
    <div className='flex justify-center items-center max-w-[1200px] mt-2 pt-2 border-t-2 border-t-gray-600 flex-grow mx-auto'>
      <Link
        className={`relative block rounded bg-transparent px-3 py-1.5 text-sm text-gray-500 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white ${
          isFirstPage && 'pointer-events-none bg-gray-700'
        }`}
        href={{
          pathname: pathname,
          query: { ...initialParamsObj, page: String(active - 1) },
        }}
        onClick={prev}
      >
        <ArrowLeftIcon
          strokeWidth={2}
          className='h-5 w-5 text-gray-500 cursor-pointer py-0 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white'
        />
      </Link>
      <div className='flex items-center '>
        {active - 2 > 0 && (
          <SinglePageIconButton
            label={1}
            pathname={pathname}
            searchParams={initialParamsObj}
            handlePageOnClick={handlePageOnClick}
            isActive={active === 1}
          />
        )}
        {active - 3 > 0 && <span className='px-2 text-gray-500'>...</span>}

        {active - 1 > 0 && (
          <SinglePageIconButton
            label={active - 1}
            pathname={pathname}
            searchParams={initialParamsObj}
            handlePageOnClick={handlePageOnClick}
            isActive={active === active - 1}
          />
        )}
        {active > 0 && (
          <SinglePageIconButton
            label={active}
            pathname={pathname}
            searchParams={initialParamsObj}
            handlePageOnClick={handlePageOnClick}
            isActive={active === active}
          />
        )}
        {active + 1 < totalPages && (
          <SinglePageIconButton
            label={active + 1}
            pathname={pathname}
            searchParams={initialParamsObj}
            handlePageOnClick={handlePageOnClick}
            isActive={active === active + 1}
          />
        )}
        {active + 2 < totalPages && (
          <SinglePageIconButton
            label={active + 2}
            pathname={pathname}
            searchParams={initialParamsObj}
            handlePageOnClick={handlePageOnClick}
            isActive={active === active + 2}
          />
        )}
        {active + 3 < totalPages && (
          <span className='px-2 text-gray-500'>...</span>
        )}
        {active < totalPages && (
          <SinglePageIconButton
            label={totalPages}
            pathname={pathname}
            searchParams={initialParamsObj}
            handlePageOnClick={handlePageOnClick}
            isActive={active === totalPages}
          />
        )}
      </div>
      <Link
        className={`relative block rounded bg-transparent px-3 py-1.5 text-sm text-gray-500 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white ${
          isLastPage && 'pointer-events-none bg-gray-700'
        }`}
        href={{
          pathname: pathname,
          query: { ...initialParamsObj, page: String(active + 1) },
        }}
        onClick={next}
      >
        <ArrowRightIcon
          strokeWidth={2}
          className='h-5 w-5 text-gray-500 cursor-pointer py-0 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white'
        />
      </Link>
    </div>
  );
};

export default CircularPagination;
