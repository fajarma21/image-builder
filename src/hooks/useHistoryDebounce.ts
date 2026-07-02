import useEditorStore from '@/stores/useEditorStore';
import { useEffect, useRef } from 'react';

const useHistoryDebounce = (time = 500) => {
  const shapeIds = useEditorStore((state) => state.shapeIds);
  const shapesById = useEditorStore((state) => state.shapesById);
  const selectedIds = useEditorStore((state) => state.selectedIds);
  const pushHistory = useEditorStore((state) => state.pushHistory);

  const hit = useRef(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handlePushHistory = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      hit.current = false;
    }, time);

    if (hit.current) return;

    pushHistory({
      shapeIds,
      shapesById,
      selectedIds,
    });

    hit.current = true;
  };

  return [handlePushHistory];
};

export default useHistoryDebounce;
