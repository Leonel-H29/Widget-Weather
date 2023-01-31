import { useState, useEffect } from 'react';
import WeatherFormComp from './WeatherForm';
import WeatherInfoComp from './WeatherInfo';
import { Container } from '@mui/material';
import ResponsiveAppBar from './MainMenu';
import Loadding from './Loadding';
//const WeatherApiComp = () => {
//return <div>Hola chavos!</div>;
//};

//export default WeatherApiComp;

export default function WeatherApiComp() {
  const [weather, setWeather] = useState(null);

  //Muestra la ciudad cargada por defecto
  useEffect(() => {
    loadInfo();
  }, []);

  //Cambia el encabezado por cada ciudad
  useEffect(() => {
    document.title = `Weather | ${weather?.location.name ?? ''}`;
  }, [weather]);

  async function loadInfo(city = 'london') {
    try {
      const API_WEATHER_URL =
        process.env.REACT_APP_URL +
        '&key=' +
        process.env.REACT_APP_KEY +
        '&q=' +
        city;
      const request = await fetch(API_WEATHER_URL);
      const json = await request.json();
      setWeather(json);
      //console.log(json);
    } catch (error) {
      console.log(error);
    }
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
        <h1 style={{ fontFamily: 'sans-serif' }}>Widget Weather on React</h1>
        <h3 style={{ fontFamily: 'revert' }}>Write the name of city: </h3>
        <WeatherFormComp onChangeCity={handleChangeCity} />
        <br />
        {/*
        Si weather no es nulo me mostrara el mapa con la ubicacion de la ciudad ingresada,
        sino seguira cargando
        */}
        {weather ? <WeatherInfoComp weather={weather} /> : <Loadding />}
      </Container>
    </div>
  );
}
