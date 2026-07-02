import LeftBar from '@/components/LeftBar';
import RightBar from '@/components/RightBar';
import TopBar from '@/components/TopBar';
import Center from '@/components/Center';

import css from './View.module.scss';
import useEditorStore from '@/stores/useEditorStore';
import { IDLE } from '@/constants/interaction';

function App() {
  const interaction = useEditorStore((state) => state.interaction);
  return (
    <div
      className={css.parent}
      data-no-select={interaction.type !== IDLE || undefined}
    >
      <TopBar />
      <div className={css.main}>
        <LeftBar />
        <Center />
        <RightBar />
      </div>
    </div>
  );
}

export default App;
