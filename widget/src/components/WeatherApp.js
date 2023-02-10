/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import WeatherFormComp from './WeatherForm';
import WeatherInfoComp from './WeatherInfo';
import { Container, Button } from '@mui/material';
import ResponsiveAppBar from './MainMenu';
import axios from 'axios';
import Loadding from './Loadding';
import Error from './Error';
import Footer from './Footer';
import { FormattedMessage } from 'react-intl';
import SaveIcon from '@mui/icons-material/Save';
import OptionsLangComp from './OptionsLanguages';
import { If, Then } from 'react-if-elseif-else-render';

const lang = localStorage.getItem('lang');
const API_WEATHER_URL =
  process.env.REACT_APP_URL + '&key=' + process.env.REACT_APP_KEY + '&q=';
export default function WeatherApiComp() {
  const [weather, setWeather] = useState(null);
  const [fail, setFail] = useState(null);
  const [btn_save, setBtn_Save] = useState(true);
  let default_city = localStorage.getItem('city');
  /*
  En caso de que no se encuentre ninguna ciudad guardada, 
  por defecto se mostrara la informacion de Londres
  */
  if (!default_city) default_city = 'london';

  //Muestra la ciudad cargada por defecto
  useEffect(() => {
    loadInfo();
    //traducir();
  }, []);

  //Cambia el encabezado por cada ciudad
  useEffect(() => {
    document.title = `Weather | ${weather?.location.name ?? ''}`;
  }, [weather]);

  //Cargo los datos del clima segun la ciudad
  async function loadInfo(city = default_city) {
    //console.log(API_WEATHER_URL + city);
    var API_URL = API_WEATHER_URL + city;
    if (lang) {
      if (lang !== 'en-US') {
        API_URL = API_URL + '&lang=es';
      }
      axios
        .get(API_URL)
        .then((response) => {
          //console.log(response.data);
          setWeather(response.data);
          setBtn_Save(false);
        })
        .catch((error) => {
          setFail(error);
        });
    }
  }

  //Se envia por parametro la ciudad nueva

  function handleChangeCity(city) {
    setWeather(null);
    setBtn_Save(true);
    setTimeout(() => {
      loadInfo(city);
    }, 3000);
  }
  //Boton para gurdar la ciudad buscada en el almacenamiento local
  const SaveCity = (
    <Button
      variant="contained"
      disabled={btn_save}
      onClick={() => {
        localStorage.setItem(
          'city',
          weather?.location.name + ' ' + weather?.location.country
        );
      }}
    >
      <SaveIcon />
      <FormattedMessage id="app.save-button" defaultMessage="SAVE CITY" />
    </Button>
  );

  return (
    <div>
      <ResponsiveAppBar />
      <br />
      <Container fixed>
        <section>
          <OptionsLangComp />
        </section>
        <section>
          <h1 style={{ fontFamily: 'sans-serif' }}>
            <FormattedMessage
              id="app.title"
              defaultMessage="Widget Weather on React"
            />
          </h1>
          <h3 style={{ fontFamily: 'revert' }}>
            <FormattedMessage
              id="app.subtitle"
              defaultMessage="Write the name of city: "
            />
          </h3>
          <WeatherFormComp onChangeCity={handleChangeCity} />
          <br />
          <If condition={fail == null}>
            <Then>{SaveCity}</Then>
          </If>

          <br />
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
