import radToDeg from '@/utils/radToDeg';
import type { RotatingInteraction } from '@/types/interaction';
import viewportToCanvas from '@/utils/viewportToCanvas';
import type { Camera } from '@/types';

import { NORMALIZE_VALUE, ROTATION_SNAP } from '../index.constants';

const getSnapRotation = (initRotation: number, rotation: number) => {
  const dr = rotation - initRotation;
  const snapModulus = dr % ROTATION_SNAP;

  if (snapModulus > (ROTATION_SNAP * 3) / 4) {
    return rotation - snapModulus + ROTATION_SNAP;
  } else if (snapModulus < ROTATION_SNAP / 4) {
    return rotation - snapModulus;
  }

  return rotation;
};

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
  let rotation = degrees + NORMALIZE_VALUE;

  if (rotation < 0) rotation = 360 + rotation;

  if (e.shiftKey) {
    const initRotation = interaction.startShapes[0].rotation;
    rotation = getSnapRotation(initRotation, rotation);
  }

  return {
    id: interaction.startShapes[0].id,
    rotation,
  };
};

export default getRotateValue;
