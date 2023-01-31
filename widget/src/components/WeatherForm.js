import { useState } from 'react';
import { TextField } from '@mui/material';

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
    <div className="container">
      <form onSubmit={handleSubmit}>
        {/*
        <input type="text" onChange={onChange}></input>
  */}
        <TextField id="filled-basic" label="City" onChange={onChange} />
      </form>
    </div>
  );
}
