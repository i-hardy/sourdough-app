import React, { useState, useEffect } from 'react';
import { StateValue } from 'xstate';
import ReactMarkdown from 'react-markdown';
import { recipe } from '../recipe';

async function fetchRecipeSection(path: string) {
  const result = await fetch(path);
  return result.text();
}

function capitalise(word: string) {
  return `${word[0].toUpperCase()}${word.slice(1)}`
}

export function Step({ value }: { value: StateValue }) {
  const stateValue = value as string;
  const [text, setText] = useState('');

  useEffect(() => {
    if (recipe[stateValue]) {
      fetchRecipeSection(recipe[stateValue])
        .then(setText);
    } else {
      setText('');
    }
  }, [stateValue])

  return (
    <div>
      <h2>{capitalise(stateValue)}</h2>
      <ReactMarkdown source={text} />
    </div>
  )
}