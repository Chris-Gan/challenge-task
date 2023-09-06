import Link from 'next/link';
import React, { FC } from 'react';

interface Props {
  label: number;
  pathname: string;
  searchParams: Record<string, string>;
  handlePageOnClick: (page: number) => void;
  isActive: boolean;
}
const SinglePageIconButton: FC<Props> = ({
  label,
  pathname,
  searchParams,
  handlePageOnClick,
  isActive,
}) => {
  return (
    <Link
      className={`relative block rounded ${
        isActive
          ? 'bg-neutral-100 pointer-events-none'
          : 'bg-transparent cursor-pointer'
      } px-3 py-1.5 text-sm text-gray-500 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white`}
      href={{
        pathname: pathname,
        query: { ...searchParams, page: String(label) },
      }}
      onClick={() => handlePageOnClick(label)}
    >
      {label}
    </Link>
  );
};

export default SinglePageIconButton;
