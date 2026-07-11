import type { MouseEvent } from 'react';

import { COLOR_OUTLINE } from '@/constants/colors';
import { RESIZING, ROTATING } from '@/constants/interaction';
import useEditorStore from '@/stores/useEditorStore';

import type { ShapeControlProps } from './View.types';

const ShapeControl = ({ shape }: ShapeControlProps) => {
  const camera = useEditorStore((state) => state.camera);
  const { zoom } = camera;
  const startInteraction = useEditorStore((state) => state.startInteraction);

  const { x, y, width, height } = shape;
  const centerX = x + width / 2;
  const centerY = y + height / 2;

  const outlineProps = {
    fill: 'none',
    stroke: COLOR_OUTLINE,
    strokeWidth: 1 / zoom,
  };

  const resizeHandleSize = 8 / zoom;
  const rotateHandleSize = 6 / zoom;
  const rotateHandleOffset = 30 / zoom;

  const handleStartResize = (e: MouseEvent) => {
    startInteraction({
      type: RESIZING,
      mouseX: e.clientX,
      mouseY: e.clientY,
      shape,
    });
  };

  const handleStartRotate = (e: MouseEvent) => {
    startInteraction({
      type: ROTATING,
      mouseX: e.clientX,
      mouseY: e.clientY,
      shape,
    });
  };

  return (
    <>
      {/* RESIZE */}
      <rect
        x={x + width - resizeHandleSize / 2}
        y={y + height - resizeHandleSize / 2}
        width={resizeHandleSize}
        height={resizeHandleSize}
        {...outlineProps}
        fill="white"
        onMouseDown={handleStartResize}
      />

      {/* ROTATE */}
      <line
        x1={centerX}
        y1={y}
        x2={centerX}
        y2={y - rotateHandleOffset}
        {...outlineProps}
      />
      <circle
        cx={centerX}
        cy={y - rotateHandleOffset}
        r={rotateHandleSize}
        {...outlineProps}
        fill="white"
        onMouseDown={handleStartRotate}
      />

      {/* CENTER */}
      <circle
        cx={centerX}
        cy={centerY}
        r={1 / zoom}
        {...outlineProps}
        fill={COLOR_OUTLINE}
      />
    </>
  );
};

export default ShapeControl;
