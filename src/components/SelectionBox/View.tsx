import { COLOR_OUTLINE } from '@/constants/colors';
import useEditorStore from '@/stores/useEditorStore';
import type { Bounds } from '@/types';

const SelectionBox = ({
  centerX,
  centerY,
  left,
  right,
  bottom,
  top,
}: Bounds) => {
  const camera = useEditorStore((state) => state.camera);

  return (
    <g data-export="exclude">
      <circle
        cx={centerX}
        cy={centerY}
        r={1 / camera.zoom}
        fill={COLOR_OUTLINE}
      />
      <rect
        x={left}
        y={top}
        width={right - left}
        height={bottom - top}
        fill="none"
        stroke={COLOR_OUTLINE}
        strokeWidth={1 / camera.zoom}
      />
    </g>
  );
};

export default SelectionBox;
