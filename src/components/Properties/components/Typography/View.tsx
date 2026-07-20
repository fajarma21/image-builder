import InputNumber from '@/components/Inputs/InputNumber';
import Section from '../Section';
import type { TypographyProps } from './View.types';

const Typography = ({ shape, onChange }: TypographyProps) => {
  const { fontSize } = shape;

  return (
    <Section title="Typography">
      <p />
      <InputNumber
        type="number"
        value={fontSize}
        name="fontSize"
        onChange={onChange}
      />
    </Section>
  );
};

export default Typography;
