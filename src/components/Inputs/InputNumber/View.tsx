import { type ChangeEvent, type InputHTMLAttributes } from 'react';

import useInput from '@/hooks/useInput';
import modifyEventTarget from '@/utils/modifyEventTarget';

import Input from '../Input';
import { valueChecker } from './View.helpers';

const InputNumber = (props: InputHTMLAttributes<HTMLInputElement>) => {
  const validation = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target;

    const value = target.value;

    const num = Number(value);
    if (Number.isNaN(num)) return;

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
