export interface DoughStateSchema {
  states: {
    idle: {};
    levain: {};
    autolyse: {};
    leaven: {};
    salt: {};
    stretch: {};
    rest: {};
    shape: {};
    proof: {};
    preheat: {};
    bake: {};
  };
}

export interface DoughContext {
  stretches: number;
  stretchWait: number;
  bakeTime: number;
}

export type DoughEvent =
  { type: 'START' }
  | { type: 'NEXT' };