import Align from './components/Align';
import History from './components/History';
import css from './View.module.scss';

const Toolbar = () => {
  return (
    <div className={css.toolbar}>
      <History />
      <Align />
    </div>
  );
};

export default Toolbar;
