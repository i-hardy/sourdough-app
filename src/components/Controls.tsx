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
      <p>{time}</p>
      <div className="buttons">
        <button disabled={waiting} className="button" onClick={() => actions.continueRecipe()}>
          {waiting ? 'Waiting...' : 'Finished this step'}
        </button>
        <button className="button" onClick={() => actions.skip()}>
          Skip to next step
        </button>
        {waiting &&
          <button className="button" onClick={() => actions.reset()}>
            Restart step
          </button>
        }
      </div>
    </div>
  )
}