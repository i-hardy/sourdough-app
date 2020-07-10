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
  };
}

export interface DoughContext {
  stretches: number;
  stretchWait: number;
}

export type DoughEvent =
  { type: 'START' }
  | { type: 'NEXT'; duration: number };