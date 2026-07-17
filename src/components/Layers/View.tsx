import { type MouseEvent } from 'react';
import useEditorStore from '@/stores/useEditorStore';
import type { Shape } from '@/types/shape';

import Layer from './components/Layer';
import css from './View.module.scss';

const Layers = () => {
  const shapesById = useEditorStore((state) => state.shapesById);
  const shapeIds = useEditorStore((state) => state.shapeIds);
  const selectedIds = useEditorStore((state) => state.selectedIds);
  const selectOnly = useEditorStore((state) => state.selectOnly);
  const toggleSelection = useEditorStore((state) => state.toggleSelection);

  const handleSelect = (e: MouseEvent<HTMLLIElement>, { id, show }: Shape) => {
    e.preventDefault();

    if (!show) return;

    if (e.shiftKey) toggleSelection(id);
    else selectOnly(id);
  };

  return (
    <div className={css.layers}>
      <h3>Layers</h3>
      <ul className={css.content}>
        {shapesById &&
          shapeIds
            .map((id) => {
              const shape = shapesById[id];
              return (
                <Layer
                  key={id}
                  data={shape}
                  selected={selectedIds.includes(id)}
                  onClick={(e) => handleSelect(e, shape)}
                />
              );
            })
            .reverse()}
      </ul>
    </div>
  );
};

export default Layers;
