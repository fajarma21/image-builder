import { RiEyeLine } from 'react-icons/ri';

import Button from '@/components/Button';

import css from './View.module.scss';
import type { LayerProps } from './View.types';

const Layer = ({ data, selected, onClick }: LayerProps) => {
  const { name } = data;

  return (
    <div
      className={css.layer}
      data-selected={selected || undefined}
      onClick={onClick}
    >
      <Button className={css.buttonModifier}>
        <RiEyeLine />
      </Button>
      <p>{name}</p>
    </div>
  );
};

export default Layer;
