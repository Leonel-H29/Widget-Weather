import { useState, useEffect } from 'react';
import WeatherFormComp from './WeatherForm';
import WeatherInfoComp from './WeatherInfo';
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
      const request = await fetch(
        process.env.REACT_APP_URL +
          '&key=' +
          process.env.REACT_APP_KEY +
          '&q=' +
          city
      );
      const json = await request.json();
      console.log(json);
    } catch (error) {
      console.log(error);
    }
  }

  function handleChangeCity(city) {
    setWeather(null);
    loadInfo(city);
  }
  return (
    <div>
      <h1>Widget Weather React</h1>
      <WeatherFormComp onChangeCity={handleChangeCity} />
      <WeatherInfoComp weather={weather} />
    </div>
  );
}
