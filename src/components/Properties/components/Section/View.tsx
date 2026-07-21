import css from './View.module.scss';
import type { SectionProps } from './View.types';

const Section = ({ inline, title, children }: SectionProps) => {
  return (
    <div className={css.section}>
      {!!title && <p>{title}</p>}
      <div className={css.row} data-inline={inline || undefined}>
        {children}
      </div>
    </div>
  );
};

export default Section;
