import css from './View.module.scss';
import type { SelectProps } from './View.types';

const Select = ({ className, options, ...restProps }: SelectProps) => {
  return (
    <select className={`${css.selectModifier} ${className}`} {...restProps}>
      {options.map((item) => (
        <option key={item.value} value={item.value}>
          {item.text}
        </option>
      ))}
    </select>
  );
};

export default Select;
