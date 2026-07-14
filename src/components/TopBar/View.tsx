import exportToPng from '@/utils/exportToPng';
import useEditorStore from '@/stores/useEditorStore';

import Button from '../Button';
import css from './View.module.scss';

const TopBar = () => {
  const document = useEditorStore((state) => state.document);
  const shapeIds = useEditorStore((state) => state.shapeIds);

  const handleExport = async () => {
    exportToPng(document.width, document.height);
  };

  return (
    <div className={css.topbar}>
      <h1 className={css.title}>IB</h1>

      <Button
        type="button"
        className={css.exportBtn}
        disabled={!shapeIds.length}
        onClick={handleExport}
      >
        Export to PNG
      </Button>
    </div>
  );
};

export default TopBar;
