import type { Shape } from '@/types/shape';
import degToRad from './degToRad';
import { SHAPE_ELLIPSE } from '@/constants';

const rotatePoint = (
  x: number,
  y: number,
  cx: number,
  cy: number,
  deg: number,
) => {
  const translatedX = x - cx;
  const translatedY = y - cy;

  const angleInRadians = deg * (Math.PI / 180);
  const cos = Math.cos(angleInRadians);
  const sin = Math.sin(angleInRadians);

  const rotatedX = translatedX * cos - translatedY * sin;
  const rotatedY = translatedX * sin + translatedY * cos;

  return {
    x: rotatedX + cx,
    y: rotatedY + cy,
  };
};

const getCenter = ({ x, y, width, height }: Shape) => {
  return {
    cx: x + width / 2,
    cy: y + height / 2,
  };
};

const getRectBounds = (shape: Shape) => {
  const { x, y, width, height, rotation } = shape;
  const { cx, cy } = getCenter(shape);

  const x1x3 = x;
  const y1y2 = y;
  const x2x4 = x + width;
  const y3y4 = y + height;

  const xy1 = rotatePoint(x1x3, y1y2, cx, cy, rotation);
  const xy2 = rotatePoint(x2x4, y1y2, cx, cy, rotation);
  const xy3 = rotatePoint(x1x3, y3y4, cx, cy, rotation);
  const xy4 = rotatePoint(x2x4, y3y4, cx, cy, rotation);

  return {
    top: Math.min(xy1.y, xy2.y, xy3.y, xy4.y),
    bottom: Math.max(xy1.y, xy2.y, xy3.y, xy4.y),
    left: Math.min(xy1.x, xy2.x, xy3.x, xy4.x),
    right: Math.max(xy1.x, xy2.x, xy3.x, xy4.x),
    centerX: cx,
    centerY: cy,
    width,
    height,
  };
};

const getCircleBounds = (shape: Shape) => {
  const { width, height, rotation } = shape;

  const rx = width / 2;
  const ry = height / 2;
  const { cx, cy } = getCenter(shape);
  const rad = degToRad(rotation);

  const halfWidth = Math.sqrt(
    Math.pow(rx * Math.cos(rad), 2) + Math.pow(ry * Math.sin(rad), 2),
  );
  const halfHeight = Math.sqrt(
    Math.pow(rx * Math.sin(rad), 2) + Math.pow(ry * Math.cos(rad), 2),
  );

  return {
    top: cy - halfHeight,
    bottom: cy + halfHeight,
    left: cx - halfWidth,
    right: cx + halfWidth,
    centerX: cx,
    centerY: cy,
    width,
    height,
  };
};

const getBounds = (shape: Shape) => {
  switch (shape.type) {
    case SHAPE_ELLIPSE:
      return getCircleBounds(shape);

    default:
      return getRectBounds(shape);
  }
};

export default getBounds;
