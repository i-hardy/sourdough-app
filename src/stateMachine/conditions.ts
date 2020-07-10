import { DoughContext } from './interfaces';

export function breadFinished(context: DoughContext) {
  return context.bakeTime === 30;
}

export function stretchesComplete(context: DoughContext) {
  return context.stretches >= 6;
}