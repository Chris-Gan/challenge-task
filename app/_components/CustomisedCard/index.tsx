import { CompanyListingDetails } from '@/app/_types/services';
import Image from 'next/image';
import { FC } from 'react';
import Snowflake from '../Snowflake';
import CardBody from './CardBody';
import CardHeader from './CardHeader';

interface Props {
  data: CompanyListingDetails;
}
const CustomisedCard: FC<Props> = ({ data }) => {
  const {
    name,
    ticker_symbol,
    score,
    grid: { data: gridData },
  } = data;
  const { main_thumb, primary_industry } = gridData;

  return (
    <div
      data-testid='customised-card'
      className='relative flex bg-gray-800 flex-col items-center rounded-md mr-5 mb-10 min-w-[280px] max-w-[280px]'
    >
      {main_thumb && (
        <Image
          className='absolute opacity-20 h-44 w-full object-cover rounded-t-md'
          width={300}
          height={15}
          src={main_thumb}
          alt='Thumbnail'
        />
      )}
      <Snowflake scoreData={score.data} />
      <div className='relative w-full top-9 px-4 pb-10 flex flex-col  '>
        <CardHeader
          firmAbbreviation={ticker_symbol}
          industry={primary_industry.name}
          firmName={name}
        />
        <CardBody data={gridData} />
      </div>
    </div>
  );
};

export default CustomisedCard;
