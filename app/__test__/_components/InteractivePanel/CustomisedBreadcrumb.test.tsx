import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CustomisedBreadcrumb from '@/app/_components/InteractivePanel/CustomisedBreadcrumb';

describe('CustomisedBreadcrumb Component', () => {
  it('renders without crashing', () => {
    render(<CustomisedBreadcrumb market='' country='' />);
    // if it gets this far without throwing an error, it renders successfully
  });

  it('displays the country when market is not an empty string', () => {
    render(<CustomisedBreadcrumb market='Nasdaq' country='USA' />);
    const countryElement = screen.getByText('USA');
    expect(countryElement).toBeInTheDocument();
  });

  it('does not display the country when market is an empty string', () => {
    render(<CustomisedBreadcrumb market='' country='USA' />);
    expect(screen.queryByText('USA')).toBeNull();
  });

  it('displays the / separator when both country and market are not empty', () => {
    render(<CustomisedBreadcrumb market='Nasdaq' country='USA' />);
    const separator = screen.getByText('/');
    expect(separator).toBeInTheDocument();
  });

  it('does not display the / separator when either country or market is empty', () => {
    render(<CustomisedBreadcrumb market='' country='USA' />);
    expect(screen.queryByText('/')).toBeNull();

    render(<CustomisedBreadcrumb market='Nasdaq' country='' />);
    expect(screen.queryByText('/')).toBeNull();
  });
});
