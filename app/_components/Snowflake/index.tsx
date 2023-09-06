'use client';
import {
  Chart as ChartJS,
  Filler,
  LineElement,
  PointElement,
  RadarController,
  RadialLinearScale,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

import { FC, useMemo } from 'react';
import {
  rotatePointLabelsPlugin,
  stripedBackgroundPlugin,
} from '@/app/helper/chartjs';
import { generateChartData, getBorderColor, getChartColor } from '@/app/helper';
import { snowflakeLables } from '@/app/_assets/snowflakes';
import { ScoreData } from '@/app/_types/services';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  RadarController,
  Filler,
  stripedBackgroundPlugin,
  rotatePointLabelsPlugin,
);
interface Props {
  stripeColors?: string[];
  scoreData: ScoreData;
}

const Snowflake: FC<Props> = ({ scoreData }) => {
  const borderColor = useMemo(
    () => getBorderColor(scoreData.total),
    [scoreData.total],
  );
  const chartColor = useMemo(
    () => getChartColor(scoreData.total),
    [scoreData.total],
  );

  const chartData = useMemo(() => generateChartData(scoreData), [scoreData]);
  return (
    <div className='relative w-[14rem] top-3'>
      <Radar
        options={{
          maintainAspectRatio: false,
          responsive: true,
          backgroundColor: 'black',
          layout: { padding: { bottom: 10 } },
          scales: {
            r: {
              min: 0,
              max: 8,
              pointLabels: {
                color: 'rgba(255, 255, 255, 0)',
              },
              angleLines: {
                color: 'rgba(255, 255, 255, 0.1)',
                lineWidth: 3,
              },
              grid: {
                circular: true,
                display: false,
              },
              ticks: {
                display: false,
                color: 'rgba(255, 255, 255, 0.2)',
                stepSize: 7,
              },
            },
          },
          elements: {
            line: {
              tension: 0.5,
            },
            point: {
              radius: 0,
            },
          },
        }}
        data={{
          labels: snowflakeLables,
          datasets: [
            {
              backgroundColor: chartColor,
              borderColor: borderColor,
              borderWidth: 2,
              data: chartData,
            },
          ],
        }}
      />
    </div>
  );
};

export default Snowflake;
