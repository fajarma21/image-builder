import css from './View.module.scss';
import type { SectionProps } from './View.types';

const Section = ({ title, children }: SectionProps) => {
  return (
    <div className={css.section}>
      <p>{title}</p>
      <div className={css.row}>{children}</div>
    </div>
  );
};

export default Section;
