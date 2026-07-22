import Ellipse from '@/components/Ellipse';
import Rectangle from '@/components/Rectangle';
import {
  SHAPE_ELLIPSE,
  SHAPE_IMAGE,
  SHAPE_RECT,
  SHAPE_TEXT,
} from '@/constants/shape';

import Image from './components/Image';
import Text from './components/Text';
import type { ShapeRendererProps } from './View.types';

const ShapeRenderer = (props: ShapeRendererProps) => {
  const { shape } = props;
  const { type, x, y, width, height, rotation } = shape;

  const renderShape = () => {
    switch (type) {
      case SHAPE_RECT:
        return <Rectangle {...props} />;
      case SHAPE_ELLIPSE:
        return <Ellipse {...props} />;
      case SHAPE_TEXT:
        return <Text {...props} />;
      case SHAPE_IMAGE:
        return <Image {...props} />;
      default:
        return null;
    }
  };

  return (
    <g
      transform={`
    rotate(
      ${rotation}
      ${x + width / 2}
      ${y + height / 2}
    )
  `}
    >
      {renderShape()}
    </g>
  );
};

export default ShapeRenderer;
