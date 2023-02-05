import * as React from 'react';

import Box from '@mui/material/Box';
//import moment from 'moment/moment';
//import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { CardActions } from '@mui/material';
import Button from '@mui/material/Button';
/*
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import { ListSubheader } from '@mui/material';
*/
import HourInfoComp from './WeatherInfoForHour';
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
          VIEW MORE
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
