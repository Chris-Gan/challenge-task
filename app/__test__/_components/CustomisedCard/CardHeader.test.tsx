import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CardHeader from '@/app/_components/CustomisedCard/CardHeader';

describe('<CardHeader />', () => {
  const defaultProps = {
    firmAbbreviation: 'FA',
    industry: 'Tech',
    firmName: 'Firm A Technologies',
  };

  it('renders the component without crashing', () => {
    render(<CardHeader {...defaultProps} />);
    expect(
      screen.getByRole('heading', { name: 'Firm A Technologies' }),
    ).toBeInTheDocument();
  });

  it('displays the firm abbreviation correctly', () => {
    render(<CardHeader {...defaultProps} />);
    const firmAbbreviationButton = screen.getByRole('button', { name: 'FA' });
    expect(firmAbbreviationButton).toBeInTheDocument();
  });

  it('displays the industry correctly', () => {
    render(<CardHeader {...defaultProps} />);
    const industryButton = screen.getByRole('button', { name: 'Tech' });
    expect(industryButton).toBeInTheDocument();
  });

  it('applies overflow styles to the firm name', () => {
    render(<CardHeader {...defaultProps} />);
    const firmNameElement = screen.getByText('Firm A Technologies');
    expect(firmNameElement).toHaveClass('overflow-ellipsis');
    expect(firmNameElement).toHaveClass('overflow-hidden');
  });
});
