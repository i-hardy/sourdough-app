import React from 'react';

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
      <div className="buttons">
        <button disabled={waiting} className="button" onClick={() => actions.continueRecipe()}>
          {waiting ? 'Waiting...' : 'Continue the recipe'}
        </button>
        <button className="button" onClick={() => actions.skip()}>
          Skip to next step
        </button>
        {waiting &&
          <>
            <button className="button" onClick={() => actions.reset()}>
              Restart step
            </button>
            <p role="alert">Timer set for the next step</p>
          </>
        }
      </div>
    </div>
  )
}