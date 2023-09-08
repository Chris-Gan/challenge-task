import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import CustomisedCard from '@/app/_components/CustomisedCard';
import { CompanyListingDetails } from '@/app/_types/services';

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
jest.mock('chart.js', () => ({
  ...jest.requireActual('chart.js'),
  Chart: {
    register: jest.fn(),
  },
  Filler: jest.fn(),
  LineElement: jest.fn(),
  PointElement: jest.fn(),
  RadarController: jest.fn(),
  RadialLinearScale: jest.fn(),
}));

jest.mock('react-chartjs-2', () => ({
  Radar: jest.fn(() => null),
}));

jest.mock('@/app/_helper/chartjs', () => ({
  rotatePointLabelsPlugin: jest.fn(),
  stripedBackgroundPlugin: jest.fn(),
}));

jest.mock('@/app/_helper', () => ({
  generateChartData: jest.fn(),
  getBorderColor: jest.fn(),
  getChartColor: jest.fn(),
}));

jest.mock('@/app/_assets/snowflakes', () => ({
  snowflakeLables: jest.fn(),
}));

jest.mock('@/app/_types/services', () => ({}));
describe('<CustomisedCard />', () => {
  const mockData: CompanyListingDetails = {
    name: 'Apple Inc.',
    ticker_symbol: 'AAPL',
    score: {
      data: {
        value: 2,
        income: 4,
        health: 5,
        past: 1,
        future: 2,
        management: 0,
        misc: 0,
        total: 14,
        sentence: 'Excellent balance sheet average dividend payer.',
      },
    },
    grid: {
      data: {
        year_founded: 1945,
        description:
          'Walmart Inc. engages in the operation of retail, wholesale, and other units worldwide.',
        logo_url: '/api/company/image/DB:WMT/logo',
        share_price: 157.81999999999999,
        market_cap: 424983237375.0,
        pe: 30.267306000000001,
        pb: 5.3419379999999999,
        price_to_sales: null,
        analyst_count: 31.0,
        return_1d: 0.0059280000000000001,
        return_7d: 0.0019680000000000001,
        return_1yr_abs: 0.18768799999999999,
        price_target: 176.74053000000001,
        growth_3y: 0.098101999999999995,
        net_income_growth_annual: 0.098101999999999995,
        revenue_growth_annual: 0.032240999999999999,
        dividend_yield: 0.014447,
        primary_industry: { id: 5010000, name: 'Consumer Retailing' },
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
          'https://images.simplywall.st/asset/company-cover/313055-main-thumb/1585186646957',
        main_header:
          'https://images.simplywall.st/asset/company-cover/313055-main-header/1585186657317',
      },
    },
    id: 0,
    company_id: '',
    trading_item_id: 0,
    slug: '',
    exchange_symbol: '',
    unique_symbol: '',
    primary_ticker: false,
    last_updated: 0,
    canonical_url: '',
    primary_canonical_url: '',
    is_searchable: false,
    isin_symbol: '',
  };

  it('renders the component without crashing', () => {
    const screen = render(<CustomisedCard data={mockData} />);
    expect(screen.getByText('Apple Inc.')).toBeInTheDocument();
  });

  it('displays the main thumbnail', () => {
    const screen = render(<CustomisedCard data={mockData} />);
    const image = screen.getByAltText('Thumbnail');
    const srcValue = image.getAttribute('src');
    expect(srcValue).toMatch(/^\/_next\/image/);
    expect(srcValue).toContain(
      'url=https%3A%2F%2Fimages.simplywall.st%2Fasset%2Fcompany-cover%2F313055-main-thumb%2F1585186646957',
    );
  });

  it('renders Snowflake component', () => {
    const screen = render(<CustomisedCard data={mockData} />);
    expect(screen.getByTestId('snowflake-score'));
  });

  it('renders CardHeader with correct props', () => {
    const screen = render(<CustomisedCard data={mockData} />);
    expect(screen.getByText('AAPL')).toBeInTheDocument(); // firmAbbreviation
    expect(screen.getByText('Consumer Retailing')).toBeInTheDocument(); // industry
    expect(screen.getByText('Apple Inc.')).toBeInTheDocument(); // firmName
  });

  it('renders CardBody with correct props', () => {
    const screen = render(<CustomisedCard data={mockData} />);
    const image = screen.getByAltText('Thumbnail');
    const srcValue = image.getAttribute('src');
    expect(srcValue).toMatch(/^\/_next\/image/);
    expect(srcValue).toContain(
      'url=https%3A%2F%2Fimages.simplywall.st%2Fasset%2Fcompany-cover%2F313055-main-thumb%2F1585186646957',
    );
  });
});
