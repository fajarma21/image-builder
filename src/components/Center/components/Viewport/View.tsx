import { useCallback, useEffect, useRef, type MouseEvent } from 'react';
import { flushSync } from 'react-dom';

import MarqueeRect from '@/components/MarqueeRect';
import ShapeRenderer from '@/components/ShapeRenderer';
import ShapeWrapper from '@/components/ShapeWrapper';
import { MAX_ZOOM } from '@/constants';
import {
  DRAGGING,
  EDITING_TEXT,
  IDLE,
  MARQUEE,
  MOUSE_DOWN_EMPTY,
  MOUSE_DOWN_SHAPE,
  PANNING,
  RESIZING,
  ROTATING,
} from '@/constants/interaction';
import useEditorStore from '@/stores/useEditorStore';
import useKeyboardStore from '@/stores/useKeyboardStore';
import getBounds from '@/utils/getBounds';
import getSelectionBounds from '@/utils/getSelectionBounds';
import intersects from '@/utils/intersects';
import isTextEditing from '@/utils/isTextEditing';
import normalizeRect from '@/utils/normalizeRect';
import viewportToCanvas from '@/utils/viewportToCanvas';

import Info from './components/Info';
import { ARROW_VALUES } from './View.constants';
import css from './View.module.scss';
import type { Bounds } from '@/types';

// TODO: resize and rotate multiselect support
// TODO: apply viewporttocanvas helper for all coordinates

