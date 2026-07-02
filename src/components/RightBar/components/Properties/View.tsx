import type { ChangeEvent } from 'react';

import useEditorStore from '@/stores/useEditorStore';

import { valueChecker } from './View.helpers';
import css from './View.module.scss';
import useHistoryDebounce from '@/hooks/useHistoryDebounce';

// TODO: bringToFront, bringForward, sendToBack, sendBackward multiselect support

const Properties = () => {
  const shapesById = useEditorStore((state) => state.shapesById);
  const selectedIds = useEditorStore((state) => state.selectedIds);
  const updateShape = useEditorStore((state) => state.updateShape);
  const bringToFront = useEditorStore((state) => state.bringToFront);
  const bringForward = useEditorStore((state) => state.bringForward);
  const sendToBack = useEditorStore((state) => state.sendToBack);
  const sendBackward = useEditorStore((state) => state.sendBackward);

  const [handlePushHistory] = useHistoryDebounce();

  if (!shapesById || !selectedIds.length || selectedIds.length > 1) return null;

  const selectedId = selectedIds[0];
  const shapeData = shapesById[selectedId];

  if (!shapeData) return null;
  const { x, y, width, height, rotation, fill, stroke, text, fontSize } =
    shapeData;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    const type = target.dataset.type;

    let data: Record<string, unknown> = { [name]: value };
    if (!type) {
      const num = Number(value);
      if (Number.isNaN(num)) return;

      const min = Number(target.min) || undefined;
      const max = Number(target.max) || undefined;
      data = { [name]: valueChecker(num, min, max) };
    }

    handlePushHistory();
    updateShape(selectedId, data);
  };

  return (
    <div className={css.properties}>
      <h3>PROPERTIES</h3>
      <div className={css.content}>
        <div className={css.section}>
          <p>Layer Order</p>
          <div className={css.row}>
            <button type="button" onClick={() => bringToFront(selectedId)}>
              Bring to front
            </button>
            <button type="button" onClick={() => bringForward(selectedId)}>
              Bring forward
            </button>
            <button type="button" onClick={() => sendToBack(selectedId)}>
              Send to back
            </button>
            <button type="button" onClick={() => sendBackward(selectedId)}>
              Send backward
            </button>
          </div>
        </div>

        {text !== undefined && (
          <div className={css.section}>
            <p>TEXT</p>
            <div className={css.row}>
              <p>Size</p>
              <input
                type="number"
                value={fontSize}
                name="fontSize"
                onChange={handleChange}
              />
            </div>
          </div>
        )}
        <div className={css.section}>
          <p>Position</p>
          <div className={css.row}>
            <p>X</p>
            <input type="number" value={x} name="x" onChange={handleChange} />
            <p>Y</p>
            <input type="number" value={y} name="y" onChange={handleChange} />
          </div>
        </div>
        <div className={css.section}>
          <p>Size</p>
          <div className={css.row}>
            <p>W</p>
            <input
              type="number"
              value={width}
              name="width"
              min={20}
              onChange={handleChange}
            />
            <p>H</p>
            <input
              type="number"
              value={height}
              name="height"
              min={20}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={css.section}>
          <p>Rotation</p>
          <div className={css.row}>
            <p />
            <input
              type="number"
              value={rotation}
              name="rotation"
              max={360}
              min={-360}
              onChange={handleChange}
            />
            <p>&deg;</p>
          </div>
        </div>
        <div className={css.section}>
          <p>Fill</p>
          <div className={css.row}>
            <p />
            <input
              type="color"
              value={fill}
              name="fill"
              data-type="string"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={css.section}>
          <p>Stroke</p>
          <div className={css.row}>
            <p />
            <input
              type="color"
              value={stroke === 'none' ? '#ffffff' : stroke}
              name="stroke"
              data-type="string"
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Properties;
