'use client';
import {
  countryOptions,
  industryOptions,
  performanceFilterOptions,
} from '@/app/_assets/customisedInputs';
import { DropDownValue } from '@/app/_types/customisedDropdown';
import {
  generateInitialCountryOption,
  generateInitialFilterOption,
  generateInitialIndustryOption,
  generateRedirectPath,
  reassignParams,
} from '@/app/helper';
import { Squares2X2Icon } from '@heroicons/react/24/solid';
import { useRouter, useParams } from 'next/navigation';
import { FC, MouseEvent, useState } from 'react';
import CustomisedDropdown from '../CustomisedDropdown';
import CustomisedDropdownWithSearch from '../CustomisedDropdownWithSearch';
import AdvancedFilterButton from './AdvancedFilterButton';
import CustomisedBreadcrumb from './CustomisedBreadcrumb';
import Description from './Description';

interface Props {
  numOfFirms: number;
}
const InteractivePanel: FC<Props> = ({ numOfFirms }) => {
  const router = useRouter();
  const searchParams = useParams();
  const { country, industry, filter } = searchParams;
  const {
    country: urlCountry,
    industry: urlIndustry,
    filter: urlFilter,
  } = reassignParams(country as string, industry as string, filter as string);

  const [selectedCountry, setSelectedCountry] = useState<DropDownValue>(
    generateInitialCountryOption(urlCountry),
  );
  const [selectedIndustry, setSelectedIndustry] = useState<DropDownValue>(
    generateInitialIndustryOption(urlIndustry as string),
  );

  const [selectedPerformanceFilter, setSelectedPerformanceFilter] = useState(
    generateInitialFilterOption(urlFilter as string),
  );

  const handleCountryOptionOnClick = (
    event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
    option: DropDownValue,
    isSelected: boolean,
  ) => {
    if (isSelected) {
      event.preventDefault();
      return;
    }

    router.push(
      generateRedirectPath(
        option.value,
        selectedIndustry.value,
        selectedPerformanceFilter.value,
      ),
    );
    setSelectedCountry(option);
  };

  const handleIndustryOptionOnClick = (
    event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
    option: DropDownValue,
    isSelected: boolean,
  ) => {
    if (isSelected) {
      event.preventDefault();
      return;
    }
    router.push(
      generateRedirectPath(
        selectedCountry.value,
        option.value,
        selectedPerformanceFilter.value,
      ),
    );

    setSelectedIndustry(option);
  };

  const handlePerformanceOptionOnClick = (
    event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
    option: DropDownValue,
    isSelected: boolean,
  ) => {
    if (isSelected) {
      event.preventDefault();
      return;
    }
    router.push(
      generateRedirectPath(
        selectedCountry.value,
        selectedIndustry.value,
        option.value,
      ),
    );

    setSelectedPerformanceFilter(option);
  };
  return (
    <div className='flex flex-col max-w-[1200px] mx-auto'>
      <div className='relative flex w-full items-center justify-between bg-sws_dark pt-1 pb-0 mb-0 shadow-lg lg:py-2'>
        <div className='flex'>
          <CustomisedDropdownWithSearch
            searchTabPlaceholder='Search: e.g. Automobiles'
            dropdownName='Country'
            optionsArr={countryOptions}
            selectedOption={selectedCountry}
            handleOptionOnClick={handleCountryOptionOnClick}
          />
          <CustomisedDropdownWithSearch
            searchTabPlaceholder='Search: e.g. Automobiles'
            dropdownName='Industry'
            optionsArr={industryOptions}
            selectedOption={selectedIndustry}
            handleOptionOnClick={handleIndustryOptionOnClick}
          />
        </div>
        <AdvancedFilterButton />
      </div>
      <CustomisedBreadcrumb
        country={selectedCountry.label}
        market={selectedIndustry.label}
      />
      <Description
        country={selectedCountry.label}
        industry={selectedIndustry.label}
        performanceFilter={selectedPerformanceFilter.label}
      />
      <div className='flex justify-between items-center'>
        <CustomisedDropdown
          optionsArr={performanceFilterOptions}
          selectedOption={selectedPerformanceFilter}
          handleOptionOnClick={handlePerformanceOptionOnClick}
        />
        <div className='text-gray-500 text-[0.8rem]'>
          {numOfFirms} companies
        </div>
        <Squares2X2Icon className='h-8 w-8 text-gray-500 hover:bg-sws_grey rounded-full p-1 cursor-pointer' />
      </div>
      <hr className='mt-2 mb-4 border-t-gray-600' />
    </div>
  );
};

export default InteractivePanel;
