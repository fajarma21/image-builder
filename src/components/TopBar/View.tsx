import exportToPng from '@/utils/exportToPng';
import useEditorStore from '@/stores/useEditorStore';

import Button from '../Button';
import css from './View.module.scss';
import DocumentSetting from './components/DocumentSetting';

const TopBar = () => {
  const document = useEditorStore((state) => state.document);
  const shapeIds = useEditorStore((state) => state.shapeIds);

  const handleExport = async () => {
    exportToPng(document.width, document.height);
  };

  return (
    <div className={css.topbar}>
      <div className={css.leftSide}>
        <div className={css.titleWrapper}>
          <h1 className={css.title}>IB</h1>
        </div>
        <DocumentSetting />
      </div>

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
