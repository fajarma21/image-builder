import { useState } from 'react';
import { RiArrowRightSLine } from 'react-icons/ri';

import Button from '@/components/Button';
import useEditorStore from '@/stores/useEditorStore';

import css from './View.module.scss';
import ProjectDialog from './components/ProjectDialog';

const DocumentSetting = () => {
  const document = useEditorStore((state) => state.document);

  const [displayDialog, setDisplayDialog] = useState(false);

  const toggleDialog = () => {
    setDisplayDialog((prev) => !prev);
  };

  return (
    <div className={css.wrapper}>
      <Button className={css.projectData} onClick={toggleDialog}>
        <p>
          {document.name || 'untitled project'} - {document.width}x
          {document.height}px
        </p>
        <RiArrowRightSLine />
      </Button>

      <ProjectDialog display={displayDialog} onClose={toggleDialog} />
    </div>
  );
};

export default DocumentSetting;
