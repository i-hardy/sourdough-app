import React from 'react';

export function Stretch({ stretches }: { stretches: number }) {
  return (
    <div>
      <p>Stretches completed: {stretches}</p>
    </div>
  )
}