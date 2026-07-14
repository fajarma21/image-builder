import type { ButtonHTMLAttributes } from 'react';

import css from './View.module.scss';

const Button = ({
  className,
  ...restProps
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      type="button"
      className={`${css.button} ${className}`}
      {...restProps}
    />
  );
};

export default Button;
