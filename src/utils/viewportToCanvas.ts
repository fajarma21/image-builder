import type { Camera } from '@/types';

const viewportToCanvas = (
  x: number,
  y: number,
  camera: Camera,
  canvas: SVGSVGElement,
) => {
  const canvasRect = canvas.getBoundingClientRect();
  return {
    canvasX: (x - canvasRect.left) / camera.zoom,
    canvasY: (y - canvasRect.top) / camera.zoom,
  };
};

export default viewportToCanvas;
