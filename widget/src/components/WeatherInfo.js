import * as React from 'react';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import { Container } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import StyleInfo from './WeatherInfo.module.css';
//import { If, Then, Else } from 'react-if-elseif-else-render';
//import Error from './Error';

const Root = styled('div')(({ theme }) => ({
  width: '100%',
  ...theme.typography.body2,
  '& > :not(style) + :not(style)': {
    marginTop: theme.spacing(2),
  },
}));

export default function WeatherInfoComp({ weather }) {
  return (
    <div>
      <Root>
        <Divider />
        <Container maxWidth="sm">
          <Card sx={{ display: 'flex' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component="div" variant="h6">
                  {weather?.location.name.toUpperCase()} -{' '}
                  {weather?.location.country.toUpperCase()}
                </Typography>
                <Typography component="div" variant="h4">
                  {weather?.current.temp_c} °
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  {weather?.current.condition.text}
                </Typography>
              </CardContent>
            </Box>
            <CardMedia
              component="img"
              sx={{ width: 151 }}
              image={`http:${weather?.current.condition.icon}`}
              alt={weather?.current.condition.text}
            />
          </Card>
        </Container>

        <Container>
          <div className={StyleInfo.mapaContainer}>
            <iframe
              className={StyleInfo.mapaIframe}
              title="mapa"
              src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d28475.847806771875!2d${weather?.location.lon}9!3d${weather?.location.lat}8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2sar!4v1675119655081!5m2!1ses!2sar`}
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </Container>
      </Root>
    </div>
  );
}
