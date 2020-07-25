import React from 'react';
import { Button, ButtonGroup } from './styled/Button';

interface ControlProps {
  time: string;
  waiting: boolean;
  actions: {
    continueRecipe: Function;
    skip: Function;
    reset: Function;
  }
}

export function Controls({ time, waiting, actions }: ControlProps) {
  return (
    <div>
      <h3>Controls</h3>
      <div>
        <p>Time until next step</p>
        <p>{time}</p>
      </div>
      <ButtonGroup>
        <Button disabled={waiting} onClick={() => actions.continueRecipe()}>
          {waiting ? 'Waiting...' : 'Continue the recipe'}
        </Button>
        <Button onClick={() => actions.skip()}>
          Skip to next step
        </Button>
        {waiting &&
          <>
            <Button onClick={() => actions.reset()}>
              Restart step
            </Button>
            <p role="alert">Timer set for the next step</p>
          </>
        }
      </ButtonGroup>
    </div>
  )
}