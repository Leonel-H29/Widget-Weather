import * as React from 'react';
import MensajesIngles from './../components/lang/en-US.json';
import MensajesEspanol from './../components/lang/es-ES.json';
import { IntlProvider } from 'react-intl';
const langContext = React.createContext();

const LangProvider = ({ children }) => {
  const [mensajes, setMensajes] = React.useState(MensajesIngles);
  const [locale, setLocale] = React.useState('en-US');

  const establecerLenguaje = (lenguaje) => {
    //console.log(lenguaje);
    switch (lenguaje) {
      case 'es-ES':
        setMensajes(MensajesEspanol);
        setLocale('es-ES');
        break;
      case 'en-US':
        setMensajes(MensajesIngles);
        setLocale('en-US');
        break;
      default:
        setMensajes(MensajesIngles);
        setLocale('en-US');
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
