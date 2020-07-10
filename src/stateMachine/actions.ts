import { assign } from 'xstate';
import { DoughContext } from './interfaces';

export const reset = assign<DoughContext>({
  stretches: 0,
  stretchWait: 15,
});

export const stretchDough = assign<DoughContext>({
  stretches: (context: DoughContext) => context.stretches + 1,
  stretchWait: (context: DoughContext) => {
    if (context.stretches >= 2) return 30;
    return 15;
  }
});

export const bakeUncovered = assign<DoughContext>({
  bakeTime: 30
});