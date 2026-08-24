import useEditorStore from '@/stores/useEditorStore';
import { COLOR_SNAP_LINE } from '@/constants/colors';

import type { SnapLinesProps } from './View.types';

const SnapLines = ({ horizontal, vertical }: SnapLinesProps) => {
  const camera = useEditorStore((state) => state.camera);
  const document = useEditorStore((state) => state.document);

  const strokeBase = {
    stroke: COLOR_SNAP_LINE,
    strokeWidth: 1 / camera.zoom,
  };

  return (
    <g data-export="exclude">
      {typeof horizontal === 'number' && (
        <line
          x1={-document.width * 5}
          y1={horizontal}
          x2={document.width * 5}
          y2={horizontal}
          {...strokeBase}
        />
      )}
      {typeof vertical === 'number' && (
        <line
          x1={vertical}
          y1={-document.height * 5}
          x2={vertical}
          y2={document.height * 5}
          {...strokeBase}
        />
      )}
    </g>
  );
};

export default SnapLines;
