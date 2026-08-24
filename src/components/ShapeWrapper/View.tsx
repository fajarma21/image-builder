import ShapeControl from './components/ShapeControl';
import { EDITING_TEXT } from '@/constants/interaction';
import useEditorStore from '@/stores/useEditorStore';
import ShapeOutline from '../ShapeOutline';

const ShapeWrapper = () => {
  const interaction = useEditorStore((state) => state.interaction);
  const shapesById = useEditorStore((state) => state.shapesById);
  const selectedIds = useEditorStore((state) => state.selectedIds);

  const isSingleSelect = selectedIds.length === 1;
  const shape = shapesById![selectedIds[0]];
  const withControls = interaction.type !== EDITING_TEXT;
  const transformValue = `rotate(${shape.rotation} ${shape.x + shape.width / 2} ${shape.y + shape.height / 2})`;

  return (
    <g data-export="exclude">
      {withControls && (
        <>
          {/* SELECTED */}
          {!!shapesById &&
            selectedIds.map((id) => {
              const shape = shapesById[id];
              return shape.show && <ShapeOutline key={id} shape={shape} />;
            })}

          {isSingleSelect && shape && shape.show && (
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
