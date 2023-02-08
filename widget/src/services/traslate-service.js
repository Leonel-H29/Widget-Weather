import axios from 'axios';
//const REACT_APP_KEY_API_TRANSLATE = 'AIzaSyCmiQ2LByFxMUq2ubhz56yuI9W4poe7Jaw';
//const REACT_APP_URL_API_TRANSLATE = 'https://translation.googleapis.com/language/translate/v2?target=es&key=';

//const API_URL = REACT_APP_URL_API_TRANSLATE + REACT_APP_KEY_API_TRANSLATE + '&q=';
const API_URL = 'https://libretranslate.de/translate';
const traslateServ = {
  traslate: (word, SetTransl) => {
    const data = {
      q: word,
      source: 'en',
      target: 'es',
    };
    //console.log(data);
    axios
      .post(API_URL, data)
      .then((response) => {
        //console.log(response);
        SetTransl(response.data.translatedText);
        //return response.data.translatedText;
      })
      .catch((err) => {
        //return word;
        //SetTransl(word);
      });
  },
};

export default traslateServ;
