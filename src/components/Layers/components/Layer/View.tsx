import type { MouseEvent } from 'react';
import { RiEyeCloseLine, RiEyeLine } from 'react-icons/ri';

import ItemIcon from '@/components/ItemIcon';
import Button from '@/components/Button';
import useEditorStore from '@/stores/useEditorStore';

import css from './View.module.scss';
import type { LayerProps } from './View.types';

const Layer = ({ data, selected, ...restProps }: LayerProps) => {
  const { id, name, show, type } = data;

  const updateShape = useEditorStore((state) => state.updateShape);
  const toggleSelection = useEditorStore((state) => state.toggleSelection);

  const toggleShow = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (show && selected) toggleSelection(id);

    updateShape(id, { show: !show });
  };

  return (
    <li
      data-selected={selected || undefined}
      className={css.layer}
      data-hide={!show || undefined}
      {...restProps}
    >
      <ItemIcon type={type} />
      <p className={css.name}>{name}</p>
      <Button className={css.buttonModifier} onClick={toggleShow}>
        {show ? <RiEyeLine /> : <RiEyeCloseLine />}
      </Button>
    </li>
  );
};

export default Layer;
