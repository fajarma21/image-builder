import exportToPng from '@/utils/exportToPng';
import useEditorStore from '@/stores/useEditorStore';

import css from './View.module.scss';

const TopBar = () => {
  const settings = useEditorStore((state) => state.settings);
  const shapeIds = useEditorStore((state) => state.shapeIds);
  const past = useEditorStore((state) => state.past);
  const future = useEditorStore((state) => state.future);
  const undo = useEditorStore((state) => state.undo);
  const redo = useEditorStore((state) => state.redo);

  const handleExport = async () => {
    exportToPng(settings.width, settings.height);
  };

  return (
    <div className={css.topbar}>
      <h1 className={css.title}>Image Builder</h1>

      <div>
        <button type="button" disabled={!past.length} onClick={undo}>
          {'<-'}
        </button>
        <button type="button" disabled={!future.length} onClick={redo}>
          {'->'}
        </button>
      </div>
      <button type="button" disabled={!shapeIds.length} onClick={handleExport}>
        Export to PNG
      </button>
    </div>
  );
};

export default TopBar;
