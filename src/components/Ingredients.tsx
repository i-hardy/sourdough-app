import React, { useState } from 'react';
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
    <section className="ingredients">
      <h2>Ingredients</h2>
      <form onSubmit={e => e.preventDefault()}>
        <label htmlFor="loaves">
          Loaves:
          <input type="number" name="loaves" aria-label="Adjust the number of loaves for the recipe" id="loaves" value={loaves} onChange={changeLoafAmount} />
        </label>
      </form>
      <div>
        <h3>For the levain:</h3>
          <ul>
            {ingredients.levain.map(IngredientListItem)}
          </ul>
      </div>
      <div>
        <h3>For the dough:</h3>
        <ul>
          {ingredients.dough.map(IngredientListItem)}
        </ul>
      </div>
      <div>
        <h3>Additionally:</h3>
        <ul>
          <li>Rice flour or all-purpose flour for dusting</li>
        </ul>
      </div>
    </section>
  )
}