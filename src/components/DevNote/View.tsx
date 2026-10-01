import { RiExternalLinkLine, RiHammerLine } from 'react-icons/ri';
import css from './View.module.scss';

const DevNote = () => {
  return (
    <div className={css.container}>
      <RiHammerLine size={60} />
      <div className={css.content}>
        <b>Under development</b>
        <p>This project is still in progress.</p>
        <a href="" target="_blank">
          check github repo <RiExternalLinkLine />
        </a>
      </div>
    </div>
  );
};

export default DevNote;
