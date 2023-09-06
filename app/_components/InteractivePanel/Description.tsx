import { formatDate } from '@/app/helper';
import React, { FC } from 'react';

interface Props {
  country: string;
  industry: string;
  performanceFilter: string;
}
const Description: FC<Props> = ({ country, industry, performanceFilter }) => {
  return (
    <div className=''>
      <h1 className='text-[1.8rem] font-medium text-white'>
        Largest {country} {industry} Stocks - {performanceFilter}
      </h1>
      <div className='flex mt-2 mb-4'>
        <p className='text-gray-400 text-[0.8rem] mr-1'>UPDATED</p>
        <p className='text-white  text-[0.75rem]'>{formatDate(new Date())}</p>
      </div>
      <p className='text-gray-400 text-[0.8rem] mt-2 mb-4'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore velit
        omnis cum magnam, ipsa eius cupiditate magni temporibus sapiente libero
      </p>
    </div>
  );
};

export default Description;
