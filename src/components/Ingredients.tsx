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
      <li key={name}>{Math.floor(quantity * loaves)} grams {name}</li>
    )
  }

  function changeLoafAmount(event: React.ChangeEvent<HTMLInputElement>) {
    const loafAmount = Number.parseInt(event.target.value, 10);
    if (loafAmount > 0) {
      setLoaves(loafAmount)
    }
  }

  return (
    <section className="ingredients">
      <h2>Ingredients</h2>
      <p>
        <label htmlFor="loaves">
          Loaves:
          <input type="number" name="loaves" id="loaves" value={loaves} onChange={changeLoafAmount} />
        </label>
      </p>
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
          <li>Some rice flour or plain/all-purpose flour for dusting</li>
        </ul>
      </div>
    </section>
  )
}