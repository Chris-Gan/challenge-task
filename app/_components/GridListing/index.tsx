import { ResponseInterface } from '@/app/_types/services';
import { FC } from 'react';
import CustomisedCard from '../CustomisedCard';
import { CircularPagination } from '../Pagination';

interface Props {
  data: ResponseInterface;
}

const GridListing: FC<Props> = ({ data }) => {
  const ITEMS_COUNT = data.data.length;
  const totalPages = Math.ceil(data.meta.total_records / ITEMS_COUNT);

  return (
    <>
      <div className='flex justify-start flex-wrap max-w-[1200px] mx-auto w-full'>
        {data.data.map((item) => (
          <CustomisedCard key={item.id} data={item} />
        ))}
        <CircularPagination totalPages={totalPages} />
      </div>
    </>
  );
};

export default GridListing;
