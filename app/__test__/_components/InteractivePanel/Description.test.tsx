import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Description from '@/app/_components/InteractivePanel/Description';

jest.mock('@/app/_helper', () => ({
  formatDate: jest.fn().mockReturnValue('2023-09-08'),
}));

describe('Description Component', () => {
  it('renders without crashing', () => {
    render(<Description country='' industry='' performanceFilter='' />);
  });

  it('displays the heading based on provided props', () => {
    render(
      <Description
        country='USA'
        industry='Tech'
        performanceFilter='Top Performers'
      />,
    );
    const heading = screen.getByText(
      'Largest USA Tech Stocks - Top Performers',
    );
    expect(heading).toBeInTheDocument();
  });

  it('displays the correctly formatted date', () => {
    render(<Description country='' industry='' performanceFilter='' />);
    const dateElement = screen.getByText('2023-09-08');
    expect(dateElement).toBeInTheDocument();
  });

  it('displays the static content correctly', () => {
    render(<Description country='' industry='' performanceFilter='' />);
    const loremIpsum = screen.getByText(/Lorem ipsum dolor sit amet/);
    expect(loremIpsum).toBeInTheDocument();
  });
});
