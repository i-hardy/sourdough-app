import React, { useEffect, useCallback, useState } from 'react';
import { useMachine } from '@xstate/react';
import { State } from 'xstate';

import { useTimer } from './timer';
import { doughMachine, DoughContext, DoughEvent } from './stateMachine';

import { baseContext, RecipeContext } from './context';
import { KeyboardHandler } from './components/renderless/KeyboardHandler';
import { TimerAlarm } from './components/renderless/TimerAlarm';

import { Main, GridItem, Header, Column } from './components/styled/Layout';
import { BigButton } from "./components/styled/Button";
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
  const [recipeSettings, setRecipeSettings] = useState(baseContext);
  const [current, send] = useMachine(doughMachine);
  const { suppressTimer } = current.meta[`sourdough.${current.value}`] || {};

  const continueRecipe = useCallback(() => {
    setTimers(determineNextInterval(current))
  }, [current, setTimers])

  function skip() {
    stopTimers();
    send('NEXT');
  }

  function setLoaves(amount: number) {
    setRecipeSettings({ ...recipeSettings, loaves: amount });
  }

  useEffect(() => {
    if (ready) {
      send('NEXT');
    }
  }, [ready, send])

  return (
    <Main>
      <RecipeContext.Provider value={recipeSettings}>
        <Header area="1 / 1 / 2 / 3">
          {!current.matches('idle') && <>
            <KeyboardHandler continueRecipe={continueRecipe} />
            <TimerAlarm ready={ready} suppressTimer={suppressTimer} />
          </>}
          <h1>Let's Make Sourdough!</h1>
        </Header>
        <Ingredients setLoaves={setLoaves} />
        <GridItem area="2 / 2 / 3 / 3">
          {current.matches('idle') ? 
            <Column>
              <BigButton onClick={() => send('START')}>Start</BigButton>
            </Column> :
            <Instructions
              current={current}>
                <Controls time={time} waiting={waiting} actions={{
                  continueRecipe,
                  skip,
                  reset: stopTimers
                }}/>
            </Instructions>
          }
        </GridItem>
      </RecipeContext.Provider>
    </Main>
  );
}

export default App;
