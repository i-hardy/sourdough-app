import React, { ReactChild } from 'react';
import { State } from 'xstate';

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

export function Instructions({ current, children }: InstructionProps) {
  const stateValue = current.value as string;
  const RecipeStep = recipe[stateValue];

  return (
    <Columns>
      <div aria-live="polite">
        <RecipeStep />
        {current.matches('stretch') && <Stretch stretches={current.context.stretches} />}
      </div>
      {children}
    </Columns>
  );
}