import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CircularPagination from '@/app/_components/Pagination';

jest.mock('next/navigation', () => ({
  usePathname: () => '/test',
  useSearchParams: () => new URLSearchParams('page=2'),
}));

function isAnchorWithPage(node: Element | null, label: string): boolean {
  if (node instanceof HTMLAnchorElement && node.href.includes(label)) {
    return true;
  }
  return false;
}

describe('<CircularPagination />', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it('renders without crashing', () => {
    render(<CircularPagination totalPages={5} />);
  });

  it('increases the page number on next button click', () => {
    const { getAllByText, getByText } = render(
      <CircularPagination totalPages={5} />,
    );
    const nextButton = getAllByText((_, node) =>
      isAnchorWithPage(node, 'page=3'),
    )[0];
    fireEvent.click(nextButton);
    expect(getByText('3')).toHaveClass('bg-neutral-100');
  });

  it('decreases the page number on prev button click', () => {
    const { getByText, getAllByText } = render(
      <CircularPagination totalPages={5} />,
    );
    const prevButton = getAllByText((_, node) =>
      isAnchorWithPage(node, 'page=1'),
    )[0];
    fireEvent.click(prevButton);
    expect(getByText('1')).toHaveClass('bg-neutral-100');
  });

  it('renders ellipsis when necessary', () => {
    const { getByText } = render(<CircularPagination totalPages={10} />);
    expect(getByText('...')).toBeInTheDocument();
  });

  it('updates the active page when clicked', () => {
    const { getByText } = render(<CircularPagination totalPages={5} />);
    fireEvent.click(getByText('4'));
    expect(getByText('4')).toHaveClass('bg-neutral-100');
  });
});
