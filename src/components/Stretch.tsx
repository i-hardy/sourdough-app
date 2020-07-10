import React from 'react';
import { DoughContext } from '../stateMachine/interfaces';

export function Stretch({ stretches, stretchWait }: DoughContext) {
  return (
    <div>
      <p>Stretches completed: {stretches}</p>
      <p>Until next stretch: {stretchWait}</p>
    </div>
  )
}