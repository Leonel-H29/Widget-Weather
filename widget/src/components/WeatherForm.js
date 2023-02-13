import { useState, useEffect } from 'react';
import { TextField, Container, Button, Grid } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition'; // Importar el hook useSpeechRecognition desde 'react-speech-recognition'
import { Else, If, Then } from 'react-if-elseif-else-render';
const LabelForm = (
  <FormattedMessage id="app.label-form" defaultMessage="City" />
);
export default function WeatherFormComp({ onChangeCity }) {
  const [city, setCity] = useState('');
  const [fail, setFail] = useState(null);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition({});

  useEffect(() => {
    if (city.length >= 0 && city.length === 2)
      setFail('You must write as min 3 characters');
    else setFail(null);
  }, [city]);

  //Actualizo el estado de sitio
  function onChange(e) {
    const value = e.target.value;
    //const errorCity = false;

    if (value !== '') setCity(value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onChangeCity(city);
  }

  const startListening = () => {
    resetTranscript();
    //setMessage();
    SpeechRecognition.startListening({
      // Comandos no funcionan con es-HN
      // language: "es-HN",
      continuous: true,
    });
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
  };

  const InputSearch = (
    <TextField
      error={city.length >= 0 && city.length === 2}
      id="filled-basic"
      label={LabelForm}
      variant="outlined"
      onChange={onChange}
      fullWidth={true}
      required
      helperText={fail}
    />
  );

  const ButtonVoiceMicro = (
    <Grid item xs={12} sm={3}>
      <Button
        variant="contained"
        color="primary"
        onClick={SpeechRecognition.startListening}
        startIcon={<KeyboardVoiceIcon />}
        onMouseDown={startListening}
        onMouseUp={stopListening}
        onTouchStart={startListening}
        onTouchEnd={stopListening}
        onTouchCancel={stopListening}
      >
        Voice Search
      </Button>{' '}
    </Grid>
  );
  return (
    <div>
      <Container>
        <form onSubmit={handleSubmit}>
          {/*
          En caso de que el reconocimiento de voz sea reconocido por el navegador, ubico en
          boton de busqueda por voz al lado del Textfield, caso contrario solo aparecera el
          Textfield 
          */}
          <If condition={browserSupportsSpeechRecognition}>
            <Then>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={9}>
                  {InputSearch}
                </Grid>
                {ButtonVoiceMicro}
              </Grid>
            </Then>
            <Else>{InputSearch}</Else>
          </If>
        </form>
      </Container>
    </div>
  );
}
