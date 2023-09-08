'use client';
import { DropDownValue } from '@/app/_types/customisedDropdown';
import { CheckIcon } from '@heroicons/react/20/solid';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import {
  MouseEvent as ReactMouseEvent,
  FC,
  useState,
  useRef,
  useEffect,
} from 'react';
interface Props {
  optionsArr: DropDownValue[];
  selectedOption: DropDownValue;
  handleOptionOnClick: (
    event: ReactMouseEvent<HTMLDivElement, globalThis.MouseEvent>,
    option: DropDownValue,
    isSelected: boolean,
  ) => void;
}
const CustomisedDropdown: FC<Props> = ({
  optionsArr,
  selectedOption,
  handleOptionOnClick,
}) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const handleButtonOnClick = () => {
    setIsDropDownOpen((prev) => !prev);
  };

  const handleOptionSelect = (
    event: ReactMouseEvent<HTMLDivElement, globalThis.MouseEvent>,
    option: DropDownValue,
    isSelected: boolean,
  ) => {
    setIsDropDownOpen(false);
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
      <div className='relative right-2' ref={dropdownRef}>
        <button
          onClick={handleButtonOnClick}
          className='flex items-center justify-center space-x-2 bg-transparent text-gray-300 p-2 hover:bg-gray-800 transition duration-600 rounded-md'
        >
          <span className='text-[0.8rem]'>{selectedOption.label}</span>
          <ChevronDownIcon className='h-5 w-4' />
        </button>
        {isDropDownOpen && (
          <div className='absolute top-full bg-white rounded-md text-[0.9rem] min-w-[280px] z-20'>
            <div className='bg-white max-h-[170px] overflow-auto rounded-md'>
              {optionsArr.map((option) => {
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
                      data-testid='option-values'
                      className={isSelected ? 'font-semibold' : ''}
                    >
                      {option.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CustomisedDropdown;
