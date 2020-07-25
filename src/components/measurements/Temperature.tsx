import React, { useContext } from 'react';
import { RecipeContext, TemperatureUnit } from '../../context';

interface TemperatureProps {
  temp: number;
}

// (0°C × 9/5) + 32 = 32°F
function convertCelsiusToFahrenheit(celsius: number) {
  return Math.round((celsius * 9 / 5) + 32);
}

export function Temperature({ temp }: TemperatureProps) {
  const { temperatureUnit } = useContext(RecipeContext);

  if (temperatureUnit === TemperatureUnit.FAHRENHEIT) {
    return (
      <span>{convertCelsiusToFahrenheit(temp)}℉</span>
    )
  }
  return (
    <span>{temp}℃</span>
  )
}
