import Toolbar from './components/Toolbar';
import Viewport from './components/Viewport';
import ZoomHandle from './components/ZoomHandle';
import css from './View.module.scss';

const Center = () => {
  return (
    <div className={css.center}>
      <Toolbar />
      <Viewport />
      <ZoomHandle />
    </div>
  );
};

export default Center;
