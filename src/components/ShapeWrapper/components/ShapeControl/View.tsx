import { COLOR_OUTLINE } from '@/constants/colors';
import { RESIZING, ROTATING } from '@/constants/interaction';
import useEditorStore from '@/stores/useEditorStore';

import type { ShapeControlProps } from './View.types';

const ShapeControl = ({ shape }: ShapeControlProps) => {
  const startInteraction = useEditorStore((state) => state.startInteraction);

  const { x, y, width, height } = shape;
  const centerX = x + width / 2;
  const centerY = y + height / 2;

  return (
    <>
      {/* RESIZE */}
      <rect
        x={x + width - 4}
        y={y + height - 4}
        width={8}
        height={8}
        fill="white"
        stroke={COLOR_OUTLINE}
        onMouseDown={(e) =>
          startInteraction(RESIZING, e.clientX, e.clientY, shape)
        }
      />

      {/* ROTATE */}
      <line
        x1={centerX}
        y1={y}
        x2={centerX}
        y2={y - 30}
        stroke={COLOR_OUTLINE}
      />
      <circle
        cx={centerX}
        cy={y - 30}
        r={6}
        fill="white"
        stroke={COLOR_OUTLINE}
        onMouseDown={(e) =>
          startInteraction(ROTATING, e.clientX, e.clientY, shape)
        }
      />

      {/* CENTER */}
      <circle
        cx={centerX}
        cy={centerY}
        r={1}
        fill={COLOR_OUTLINE}
        stroke={COLOR_OUTLINE}
      />
    </>
  );
};

export default ShapeControl;
