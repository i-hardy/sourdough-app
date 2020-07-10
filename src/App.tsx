import React, { useEffect, useCallback } from 'react';
import { useMachine } from '@xstate/react';
import './App.css';
import { useTimer } from './worker';
import { doughMachine } from './stateMachine';
import { KeyboardHandler } from './components/renderless/KeyboardHandler';
import { TimerAlarm } from './components/renderless/TimerAlarm';
import { Ingredients } from './components/Ingredients';
import { Instructions } from './components/Instructions';

function App() {
  const [{ ready, waiting, time }, sendMessage] = useTimer();
  const [current, send] = useMachine(doughMachine);

  const continueRecipe = useCallback(() => {
    const currentStepMeta = current.meta[`sourdough.${current.value}`];
    if (currentStepMeta) {
      sendMessage(currentStepMeta.wait);
    } else {
      sendMessage(0);
    }
  }, [current.meta, current.value, sendMessage])

  useEffect(() => {
    if (ready) {
      send('NEXT');
    }
  }, [ready, send])

  return (
    <div className="app">
      {!current.matches('idle') && <>
        <KeyboardHandler continueRecipe={continueRecipe} />
        <TimerAlarm ready={ready} />
      </>}
      <header className="header">
        <h1>Let's Make Sourdough!</h1>
      </header>
      <Ingredients />
      <Instructions
        current={current}
        start={() => send('START')}
        continueRecipe={continueRecipe}
        waiting={waiting}
        time={time} />
    </div>
  );
}

export default App;
