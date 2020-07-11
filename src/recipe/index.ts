import levain from './steps/01. levain.md';
import autolyse from './steps/02. autolyse.md';
import leaven from './steps/03. leaven.md';
import salt from './steps/04. salt.md';
import stretch from './steps/05. stretch.md';
import rest from './steps/06. rest.md';
import shape from './steps/07. shape.md';
import proof from './steps/08. proof.md';
import preheat from './steps/09. preheat.md';
import bake from './steps/10. bake.md';

export const recipe: { [key: string]: string } = {
  levain,
  autolyse,
  leaven,
  salt,
  stretch,
  rest,
  shape,
  proof,
  preheat,
  bake
}