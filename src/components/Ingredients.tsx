import React from 'react';

export function Ingredients() {
  return (
    <section className="ingredients">
      <h2>Ingredients</h2>
      <p>Quantity: 2 loaves</p>
      <div>
        <h3>For the levain:</h3>
          <ul>
            <li>35 grams bread flour</li>
            <li>35 grams whole wheat flour</li>
            <li>35 grams mature starter</li>
            <li>70 grams filtered water</li>
          </ul>
      </div>
      <div>
        <h3>For the dough:</h3>
        <ul>
          <li>810 grams bread flour</li>
          <li>90 grams whole wheat flour</li>
          <li>680 grams filtered water (at 90℉)</li>
          <li>18 grams fine sea salt</li>
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