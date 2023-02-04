import { useState, useEffect } from 'react';
import { TextField, Container } from '@mui/material';

export default function WeatherFormComp({ onChangeCity }) {
  const [city, setCity] = useState('');
  const [fail, setFail] = useState(null);

  useEffect(() => {
    if (city.length >= 0 && city.length === 2)
      setFail('You must write as min 3 characters');
    else setFail(null);
  }, [city]);

  function onChange(e) {
    const value = e.target.value;
    //const errorCity = false;

    if (value !== '') setCity(value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onChangeCity(city);
  }
  return (
    <div>
      <Container>
        <form onSubmit={handleSubmit}>
          <TextField
            error={city.length >= 0 && city.length === 2}
            id="filled-basic"
            label="City"
            variant="outlined"
            onChange={onChange}
            fullWidth={true}
            required
            helperText={fail}
          />
        </form>
      </Container>
    </div>
  );
}
