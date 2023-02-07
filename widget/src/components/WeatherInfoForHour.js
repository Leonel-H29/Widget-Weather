import * as React from 'react';
import moment from 'moment/moment';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import { ListSubheader } from '@mui/material';
import { Box, Pagination } from '@mui/material';
import { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';

const pageSize = 6;
export default function HourInfoComp({ weather }) {
  const [weather_hour, setWeather_Hour] = useState([]);
  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: pageSize,
  });
  const service = {
    getData: ({ from, to }) => {
      //console.log(weather);
      return new Promise((resolve, reject) => {
        const data = weather?.hour.slice(from, to);
        resolve({
          count: weather?.hour.length,
          data: data,
        });
      });
    },
  };
  /*Obtengo los datos para cada una de las paginas */
  function getData() {
    service
      .getData({ from: pagination.from, to: pagination.to })
      .then((response) => {
        //console.log(response);
        setPagination({ ...pagination, count: response.count });
        setWeather_Hour(response.data);
      });
  }
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.from, pagination.to]);

  /*Cambio de pagina */
  const handleChangePage = (event, page) => {
    const from = (page - 1) * pageSize;
    const to = (page - 1) * pageSize + pageSize;
    setPagination({ ...pagination, from: from, to: to });
  };

  /*Menu de Paginacion */
  const menu_pagination = (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Pagination
        count={Math.ceil(pagination.count / pageSize)}
        onChange={handleChangePage}
      />
    </Box>
  );
  /*Constante de la lista de tiempo por hora */
  const ListHourW = weather_hour.map((hora) => (
    <List
      key={hora.time}
      sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
        position: 'relative',
      }}
    >
      <ListSubheader>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar
              alt={hora.condition.text}
              src={hora.condition.icon}
              title={hora.condition.text}
            />
          </ListItemAvatar>
          <ListItemText
            primary={moment(hora.time).format('LT')}
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  <b>{hora.temp_c}</b> °&nbsp;
                </Typography>
                - {hora.condition.text}
              </React.Fragment>
            }
          />
        </ListItem>
      </ListSubheader>
      <Divider variant="inset" component="li" />
    </List>
  ));

  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>
            <FormattedMessage
              id="app.modal-title"
              defaultMessage="View more details: "
            />
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Paper square sx={{ pb: '50px' }}>
            {ListHourW}
            {menu_pagination}
          </Paper>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
