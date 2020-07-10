import { Machine } from 'xstate';
import { DoughStateSchema, DoughContext, DoughEvent } from './interfaces';
import { reset, stretchDough, bakeUncovered } from './actions';
import { breadFinished, stretchesComplete } from './conditions';

export type { DoughContext, DoughEvent } from './interfaces';

export const doughMachine = Machine<DoughContext, DoughStateSchema, DoughEvent>({
  id: 'sourdough',
  initial: 'idle',
  context: {
    stretches: 0,
    stretchWait: 15,
    bakeTime: 20,
  },
  states: {
    idle: {
      on: {
        START: 'levain'
      }
    },
    levain: {
      meta: {
        wait: 0.25
      },
      on: {
        NEXT: 'autolyse',
      }
    },
    autolyse: {
      meta: {
        wait: 0.25
      },
      on: {
        NEXT: 'leaven'
      }
    },
    leaven: {
      meta: {
        wait: 20
      },
      on: {
        NEXT: 'salt'
      }
    },
    salt: {
      meta: {
        wait: 15
      },
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
      meta: {
        wait: 90
      },
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
        NEXT: 'preheat'
      }
    },
    preheat: {
      meta: {
        wait: 60
      },
      on: {
        NEXT: 'bake'
      }
    },
    bake: {
      on: {
        NEXT: {
          target: 'bake',
          actions: bakeUncovered
        },
        '': {
          target: 'idle',
          cond: breadFinished,
          actions: reset
        }
      }
    }
  }
});
