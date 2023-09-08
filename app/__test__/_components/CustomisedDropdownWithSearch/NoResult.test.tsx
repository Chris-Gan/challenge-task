import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import NoResult from '@/app/_components/CustomisedDropdownWithSearch/NoResult';

describe('<NoResult />', () => {
  it('should render without crashing', () => {
    const { getByText } = render(<NoResult />);
    expect(getByText('No results')).toBeInTheDocument();
  });

  it('should have the correct class', () => {
    const { container } = render(<NoResult />);
    const divElement = container.firstChild;
    expect(divElement).toHaveClass('flex');
    expect(divElement).toHaveClass('items-centerpy-1');
    expect(divElement).toHaveClass('pl-6');
    expect(divElement).toHaveClass('py-2');
  });
});
