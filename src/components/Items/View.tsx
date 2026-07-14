import useEditorStore from '@/stores/useEditorStore';

import Button from '../Button';
import UploadImage from '../UploadImage';
import { ELEMENT_LIST } from './View.constants';
import css from './View.module.scss';

const Items = () => {
  const addShape = useEditorStore((state) => state.addShape);

  return (
    <div className={css.items}>
      <h3>Elements</h3>
      <div className={css.scrollable}>
        <div className={css.content}>
          {ELEMENT_LIST.map((item) => (
            <Button
              key={item.value}
              type="button"
              className={css.itemBtn}
              onClick={() => addShape(item.value)}
            >
              {item.icon}
              <p>{item.title}</p>
            </Button>
          ))}

          <UploadImage className={css.itemBtn} />
        </div>
      </div>
    </div>
  );
};

export default Items;
