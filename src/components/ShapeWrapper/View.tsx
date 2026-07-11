import ShapeControl from './components/ShapeControl';
import { COLOR_OUTLINE } from '@/constants/colors';
import { EDITING_TEXT } from '@/constants/interaction';
import useEditorStore from '@/stores/useEditorStore';
import ShapeOutline from '../ShapeOutline';

const ShapeWrapper = () => {
  const camera = useEditorStore((state) => state.camera);
  const interaction = useEditorStore((state) => state.interaction);
  const shapesById = useEditorStore((state) => state.shapesById);
  const selectedIds = useEditorStore((state) => state.selectedIds);

  const isSingleSelect = selectedIds.length === 1;
  const shape = shapesById![selectedIds[0]];
  const withControls = interaction.type !== EDITING_TEXT;
  const transformValue = `rotate(${shape.rotation} ${shape.x + shape.width / 2} ${shape.y + shape.height / 2})`;

  return (
    <g data-export="exclude">
      {/* SINGLE BOUNDING BOX */}
      {isSingleSelect && shape && (
        <rect
          x={shape.x}
          y={shape.y}
          width={shape.width}
          height={shape.height}
          fill="none"
          stroke={COLOR_OUTLINE}
          strokeWidth={1 / camera.zoom}
          transform={transformValue}
          data-bounding-box
        />
      )}

      {withControls && (
        <>
          {/* SELECTED */}
          {!!shapesById &&
            selectedIds.map((id) => (
              <ShapeOutline key={id} shape={shapesById[id]} />
            ))}

          {isSingleSelect && shape && (
            <g transform={transformValue} data-control>
              <ShapeControl shape={shape} />
            </g>
          )}
        </>
      )}
    </g>
  );
};

export default ShapeWrapper;
