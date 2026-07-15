import { RiEyeLine } from 'react-icons/ri';

import Button from '@/components/Button';

import css from './View.module.scss';
import type { LayerProps } from './View.types';

const Layer = ({ data, selected, ...restProps }: LayerProps) => {
  const { name } = data;

  return (
    <li
      data-selected={selected || undefined}
      className={css.layer}
      {...restProps}
    >
      <Button className={css.buttonModifier}>
        <RiEyeLine />
      </Button>
      <p className={css.name}>{name}</p>
    </li>
  );
};

export default Layer;
