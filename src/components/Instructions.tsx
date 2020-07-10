import React, { useState, useEffect } from 'react';
import { State } from 'xstate';
import ReactMarkdown from 'react-markdown';
import { DoughContext, DoughEvent } from '../stateMachine';
import { Stretch } from './Stretch';
import { recipe } from '../recipe';

interface InstructionProps { 
  current: State<DoughContext, DoughEvent, any, {
    value: any;
    context: DoughContext;
  }>;
  start: Function;
  continueRecipe: Function;
  waiting: boolean;
  time: string;
}

async function fetchRecipeSection(path: string) {
  const result = await fetch(path);
  return result.text();
}

export function Instructions({ current, start, continueRecipe, waiting, time }: InstructionProps) {
  const stateValue = current.value as string;
  const [stepText, setStepText] = useState('');

  useEffect(() => {
    if (recipe[stateValue]) {
      fetchRecipeSection(recipe[stateValue])
        .then(setStepText);
    } else {
      setStepText('');
    }
  }, [stateValue])

  return (
    <section className="instructions">
      {current.matches('idle') ? 
        <button className="start-button" onClick={() => start()}>Start</button>
        :
        <>
          <button disabled={waiting} className="next-button" onClick={() => continueRecipe()}>
            {waiting ? 'Waiting...' : 'Continue'}
          </button>
          <p>{time}</p>
          <ReactMarkdown source={stepText} />
          {current.matches('stretch') && <Stretch {...current.context} />}
        </>}
    </section>
  );
}