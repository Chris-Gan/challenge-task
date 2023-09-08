'use client';
import { DropDownValue } from '@/app/_types/customisedDropdown';
import { CheckIcon } from '@heroicons/react/20/solid';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import {
  MouseEvent as ReactMouseEvent,
  FC,
  useMemo,
  useState,
  useRef,
  useEffect,
} from 'react';
import NoResult from './NoResult';

interface Props {
  dropdownName: string;
  optionsArr: DropDownValue[];
  searchTabPlaceholder: string;
  selectedOption: DropDownValue;
  handleOptionOnClick: (
    event: ReactMouseEvent<HTMLDivElement, globalThis.MouseEvent>,
    option: DropDownValue,
    isSelected: boolean,
  ) => void;
}
const CustomisedDropdownWithSearch: FC<Props> = ({
  dropdownName,
  optionsArr,
  searchTabPlaceholder,
  selectedOption,
  handleOptionOnClick,
}) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const filteredOptions = useMemo(() => {
    if (!searchValue) return optionsArr;

    return optionsArr.filter((item) =>
      item.label.toLocaleLowerCase().includes(searchValue.toLowerCase()),
    );
  }, [searchValue, optionsArr]);

  const handleSearchOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleButtonOnClick = () => {
    setIsDropDownOpen((prev) => {
      if (prev) setSearchValue('');
      return !prev;
    });
  };

  const handleOptionSelect = (
    event: ReactMouseEvent<HTMLDivElement, globalThis.MouseEvent>,
    option: DropDownValue,
    isSelected: boolean,
  ) => {
    setIsDropDownOpen(false);
    setSearchValue('');
    handleOptionOnClick(event, option, isSelected);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Element)
      ) {
        setIsDropDownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    <>
      <div className='relative' ref={dropdownRef}>
        <button
          onClick={handleButtonOnClick}
          data-testid='dropdown-button'
          className='flex items-center justify-center space-x-2 bg-transparent text-white border-2 border-sws_grey px-2 py-1 rounded-2xl hover:bg-gray-800 transition duration-600 mr-2'
        >
          <span className='text-[0.8rem]'>
            {selectedOption.value === ''
              ? dropdownName
              : selectedOption?.buttonLabel ?? selectedOption.label}
          </span>
          <ChevronDownIcon className='h-5 w-4' />
        </button>
        {isDropDownOpen && (
          <div className='absolute top-full bg-white rounded-md text-[0.9rem] min-w-max'>
            <input
              placeholder={searchTabPlaceholder}
              className='p-2 h-full w-full rounded-1-md focus:outline-none form-input block bg-sws_blue-light border-2 border-sws_grey rounded-md '
              type='search'
              value={searchValue}
              onChange={handleSearchOnChange}
            />
            <div className='bg-white max-h-[170px] overflow-auto rounded-md'>
              {!filteredOptions.length && searchValue ? (
                <NoResult />
              ) : (
                filteredOptions.map((option) => {
                  const isSelected = option.value === selectedOption.value;
                  return (
                    <div
                      key={option.value}
                      onClick={(e) => handleOptionSelect(e, option, isSelected)}
                      className={
                        'flex cursor-pointer items-center hover:bg-sws_blue hover:text-white py-1 pl-6 whitespace-nowrap'
                      }
                    >
                      {isSelected && (
                        <CheckIcon
                          data-testid='check-icon'
                          className='h-4 w-4 mr-2 text-green-400 hover:text-white'
                        />
                      )}
                      <span
                        id='dropdown-option'
                        data-testid='option-values'
                        className={isSelected ? 'font-semibold' : ''}
                      >
                        {option.label}
                      </span>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CustomisedDropdownWithSearch;
