import { FC } from 'react';

interface Props {
  market: string;
  country: string;
}
const CustomisedBreadcrumb: FC<Props> = ({ market, country }) => {
  return (
    <div className='flex text-gray-400 mx-auto w-full max-w-[1200px] items-center bg-sws_dark pt-0 -mt-2 font-bold shadow-lg lg:py-2 text-sm'>
      <div className='underline underline-offset-3 decoration-gray-400 mr-2 cursor-pointer'>
        {market !== '' && country}
      </div>
      {country !== '' && market !== '' && '/'}
    </div>
  );
};

export default CustomisedBreadcrumb;
