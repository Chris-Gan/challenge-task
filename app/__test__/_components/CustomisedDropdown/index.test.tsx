import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CustomisedDropdown from '@/app/_components/CustomisedDropdown';

describe('CustomisedDropdown', () => {
  const optionsArr = [
    { id: 0, value: 'option1', label: 'Option 1' },
    { id: 1, value: 'option2', label: 'Option 2' },
    { id: 2, value: 'option3', label: 'Option 3' },
  ];

  const selectedOption = { id: 0, value: 'option1', label: 'Option 1' };

  const mockHandleOptionOnClick = jest.fn();

  beforeEach(() => {
    render(
      <CustomisedDropdown
        optionsArr={optionsArr}
        selectedOption={selectedOption}
        handleOptionOnClick={mockHandleOptionOnClick}
      />,
    );
  });

  it('renders without crashing', () => {
    expect(screen.getByText(selectedOption.label)).toBeInTheDocument();
  });

  it('displays the selected option', () => {
    expect(screen.getByText(selectedOption.label)).toBeInTheDocument();
  });

  it('shows dropdown options when button is clicked', () => {
    fireEvent.click(screen.getByText(selectedOption.label));

    expect(screen.getAllByTestId('option-values')).toHaveLength(3);
  });

  it('hides dropdown options when an option is clicked', () => {
    fireEvent.click(screen.getByText(selectedOption.label));
    fireEvent.click(screen.getByText('Option 2'));
    expect(screen.queryByText('Option 3')).not.toBeInTheDocument();
  });

  it('hides dropdown when clicking outside of the dropdown', () => {
    fireEvent.click(screen.getByText(selectedOption.label));
    fireEvent.mouseDown(document.body);
    expect(screen.queryByText('Option 2')).not.toBeInTheDocument();
  });

  it('does not display the check icon for non-selected options', () => {
    fireEvent.click(screen.getByText(selectedOption.label));
    const uncheckedOption = screen.getByText('Option 2').closest('div');
    expect(uncheckedOption).not.toContainElement(
      screen.getByTestId('check-icon'),
    );
  });
});
