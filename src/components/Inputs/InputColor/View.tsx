import { type ChangeEvent, type InputHTMLAttributes } from 'react';

import useInput from '@/hooks/useInput';

import Input from '../Input';
import { isValidHex, normalizeColor } from './View.helpers';
import css from './View.module.scss';

const InputColor = (props: InputHTMLAttributes<HTMLInputElement>) => {
  const { value = '#ffffff', onChange } = props;

  const validation = (e: ChangeEvent<HTMLInputElement>) => {
    if (!isValidHex(e.target.value)) return;
    return e;
  };

  const { className, type, ...restProps } = useInput({
    inputData: { ...props, value },
    callback: validation,
  });
  void type;

  return (
    <div className={css.colorPicker}>
      <input
        {...restProps}
        type="color"
        value={normalizeColor(value)}
        onChange={onChange}
      />
      <Input className={`${css.textColor} ${className}`} {...restProps} />
    </div>
  );
};

export default InputColor;
