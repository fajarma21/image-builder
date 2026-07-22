import { RiCircleLine, RiSquareLine, RiText } from 'react-icons/ri';

import { SHAPE_ELLIPSE, SHAPE_RECT, SHAPE_TEXT } from '@/constants/shape';

export const ELEMENT_LIST = [
  {
    icon: <RiSquareLine size={48} />,
    value: SHAPE_RECT,
    title: 'Rectangle',
  },
  {
    icon: <RiCircleLine size={48} />,
    value: SHAPE_ELLIPSE,
    title: 'Circle',
  },
  {
    icon: <RiText size={48} />,
    value: SHAPE_TEXT,
    title: 'Text',
  },
] as const;
