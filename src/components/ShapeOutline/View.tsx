import Rectangle from '@/components/Rectangle';
import Ellipse from '@/components/Ellipse';
import {
  SHAPE_ELLIPSE,
  SHAPE_IMAGE,
  SHAPE_RECT,
  SHAPE_TEXT,
} from '@/constants/shape';
import { COLOR_OUTLINE } from '@/constants/colors';
import useEditorStore from '@/stores/useEditorStore';

import css from './View.module.scss';
import type { ShapeOutlineProps } from './View.types';

const ShapeOutline = (props: ShapeOutlineProps) => {
  const { shape } = props;
  const { x, y, fontSize, text, rotation, width, height } = shape;

  const camera = useEditorStore((state) => state.camera);

  const outlineProps = {
    fill: 'none',
    stroke: COLOR_OUTLINE,
    strokeWidth: 1 / camera.zoom,
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
            y={y - Number(fontSize) * -0.195}
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
    <g
      data-outline
      className={css.outline}
      transform={`rotate(${rotation} ${x + width / 2} ${y + height / 2})`}
    >
      {renderOutline()}
    </g>
  );
};

export default ShapeOutline;
