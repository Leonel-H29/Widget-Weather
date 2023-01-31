import * as React from 'react';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
//import Chip from '@mui/material/Chip';
import { Container } from '@mui/material';

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
        <h3>
          {weather?.location.name.toUpperCase()} -{' '}
          {weather?.location.country.toUpperCase()}
        </h3>

        <Divider />

        <Container>
          <b>{weather?.current.temp_c}°</b> -{' '}
          <b>{weather?.current.condition.text}</b>
          <img
            src={`http:${weather?.current.condition.icon}`}
            width="128"
            alt={weather?.current.condition.text}
          />
        </Container>

        <Container>
          <iframe
            title="mapa"
            src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d28475.847806771875!2d${weather?.location.lon}9!3d${weather?.location.lat}8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2sar!4v1675119655081!5m2!1ses!2sar`}
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </Container>
      </Root>
    </div>
  );
}
