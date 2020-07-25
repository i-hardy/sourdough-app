import React, { useContext } from 'react';

import { RecipeContext } from '../context';
import { GridItem } from './styled/Layout';
import { List } from './styled/List';
import { Form, Input } from './styled/Form';
import { Weight } from './measurements/Weight';
import ingredients from '../recipe/ingredients.json';

interface Ingredient {
  name: string;
  quantity: number;
}

interface IngredientsProps {
  setLoaves: Function;
}

function IngredientListItem({ name, quantity }: Ingredient) {
  return (
    <li key={name}><Weight amount={quantity} /> {name}</li>
  )
}

export function Ingredients({ setLoaves }: IngredientsProps) {
  const { loaves } = useContext(RecipeContext);

  function changeLoafAmount(event: React.ChangeEvent<HTMLInputElement>) {
    const loafAmount = Number.parseInt(event.target.value, 10);
    // Allow NaN value when user deletes input content
    if (loafAmount > 0 || !loafAmount) {
      setLoaves(loafAmount)
    }
  }

  return (
    <GridItem area="2 / 1 / 3 / 2">
      <h2>Ingredients</h2>
      <Form onSubmit={e => e.preventDefault()}>
        <label htmlFor="loaves">
          Loaves:
          <Input type="number" name="loaves" aria-label="Adjust the number of loaves for the recipe" id="loaves" value={loaves} onChange={changeLoafAmount} />
        </label>
      </Form>
      <div>
        <h3>For the levain:</h3>
          <List>
            {ingredients.levain.map(IngredientListItem)}
          </List>
      </div>
      <div>
        <h3>For the dough:</h3>
        <List>
          {ingredients.dough.map(IngredientListItem)}
        </List>
      </div>
      <div>
        <h3>Additionally:</h3>
        <List>
          <li>Rice flour or all-purpose flour for dusting</li>
        </List>
      </div>
    </GridItem>
  )
}