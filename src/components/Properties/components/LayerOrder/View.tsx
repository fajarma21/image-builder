import Button from '@/components/Button';
import useEditorStore from '@/stores/useEditorStore';

import { LAYER_ORDER_LIST } from './View.constants';
import Section from '../Section';

// TODO: bringToFront, bringForward, sendToBack, sendBackward multiselect support

const LayerOrder = () => {
  const moveLayer = useEditorStore((state) => state.moveLayer);

  return (
    <Section title="Layer order">
      {LAYER_ORDER_LIST.map((item) => (
        <Button
          key={item.value}
          type="button"
          title={item.title}
          onClick={() => moveLayer(item.value)}
        >
          {item.icon}
        </Button>
      ))}
    </Section>
  );
};

export default LayerOrder;
