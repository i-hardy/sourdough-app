import React from 'react';
import { useMachine } from '@xstate/react';
import 'normalize.css';
import './App.css';
import { doughMachine } from './stateMachine/doughMachine';
import { Stretch } from './components/Stretch';
import { Step } from './components/Step';
import { Ingredients } from './components/Ingredients';

function App() {
  const [current, send] = useMachine(doughMachine);  
  return (
    <div className="app">
      <header className="header">
        <h1>Let's Make Sourdough!</h1>
      </header>
      <Ingredients />
      <section className="instructions">
        {current.matches('idle') ? 
          <button onClick={() => send('START')}>Start</button>
          :
          <>
            <button onClick={() => send('NEXT')}>Next step</button>
            <Step value={current.value}/>
            {current.matches('stretch') && <Stretch {...current.context} />}
          </>}
      </section>
    </div>
  );
}

export default App;
