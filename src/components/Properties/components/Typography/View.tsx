import Section from '../Section';
import type { TypographyProps } from './View.types';

const Typography = ({ shape, onChange }: TypographyProps) => {
  const { fontSize } = shape;

  return (
    <Section title="Text">
      <p />
      <input
        type="number"
        value={fontSize}
        name="fontSize"
        onChange={onChange}
      />
    </Section>
  );
};

export default Typography;
