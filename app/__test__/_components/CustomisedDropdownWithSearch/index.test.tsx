import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CustomisedDropdownWithSearch from '@/app/_components/CustomisedDropdownWithSearch';

const options = [
  { id: 0, value: 'option1', label: 'Option 1' },
  { id: 1, value: 'option2', label: 'Option 2' },
  { id: 2, value: 'option3', label: 'Option 3' },
];
const mockHandleOptionOnClick = jest.fn();

describe('CustomisedDropdown', () => {
  beforeEach(() => {
    render(
      <CustomisedDropdownWithSearch
        dropdownName='Test Dropdown'
        optionsArr={options}
        searchTabPlaceholder='Search options...'
        selectedOption={options[0]}
        handleOptionOnClick={mockHandleOptionOnClick}
      />,
    );
  });

  it('renders dropdown button correctly', () => {
    expect(screen.getByTestId('dropdown-button')).toBeInTheDocument();
    expect(screen.queryByRole('searchbox')).not.toBeInTheDocument(); // dropdown is initially closed
  });

  it('toggles dropdown on button click', () => {
    const button = screen.getByTestId('dropdown-button');
    fireEvent.click(button);
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
    fireEvent.click(button);
    expect(screen.queryByRole('searchbox')).not.toBeInTheDocument();
  });

  it('filters options based on search input', () => {
    fireEvent.click(screen.getByTestId('dropdown-button'));
    fireEvent.change(screen.getByRole('searchbox'), {
      target: { value: 'Option 1' },
    });
    expect(screen.getAllByText('Option 1')).toHaveLength(2);
    expect(screen.queryByText('Option 2')).not.toBeInTheDocument();
  });

  it('clears search after option selection', () => {
    fireEvent.click(screen.getByTestId('dropdown-button'));
    const search = screen.getByRole('searchbox');
    fireEvent.change(search, { target: { value: 'Option 1' } });
    fireEvent.click(screen.getAllByText('Option 1')[1]);
    fireEvent.click(screen.getByTestId('dropdown-button'));
    expect(screen.getByRole('searchbox')).toHaveValue('');
  });

  it('invokes handleOptionOnClick with correct parameters', () => {
    fireEvent.click(screen.getByTestId('dropdown-button'));
    fireEvent.click(screen.getAllByText('Option 1')[1]);
    expect(mockHandleOptionOnClick).toHaveBeenCalledWith(
      expect.anything(),
      options[0],
      true,
    );
  });

  it('displays check icon for the selected option', () => {
    fireEvent.click(screen.getByTestId('dropdown-button'));
    const selected = screen.getAllByText('Option 1')[1].closest('div');
    expect(selected).toContainElement(screen.getByTestId('check-icon'));
  });

  it('displays NoResult when no options match search', () => {
    fireEvent.click(screen.getByTestId('dropdown-button'));
    fireEvent.change(screen.getByRole('searchbox'), {
      target: { value: 'Not an Option' },
    });
    expect(screen.getByText(/No Result/i)).toBeInTheDocument();
  });
});
