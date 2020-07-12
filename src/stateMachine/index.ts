import { Machine } from 'xstate';
import { DoughStateSchema, DoughContext, DoughEvent } from './interfaces';
import { reset, stretchDough, bakeUncovered } from './actions';
import { breadFinished, stretchesComplete } from './conditions';
import timings from '../recipe/timings.json';

export type { DoughContext, DoughEvent } from './interfaces';

export const doughMachine = Machine<DoughContext, DoughStateSchema, DoughEvent>({
  id: 'sourdough',
  initial: 'idle',
  context: {
    stretches: 0,
    stretchWait: timings.stretch.short,
    bakeTime: timings.bake.covered,
  },
  states: {
    idle: {
      on: {
        START: 'levain'
      }
    },
    levain: {
      meta: {
        wait: timings.levain
      },
      on: {
        NEXT: 'autolyse',
      }
    },
    autolyse: {
      meta: {
        wait: timings.autolyse
      },
      on: {
        NEXT: 'leaven'
      }
    },
    leaven: {
      meta: {
        wait: timings.leaven
      },
      on: {
        NEXT: 'salt'
      }
    },
    salt: {
      meta: {
        wait: timings.salt
      },
      on: {
        NEXT: 'stretch'
      }
    },
    stretch: {
      always: {
        target: 'rest',
        cond: stretchesComplete
      },
      on: {
        NEXT: {
          target: 'stretch',
          actions: stretchDough
        },
      }
    },
    rest: {
      meta: {
        wait: timings.rest
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
      meta: {
        suppressTimer: true
      },
      on: {
        NEXT: 'preheat'
      }
    },
    preheat: {
      meta: {
        suppressTimer: true,
        wait: timings.preheat
      },
      on: {
        NEXT: 'bake'
      }
    },
    bake: {
      always: {
        target: 'idle',
        cond: breadFinished,
        actions: reset
      },
      on: {
        NEXT: {
          target: 'bake',
          actions: bakeUncovered
        },
      }
    }
  }
});
