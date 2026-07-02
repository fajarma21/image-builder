import Items from './components/Items';
import css from './View.module.scss';

const LeftBar = () => {
  return (
    <div className={css.leftbar}>
      <Items />
    </div>
  );
};

export default LeftBar;
