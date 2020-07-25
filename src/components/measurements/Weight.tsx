import React, { useContext } from 'react';
import { RecipeContext } from '../../context';

interface WeightProps {
  amount: number;
}

export function Weight({ amount }: WeightProps) {
  const { loaves } = useContext(RecipeContext);

  return (
    <span>{Math.floor(amount * loaves)} grams</span>
  )
}
