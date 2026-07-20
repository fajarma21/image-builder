import { useState, type ChangeEvent, type FocusEvent } from 'react';
import type { UseInputParams } from './index.types';

const useInput = ({ inputData, callback }: UseInputParams) => {
  const { autoFocus, value, onBlur, onChange, onFocus } = inputData;

  const [textValue, setTextValue] = useState(value);
  const [focused, setFocused] = useState(autoFocus);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    setTextValue(target.value);

    const newEvent = callback(e);

    if (onChange && newEvent) onChange(newEvent);
  };

  const handleInputBlur = (e: FocusEvent<HTMLInputElement>) => {
    setFocused(false);

    if (onBlur) onBlur(e);
  };

  const handleInputFocus = (e: FocusEvent<HTMLInputElement>) => {
    setTextValue(value);
    setFocused(true);

    if (onFocus) onFocus(e);
  };

  return {
    ...inputData,
    value: focused ? textValue : value,
    onBlur: handleInputBlur,
    onChange: handleInputChange,
    onFocus: handleInputFocus,
  };
};

export default useInput;
