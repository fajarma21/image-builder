import { RiEyeCloseLine, RiEyeLine } from 'react-icons/ri';

import Button from '@/components/Button';

import css from './View.module.scss';
import type { LayerProps } from './View.types';
import useEditorStore from '@/stores/useEditorStore';
import type { MouseEvent } from 'react';

const Layer = ({ data, selected, ...restProps }: LayerProps) => {
  const { id, name, show } = data;

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
      {...restProps}
    >
      <Button className={css.buttonModifier} onClick={toggleShow}>
        {show ? <RiEyeLine /> : <RiEyeCloseLine />}
      </Button>
      <p className={css.name} data-hide={!show || undefined}>
        {name}
      </p>
    </li>
  );
};

export default Layer;
