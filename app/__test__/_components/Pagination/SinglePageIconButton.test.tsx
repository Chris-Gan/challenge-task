import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SinglePageIconButton from '@/app/_components/Pagination/SinglePageIconButton';

describe('<SinglePageIconButton />', () => {
  const mockHandleClick = jest.fn();

  const defaultProps = {
    label: 1,
    pathname: '/test',
    searchParams: { name: 'test' },
    handlePageOnClick: mockHandleClick,
    isActive: false,
  };

  it('should render without crashing', () => {
    const { getByText } = render(<SinglePageIconButton {...defaultProps} />);
    expect(getByText('1')).toBeInTheDocument();
  });

  it('should handle click event', () => {
    const { getByText } = render(<SinglePageIconButton {...defaultProps} />);
    fireEvent.click(getByText('1'));
    expect(mockHandleClick).toHaveBeenCalledWith(1);
  });

  it('should have the correct active class', () => {
    const { container } = render(
      <SinglePageIconButton {...defaultProps} isActive={true} />,
    );
    const linkElement = container.firstChild;
    expect(linkElement).toHaveClass('bg-neutral-100');
    expect(linkElement).toHaveClass('pointer-events-none');
  });

  it('should have the correct inactive class', () => {
    const { container } = render(
      <SinglePageIconButton {...defaultProps} isActive={false} />,
    );
    const linkElement = container.firstChild;
    expect(linkElement).toHaveClass('bg-transparent');
    expect(linkElement).toHaveClass('cursor-pointer');
  });
});
