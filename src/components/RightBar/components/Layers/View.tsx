import type { MouseEvent } from 'react';
import useEditorStore from '@/stores/useEditorStore';

import css from './View.module.scss';

const Layers = () => {
  const shapesById = useEditorStore((state) => state.shapesById);
  const shapeIds = useEditorStore((state) => state.shapeIds);
  const selectedIds = useEditorStore((state) => state.selectedIds);
  const selectOnly = useEditorStore((state) => state.selectOnly);
  const toggleSelection = useEditorStore((state) => state.toggleSelection);

  const handleSelect = (e: MouseEvent<HTMLDivElement>, id: string) => {
    e.preventDefault();
    if (e.shiftKey) toggleSelection(id);
    else selectOnly(id);
  };

  return (
    <div className={css.layers}>
      <h3>LAYERS</h3>
      <div className={css.content}>
        {shapesById &&
          shapeIds
            .map((id) => {
              return (
                <div
                  key={id}
                  className={css.list}
                  data-selected={selectedIds.includes(id) || undefined}
                  onClick={(e) => handleSelect(e, id)}
                >
                  <p>{shapesById[id].name}</p>
                </div>
              );
            })
            .reverse()}
      </div>
    </div>
  );
};

export default Layers;