const Viewport = () => {
  const camera = useEditorStore((state) => state.camera);
  const document = useEditorStore((state) => state.document);
  const shapesById = useEditorStore((state) => state.shapesById);
  const shapeIds = useEditorStore((state) => state.shapeIds);
  const selectedIds = useEditorStore((state) => state.selectedIds);
  const interaction = useEditorStore((state) => state.interaction);
  const selectionBounds = useEditorStore((state) => state.selectionBounds);
  const spaceKey = useKeyboardStore((state) => state.spaceKey);

  const selectOnly = useEditorStore((state) => state.selectOnly);
  const selectMultiple = useEditorStore((state) => state.selectMultiple);
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
  const toggleSpace = useKeyboardStore((state) => state.toggleSpace);
  const zooming = useEditorStore((state) => state.zooming);
  const marquee = useEditorStore((state) => state.marquee);
  const updateSelectionBounds = useEditorStore(
    (state) => state.updateSelectionBounds,
  );

  const viewportRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const handleMouseDownCanvas = (e: MouseEvent) => {
    if (e.target === svgRef.current && !spaceKey) {
      clearSelection();

      const { canvasX, canvasY } = viewportToCanvas(
        e.clientX,
        e.clientY,
        camera,
        svgRef.current,
      );

      startInteraction({
        type: MOUSE_DOWN_EMPTY,
        mouseX: canvasX,
        mouseY: canvasY,
      });
    }
  };

  const handleMouseDownShape = (e: MouseEvent, id: string) => {
    if (spaceKey) return;

    if (e.shiftKey) toggleSelection(id);
    else if (!selectedIds.includes(id)) selectOnly(id);

    startInteraction({
      type: MOUSE_DOWN_SHAPE,
      mouseX: e.clientX,
      mouseY: e.clientY,
    });
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

      if ((!controlKey || !controlShift) && e.key === ' ') {
        e.preventDefault();
        toggleSpace(true);
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
      toggleSpace,
      undo,
    ],
  );

  const handleKeyUp = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === ' ') toggleSpace(false);
    },
    [toggleSpace],
  );

  const handleStartPan = (e: MouseEvent) => {
    if (spaceKey && viewportRef.current) {
      startInteraction({
        type: PANNING,
        mouseX: e.pageX - viewportRef.current.offsetLeft,
        mouseY: e.pageY - viewportRef.current.offsetTop,
        scrollX: viewportRef.current.scrollLeft,
        scrollY: viewportRef.current.scrollTop,
      });
    }
  };

  const handleZoom = useCallback(
    (e: globalThis.WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();

        if (!viewportRef.current) return;

        const oldZoom = camera.zoom;
        const currentZoom = e.deltaY * -0.01;
        const newZoom = Math.max(1, Math.min(oldZoom + currentZoom, MAX_ZOOM));

        const viewportRect = viewportRef.current.getBoundingClientRect();

        const mouseX = e.clientX - viewportRect.left;
        const mouseY = e.clientY - viewportRect.top;

        const docX = (viewportRef.current.scrollLeft + mouseX) / oldZoom;
        const docY = (viewportRef.current.scrollTop + mouseY) / oldZoom;

        flushSync(() => {
          zooming(newZoom);
        });

        viewportRef.current.scrollLeft = docX * newZoom - mouseX;
        viewportRef.current.scrollTop = docY * newZoom - mouseY;
      }
    },
    [camera.zoom, zooming],
  );

  const handleMouseMove = useCallback(
    (e: globalThis.MouseEvent) => {
      if (
        !svgRef.current ||
        interaction.type === IDLE ||
        interaction.type === EDITING_TEXT
      )
        return;

      const dx = (e.clientX - interaction.startMouseX) / camera.zoom;
      const dy = (e.clientY - interaction.startMouseY) / camera.zoom;

      switch (interaction.type) {
        case MOUSE_DOWN_EMPTY:
        case MOUSE_DOWN_SHAPE: {
          if (Math.abs(dx) > 3 || Math.abs(dy) > 3)
            startInteraction({
              type: interaction.type === MOUSE_DOWN_EMPTY ? MARQUEE : DRAGGING,
              mouseX: interaction.startMouseX,
              mouseY: interaction.startMouseY,
            });
          break;
        }

        case DRAGGING: {
          for (const shape of interaction.startShapes) {
            updateShape(shape.id, {
              x: shape.x + dx,
              y: shape.y + dy,
            });
          }
          break;
        }

        case RESIZING: {
          const shape = interaction.startShapes[0];
          const angle = (shape.rotation * Math.PI) / 180;

          const localDx = (dx * Math.cos(angle) + dy * Math.sin(angle)) * 2;
          const localDy = (-dx * Math.sin(angle) + dy * Math.cos(angle)) * 2;

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

        case PANNING: {
          if (!viewportRef.current) break;
          const currentX = e.pageX - viewportRef.current.offsetLeft;
          const currentY = e.pageY - viewportRef.current.offsetTop;
          const walkX = currentX - interaction.startMouseX;
          const walkY = currentY - interaction.startMouseY;
          viewportRef.current.scrollLeft = interaction.scrollLeft - walkX;
          viewportRef.current.scrollTop = interaction.scrollTop - walkY;
          break;
        }

        case MARQUEE: {
          const { canvasX, canvasY } = viewportToCanvas(
            e.clientX,
            e.clientY,
            camera,
            svgRef.current,
          );
          marquee(canvasX, canvasY);
          break;
        }

        default:
          break;
      }
    },
    [interaction, startInteraction, updateShape, camera, marquee],
  );

  const handleMouseUp = useCallback(
    (e: globalThis.MouseEvent) => {
      switch (interaction.type) {
        case MARQUEE: {
          const marquee = normalizeRect(interaction);

          const ids: string[] = [];
          let tempSelectionBounds: Bounds | null = null;

          for (const shapeId of shapeIds) {
            const shape = shapesById![shapeId];
            const shapeBounds = getBounds(shape);

            if (intersects(shapeBounds, marquee)) {
              ids.push(shapeId);
              tempSelectionBounds = getSelectionBounds(
                shapeBounds,
                tempSelectionBounds,
              );
            }
          }

          if (tempSelectionBounds) updateSelectionBounds(tempSelectionBounds);
          if (ids.length) selectMultiple(ids);
          break;
        }

        case DRAGGING:
        case ROTATING:
        case RESIZING: {
          console.log('recalculate selection bound');
          break;
        }

        default:
          break;
      }

      stopInteraction(e);
    },
    [
      interaction,
      selectMultiple,
      shapeIds,
      shapesById,
      stopInteraction,
      updateSelectionBounds,
    ],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    const svg = svgRef.current;
    if (svg) svg.addEventListener('wheel', handleZoom, { passive: false });

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);

      if (svg) svg.removeEventListener('wheel', handleZoom);
    };
  }, [handleKeyDown, handleKeyUp, handleMouseMove, handleZoom, handleMouseUp]);

  return (
    <div
      ref={viewportRef}
      className={css.viewport}
      onMouseDown={handleStartPan}
    >
      <div
        className={css.wrapper}
        style={{ width: document.width * camera.zoom }}
      >
        <Info />
        <svg
          id="canvas"
          ref={svgRef}
          width={document.width * camera.zoom}
          height={document.height * camera.zoom}
          viewBox={`0 0 ${document.width} ${document.height}`}
          className={css.canvas}
          onMouseDown={handleMouseDownCanvas}
        >
          <g>
            {[...Array(10)].map(
              (_, index) =>
                !!index &&
                index !== 9 && (
                  <line
                    key={index}
                    x1={(document.width / 9) * index}
                    y1={0}
                    x2={(document.width / 9) * index}
                    y2={document.height}
                    stroke="#000000"
                    strokeWidth={1}
                  />
                ),
            )}
            {[...Array(10)].map(
              (_, index) =>
                !!index &&
                index !== 9 && (
                  <line
                    key={index}
                    x1={0}
                    y1={(document.height / 9) * index}
                    x2={document.width}
                    y2={(document.height / 9) * index}
                    stroke="#000000"
                    strokeWidth={1}
                  />
                ),
            )}
          </g>

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

          {selectionBounds && interaction.type === IDLE && (
            <g>
              <circle
                cx={selectionBounds.centerX}
                cy={selectionBounds.centerY}
                r={2}
              />
              <rect
                x={selectionBounds.left}
                y={selectionBounds.top}
                width={selectionBounds.right - selectionBounds.left}
                height={selectionBounds.bottom - selectionBounds.top}
                fill="none"
                stroke="red"
              />
            </g>
          )}

          <MarqueeRect />
        </svg>
      </div>
    </div>
  );
};

export default Viewport;
