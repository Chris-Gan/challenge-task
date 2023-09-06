import { Company } from '@/app/_types/mockedCompanies';
import React, { FC } from 'react';

interface Props {
  companiesList: Company[];
}
const SearchResult: FC<Props> = ({ companiesList }) => {
  return (
    companiesList.length > 0 && (
      <div className='absolute top-full -mt-2  w-full bg-sws_grey border border-gray-300 rounded-md'>
        {companiesList.map((result) => (
          <div
            key={result.id}
            className='flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer border-2 border-sws_grey rounded-md'
          >
            <img
              src={result.flagImage}
              alt={result.name}
              className='w-5 h-5 mr-2'
            />
            {result.name}
          </div>
        ))}
      </div>
    )
  );
};

export default SearchResult;
