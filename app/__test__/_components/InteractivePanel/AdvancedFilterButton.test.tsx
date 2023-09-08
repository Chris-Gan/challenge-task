import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AdvancedFilterButton from '@/app/_components/InteractivePanel/AdvancedFilterButton';

describe('AdvancedFilterButton Component', () => {
  it('renders without crashing', () => {
    render(<AdvancedFilterButton />);
  });

  it('displays the Advanced Filter button', () => {
    render(<AdvancedFilterButton />);
    const buttonElement = screen.getByText('Advanced Filter');
    expect(buttonElement).toBeInTheDocument();
  });

  it('displays the AdjustmentsHorizontalIcon', () => {
    render(<AdvancedFilterButton />);
    const iconElement = screen.getByTestId('advanced-filter-icon');
    expect(iconElement).toBeInTheDocument();
  });
});
