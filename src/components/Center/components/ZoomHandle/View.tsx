import useEditorStore from '@/stores/useEditorStore';
import css from './View.module.scss';
import { MAX_ZOOM, MIN_ZOOM } from '@/constants';
import { RiAddLine, RiSubtractLine } from 'react-icons/ri';

const ZoomHandle = () => {
  const camera = useEditorStore((state) => state.camera);
  const zooming = useEditorStore((state) => state.zooming);

  const handleZoom = (value: string | number) => {
    if (typeof value === 'string') {
      const zoom: number = new Function(
        `return ${camera.zoom} ${value} ${0.1}`,
      )();
      zooming(Math.max(MIN_ZOOM, Math.min(zoom, MAX_ZOOM)));
    } else {
      zooming(value);
    }
  };

  return (
    <div className={css.wrapper}>
      <button
        type="button"
        disabled={camera.zoom <= MIN_ZOOM}
        onClick={() => handleZoom('-')}
      >
        <RiSubtractLine />
      </button>

      <button type="button" onClick={() => handleZoom(1)}>
        {(camera.zoom * 100).toFixed()}%
      </button>

      <button
        type="button"
        disabled={camera.zoom >= MAX_ZOOM}
        onClick={() => handleZoom('+')}
      >
        <RiAddLine />
      </button>
    </div>
  );
};

export default ZoomHandle;
