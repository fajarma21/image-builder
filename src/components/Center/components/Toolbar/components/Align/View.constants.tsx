import {
  RiAlignItemBottomLine,
  RiAlignItemHorizontalCenterLine,
  RiAlignItemLeftLine,
  RiAlignItemRightLine,
  RiAlignItemTopLine,
  RiAlignItemVerticalCenterLine,
  RiLayoutHorizontalLine,
  RiLayoutVerticalLine,
} from 'react-icons/ri';
import {
  ALIGN_BOTTOM,
  ALIGN_CENTER,
  ALIGN_LEFT,
  ALIGN_MIDDLE,
  ALIGN_RIGHT,
  ALIGN_TOP,
  DISTRIBUTE_H,
  DISTRIBUTE_V,
} from '@/constants';

export const ALIGN_H_LIST = [
  {
    title: 'Align left',
    value: ALIGN_LEFT,
    icon: <RiAlignItemLeftLine />,
  },
  {
    title: 'Align center',
    value: ALIGN_CENTER,
    icon: <RiAlignItemHorizontalCenterLine />,
  },
  {
    title: 'Align right',
    value: ALIGN_RIGHT,
    icon: <RiAlignItemRightLine />,
  },
];

export const ALIGN_V_LIST = [
  {
    title: 'Align top',
    value: ALIGN_TOP,
    icon: <RiAlignItemTopLine />,
  },
  {
    title: 'Align middle',
    value: ALIGN_MIDDLE,
    icon: <RiAlignItemVerticalCenterLine />,
  },
  {
    title: 'Align bottom',
    value: ALIGN_BOTTOM,
    icon: <RiAlignItemBottomLine />,
  },
];

export const DISTRIBUTE_LIST = [
  {
    title: 'Distribute horizontal',
    value: DISTRIBUTE_H,
    icon: <RiLayoutVerticalLine />,
  },
  {
    title: 'Distribute vertical',
    value: DISTRIBUTE_V,
    icon: <RiLayoutHorizontalLine />,
  },
];
