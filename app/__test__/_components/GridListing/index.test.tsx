import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import GridListing from '@/app/_components/GridListing';
import { ResponseInterface } from '@/app/_types/services';

jest.mock('next/navigation', () => ({
  usePathname: () => '/test',
  useSearchParams: () => new URLSearchParams(''),
}));
const mockData: ResponseInterface = {
  meta: {
    total_records: 2,
    real_total_records: 2,
    state: 'read',
    noResultIfLimit: false,
    pe: 15.646167500000001,
    return_1yr_abs: 0.068140410633087997,
    return_7d: 0.00079424417899173001,
  },
  data: [
    {
      id: 24937,
      company_id: '743F0744-8987-4339-B565-DEE3A93E9934',
      trading_item_id: 2590360,
      name: 'Apple',
      slug: 'apple',
      exchange_symbol: 'NasdaqGS',
      ticker_symbol: 'AAPL',
      unique_symbol: 'NasdaqGS:AAPL',
      primary_ticker: true,
      last_updated: 1693180800000,
      canonical_url: '/stocks/us/tech/nasdaq-aapl/apple',
      primary_canonical_url: '/stocks/us/tech/nasdaq-aapl/apple',
      is_searchable: true,
      isin_symbol: 'US0378331005',
      score: {
        data: {
          value: 2,
          income: 0,
          health: 2,
          past: 2,
          future: 2,
          management: 0,
          misc: 0,
          total: 8,
          sentence: 'Slightly overvalued with limited growth.',
        },
      },
      grid: {
        data: {
          year_founded: 1977,
          description:
            'Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide.',
          logo_url: '/api/company/image/DB:APC/logo',
          share_price: 178.61000000000001,
          market_cap: 2792430177520.0,
          pe: 29.468447999999999,
          pb: 46.328933999999997,
          price_to_sales: 7.2732229999999998,
          analyst_count: 42.0,
          return_1d: 0.012643,
          return_7d: 0.015753,
          return_1yr_abs: 0.106767,
          price_target: 200.04326,
          growth_3y: 0.062640000000000001,
          net_income_growth_annual: 0.062640000000000001,
          revenue_growth_annual: 0.061355,
          dividend_yield: 0.0053749999999999996,
          primary_industry: { id: 8100000, name: 'Tech' },
          currency_info: {
            reporting_unit_abs: 1,
            reporting_currency_iso: 'USD',
            trading_item_currency_iso: 'USD',
            reporting_unit_text: 'Millions',
            reporting_unit_text_abs: 'Absolute',
            primary_trading_item_currency_symbol: '$',
            reporting_currency_symbol: '$',
            reporting_unit: 1000000,
            trading_item_currency_symbol: '$',
            primary_trading_item_currency_iso: 'USD',
          },
          main_thumb:
            'https://images.simplywall.st/asset/company-cover/24937-main-thumb/1585186590198',
          main_header:
            'https://images.simplywall.st/asset/company-cover/24937-main-header/1585186602089',
        },
      },
    },
    {
      id: 21835,
      company_id: '424EB65E-8C34-42BF-A107-61F93D4E9E6D',
      trading_item_id: 2630413,
      name: 'Microsoft',
      slug: 'microsoft',
      exchange_symbol: 'NasdaqGS',
      ticker_symbol: 'MSFT',
      unique_symbol: 'NasdaqGS:MSFT',
      primary_ticker: true,
      last_updated: 1693180800000,
      canonical_url: '/stocks/us/software/nasdaq-msft/microsoft',
      primary_canonical_url: '/stocks/us/software/nasdaq-msft/microsoft',
      is_searchable: true,
      isin_symbol: 'US5949181045',
      score: {
        data: {
          value: 4,
          income: 0,
          health: 6,
          past: 3,
          future: 3,
          management: 0,
          misc: 0,
          total: 16,
          sentence: 'Flawless balance sheet and good value.',
        },
      },
      grid: {
        data: {
          year_founded: 1975,
          description:
            'Microsoft Corporation develops and supports software, services, devices and solutions worldwide.',
          logo_url: '/api/company/image/DB:MSF/logo',
          share_price: 322.98000000000002,
          market_cap: 2399665086931.0,
          pe: 33.162408999999997,
          pb: 11.636263,
          price_to_sales: 11.323715,
          analyst_count: 44.0,
          return_1d: 0.0094070000000000004,
          return_7d: 0.0034169999999999999,
          return_1yr_abs: 0.21773600000000001,
          price_target: 389.52224000000001,
          growth_3y: 0.119183,
          net_income_growth_annual: 0.119183,
          revenue_growth_annual: 0.109856,
          dividend_yield: 0.0084220000000000007,
          primary_industry: { id: 8010000, name: 'Software' },
          currency_info: {
            reporting_unit_abs: 1,
            reporting_currency_iso: 'USD',
            trading_item_currency_iso: 'USD',
            reporting_unit_text: 'Millions',
            reporting_unit_text_abs: 'Absolute',
            primary_trading_item_currency_symbol: '$',
            reporting_currency_symbol: '$',
            reporting_unit: 1000000,
            trading_item_currency_symbol: '$',
            primary_trading_item_currency_iso: 'USD',
          },
          main_thumb:
            'https://images.simplywall.st/asset/company-cover/21835-main-thumb/1585186562284',
          main_header:
            'https://images.simplywall.st/asset/company-cover/21835-main-header/1585186602660',
        },
      },
    },
  ],
};

describe('GridListing Component', () => {
  it('renders CustomisedCard for each data item', () => {
    const { getAllByTestId } = render(<GridListing data={mockData} />);
    const items = getAllByTestId('customised-card');
    expect(items).toHaveLength(2);
  });

  it('renders CircularPagination with the correct total pages', () => {
    const { getByTestId } = render(<GridListing data={mockData} />);
    const totalPages = Math.ceil(
      mockData.meta.total_records / mockData.data.length,
    );
    const paginationComponent = getByTestId('pagination');
    expect(paginationComponent.textContent).toBe(String(totalPages));
  });
});
