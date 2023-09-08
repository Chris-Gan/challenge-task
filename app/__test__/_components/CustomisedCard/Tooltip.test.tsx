import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Tooltip from '@/app/_components/CustomisedCard/Tooltip';

describe('<Tooltip />', () => {
  it('renders the component without crashing', () => {
    render(<Tooltip />);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeInTheDocument();
  });

  it('shows the tooltip on mouse enter and hides on mouse leave', () => {
    render(<Tooltip />);
    const buttonElement = screen.getByRole('button');

    fireEvent.mouseEnter(buttonElement);
    const tooltip = screen.getByRole('tooltip');
    expect(tooltip).toBeInTheDocument();

    fireEvent.mouseLeave(buttonElement);
    expect(tooltip).not.toBeInTheDocument();
  });

  it('displays default tooltip content', () => {
    render(<Tooltip />);
    const buttonElement = screen.getByRole('button');

    fireEvent.mouseEnter(buttonElement);
    expect(screen.getByText('Add to watchlist')).toBeInTheDocument();
  });

  it('displays custom tooltip content when provided', () => {
    render(<Tooltip tooltipContent='Custom Content' />);
    const buttonElement = screen.getByRole('button');

    fireEvent.mouseEnter(buttonElement);
    expect(screen.getByText('Custom Content')).toBeInTheDocument();
  });

  it('renders the provided icon correctly', () => {
    const IconMock = () => <div data-testid='mock-icon'>Mock Icon</div>;
    render(<Tooltip icon={<IconMock />} />);
    const mockIcon = screen.getByTestId('mock-icon');
    expect(mockIcon).toBeInTheDocument();
  });
});
