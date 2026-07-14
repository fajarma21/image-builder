import {
  RiBringForward,
  RiBringToFront,
  RiSendBackward,
  RiSendToBack,
} from 'react-icons/ri';
import {
  ORDER_BACKWARD,
  ORDER_FORWARD,
  ORDER_TO_BACK,
  ORDER_TO_FRONT,
} from '@/constants';

export const LAYER_ORDER_LIST = [
  {
    title: 'Bring to front',
    icon: <RiBringToFront />,
    value: ORDER_TO_FRONT,
  },
  {
    title: 'Bring forward',
    icon: <RiBringForward />,
    value: ORDER_FORWARD,
  },
  {
    title: 'Send to back',
    icon: <RiSendToBack />,
    value: ORDER_TO_BACK,
  },
  {
    title: 'Send backward',
    icon: <RiSendBackward />,
    value: ORDER_BACKWARD,
  },
];
