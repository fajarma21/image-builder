import Rectangle from '@/components/Rectangle';
import Ellipse from '@/components/Ellipse';
import {
  SHAPE_ELLIPSE,
  SHAPE_IMAGE,
  SHAPE_RECT,
  SHAPE_TEXT,
} from '@/constants';
import { COLOR_OUTLINE } from '@/constants/colors';

import css from './View.module.scss';
import type { ShapeOutlineProps } from './View.types';

const ShapeOutline = (props: ShapeOutlineProps) => {
  const { shape } = props;
  const { x, y, fontSize, text } = shape;
  const outlineProps = {
    fill: 'none',
    stroke: COLOR_OUTLINE,
  };

  const renderOutline = () => {
    switch (shape.type) {
      case SHAPE_RECT:
        return <Rectangle shape={shape} {...outlineProps} />;
      case SHAPE_ELLIPSE:
        return <Ellipse shape={shape} {...outlineProps} />;
      case SHAPE_TEXT:
        return (
          <text
            x={x}
            y={y}
            fontSize={fontSize}
            dominantBaseline="hanging"
            {...outlineProps}
          >
            {text}
          </text>
        );
      case SHAPE_IMAGE:
        return <Rectangle shape={shape} {...outlineProps} />;
      default:
        return null;
    }
  };

  return (
    <g data-outline className={css.outline}>
      {renderOutline()}
    </g>
  );
};

export default ShapeOutline;
