import { useState } from 'react';
import { RiArrowDownSLine } from 'react-icons/ri';

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
    <>
      <div className={css.projectData}>
        <p>
          {document.name} - {document.width}x{document.height}px
        </p>
        <Button className={css.editButton} onClick={toggleDialog}>
          <RiArrowDownSLine />
        </Button>
      </div>

      <ProjectDialog display={displayDialog} onClose={toggleDialog} />
    </>
  );
};

export default DocumentSetting;
