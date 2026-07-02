import { useCallback, useEffect, useRef, type MouseEvent } from 'react';

import ShapeRenderer from '@/components/ShapeRenderer';
import ShapeWrapper from '@/components/ShapeWrapper';
import {
  DRAGGING,
  EDITING_TEXT,
  IDLE,
  MOUSE_DOWN,
  RESIZING,
  ROTATING,
} from '@/constants/interaction';
import useEditorStore from '@/stores/useEditorStore';
import isTextEditing from '@/utils/isTextEditing';

import { ARROW_VALUES } from './View.constants';
import css from './View.module.scss';

// TODO: resize and rotate multiselect support

const Viewport = () => {
  const camera = useEditorStore((state) => state.camera);
  const settings = useEditorStore((state) => state.settings);
  const shapesById = useEditorStore((state) => state.shapesById);
  const shapeIds = useEditorStore((state) => state.shapeIds);
  const selectedIds = useEditorStore((state) => state.selectedIds);
  const interaction = useEditorStore((state) => state.interaction);

  const selectOnly = useEditorStore((state) => state.selectOnly);
  const toggleSelection = useEditorStore((state) => state.toggleSelection);
  const clearSelection = useEditorStore((state) => state.clearSelection);
  const selectAll = useEditorStore((state) => state.selectAll);
  const deleteSelected = useEditorStore((state) => state.deleteSelected);
  const startInteraction = useEditorStore((state) => state.startInteraction);
  const stopInteraction = useEditorStore((state) => state.stopInteraction);
  const updateShape = useEditorStore((state) => state.updateShape);
  const undo = useEditorStore((state) => state.undo);
  const redo = useEditorStore((state) => state.redo);
  const moveShape = useEditorStore((state) => state.moveShape);
  const duplicate = useEditorStore((state) => state.duplicate);
  const copy = useEditorStore((state) => state.copy);
  const paste = useEditorStore((state) => state.paste);

  const svgRef = useRef<SVGSVGElement>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (e.target === svgRef.current) {
      clearSelection();
    }
  };

  const handleMouseDownShape = (e: MouseEvent, id: string) => {
    if (e.shiftKey) toggleSelection(id);
    else if (!selectedIds.includes(id)) selectOnly(id);

    startInteraction(MOUSE_DOWN, e.clientX, e.clientY);
  };

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (isTextEditing()) return;

      const key = e.key;

      // DELETE
      if (key === 'Delete' || key === 'Backspace') deleteSelected();

      const controlKey = e.ctrlKey || e.metaKey;
      const shiftKey = e.shiftKey;

      const controlShift = controlKey && shiftKey;
      const controlOnly = controlKey && !shiftKey;

      // UNDO & REDO
      if (controlOnly && key === 'z') undo();
      if (controlShift && key === 'z') redo();

      if (selectedIds.length) {
        // ARROW MOVEMENT + SHIFT
        if (
          key === 'ArrowRight' ||
          key === 'ArrowLeft' ||
          key === 'ArrowUp' ||
          key === 'ArrowDown'
        ) {
          e.preventDefault();
          const multiplier = shiftKey ? 10 : 1;
          const { x, y } = ARROW_VALUES[key];
          for (const id of selectedIds)
            moveShape(id, x * multiplier, y * multiplier);
        }

        // DUPLICATE
        if (controlOnly && key === 'd') {
          e.preventDefault();
          duplicate(selectedIds);
        }

        // COPY
        if (controlOnly && key === 'c') copy();
      }

      // PASTE
      if (controlOnly && key === 'v') paste();

      // SELECT ALL
      if (controlOnly && key === 'a') {
        e.preventDefault();
        selectAll();
      }
      // DESELECT ALL
      if (controlShift && key === 'd') {
        e.preventDefault();
        clearSelection();
      }
    },
    [
      clearSelection,
      copy,
      deleteSelected,
      duplicate,
      moveShape,
      paste,
      redo,
      selectAll,
      selectedIds,
      undo,
    ],
  );

  const handleMouseMove = useCallback(
    (e: globalThis.MouseEvent) => {
      if (interaction.type === IDLE || interaction.type === EDITING_TEXT)
        return;

      const dx = e.clientX - interaction.startMouseX;
      const dy = e.clientY - interaction.startMouseY;

      switch (interaction.type) {
        case MOUSE_DOWN: {
          if (Math.abs(dx) > 3 || Math.abs(dy) > 3)
            startInteraction(
              DRAGGING,
              interaction.startMouseX,
              interaction.startMouseY,
            );
          break;
        }

        case DRAGGING: {
          for (const shape of interaction.startShapes) {
            updateShape(shape.id, {
              x: shape.x + dx / camera.zoom,
              y: shape.y + dy / camera.zoom,
            });
          }
          break;
        }

        case RESIZING: {
          const shape = interaction.startShapes[0];
          const angle = (shape.rotation * Math.PI) / 180;

          const localDx =
            (dx * Math.cos(angle) + dy * Math.sin(angle)) * (2 / camera.zoom);
          const localDy =
            (-dx * Math.sin(angle) + dy * Math.cos(angle)) * (2 / camera.zoom);

          const width = Math.max(20, shape.width + localDx);
          const height = Math.max(20, shape.height + localDy);

          updateShape(shape.id, {
            x: interaction.centerX - width / 2,
            y: interaction.centerY - height / 2,
            width: width,
            height,
          });
          break;
        }

        case ROTATING: {
          if (!svgRef.current) break;
          const svgRect = svgRef.current.getBoundingClientRect();
          const svgMouseX = Math.max(e.clientX - svgRect.left, 0) / camera.zoom;
          const svgMouseY = Math.max(e.clientY - svgRect.top, 0) / camera.zoom;

          const angle = Math.atan2(
            svgMouseY - interaction.centerY,
            svgMouseX - interaction.centerX,
          );

          const degrees = (angle * 180) / Math.PI;

          updateShape(interaction.startShapes[0].id, {
            rotation: degrees + 90,
          });
          break;
        }

        default:
          break;
      }
    },
    [camera.zoom, interaction, startInteraction, updateShape],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', stopInteraction);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', stopInteraction);
    };
  }, [handleKeyDown, handleMouseMove, stopInteraction]);

  return (
    <svg
      id="viewport"
      ref={svgRef}
      width={settings.width}
      height={settings.height}
      className={css.viewport}
      onMouseDown={handleClickOutside}
    >
      <g
        transform={`
          scale(${camera.zoom})
          translate(${camera.offsetX}, ${camera.offsetY})
          `}
      >
        {shapesById && (
          <>
            {shapeIds.map((id) => {
              const item = shapesById[id];
              return (
                !!item && (
                  <ShapeRenderer
                    key={id}
                    shape={item}
                    onMouseDown={(e) => handleMouseDownShape(e, id)}
                  />
                )
              );
            })}

            {!!selectedIds.length && <ShapeWrapper />}
          </>
        )}
      </g>

      {/* HELPER */}
      <rect
        x={0}
        y={0}
        width={settings.width}
        height={settings.height}
        fill="none"
        stroke="#d6dade"
        data-export="exclude"
      />
    </svg>
  );
};

export default Viewport;
