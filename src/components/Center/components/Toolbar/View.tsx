import useEditorStore from '@/stores/useEditorStore';
import Align from './components/Align';
import History from './components/History';
import css from './View.module.scss';

const Toolbar = () => {
  const selectedIds = useEditorStore((state) => state.selectedIds);

  return (
    <div className={css.toolbar}>
      <History />
      {!!selectedIds.length && <Align />}
    </div>
  );
};

export default Toolbar;
