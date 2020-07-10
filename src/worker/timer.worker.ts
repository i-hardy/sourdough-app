import React from 'react';

/* eslint-disable no-restricted-globals */
function timeout(time: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  })
}

function convertToMs(time: number) {
  return time * 60_000;
}

async function handleTimer(event: MessageEvent) {
  const timeInMinutes = Number.parseFloat(event.data);
  console.log(`Waiting for ${timeInMinutes} minutes`)
  await timeout(convertToMs(timeInMinutes));  
  self.postMessage(true);
}

self.addEventListener('message', handleTimer, false);
