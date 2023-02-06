/* eslint-disable jsx-a11y/alt-text */
import * as React from 'react';
import es from './../img/spain.png';
import en from './../img/united-kingdom.png';
import { Container, ButtonGroup, Button } from '@mui/material';
import { langContext } from '../context/lang-context';

function OptionsLangComp() {
  const idioma = React.useContext(langContext);
  const [espanol, SetEspanol] = React.useState(false);
  const [ingles, SetIngles] = React.useState(true);
  const [title_es, SetTitle_Es] = React.useState('Change to Spanish');
  const [title_en, SetTitle_En] = React.useState(
    'The system is now at English'
  );
  return (
    <Container>
      <ButtonGroup
        variant="contained"
        aria-label="outlined primary button group"
      >
        <Button
          onClick={() => {
            idioma.establecerLenguaje('es-ES');
            SetEspanol(true);
            SetIngles(false);
            SetTitle_En('Cambiar a Ingles');
          }}
          disabled={espanol}
          title={title_es}
        >
          <img src={es} width="30" />
        </Button>
        <Button
          onClick={() => {
            idioma.establecerLenguaje('en-US');
            SetEspanol(false);
            SetIngles(true);
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
