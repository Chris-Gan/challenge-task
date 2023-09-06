'use client';
import { GridDetails } from '@/app/_types/services';
import React, { FC, useState } from 'react';
import KeyValueDetails from './KeyValueDetails';
import Tooltip from './Tooltip';
import { InformationCircleIcon } from '@heroicons/react/24/outline';

interface Props {
  data: GridDetails['data'];
}
const CardBody: FC<Props> = ({ data }) => {
  const [isHovered, setIsHovered] = useState(false);
  const {
    share_price,
    return_1yr_abs,
    return_7d,
    market_cap,
    pe,
    growth_3y,
    price_target,
    description,
    currency_info: { reporting_currency_iso },
  } = data;
  const currencyIso = reporting_currency_iso.toLowerCase();
  const formattedStockPrice = share_price.toLocaleString(currencyIso, {
    style: 'currency',
    currency: reporting_currency_iso,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const formattedMarketCap = market_cap.toLocaleString(currencyIso, {
    style: 'currency',
    currency: reporting_currency_iso,
    notation: 'compact',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const formattedPE = pe ? `${pe.toFixed(1)}x` : 'n/a';

  const formattedTargetPrice = price_target?.toLocaleString(currencyIso, {
    style: 'currency',
    currency: reporting_currency_iso,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return (
    <>
      <div className='relative inline-block'>
        {isHovered && (
          <div className='absolute w-full text-gray-400 text-sm font-medium h-full bg-gray-800 pt-2'>
            {description}
          </div>
        )}

        <div className='flex my-2 justify-between'>
          <div className='flex-1'>
            <KeyValueDetails
              label='Price'
              defaultValueStyle
              value={formattedStockPrice}
            />
          </div>
          <div className='flex flex-1'>
            <KeyValueDetails
              label='7D'
              value={return_7d}
              defaultValueStyle
              containerStyle={['mr-3']}
            />
            <KeyValueDetails
              defaultValueStyle
              label='1Y'
              value={return_1yr_abs}
            />
          </div>
        </div>
        <div className='flex my-2 justify-between'>
          <div className='flex-1'>
            <KeyValueDetails
              label='Mkt Cap'
              value={formattedMarketCap}
              valueStyle={['text-gray-400']}
            />
          </div>
          <div className='flex  flex-1'>
            <KeyValueDetails
              label='PE'
              value={formattedPE}
              valueStyle={['text-gray-400']}
              containerStyle={['mr-3']}
            />
            <KeyValueDetails
              valueStyle={['text-gray-400']}
              label='E.Growth'
              value={growth_3y}
            />
          </div>
        </div>
        <div className='flex my-2 justify-between'>
          <div className='flex-1'>
            <KeyValueDetails
              label='Analyst Target'
              value={formattedTargetPrice}
              defaultValueStyle
            />
          </div>

          <Tooltip />
        </div>
        <InformationCircleIcon
          className='h-8 w-8 text-gray-400 cursor-pointer absolute -right-[0.1rem] bottom-9  hover:bg-gray-500 rounded-full p-1'
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        />
      </div>
    </>
  );
};

export default CardBody;
