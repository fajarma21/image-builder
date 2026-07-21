import Input from '../Input';
import useInput from '@/hooks/useInput';
import modifyEventTarget from '@/utils/modifyEventTarget';

import InputRange from '../InputRange';
import css from './View.module.scss';
import type { InputColorProps } from './View.types';

const InputColor = ({ colorEvent, opacityEvent }: InputColorProps) => {
  const { className, value, ...restColorProps } = colorEvent;

  const opacityHandlers = useInput({
    inputData: opacityEvent,
    callback: (e) => {
      const target = e.target;
      const clonedTarget = modifyEventTarget(
        target,
        String(Number(target.value) / 100),
      );
      return { ...e, target: clonedTarget };
    },
  });

  return (
    <div>
      <div className={`${css.colorPicker} ${className}`}>
        <input
          data-color
          type="color"
          value={value || '#000000'}
          {...restColorProps}
        />
        <Input
          data-color-text
          value={value}
          {...restColorProps}
          disabled={!value}
        />
      </div>
      <InputRange
        {...opacityHandlers}
        className={`${css.opacityGroup} ${opacityEvent.className}`}
        disabled={!value}
        name={opacityEvent.name}
        min={0}
        max={100}
        value={(Number(opacityEvent.value) * 100).toFixed()}
      />
    </div>
  );
};

export default InputColor;
