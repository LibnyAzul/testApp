import React, { FC, forwardRef, ReactElement, Ref } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import InfoIcon from '@mui/icons-material/Info';

export interface IDialogProps {
  title: string;
  message: string;
}

export const initialState: IDialogProps = {
  title: '',
  message: ''
};

interface IProps {
  open: boolean;
  dialog: IDialogProps;
  onClose: () => void;
  confirm: () => void;
}

export const Transition = forwardRef(function Transition(
  prop: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...prop} />;
});

const CustomDialog: FC<IProps> = (props: IProps) => {
  const { open, dialog, onClose, confirm } = props;
  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          <InfoIcon /> {` ${dialog.title}`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {dialog.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button size="small" variant="contained" onClick={onClose}>
            {'Cerrar'}
          </Button>
          <Button size="small" variant="contained" onClick={confirm}>
            {'Aceptar'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CustomDialog;
