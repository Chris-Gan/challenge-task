import React, { FC } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface Props {
  placeholder?: string;
}
const SearchBox: FC<Props> = ({ placeholder = '150k companies worldwide' }) => {
  return (
    <>
      <div className='ml-5 text-[0.9rem] cursor-pointer h-10 rounded-md flex-1  lg:max-w-[200px]'>
        <label
          htmlFor='searchField'
          className='relative text-gray-400 focus-within:text-gray-600 block min-w-[300px]'
        >
          <MagnifyingGlassIcon className='pointer-events-none w-5 h-5 absolute top-1/2 transform -translate-y-1/2 left-3 text-sws_blue' />

          <input
            type='search'
            name='searchField'
            id='searchField'
            className='p-2 h-full w-full rounded-1-md focus:outline-none form-input block pl-9 text-white bg-sws_grey-light border-2 border-sws_grey rounded-md '
            placeholder={placeholder}
          />
        </label>
      </div>
    </>
  );
};

export default SearchBox;
