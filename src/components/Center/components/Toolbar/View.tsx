import useEditorStore from '@/stores/useEditorStore';

import css from './View.module.scss';
import { ALIGN_H_LIST, ALIGN_V_LIST, DISTRIBUTE_LIST } from './View.constants';

const Toolbar = () => {
  const align = useEditorStore((state) => state.align);
  const distribute = useEditorStore((state) => state.distribute);

  return (
    <div className={css.toolbar}>
      <div>
        {ALIGN_H_LIST.map((item) => (
          <button
            key={item.value}
            type="button"
            onClick={() => align(item.value)}
          >
            {item.title}
          </button>
        ))}
      </div>

      <div>
        {ALIGN_V_LIST.map((item) => (
          <button
            key={item.value}
            type="button"
            onClick={() => align(item.value)}
          >
            {item.title}
          </button>
        ))}
      </div>

      <div>
        {DISTRIBUTE_LIST.map((item) => (
          <button
            key={item.value}
            type="button"
            onClick={() => distribute(item.value)}
          >
            {item.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Toolbar;
