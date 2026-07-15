import TextField from '@/components/TextField';
import Section from '../Section';
import type { TypographyProps } from './View.types';

const Typography = ({ shape, onChange }: TypographyProps) => {
  const { fontSize } = shape;

  return (
    <Section title="Typography">
      <p />
      <TextField value={fontSize} name="fontSize" onChange={onChange} />
    </Section>
  );
};

export default Typography;
