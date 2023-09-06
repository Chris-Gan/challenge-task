'use client';
import {
  Chart,
  Chart as ChartJS,
  Filler,
  FontSpec,
  LineElement,
  PointElement,
  RadarController,
  RadialLinearScale,
  RadialLinearScaleOptions,
} from 'chart.js';

import {
  addRoundedRectPath,
  isNullOrUndef,
  renderText,
  toFont,
  toPadding,
  toTRBLCorners,
} from 'chart.js/helpers';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  RadarController,
  Filler,
);

declare module 'chart.js' {
  export interface PointLabelItem {
    x: number;
    y: number;
    left: number;
    right: number;
    top: number;
    bottom: number;
  }

  type SetContextFunction = (
    context: PointLabelItem,
  ) => RadialLinearScaleOptions['pointLabels'];

  export interface Scale {
    xCenter: number;
    yCenter: number;
    drawingArea: number;
    _pointLabelItems: PointLabelItem[];
    _pointLabels: string[];
    options: {
      setContext: SetContextFunction;
    };
  }
}
export const stripedBackgroundPlugin = {
  id: 'stripedBackground',
  beforeDraw: function (chart: Chart) {
    const stripeColors = ['#334155', '#64748b'];
    const ctx = chart.ctx;
    const chartArea = chart.chartArea;

    const numOfSpirals = chart.scales.r.max - chart.scales.r.min - 1;
    if (!chartArea || !ctx) {
      return;
    }

    const centerX = chart.scales.r.xCenter;
    const centerY = chart.scales.r.yCenter;

    const maxRadius = chart.scales.r.drawingArea;
    const startingRadius = maxRadius % numOfSpirals;
    const stripeWidth = (maxRadius - startingRadius) / numOfSpirals;

    ctx.save();

    let offset = 0;
    for (let i = 0; i + stripeWidth < maxRadius; i += stripeWidth) {
      ctx.beginPath();
      if (i === 0) {
        ctx.arc(
          centerX,
          centerY,
          i + stripeWidth + startingRadius + offset,
          0,
          2 * Math.PI,
          false,
        );
        offset = startingRadius;
      } else {
        ctx.arc(
          centerX,
          centerY,
          i + stripeWidth + offset,
          0,
          2 * Math.PI,
          false,
        );
      }
      ctx.arc(centerX, centerY, i + offset, 2 * Math.PI, 0, true);
      ctx.closePath();
      ctx.fillStyle = stripeColors[(i / stripeWidth) % stripeColors.length];
      ctx.fill();
    }

    ctx.restore();
  },
};

export const rotatePointLabelsPlugin = {
  id: 'rotatePointLabels',

  afterDraw(scale: Chart) {
    const labelCount = scale.scales.r._pointLabelItems.length;
    const DEBUG = false;
    const { ctx, options } = scale;

    for (let i = labelCount - 1; i >= 0; i--) {
      const rotationDegree = i * 72;
      const rotationRadian = (rotationDegree * Math.PI) / 180;

      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
      const optsAtIndex = (options as any).setContext(
        scale.scales.r._pointLabelItems[i],
      ) as RadialLinearScaleOptions['pointLabels'];
      const plFont = toFont(optsAtIndex.font as FontSpec);
      ctx.font = `${plFont.size}px ${plFont.family}`;

      const { x, y, left, top, right, bottom } =
        scale.scales.r._pointLabelItems[i];
      const { backdropColor } = optsAtIndex;
      plFont.size = 6;

      const origin: { x: number; y: number } = {
        x,
        y: y + plFont.lineHeight / 2,
      };

      ctx.save();

      ctx.translate(origin.x, origin.y);
      ctx.rotate(rotationRadian);

      const padding = toPadding(optsAtIndex.backdropPadding as number);

      if (!isNullOrUndef(backdropColor)) {
        const borderRadius = toTRBLCorners(optsAtIndex.borderRadius as number);

        ctx.fillStyle = backdropColor as string;

        const backdropWidth = right - left + padding.width;
        const backdropHeight = bottom - top + padding.height;
        const backdropLeft = -backdropWidth / 2 - padding.left;
        const backdropTop = -backdropHeight / 2 - padding.top;

        if (Object.values(borderRadius).some((v) => v !== 0)) {
          ctx.beginPath();
          addRoundedRectPath(ctx, {
            x: backdropLeft,
            y: backdropTop,
            w: backdropWidth,
            h: backdropHeight,
            radius: borderRadius,
          });
          ctx.fill();
        } else {
          ctx.fillRect(
            backdropLeft,
            backdropTop,
            backdropWidth,
            backdropHeight,
          );
        }
      }

      renderText(
        ctx,
        scale.scales.r._pointLabels[i],
        -padding.left,
        -padding.top,
        plFont,
        {
          color: '#ffffff',
          textAlign: 'center',
          textBaseline: 'middle',
        },
      );

      if (DEBUG) {
        ctx.fillStyle = 'hsla(180, 100%, 80%, 0.667)';
        ctx.beginPath();
        ctx.arc(0, 0, 30, 0, 2 * Math.PI);
        ctx.fill();
      }

      ctx.restore();
    }
  },
};
