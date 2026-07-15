import { useState, type ChangeEvent, type FocusEvent } from 'react';

import css from './View.module.scss';
import type { TextFieldProps } from './View.types';

const TextField = ({
  className,
  value,
  onChange,
  onBlur,
  onFocus,
  ...restProps
}: TextFieldProps) => {
  const [textValue, setTextValue] = useState(value);
  const [focused, setFocused] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTextValue(e.target.value);

    if (onChange) onChange(e);
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    setFocused(false);

    if (onBlur) onBlur(e);
  };

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    setTextValue(value);
    setFocused(true);

    if (onFocus) onFocus(e);
  };

  return (
    <input
      className={`${css.inputModifier} ${className}`}
      value={focused ? textValue : value}
      onChange={handleChange}
      onBlur={handleBlur}
      onFocus={handleFocus}
      {...restProps}
    />
  );
};

export default TextField;
