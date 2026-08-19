import radToDeg from '@/utils/radToDeg';
import type { RotatingInteraction } from '@/types/interaction';
import viewportToCanvas from '@/utils/viewportToCanvas';
import type { Camera } from '@/types';

import { ADDITION_TO_NORMAL } from '../index.constants';

const getRotateValue = (
  e: MouseEvent,
  canvas: SVGSVGElement,
  camera: Camera,
  interaction: RotatingInteraction,
) => {
  const { canvasX, canvasY } = viewportToCanvas(
    e.clientX,
    e.clientY,
    camera,
    canvas,
  );

  const radian = Math.atan2(
    canvasY - interaction.centerY,
    canvasX - interaction.centerX,
  );

  const degrees = radToDeg(radian);

  return {
    id: interaction.startShapes[0].id,
    rotation: degrees + ADDITION_TO_NORMAL,
  };
};

export default getRotateValue;
