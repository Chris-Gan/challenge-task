import InteractivePanel from '@/app/_components/InteractivePanel/';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
  useParams() {
    return { country: 'us', industry: 'tech', filter: 'market_cap_high' };
  },
}));

describe('InteractivePanel Component', () => {
  it('renders without crashing', () => {
    render(<InteractivePanel numOfFirms={10} />);

    expect(screen.getByText(/companies/)).toBeInTheDocument();
  });

  it('displays correct breadcrumb based on selected country and industry', () => {
    render(<InteractivePanel numOfFirms={10} />);

    expect(screen.getByText('United States')).toBeInTheDocument();
    expect(
      screen.getByText(/Tech Stocks - Market Cap High to Low/),
    ).toBeInTheDocument();
  });
});
