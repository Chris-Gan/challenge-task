'use client';

import Image from 'next/image';
// import { getCompanies } from '../../_actions';
// import { Company } from '../../_types/mockedCompanies';
import SearchBox from '../SearchBox';
import NavItem from './NavItem';

const Navbar = () => {
  // const searchCompanies = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   let companies: Company[] = [];
  //   if (e.target.value !== '' || e.target.value.length > 0) {
  //     companies = await getCompanies(
  //       process.env.NEXT_PUBLIC_MOCKED_COMPANIES_URL as string,
  //       e.target.value,
  //     );
  //   }

  //   return companies;
  // };
  return (
    <header>
      <nav className='relative flex w-full items-center justify-center bg-sws_dark py-1 text-white shadow-lg border-b-sws_grey-light border-b-2 lg:py-2'>
        <div className='flex w-full max-w-[1100px] items-center justify-start px-3'>
          <a className='lg:mr-8' href='#'>
            <Image
              priority
              className='inline xl:hidden'
              src='/mobile-company-logo.png'
              alt='simply-wall-st-logo'
              height={40}
              width={40}
            />
            <Image
              priority
              className='hidden xl:inline-block'
              src='/desktop-company-logo.svg'
              alt='simply-wall-st-logo'
              width={160}
              height={60}
            />
          </a>

          <NavItem label='Dashboard' url='#' />
          <NavItem label='Markets' url='#' />
          <NavItem label='Discover' url='#' />
          <NavItem label='Watchlist' url='#' />
          <NavItem label='Portfolios' url='#' />
          <NavItem label='Screener' url='#' />
          <SearchBox />
        </div>
        <button className='rounded-md bg-sws_blue p-2 px-3 text-[0.9rem] hidden lg:block whitespace-nowrap'>
          Log in/ Sign Up
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
