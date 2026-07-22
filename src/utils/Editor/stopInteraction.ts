import {
  DRAGGING,
  EDITING_TEXT,
  IDLE,
  MARQUEE,
  MOUSE_DOWN_EMPTY,
  MOUSE_DOWN_SHAPE,
  PANNING,
} from '@/constants/interaction';
import type { EditorStore } from '@/stores/useEditorStore/index.types';
import type { Interaction } from '@/types/interaction';

import getBounds from '../getBounds';
import getSelectionBounds from '../getSelectionBounds';
import intersects from '../intersects';
import normalizeRect from '../normalizeRect';
import pushHistory from '../pushHistory';

const noNeedToStop = (interaction: Interaction) =>
  interaction.type === IDLE || interaction.type === EDITING_TEXT;

const noNeedHistory = (interaction: Interaction) =>
  interaction.type === MOUSE_DOWN_SHAPE ||
  interaction.type === MOUSE_DOWN_EMPTY ||
  interaction.type === PANNING ||
  interaction.type === MARQUEE;

const postInteraction = (state: EditorStore) => {
  const { interaction, selectionBounds } = state;

  switch (interaction.type) {
    case DRAGGING: {
      if (selectionBounds) {
        return {
          selectionBounds: getSelectionBounds(
            state.selectedIds,
            state.shapesById,
          ),
        };
      }
      return { selectionBounds };
    }

    case MARQUEE: {
      const selectedIds = [];
      const marquee = normalizeRect(interaction);
      for (const shapeId of state.shapeIds) {
        const shape = state.shapesById![shapeId];
        const shapeBounds = getBounds(shape);
        if (intersects(shapeBounds, marquee)) selectedIds.push(shapeId);
      }
      return {
        selectedIds,
        selectionBounds: getSelectionBounds(selectedIds, state.shapesById),
      };
    }

    default:
      return;
  }
};

const stopInteraction = (state: EditorStore, event?: globalThis.MouseEvent) => {
  const { interaction, past } = state;
  if (!event || noNeedToStop(interaction)) return state;

  let history: ReturnType<typeof pushHistory> | null = null;
  if (!noNeedHistory(interaction)) {
    history = pushHistory({
      ...interaction.startSnapshot,
      past,
    });
  }

  const postState = postInteraction(state);

  return {
    ...history,
    ...postState,
  };
};

export default stopInteraction;
