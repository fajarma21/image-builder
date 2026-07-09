import { MARQUEE } from '@/constants/interaction';
import useEditorStore from '@/stores/useEditorStore';
import normalizeRect from '@/utils/normalizeRect';

import { MARQUEE_FILL, MARQUEE_STROKE } from './View.constants';

const MarqueeRect = () => {
  const camera = useEditorStore((state) => state.camera);
  const interaction = useEditorStore((state) => state.interaction);

  if (interaction.type !== MARQUEE) return null;
  const { top, left, width, height } = normalizeRect(interaction);

  if (!width || !height) return null;
  return (
    <rect
      x={left}
      y={top}
      width={width}
      height={height}
      fill={MARQUEE_FILL}
      stroke={MARQUEE_STROKE}
      strokeWidth={1 / camera.zoom}
      strokeDasharray={`${4 / camera.zoom} ${4 / camera.zoom}`}
    />
  );
};

export default MarqueeRect;
