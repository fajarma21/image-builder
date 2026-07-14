import { RiArrowGoBackLine, RiArrowGoForwardLine } from 'react-icons/ri';

import useEditorStore from '@/stores/useEditorStore';

import css from './View.module.scss';
import Button from '@/components/Button';

const History = () => {
  const past = useEditorStore((state) => state.past);
  const future = useEditorStore((state) => state.future);
  const undo = useEditorStore((state) => state.undo);
  const redo = useEditorStore((state) => state.redo);

  return (
    <div className={css.history}>
      <Button disabled={!past.length} onClick={undo}>
        <RiArrowGoBackLine />
      </Button>
      <Button disabled={!future.length} onClick={redo}>
        <RiArrowGoForwardLine />
      </Button>
    </div>
  );
};

export default History;
