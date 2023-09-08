import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CardBody from '@/app/_components/CustomisedCard/CardBody';
import { GridDetails } from '@/app/_types/services';

describe('<CardBody />', () => {
  const mockData: GridDetails['data'] = {
    year_founded: 1977,
    description:
      'Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide.',
    logo_url: '/api/company/image/DB:APC/logo',
    share_price: 100,
    market_cap: 2792430177520.0,
    pe: 12.5,
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
  };

  it('renders the component without crashing', () => {
    render(<CardBody data={mockData} />);
    expect(screen.getByText('Price')).toBeInTheDocument();
  });

  it('displays formatted stock price', () => {
    render(<CardBody data={mockData} />);
    expect(screen.getByText('Price')).toBeInTheDocument();
    expect(screen.getByText('$100.00')).toBeInTheDocument();
  });
  it('displays 7D return', () => {
    render(<CardBody data={mockData} />);
    expect(screen.getByText('7D')).toBeInTheDocument();
    expect(screen.getByText('1.6%')).toBeInTheDocument();
  });
  it('displays 1Y return', () => {
    render(<CardBody data={mockData} />);
    expect(screen.getByText('1Y')).toBeInTheDocument();
    expect(screen.getByText('10.7%')).toBeInTheDocument();
  });
  it('displays Market Cap ', () => {
    render(<CardBody data={mockData} />);
    expect(screen.getByText('Mkt Cap')).toBeInTheDocument();
    expect(screen.getByText('$2.79T')).toBeInTheDocument();
  });

  it('displays PE ', () => {
    render(<CardBody data={mockData} />);
    expect(screen.getByText('PE')).toBeInTheDocument();
    expect(screen.getByText('12.5x')).toBeInTheDocument();
  });
  it('displays Expected Growth', () => {
    render(<CardBody data={mockData} />);
    expect(screen.getByText('E.Growth')).toBeInTheDocument();
    expect(screen.getByText('6.3%')).toBeInTheDocument();
  });
  it('displays Analyst Target', () => {
    render(<CardBody data={mockData} />);
    expect(screen.getByText('Analyst Target')).toBeInTheDocument();
    expect(screen.getByText('$200.04')).toBeInTheDocument();
  });

  it('displays "n/a" when PE value is not available', () => {
    const newData = { ...mockData, pe: null } as unknown as GridDetails['data'];
    render(<CardBody data={newData} />);
    expect(screen.getByText('n/a')).toBeInTheDocument();
  });
});
