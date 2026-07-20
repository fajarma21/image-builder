import { type InputHTMLAttributes } from 'react';

import css from './View.module.scss';

const Input = ({
  autoComplete = 'off',
  className,
  type = 'text',
  ...restProps
}: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      className={`${css.inputModifier} ${className}`}
      autoComplete={autoComplete}
      type={type}
      {...restProps}
    />
  );
};

export default Input;
