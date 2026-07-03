import useEditorStore from '@/stores/useEditorStore';

import css from './View.module.scss';

const Info = () => {
  const document = useEditorStore((state) => state.document);

  return (
    <div className={css.info}>
      <p>Canvas</p>
      <p>
        {document.width} x {document.height} px
      </p>
    </div>
  );
};

export default Info;
