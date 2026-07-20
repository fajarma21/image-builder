import { useState, type ChangeEvent } from 'react';

import Dialog from '@/components/Dialog';
import Input from '@/components/Inputs/Input';
import InputNumber from '@/components/Inputs/InputNumber';
import useEditorStore from '@/stores/useEditorStore';
import type { Document } from '@/types/document';

import css from './View.module.scss';
import type { ProjectDiaogProps } from './View.types';

// TODO: Grid

const ProjectDialog = ({ display, onClose }: ProjectDiaogProps) => {
  const document = useEditorStore((state) => state.document);
  const updateDocument = useEditorStore((state) => state.updateDocument);

  const [data, setData] = useState<Document>(document);

  const handleChangeData = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClose = () => {
    setData(document);
    onClose();
  };

  const handleSave = () => {
    updateDocument(data);
    onClose();
  };

  return (
    <Dialog display={display} onSubmit={handleSave} onClose={handleClose}>
      <div className={css.container}>
        <div className={css.row}>
          <div className={css.inputField}>
            <p>Project Title</p>
            <Input
              value={data.name}
              name="name"
              placeholder="Project Title"
              onChange={handleChangeData}
            />
          </div>
        </div>
        <div className={css.twoCollumn}>
          <div className={css.inputField}>
            <p>Width</p>
            <div className={css.inputGroup}>
              <InputNumber
                value={data.width}
                name="width"
                placeholder="Width"
                onChange={handleChangeData}
              />
              <p>px</p>
            </div>
          </div>
          <div className={css.inputField}>
            <p>Height</p>
            <div className={css.inputGroup}>
              <InputNumber
                value={data.height}
                name="height"
                placeholder="Height"
                onChange={handleChangeData}
              />
              <p>px</p>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default ProjectDialog;
