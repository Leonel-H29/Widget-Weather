import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { CardActions } from '@mui/material';
import Button from '@mui/material/Button';
import HourInfoComp from './WeatherInfoForHour';
import { FormattedMessage } from 'react-intl';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  Overflow: 'scroll',
  p: 4,
};
export default function ModalInfoComp({ weather }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <CardActions>
        <Button size="small" onClick={handleOpen}>
          <FormattedMessage id="app.modal-button" defaultMessage="VIEW MORE" />
        </Button>
      </CardActions>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <HourInfoComp weather={weather} />
        </Box>
      </Modal>
    </div>
  );
}
