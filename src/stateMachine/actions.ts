import { assign } from 'xstate';
import { DoughContext } from './interfaces';
import timings from '../recipe/timings.json';

export const reset = assign<DoughContext>({
  stretches: 0,
  stretchWait: timings.stretch.short,
});

export const stretchDough = assign<DoughContext>({
  stretches: (context: DoughContext) => context.stretches + 1,
  stretchWait: (context: DoughContext) => {
    if (context.stretches >= 2) return timings.stretch.long;
    return timings.stretch.short;
  }
});

export const bakeUncovered = assign<DoughContext>({
  bakeTime: timings.bake.uncovered
});