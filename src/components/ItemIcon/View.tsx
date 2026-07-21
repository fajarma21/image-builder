import {
  RiCircleLine,
  RiImage2Line,
  RiSquareLine,
  RiText,
} from 'react-icons/ri';

import {
  SHAPE_ELLIPSE,
  SHAPE_IMAGE,
  SHAPE_RECT,
  SHAPE_TEXT,
} from '@/constants';

import type { ItemIconProps } from './View.types';

const SIZE = 20;

const ItemIcon = ({ type }: ItemIconProps) => {
  switch (type) {
    case SHAPE_RECT:
      return <RiSquareLine size={SIZE} />;
    case SHAPE_ELLIPSE:
      return <RiCircleLine size={SIZE} />;
    case SHAPE_TEXT:
      return <RiText size={SIZE} />;
    case SHAPE_IMAGE:
      return <RiImage2Line size={SIZE} />;

    default:
      return null;
  }
};

export default ItemIcon;
