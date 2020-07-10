import { Machine, assign } from 'xstate';
import { DoughStateSchema, DoughContext, DoughEvent } from './interfaces';

const reset = assign<DoughContext>({
  stretches: 0,
  stretchWait: 15,
});

const stretchDough = assign<DoughContext>({
  stretches: (context: DoughContext) => context.stretches + 1,
  stretchWait: (context: DoughContext) => {
    if (context.stretches >= 2) return 30;
    return 15;
  }
});

function stretchesComplete(context: DoughContext) {
  return context.stretches >= 6;
}

export const doughMachine = Machine<DoughContext, DoughStateSchema, DoughEvent>({
  id: 'sourdough',
  initial: 'idle',
  context: {
    stretches: 0,
    stretchWait: 15,
  },
  states: {
    idle: {
      on: {
        START: 'levain'
      }
    },
    levain: {
      on: {
        NEXT: 'autolyse',
      }
    },
    autolyse: {
      on: {
        NEXT: 'leaven'
      }
    },
    leaven: {
      on: {
        NEXT: 'salt'
      }
    },
    salt: {
      on: {
        NEXT: 'stretch'
      }
    },
    stretch: {
      on: {
        NEXT: {
          target: 'stretch',
          actions: stretchDough
        },
        '': {
          target: 'rest',
          cond: stretchesComplete
        },
      }
    },
    rest: {
      on: {
        NEXT: 'shape'
      }
    },
    shape: {
      on: {
        NEXT: 'proof'
      }
    },
    proof: {
      on: {
        NEXT: {
          target: 'idle',
          actions: reset
        }
      }
    }
  }
});