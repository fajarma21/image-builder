import useEditorStore from '@/stores/useEditorStore';

import Info from './components/Info';
import Toolbar from './components/Toolbar';
import css from './View.module.scss';
import Viewport from './components/Viewport';

const Center = () => {
  const document = useEditorStore((state) => state.document);

  return (
    <div className={css.center}>
      <Toolbar />
      <div className={css.wrapper}>
        <div className={css.inner} style={{ width: document.width }}>
          <Info />
          <Viewport />
        </div>
      </div>
    </div>
  );
};

export default Center;
