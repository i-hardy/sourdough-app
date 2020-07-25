import React, { useState } from 'react';
import { GridItem } from './styled/Layout';
import { List } from './styled/List';
import { Form, Input } from './styled/Form';
import ingredients from '../recipe/ingredients.json';

interface Ingredient {
  name: string;
  quantity: number;
}

export function Ingredients() {
  const [loaves, setLoaves] = useState(2);
  
  function IngredientListItem({ name, quantity }: Ingredient) {
    return (
      <li key={name}>{Math.floor(quantity * loaves) || 0} grams {name}</li>
    )
  }

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