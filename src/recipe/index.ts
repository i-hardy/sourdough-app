import levain from './steps/01. levain.mdx';
import autolyse from './steps/02. autolyse.mdx';
import leaven from './steps/03. leaven.mdx';
import salt from './steps/04. salt.mdx';
import stretch from './steps/05. stretch.mdx';
import rest from './steps/06. rest.mdx';
import shape from './steps/07. shape.mdx';
import proof from './steps/08. proof.mdx';
import preheat from './steps/09. preheat.mdx';
import bake from './steps/10. bake.mdx';


export const recipe: { [key: string]: React.ElementType } = {
  levain,
  autolyse,
  leaven,
  salt,
  stretch,
  rest,
  shape,
  proof,
  preheat,
  bake,
}