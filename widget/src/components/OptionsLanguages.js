/* eslint-disable jsx-a11y/alt-text */
import * as React from 'react';
import es from './../img/spain.png';
import en from './../img/united-kingdom.png';
import { Container, ButtonGroup, Button } from '@mui/material';
import { langContext } from '../context/lang-context';

const lang = localStorage.getItem('lang');
function OptionsLangComp() {
  const idioma = React.useContext(langContext);
  const [espanol, SetEspanol] = React.useState(false);
  const [ingles, SetIngles] = React.useState(true);
  const [title_es, SetTitle_Es] = React.useState('Change to Spanish');
  const [title_en, SetTitle_En] = React.useState('');

  React.useEffect(() => {
    if (lang) {
      if (lang !== 'en-US') {
        SetEspanol(true);
        SetIngles(false);
        SetTitle_En('Cambiar a Ingles');
        SetTitle_Es('El sistema esta en Español');
      }
    }
  }, []);

  return (
    <Container>
      <ButtonGroup
        variant="contained"
        aria-label="outlined primary button group"
      >
        <Button
          onClick={() => {
            window.location.reload();
            idioma.establecerLenguaje('es-ES');

            SetEspanol(true);
            SetIngles(false);
            SetTitle_En('Cambiar a Ingles');
            SetTitle_Es('El sistema esta en Español');
          }}
          disabled={espanol}
          title={title_es}
        >
          <img src={es} width="30" />
        </Button>
        <Button
          onClick={() => {
            window.location.reload();
            idioma.establecerLenguaje('en-US');

            SetEspanol(false);
            SetIngles(true);
            SetTitle_En('The system is now at English');
            SetTitle_Es('Change to Spanish');
          }}
          disabled={ingles}
          title={title_en}
        >
          <img src={en} width="30" />
        </Button>
      </ButtonGroup>
    </Container>
  );
}
export default OptionsLangComp;
