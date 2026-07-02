import useEditorStore from '@/stores/useEditorStore';

import css from './View.module.scss';

const Info = () => {
  const settings = useEditorStore((state) => state.settings);

  return (
    <div className={css.info}>
      <p>Canvas</p>
      <p>
        {settings.width} x {settings.height} px
      </p>
    </div>
  );
};

export default Info;
