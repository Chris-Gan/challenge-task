import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Navbar from '@/app/_components/Navbar';

describe('Navbar component', () => {
  beforeEach(() => {
    render(<Navbar />);
  });

  it('renders the company logos', () => {
    const mobileLogo = screen.getByAltText('simply-wall-st-mobile-logo');
    const desktopLogo = screen.getByAltText('simply-wall-st-desktop-logo');

    expect(mobileLogo).toBeInTheDocument();
    expect(desktopLogo).toBeInTheDocument();
  });

  const navItems = [
    'Dashboard',
    'Markets',
    'Discover',
    'Watchlist',
    'Portfolios',
    'Screener',
  ];

  navItems.forEach((item) => {
    it(`renders NavItem with label ${item}`, () => {
      const navItem = screen.getByText(item);
      expect(navItem).toBeInTheDocument();
    });
  });

  it('renders the SearchBox', () => {
    const searchInput = screen.getByRole('searchbox');
    expect(searchInput).toBeInTheDocument();
  });

  it('renders the login/signup button', () => {
    const button = screen.getByText(/Log in\/ Sign Up/i);
    expect(button).toBeInTheDocument();
  });
});
