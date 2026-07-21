import { type InputHTMLAttributes } from 'react';

import css from './View.module.scss';
import InputNumber from '../InputNumber';

const InputRange = (props: InputHTMLAttributes<HTMLInputElement>) => {
  const { className, ...restProps } = props;

  return (
    <div className={`${css.wrapper} ${className}`}>
      <input className={css.range} type="range" {...restProps} />
      <InputNumber {...restProps} />
    </div>
  );
};

export default InputRange;
