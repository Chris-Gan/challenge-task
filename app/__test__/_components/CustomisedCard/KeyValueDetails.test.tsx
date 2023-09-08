import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import KeyValueDetails from '@/app/_components/CustomisedCard/KeyValueDetails';

describe('<KeyValueDetails />', () => {
  test('renders the provided label', () => {
    render(<KeyValueDetails label='Test Label' />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  test('renders n/a when value is not provided', () => {
    render(<KeyValueDetails label='Test Label' />);
    expect(screen.getByText('n/a')).toBeInTheDocument();
  });

  test('renders correct percentage for numeric value', () => {
    render(<KeyValueDetails label='Test Label' value={0.5} />);
    expect(screen.getByText('50.0%')).toBeInTheDocument();
  });

  test('renders positive values with green text', () => {
    render(
      <KeyValueDetails label='Test Label' value={0.5} defaultValueStyle />,
    );
    const valueElement = screen.getByText('50.0%');
    expect(valueElement).toHaveClass('text-green-400');
  });

  test('renders negative values with red text', () => {
    render(
      <KeyValueDetails label='Test Label' value={-0.5} defaultValueStyle />,
    );
    const valueElement = screen.getByText('-50.0%');
    expect(valueElement).toHaveClass('text-red-600');
  });

  test('renders string values with white text when defaultValueStyle is true', () => {
    render(
      <KeyValueDetails
        label='Test Label'
        value='String value'
        defaultValueStyle
      />,
    );
    const valueElement = screen.getByText('String value');
    expect(valueElement).toHaveClass('text-white');
  });

  test('applies custom container and value styles', () => {
    render(
      <KeyValueDetails
        label='Test Label'
        containerStyle={['custom-container-style']}
        valueStyle={['custom-value-style']}
      />,
    );
    const containerElement = screen.getByText('Test Label').parentElement;
    const valueElement = screen.getByText('n/a');
    expect(containerElement).toHaveClass('custom-container-style');
    expect(valueElement).toHaveClass('custom-value-style');
  });
});
