import { useState, type ChangeEvent } from 'react';

import Button from '@/components/Button';
import Select from '@/components/Select';
import { TARGET_SELECTION } from '@/constants';
import useEditorStore from '@/stores/useEditorStore';

import {
  ALIGN_H_LIST,
  ALIGN_V_LIST,
  DISTRIBUTE_LIST,
  TARGET_LIST,
} from './View.constants';
import css from './View.module.scss';

const Align = () => {
  const align = useEditorStore((state) => state.align);
  const distribute = useEditorStore((state) => state.distribute);

  const [target, setTarget] = useState(TARGET_SELECTION);

  const handleChangeTarget = (e: ChangeEvent<HTMLSelectElement>) => {
    setTarget(e.target.value);
  };

  return (
    <div className={css.align}>
      <div className={css.section}>
        {ALIGN_H_LIST.map((item) => (
          <Button
            key={item.value}
            type="button"
            title={item.title}
            onClick={() => align(item.value, target)}
          >
            {item.icon}
          </Button>
        ))}
      </div>

      <div className={css.section}>
        {ALIGN_V_LIST.map((item) => (
          <Button
            key={item.value}
            type="button"
            title={item.title}
            onClick={() => align(item.value, target)}
          >
            {item.icon}
          </Button>
        ))}
      </div>

      <div className={css.section}>
        {DISTRIBUTE_LIST.map((item) => (
          <Button
            key={item.value}
            type="button"
            title={item.title}
            onClick={() => distribute(item.value, target)}
          >
            {item.icon}
          </Button>
        ))}
      </div>

      <div className={css.section}>
        <p>to:</p>
        <Select
          className={css.targetSelect}
          name="target"
          options={TARGET_LIST}
          onChange={handleChangeTarget}
        />
      </div>
    </div>
  );
};

export default Align;
