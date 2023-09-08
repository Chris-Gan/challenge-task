import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/solid';

const AdvancedFilterButton = () => {
  return (
    <div className='flex items-center text-gray-300 hover:bg-slate-800 p-2 rounded-md transition ease-in-out cursor-pointer duration-300'>
      <button className='whitespace-nowrap text-[0.9rem]'>
        Advanced Filter
      </button>
      <AdjustmentsHorizontalIcon
        data-testid='advanced-filter-icon'
        className='text-gray-300 w-5 h-5 mx-2'
      />
    </div>
  );
};

export default AdvancedFilterButton;
