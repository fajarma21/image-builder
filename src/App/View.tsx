import TopBar from '@/components/TopBar';
import Center from '@/components/Center';

import css from './View.module.scss';
import useEditorStore from '@/stores/useEditorStore';
import { IDLE } from '@/constants/interaction';
import Sidebar from '@/components/Sidebar';
import Items from '@/components/Items';
import Layers from '@/components/Layers';
import Properties from '@/components/Properties';

function App() {
  const interaction = useEditorStore((state) => state.interaction);
  return (
    <div
      className={css.parent}
      data-no-select={interaction.type !== IDLE || undefined}
    >
      <TopBar />
      <div className={css.main}>
        <Sidebar>
          <Items />
          <Layers />
        </Sidebar>
        <Center />
        <Sidebar>
          <Properties />
        </Sidebar>
      </div>
    </div>
  );
}

export default App;
