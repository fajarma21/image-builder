import useEditorStore from '@/stores/useEditorStore';

import css from './View.module.scss';

const Info = () => {
  const camera = useEditorStore((state) => state.camera);
  const document = useEditorStore((state) => state.document);

  return (
    <div className={css.info}>
      <p>
        Canvas &mdash; {document.width}x{document.height} px
      </p>
      <p>Zoom {camera.zoom.toFixed(2)}x</p>
    </div>
  );
};

export default Info;
