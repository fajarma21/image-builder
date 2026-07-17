import { useState, type ChangeEvent, type FocusEvent } from 'react';

import css from './View.module.scss';
import type { TextFieldProps } from './View.types';
import { valueChecker } from './View.helpers';

const TextField = ({
  autoComplete = 'off',
  className,
  value,
  type = 'text',
  onChange,
  onBlur,
  onFocus,
  ...restProps
}: TextFieldProps) => {
  const [textValue, setTextValue] = useState(value);
  const [focused, setFocused] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    setTextValue(target.value);

    let clonedTarget = target;
    let value = target.value;

    if (type === 'number') {
      const num = Number(value);
      if (Number.isNaN(num)) return;

      const min = Number(target.min) || undefined;
      const max = Number(target.max) || undefined;
      value = String(valueChecker(num, min, max));

      clonedTarget = target.cloneNode(true) as HTMLInputElement;
      clonedTarget.type = type;
      clonedTarget.value = value;
    }

    if (onChange) onChange({ ...e, target: clonedTarget });
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
      type="text"
      value={focused ? textValue : value}
      autoComplete={autoComplete}
      className={`${css.inputModifier} ${className}`}
      onChange={handleChange}
      onBlur={handleBlur}
      onFocus={handleFocus}
      {...restProps}
    />
  );
};

export default TextField;
