import { useState } from 'react';
import { TextField, Container } from '@mui/material';

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
            required
          />
        </form>
      </Container>
    </div>
  );
}
