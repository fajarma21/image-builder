import { Dialog as FMDialog } from 'fajarma-react-lib';

import css from './View.module.scss';
import type { DialogProps } from './View.types';
import Button from '../Button';

const Dialog = ({
  display,
  children,
  closeText = 'Cancel',
  onClose,
  onSubmit,
}: DialogProps) => {
  return (
    <FMDialog
      display={display}
      className={css.dialogModifier}
      onClose={onClose}
    >
      {children}
      <div className={css.btnContainer}>
        {!!onSubmit && (
          <Button className={css.btnModifier} onClick={onSubmit}>
            Save
          </Button>
        )}
        <Button className={css.btnModifier} data-cancel onClick={onClose}>
          {closeText}
        </Button>
      </div>
    </FMDialog>
  );
};

export default Dialog;
