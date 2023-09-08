import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import SearchBox from '@/app/_components/SearchBox';

describe('SearchBox component', () => {
  it('renders the search input with the default placeholder', () => {
    render(<SearchBox />);

    const searchInput = screen.getByPlaceholderText('150k companies worldwide');
    expect(searchInput).toBeInTheDocument();
  });

  it('renders the search input with the provided placeholder', () => {
    const customPlaceholder = 'Search for products';
    render(<SearchBox placeholder={customPlaceholder} />);

    const searchInput = screen.getByPlaceholderText(customPlaceholder);
    expect(searchInput).toBeInTheDocument();
  });

  it('renders the magnifying glass icon', () => {
    render(<SearchBox />);

    const magnifyingGlassIcon = screen.getByTestId('magnifying-glass-icon');
    expect(magnifyingGlassIcon).toBeInTheDocument();
  });
});
