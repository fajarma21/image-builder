import { type ChangeEvent } from 'react';

import useInput from '@/hooks/useInput';
import modifyEventTarget from '@/utils/modifyEventTarget';

import valueChecker from './utils/valueChecker';
import Input from '../Input';
import type { InputNumberProps } from './View.types';

const InputNumber = ({ noDecimal, ...props }: InputNumberProps) => {
  const validation = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target;

    const value = target.value;

    let num = Number(value);
    if (Number.isNaN(num)) return;
    if (noDecimal) num = Math.round(num);

    const min = Number(target.min) || undefined;
    const max = Number(target.max) || undefined;
    const newValue = String(valueChecker(num, min, max));

    const clonedTarget = modifyEventTarget(target, newValue, 'number');

    return { ...e, target: clonedTarget };
  };

  const { className, type, ...restProps } = useInput({
    inputData: props,
    callback: validation,
  });
  void type;

  return <Input className={className} {...restProps} />;
};

export default InputNumber;
