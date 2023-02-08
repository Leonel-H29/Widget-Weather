import * as React from 'react';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import { Container, Grid } from '@mui/material';
//import { If, Then } from 'react-if-elseif-else-render';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import Typography from '@mui/material/Typography';
import StyleInfo from './WeatherInfo.module.css';
import moment from 'moment/moment';
import HourInfoComp from './WeatherInfoForHour';
import ModalInfoComp from './WeatherInfoModal';
import { FormattedMessage, FormattedDate } from 'react-intl';
import traslateServ from '../services/traslate-service';
//import { useState, useEffect } from 'react';
const lang = localStorage.getItem('lang');
const Root = styled('div')(({ theme }) => ({
  width: '100%',
  ...theme.typography.body2,
  '& > :not(style) + :not(style)': {
    marginTop: theme.spacing(2),
  },
}));

export default function WeatherInfoComp({ weather }) {
  const [city_transl, SetCity_Transl] = React.useState('');
  const [country_transl, SetCountry_Transl] = React.useState('');
  const [weather_transl, SetWeather_Transl] = React.useState('');

  React.useEffect(() => {
    traducir();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function traducir() {
    if (lang) {
      if (lang !== 'en-US') {
        setTimeout(() => {
          traslateServ.traslate(weather?.location.name, SetCity_Transl);
          traslateServ.traslate(weather?.location.country, SetCountry_Transl);
          traslateServ.traslate(
            weather?.current.condition.text.toLowerCase(),
            SetWeather_Transl
          );
        }, 1000);
      }
    }
  }

  const diaActual = (
    <Root>
      <Divider />
      {/*Info del clima actual */}
      <i>
        <FormattedMessage
          id="weather.last_update"
          defaultMessage="Last update: "
        />
        {/*{moment(weather?.current.last_updated).format('llll')} */}
        <FormattedDate
          value={weather?.current.last_updated}
          year="numeric"
          month="long"
          day="numeric"
          weekday="long"
          hour="numeric"
          minute="numeric"
        />
      </i>
      <Container maxWidth="sm">
        <Card sx={{ display: 'flex' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                {/* {moment(weather?.location.localtime).format('LLLL')}*/}
                <FormattedDate
                  value={weather?.location.localtime}
                  year="numeric"
                  month="long"
                  day="numeric"
                  weekday="long"
                  hour="numeric"
                  minute="numeric"
                />
              </Typography>
              <Typography component="div" variant="h6">
                {lang !== 'en-US' ? (
                  <div>
                    {city_transl.toUpperCase()} - {country_transl.toUpperCase()}
                  </div>
                ) : (
                  <div>
                    {weather?.location.name.toUpperCase()} -{' '}
                    {weather?.location.country.toUpperCase()}
                  </div>
                )}

                {/* {city_transl.toUpperCase()} - {country_transl.toUpperCase()}
                  {weather?.location.name.toUpperCase()} -{' '}
                  {weather?.location.country.toUpperCase()}
                  */}
              </Typography>
              <Typography component="div" variant="h4">
                {weather?.current.temp_c} °
              </Typography>
              <Typography component="div" variant="h6">
                {lang !== 'en-US' ? (
                  <div>{weather_transl.toUpperCase()}</div>
                ) : (
                  <div>{weather?.current.condition.text.toUpperCase()}</div>
                )}
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                <FormattedMessage
                  id="weather.humidity"
                  defaultMessage="Humidity: "
                />
                {weather?.current.humidity} %<br />
                <FormattedMessage
                  id="weather.feelslike_c"
                  defaultMessage="Feels like: "
                />
                {weather?.current.feelslike_c} °<br />
                <FormattedMessage id="weather.cloud" defaultMessage="Cloud: " />
                {weather?.current.cloud} %<br />
                <FormattedMessage
                  id="weather.wind_kph"
                  defaultMessage="Wind kph: "
                />
                {weather?.current.wind_kph} kph <br />
                <FormattedMessage
                  id="weather.wind_degree"
                  defaultMessage="Wind degree: "
                />
                {weather?.current.wind_degree} ° <br />
                <FormattedMessage
                  id="weather.pressure_mb"
                  defaultMessage="Pressure mb: "
                />
                {weather?.current.pressure_mb} mb <br />
                <FormattedMessage
                  id="weather.pressure_in"
                  defaultMessage="Pressure in: "
                />
                {weather?.current.pressure_in} in <br />
                <FormattedMessage
                  id="weather.gust_kph"
                  defaultMessage="Gust kph: "
                />
                {weather?.current.gust_kph} kph <br />
                <FormattedMessage
                  id="weather.vis_km"
                  defaultMessage="Vis km: "
                />
                {weather?.current.vis_km} km
              </Typography>
            </CardContent>
          </Box>
          <CardMedia
            component="img"
            sx={{ height: 100, width: 100 }}
            image={`http:${weather?.current.condition.icon}`}
            alt={weather?.current.condition.text}
          />
        </Card>
        <br />
        <HourInfoComp weather={weather?.forecast.forecastday[0]} />
      </Container>
      {/* Ubicacion de la ciudad en el mapa */}
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
  );

  const Pronosticos = (
    <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
      {/*Controlo que el dia actual no coincida con un dia de los pronosticos */}
      {weather?.forecast.forecastday
        .filter(
          (value) =>
            moment(value?.date).format('L') !==
            moment(weather?.location.localtime).format('L')
        )
        .map((pron) => (
          <Grid item xs={12} sm={6} md={4} key={pron?.date}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                sx={{ height: 100, width: 100 }}
                image={`http:${pron?.day.condition.icon}`}
                title={pron?.day.condition.text}
              />
              <CardContent>
                <Typography gutterBottom variant="b" component="div">
                  {/* {moment(pron?.date).format('dddd, ll')}*/}

                  <FormattedDate
                    value={weather?.current.last_updated}
                    year="numeric"
                    month="short"
                    day="numeric"
                    weekday="long"
                  />
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                  MIN: {pron?.day.mintemp_c} °
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                  MAX: {pron?.day.maxtemp_c} °
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {pron?.day.condition.text.toUpperCase()}
                </Typography>
              </CardContent>
              <ModalInfoComp weather={pron} />
            </Card>
          </Grid>
        ))}
    </Grid>
  );

  return (
    <div>
      {diaActual}
      {/*Pronosticos de los siguientes dias */}
      <h2>
        {lang !== 'en-US' ? (
          <FormattedMessage
            id="app.subtitle-nextdays"
            values={{
              name: city_transl.toUpperCase(),
            }}
            defaultMessage="Weather Forecasts at  in next 7 days"
          />
        ) : (
          <FormattedMessage
            id="app.subtitle-nextdays"
            values={{
              name: weather?.location.name.toUpperCase(),
            }}
            defaultMessage="Weather Forecasts at  in next 7 days"
          />
        )}
      </h2>
      <Container className="pronosticos">{Pronosticos}</Container>
    </div>
  );
}
