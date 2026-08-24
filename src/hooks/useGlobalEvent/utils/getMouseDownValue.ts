import { DRAGGING, MARQUEE, MOUSE_DOWN_EMPTY } from '@/constants/interaction';
import type {
  MouseDownEmptyInteraction,
  MouseDownShapeInteraction,
} from '@/types/interaction';
import getDeltaAxis from '@/utils/getDeltaAxis';

const getMouseDownValue = (
  e: MouseEvent,
  interaction: MouseDownEmptyInteraction | MouseDownShapeInteraction,
  zoom: number,
) => {
  const { dx, dy } = getDeltaAxis(
    interaction.startMouseX,
    interaction.startMouseY,
    e.clientX,
    e.clientY,
    zoom,
  );

  if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
    return {
      type: interaction.type === MOUSE_DOWN_EMPTY ? MARQUEE : DRAGGING,
      mouseX: interaction.startMouseX,
      mouseY: interaction.startMouseY,
    };
  }
};

export default getMouseDownValue;
