import { useState, useEffect } from 'react';
import WeatherFormComp from './WeatherForm';
import WeatherInfoComp from './WeatherInfo';
import { Container } from '@mui/material';
import ResponsiveAppBar from './MainMenu';
import axios from 'axios';
import Loadding from './Loadding';
import Error from './Error';
import Footer from './Footer';

const API_WEATHER_URL =
  process.env.REACT_APP_URL + '&key=' + process.env.REACT_APP_KEY + '&q=';
export default function WeatherApiComp() {
  const [weather, setWeather] = useState(null);
  const [fail, setFail] = useState(null);

  //Muestra la ciudad cargada por defecto
  useEffect(() => {
    loadInfo();
  }, []);

  //Cambia el encabezado por cada ciudad
  useEffect(() => {
    document.title = `Weather | ${weather?.location.name ?? ''}`;
  }, [weather]);

  async function loadInfo(city = 'london') {
    //console.log(API_WEATHER_URL + city);
    axios
      .get(API_WEATHER_URL + city)
      .then((response) => {
        //console.log(response.data);
        setWeather(response.data);
      })
      .catch((error) => {
        setFail(error);
      });
  }

  function handleChangeCity(city) {
    setWeather(null);
    setTimeout(() => {
      loadInfo(city);
    }, 3000);
  }

  return (
    <div>
      <ResponsiveAppBar />
      <Container fixed>
        <section>
          <h1 style={{ fontFamily: 'sans-serif' }}>Widget Weather on React</h1>
          <h3 style={{ fontFamily: 'revert' }}>Write the name of city: </h3>
          <WeatherFormComp onChangeCity={handleChangeCity} />
          <br />
          {/*
        Si se encuentra una falla muestrara el mensaje de error.
        Si weather no es nulo me mostrara el mapa con la ubicacion de la ciudad ingresada,
        sino seguira cargando
        */}

          {fail ? (
            <div>
              <Error />
            </div>
          ) : weather ? (
            <WeatherInfoComp weather={weather} />
          ) : (
            <Loadding />
          )}
        </section>
      </Container>
      <Footer />
    </div>
  );
}
