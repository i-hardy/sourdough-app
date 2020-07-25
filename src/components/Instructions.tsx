import React, { useState, useEffect, ReactChild } from 'react';
import { State } from 'xstate';
import ReactMarkdown from 'react-markdown';

import { DoughContext, DoughEvent } from '../stateMachine';
import { Columns } from './styled/Layout';
import { Stretch } from './Stretch';
import { recipe } from '../recipe';

interface InstructionProps { 
  current: State<DoughContext, DoughEvent, any, {
    value: any;
    context: DoughContext;
  }>;
  children: ReactChild
}

async function fetchRecipeSection(path: string) {
  const result = await fetch(path);
  return result.text();
}

export function Instructions({ current, children }: InstructionProps) {
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
    <Columns>
      <div aria-live="polite">
        <ReactMarkdown source={stepText} />
        {current.matches('stretch') && <Stretch stretches={current.context.stretches} />}
      </div>
      {children}
    </Columns>
  );
}