import { type MouseEvent } from 'react';
import useEditorStore from '@/stores/useEditorStore';

import Layer from './components/Layer';
import css from './View.module.scss';

const Layers = () => {
  const shapesById = useEditorStore((state) => state.shapesById);
  const shapeIds = useEditorStore((state) => state.shapeIds);
  const selectedIds = useEditorStore((state) => state.selectedIds);
  const selectOnly = useEditorStore((state) => state.selectOnly);
  const toggleSelection = useEditorStore((state) => state.toggleSelection);

  const handleSelect = (e: MouseEvent<HTMLLIElement>, id: string) => {
    e.preventDefault();
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
              return (
                <Layer
                  key={id}
                  data={shapesById[id]}
                  selected={selectedIds.includes(id)}
                  onClick={(e) => handleSelect(e, id)}
                />
              );
            })
            .reverse()}
      </ul>
    </div>
  );
};

export default Layers;
