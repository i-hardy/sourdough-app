import { useEffect, useCallback } from 'react';

export function KeyboardHandler({ continueRecipe }: { 
  continueRecipe: Function;
}) {
  const keyboardContinue = useCallback(({ key }: KeyboardEvent) => {
    if (key === ' ') {
      continueRecipe();
    }
  }, [continueRecipe]);

  useEffect(() => {
    window.addEventListener('keydown', keyboardContinue);
    return () => {
      window.removeEventListener('keydown', keyboardContinue);
    };
  }, [keyboardContinue]);

  return null;
}