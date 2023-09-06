'use client';
import { RowRendererProps } from '@/app/_types/reactVirtualization';
import { ResponseInterface } from '@/app/_types/services';
import React, { FC, ReactNode } from 'react';
import { AutoSizer, List } from 'react-virtualized';
import CustomisedCard from '../CustomisedCard';
import { CircularPagination } from '../Pagination';

interface Props {
  data: ResponseInterface;
}

const GridListing: FC<Props> = ({ data }) => {
  const ITEM_SIZE = 480;
  const ITEMS_PER_ROW = 4;
  const ITEMS_COUNT = data.data.length;

  const totalPages = Math.ceil(data.meta.total_records / ITEMS_COUNT);
  const rowRenderer = ({ index, key, style }: RowRendererProps): ReactNode => {
    const startIndex = index * ITEMS_PER_ROW;
    const endIndex = startIndex + ITEMS_PER_ROW;
    const itemsToRender = data.data.slice(startIndex, endIndex);

    return (
      <div className='Row flex flex-wrap' key={key} style={style}>
        {itemsToRender.map((list) => (
          <CustomisedCard key={list.id} data={list} />
        ))}
      </div>
    );
  };

  return (
    <>
      <div className='flex justify-start flex-wrap max-w-[1200px] mx-auto h-[70vh] w-full'>
        <AutoSizer>
          {({ height, width }: { height: number; width: number }) => {
            const rowCount = Math.ceil(ITEMS_COUNT / ITEMS_PER_ROW);
            return (
              <List
                className='List'
                style={{ overflowX: 'auto' }}
                width={width}
                height={height}
                rowCount={rowCount}
                rowHeight={ITEM_SIZE}
                rowRenderer={rowRenderer}
              />
            );
          }}
        </AutoSizer>
      </div>
      <CircularPagination totalPages={totalPages} />
    </>
  );
};

export default GridListing;
