import Snowflake from '@/app/_components/Snowflake';
import { ScoreData } from '@/app/_types/services';
import { getBorderColor, getChartColor } from '@/app/_helper';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
jest.mock('chart.js', () => ({
  ...jest.requireActual('chart.js'),
  Chart: {
    register: jest.fn(),
  },
  Filler: jest.fn(),
  LineElement: jest.fn(),
  PointElement: jest.fn(),
  RadarController: jest.fn(),
  RadialLinearScale: jest.fn(),
}));

jest.mock('react-chartjs-2', () => ({
  Radar: jest.fn(() => null),
}));

jest.mock('@/app/_helper/chartjs', () => ({
  rotatePointLabelsPlugin: jest.fn(),
  stripedBackgroundPlugin: jest.fn(),
}));

jest.mock('@/app/_helper', () => ({
  generateChartData: jest.fn(),
  getBorderColor: jest.fn(),
  getChartColor: jest.fn(),
}));

jest.mock('@/app/_assets/snowflakes', () => ({
  snowflakeLables: jest.fn(),
}));

jest.mock('@/app/_types/services', () => ({}));

describe('Snowflake component', () => {
  const mockScoreData: ScoreData = {
    value: 4,
    income: 0,
    health: 5,
    past: 3,
    future: 3,
    management: 0,
    misc: 0,
    total: 15,
    sentence: 'Excellent balance sheet and good value.',
  };

  it('renders the snowflake component', async () => {
    render(<Snowflake scoreData={mockScoreData} />);

    await waitFor(() => {
      const snowflakeElement = screen.getByTestId('snowflake-score');
      expect(snowflakeElement).toBeInTheDocument();
    });
  });

  it('computes the borderColor correctly', async () => {
    const expectedBorderColor = getBorderColor(mockScoreData.total);

    render(<Snowflake scoreData={mockScoreData} />);

    await waitFor(() => {
      const snowflakeElement = screen.getByTestId('snowflake-score');
      expect(snowflakeElement).toHaveStyle(
        `borderColor: ${expectedBorderColor}`,
      );
    });
  });

  it('computes the chartColor correctly', async () => {
    const expectedChartColor = getChartColor(mockScoreData.total);

    render(<Snowflake scoreData={mockScoreData} />);

    await waitFor(() => {
      const snowflakeElement = screen.getByTestId('snowflake-score');
      expect(snowflakeElement).toHaveStyle(
        `backgroundColor: ${expectedChartColor}`,
      );
    });
  });
});
