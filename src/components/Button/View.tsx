import css from './View.module.scss';
import type { ButtonProps } from './View.types';

const Button = ({ className, size, variant, ...restProps }: ButtonProps) => {
  return (
    <button
      type="button"
      className={`${css.button} ${className}`}
      data-variant={variant}
      data-size={size}
      {...restProps}
    />
  );
};

export default Button;
