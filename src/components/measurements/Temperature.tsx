import React from 'react';

export enum TemperatureUnit {
  CELSIUS = 'celsius',
  FAHRENHEIT = 'fahrenheit'
}

interface TemperatureProps {
  temp: number;
  unit: TemperatureUnit;
}

// (0°C × 9/5) + 32 = 32°F
function convertCelsiusToFahrenheit(celsius: number) {
  return Math.round((celsius * 9 / 5) + 32);
}

export function Temperature({ temp, unit = TemperatureUnit.CELSIUS }: TemperatureProps) {
  if (unit === TemperatureUnit.FAHRENHEIT) {
    return (
      <span>{convertCelsiusToFahrenheit(temp)}℉</span>
    )
  }
  return (
    <span>{temp}℃</span>
  )
}
