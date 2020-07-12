import React, { useEffect, useCallback } from 'react';
import { useMachine } from '@xstate/react';
import { State } from 'xstate';
import './App.css';
import { useTimer } from './timer';
import { doughMachine, DoughContext, DoughEvent } from './stateMachine';
import { KeyboardHandler } from './components/renderless/KeyboardHandler';
import { TimerAlarm } from './components/renderless/TimerAlarm';
import { Controls } from './components/Controls';
import { Ingredients } from './components/Ingredients';
import { Instructions } from './components/Instructions';

function determineNextInterval(current: State<DoughContext, DoughEvent, any, {
  value: any;
  context: DoughContext;
}>) {
  const currentStepMeta = current.meta[`sourdough.${current.value}`];
  if (currentStepMeta) return currentStepMeta.wait;
  if (current.matches('stretch')) return current.context.stretchWait;
  if (current.matches('bake')) return current.context.bakeTime;
  return 0;
}

function App() {
  const [{ ready, waiting, time }, {
    setTimers,
    stopTimers
  }] = useTimer();
  const [current, send] = useMachine(doughMachine);
  const { suppressTimer } = current.meta[`sourdough.${current.value}`] || {};

  const continueRecipe = useCallback(() => {
    setTimers(determineNextInterval(current))
  }, [current, setTimers])

  function skip() {
    stopTimers();
    send('NEXT');
  }

  useEffect(() => {
    if (ready) {
      send('NEXT');
    }
  }, [ready, send])

  return (
    <div className="app">
      <header className="header">
        {!current.matches('idle') && <>
          <KeyboardHandler continueRecipe={continueRecipe} />
          <TimerAlarm ready={ready} suppressTimer={suppressTimer} />
        </>}
        <h1>Let's Make Sourdough!</h1>
      </header>
      <Ingredients />
      {current.matches('idle') ? 
        <section className="start">
          <button className="button" onClick={() => send('START')}>Start</button>
        </section> :
        <Instructions
          current={current}>
            <Controls time={time} waiting={waiting} actions={{
              continueRecipe,
              skip,
              reset: stopTimers
            }}/>
        </Instructions>
      }
    </div>
  );
}

export default App;
