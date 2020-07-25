import React from 'react';

export enum TemperatureUnit {
  CELSIUS = 'celsius',
  FAHRENHEIT = 'fahrenheit'
}

export enum WeightUnit {
  METRIC = 'grams',
  IMPERIAL = 'ounces',
}

export const baseContext = {
  loaves: 2,
  temperatureUnit: TemperatureUnit.CELSIUS,
};

export const RecipeContext = React.createContext(baseContext);
