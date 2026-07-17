import type { ChangeEvent } from 'react';

import useHistoryDebounce from '@/hooks/useHistoryDebounce';
import useEditorStore from '@/stores/useEditorStore';

import css from './View.module.scss';
import LayerOrder from './components/LayerOrder';
import Typography from './components/Typography';
import Section from './components/Section';
import TextField from '../TextField';

// TODO: bringToFront, bringForward, sendToBack, sendBackward multiselect support

const Properties = () => {
  const shapesById = useEditorStore((state) => state.shapesById);
  const selectedIds = useEditorStore((state) => state.selectedIds);
  const updateShape = useEditorStore((state) => state.updateShape);

  const [handlePushHistory] = useHistoryDebounce();

  if (!shapesById || !selectedIds.length || selectedIds.length > 1) return null;

  const selectedId = selectedIds[0];
  const shapeData = shapesById[selectedId];

  if (!shapeData) return null;
  const { name, x, y, width, height, rotation, fill, stroke, text } = shapeData;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const name = target.name;
    const type = target.type;

    let value: number | string = target.value;
    if (type === 'number') value = Number(value);

    handlePushHistory();
    updateShape(selectedId, { [name]: value });
  };

  return (
    <div className={css.properties}>
      <h3>Properties</h3>
      <div className={css.content}>
        <Section>
          <TextField
            className="full"
            value={name}
            name="name"
            placeholder="Shape name"
            maxLength={24}
            onChange={handleChange}
          />
        </Section>

        <LayerOrder />

        {text !== undefined && (
          <Typography shape={shapeData} onChange={handleChange} />
        )}

        <Section title="Position">
          <p>X</p>
          <TextField type="number" value={x} name="x" onChange={handleChange} />
          <p>Y</p>
          <TextField type="number" value={y} name="y" onChange={handleChange} />
        </Section>

        <Section title="Size">
          <p>W</p>
          <TextField
            type="number"
            value={width}
            name="width"
            min={1}
            onChange={handleChange}
          />
          <p>H</p>
          <TextField
            type="number"
            value={height}
            name="height"
            min={1}
            onChange={handleChange}
          />
        </Section>
        <Section title="Rotation">
          <p />
          <TextField
            type="number"
            value={rotation}
            name="rotation"
            onChange={handleChange}
          />
          <p>&deg;</p>
        </Section>
        <Section title="Fill">
          <p />
          <input
            type="color"
            value={fill}
            name="fill"
            data-type="string"
            onChange={handleChange}
          />
        </Section>
        <Section title="Stroke">
          <p />
          <input
            type="color"
            value={stroke === 'none' ? '#ffffff' : stroke}
            name="stroke"
            data-type="string"
            onChange={handleChange}
          />
        </Section>
      </div>
    </div>
  );
};

export default Properties;
