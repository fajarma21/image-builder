import Button from '@/components/Button';
import useEditorStore from '@/stores/useEditorStore';

import css from './View.module.scss';
import { ALIGN_H_LIST, ALIGN_V_LIST, DISTRIBUTE_LIST } from './View.constants';

const Align = () => {
  const align = useEditorStore((state) => state.align);
  const distribute = useEditorStore((state) => state.distribute);

  return (
    <div className={css.align}>
      <div className={css.section}>
        {ALIGN_H_LIST.map((item) => (
          <Button
            key={item.value}
            type="button"
            title={item.title}
            onClick={() => align(item.value)}
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
            onClick={() => align(item.value)}
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
            onClick={() => distribute(item.value)}
          >
            {item.icon}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Align;
