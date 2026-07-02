import Layers from './components/Layers';
import Properties from './components/Properties';
import css from './View.module.scss';

const RightBar = () => {
  return (
    <div className={css.rightbar}>
      <Layers />
      <Properties />
    </div>
  );
};

export default RightBar;
