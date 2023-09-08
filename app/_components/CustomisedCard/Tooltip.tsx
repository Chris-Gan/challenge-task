'use client';
import { StarIcon } from '@heroicons/react/24/outline';
import React, { ReactNode, FC, useState } from 'react';

interface Props {
  icon?: ReactNode;
  tooltipContent?: string;
}

const Tooltip: FC<Props> = ({
  icon = <StarIcon className='h-5 w-5 text-gray-400' />,
  tooltipContent = 'Add to watchlist',
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      data-testid='info-tooltip'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className='relative inline-block mt-3' // This ensures positioning context for the absolute tooltip
    >
      <button
        data-tooltip-target='tooltip-default'
        type='button'
        className='rounded-full hover:bg-gray-600 p-1'
      >
        {icon}
      </button>
      {isHovered && (
        <div
          id='tooltip-default'
          role='tooltip'
          className='absolute whitespace-nowrap bottom-3 z-10 transform -translate-x-[65%] -translate-y-full mt-2 inline-block px-3 py-2 font-medium text-xs text-white bg-gray-900 rounded-lg shadow-sm tooltip dark:bg-gray-700'
        >
          {tooltipContent}
          <div
            className='absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-gray-900 rotate-45 tooltip-arrow'
            data-popper-arrow
          ></div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
