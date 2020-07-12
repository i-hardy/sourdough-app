import React from 'react';

export function Stretch({ stretches }: { stretches: number }) {
  return (
    <div>
      <p aria-live="polite">Stretches completed: {stretches}</p>
    </div>
  )
}