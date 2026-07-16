import type { Shape } from '@/types/shape';

function rotatePoint(
  x: number,
  y: number,
  cx: number,
  cy: number,
  deg: number,
) {
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
}

const getBounds = ({ x, y, width, height, rotation }: Shape) => {
  const cx = x + width / 2;
  const cy = y + height / 2;

  const tlX = x;
  const tlY = y;
  const newTL = rotatePoint(tlX, tlY, cx, cy, rotation);

  const trX = x + width;
  const trY = y;
  const newTR = rotatePoint(trX, trY, cx, cy, rotation);

  const blX = x;
  const blY = y + height;
  const newBL = rotatePoint(blX, blY, cx, cy, rotation);

  const brX = x + width;
  const brY = y + height;
  const newBR = rotatePoint(brX, brY, cx, cy, rotation);

  return {
    top: Math.min(newTL.y, newTR.y, newBL.y, newBR.y),
    bottom: Math.max(newTL.y, newTR.y, newBL.y, newBR.y),
    left: Math.min(newTL.x, newTR.x, newBL.x, newBR.x),
    right: Math.max(newTL.x, newTR.x, newBL.x, newBR.x),
    width,
    height,
    centerX: cx,
    centerY: cy,
  };
};

export default getBounds;
