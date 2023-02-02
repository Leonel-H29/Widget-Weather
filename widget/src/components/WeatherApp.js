import { useState, useEffect } from 'react';
import WeatherFormComp from './WeatherForm';
import WeatherInfoComp from './WeatherInfo';
import { Container } from '@mui/material';
import ResponsiveAppBar from './MainMenu';
import axios from 'axios';
import Loadding from './Loadding';
import Error from './Error';
//import { If, Then, Else, ElseIf } from 'react-if-elseif-else-render';
//import { render } from '@testing-library/react';

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
    /* 
    try {
      const request = await fetch(API_WEATHER_URL + city);
      const json = await request.json();
      setWeather(json);
      //console.log(json);
    } catch (error) {
      setWeather(null);

      alert('Not found city!');
      //setWeather(error.error);
      setFail(error);
      //console.log(error.error);
      throw error;
    }
    */
    axios
      .get(API_WEATHER_URL + city)
      .then((response) => {
        setWeather(response.data);
      })
      .catch((error) => {
        setFail(error);
      });
  }

  function handleChangeCity(city) {
    setWeather(null);
    //setCode(0);
    setTimeout(() => {
      loadInfo(city);
    }, 3000);
  }

  //let componentError = null;
  //if (fail) return componentError = <Error/>//'Error: ' + fail.message;
  //if (!weather) return <Loadding />;

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
        {weather ? (
          <WeatherInfoComp weather={weather} />
        ) : fail ? (
          <Error />
        ) : (
          <Loadding />
        )}
        */}
        {fail ? (
          <Error />
        ) : weather ? (
          <WeatherInfoComp weather={weather} />
        ) : (
          <Loadding />
        )}
      </Container>
    </div>
  );
}
