import { useState } from 'react';
import { TextField } from '@mui/material';
import { Container } from '@mui/material';

export default function WeatherFormComp({ onChangeCity }) {
  const [city, setCity] = useState('');

  function onChange(e) {
    const value = e.target.value;
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
            id="filled-basic"
            label="City"
            variant="outlined"
            onChange={onChange}
            fullWidth={true}
          />
        </form>
      </Container>
    </div>
  );
}
