import type { ChangeEvent } from 'react';

import useHistoryDebounce from '@/hooks/useHistoryDebounce';
import useEditorStore from '@/stores/useEditorStore';

import Input from '../Inputs/Input';
import InputNumber from '../Inputs/InputNumber';
import InputColor from '../Inputs/InputColor';
import LayerOrder from './components/LayerOrder';
import Typography from './components/Typography';
import Section from './components/Section';
import css from './View.module.scss';

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
  const {
    name,
    x,
    y,
    width,
    height,
    rotation,
    fill,
    fillOpacity,
    stroke,
    strokeOpacity,
    text,
  } = shapeData;

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
        <Section title="Position">
          <Input
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

        <Section inline title="Position">
          <p>X</p>
          <InputNumber value={x} name="x" onChange={handleChange} />
          <p>Y</p>
          <InputNumber value={y} name="y" onChange={handleChange} />
        </Section>

        <Section inline title="Size">
          <p>W</p>
          <InputNumber
            value={width}
            name="width"
            min={1}
            onChange={handleChange}
          />
          <p>H</p>
          <InputNumber
            value={height}
            name="height"
            min={1}
            onChange={handleChange}
          />
        </Section>
        <Section inline title="Rotation">
          <p />
          <InputNumber
            value={rotation}
            name="rotation"
            onChange={handleChange}
          />
          <p>&deg;</p>
        </Section>
        <Section title="Fill">
          <p />
          <InputColor
            colorEvent={{
              value: fill,
              name: 'fill',
              onChange: handleChange,
            }}
            opacityEvent={{
              value: fillOpacity,
              name: 'fillOpacity',
              onChange: handleChange,
            }}
          />
        </Section>
        <Section title="Stroke">
          <p />
          <InputColor
            colorEvent={{
              value: stroke,
              name: 'stroke',
              onChange: handleChange,
            }}
            opacityEvent={{
              value: strokeOpacity,
              name: 'strokeOpacity',
              onChange: handleChange,
            }}
          />
        </Section>
      </div>
    </div>
  );
};

export default Properties;
