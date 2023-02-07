import axios from 'axios';
const REACT_APP_KEY_API_TRANSLATE = 'AIzaSyCmiQ2LByFxMUq2ubhz56yuI9W4poe7Jaw';
const REACT_APP_URL_API_TRANSLATE =
  'https://translation.googleapis.com/language/translate/v2?target=es&key=';

const API_URL =
  REACT_APP_URL_API_TRANSLATE + REACT_APP_KEY_API_TRANSLATE + '&q=';
const traslateServ = {
  traslate: (word) => {
    axios
      .get(API_URL + word)
      .then((response) => {
        console.log(response);
        return response.data;
      })
      .catch((err) => {
        return word;
      });
  },
};

export default traslateServ;
