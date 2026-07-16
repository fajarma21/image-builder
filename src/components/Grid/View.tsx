import { COLOR_CANVAS_OUTLINE } from '@/constants/colors';
import useEditorStore from '@/stores/useEditorStore';

const Grid = () => {
  const camera = useEditorStore((state) => state.camera);
  const document = useEditorStore((state) => state.document);
  const { horizontal, vertical } = document.grid;

  const gridHCount = document.width / horizontal;
  const gridVCount = document.height / vertical;

  const defaultProps = {
    stroke: COLOR_CANVAS_OUTLINE,
    strokeWidth: 1 / camera.zoom,
  };

  return (
    <g data-export="exclude">
      {[...Array(Math.ceil(gridHCount))].map((_, index) => {
        const x = (document.width / gridHCount) * index;
        return (
          !!index && (
            <line
              key={index}
              x1={x}
              y1={0}
              x2={x}
              y2={document.height}
              {...defaultProps}
            />
          )
        );
      })}
      {[...Array(Math.ceil(gridVCount))].map((_, index) => {
        const y = (document.height / gridVCount) * index;
        return (
          !!index && (
            <line
              key={index}
              x1={0}
              y1={y}
              x2={document.width}
              y2={y}
              {...defaultProps}
            />
          )
        );
      })}
    </g>
  );
};

export default Grid;
