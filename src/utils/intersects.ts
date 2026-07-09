import type getBounds from './getBounds';

const intersects = (
  a: ReturnType<typeof getBounds>,
  b: ReturnType<typeof getBounds>,
) => {
  return !(
    a.right < b.left ||
    a.left > b.right ||
    a.bottom < b.top ||
    a.top > b.bottom
  );
};

export default intersects;
