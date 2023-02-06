import * as React from 'react';
import MensajesIngles from './../components/lang/en-US.json';
import MensajesEspanol from './../components/lang/es-ES.json';
import { IntlProvider } from 'react-intl';

const langContext = React.createContext();

const LangProvider = ({ children }) => {
  let localePorDefecto;
  let mensajePorDefecto;
  const lang = localStorage.getItem('lang');

  if (lang) {
    localePorDefecto = lang;
    if (lang === 'es-ES') {
      mensajePorDefecto = MensajesEspanol;
    } else if (lang === 'en-US') {
      mensajePorDefecto = MensajesIngles;
    } else {
      localePorDefecto = 'en-US';
      mensajePorDefecto = MensajesIngles;
    }
  }
  const [mensajes, setMensajes] = React.useState(mensajePorDefecto);
  const [locale, setLocale] = React.useState(localePorDefecto);

  const establecerLenguaje = (lenguaje) => {
    //console.log(lenguaje);
    switch (lenguaje) {
      case 'es-ES':
        setMensajes(MensajesEspanol);
        setLocale('es-ES');
        localStorage.setItem('lang', 'es-ES');
        break;
      case 'en-US':
        setMensajes(MensajesIngles);
        setLocale('en-US');
        localStorage.setItem('lang', 'en-US');
        break;
      default:
        setMensajes(MensajesIngles);
        setLocale('en-US');
        localStorage.setItem('lang', 'en-US');
      //break;
    }
  };

  return (
    <langContext.Provider value={{ establecerLenguaje: establecerLenguaje }}>
      <IntlProvider locale={locale} messages={mensajes}>
        {children}
      </IntlProvider>
    </langContext.Provider>
  );
};

export { LangProvider, langContext };
