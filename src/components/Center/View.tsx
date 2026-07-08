import Toolbar from './components/Toolbar';
import Viewport from './components/Viewport';
import css from './View.module.scss';

const Center = () => {
  return (
    <div className={css.center}>
      <Toolbar />
      <Viewport />
    </div>
  );
};

export default Center;
