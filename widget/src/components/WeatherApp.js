import { useState, useEffect } from 'react';
import WeatherFormComp from './WeatherForm';
import WeatherInfoComp from './WeatherInfo';
import { Container } from '@mui/material';
import ResponsiveAppBar from './MainMenu';
import Loadding from './Loadding';
import Error from './Error';
import { If, Then, Else, ElseIf } from 'react-if-elseif-else-render';

export default function WeatherApiComp() {
  const [weather, setWeather] = useState(null);
  const [code, setCode] = useState(0);

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
      setCode(request.status);
      console.log(json);
    } catch (error) {
      alert('Not found city!');
      setWeather(null);
      setCode(1006);
      console.log(error);
      throw error;
    }
  }

  function handleChangeCity(city) {
    setWeather(null);
    setCode(0);
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
        {/* 
        {weather ? <WeatherInfoComp weather={weather} /> : <Loadding />}

        
        */}
        <If condition={code === 200 && weather !== null}>
          <Then>
            <WeatherInfoComp weather={weather} />
          </Then>
          <ElseIf condition={code === 0}>
            <Loadding />
          </ElseIf>
          <Else>
            <pre>Error</pre>
            <Error />
          </Else>
        </If>
      </Container>
    </div>
  );
}
