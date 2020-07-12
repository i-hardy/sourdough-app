/* eslint-disable no-restricted-globals */
// Hack to make the TS compiler think this is a module
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';

let timer: NodeJS.Timeout | null = null;

function timeout(time: number) {
  return new Promise((resolve, reject) => {
    function interruptTimer(event: MessageEvent) {
      if (event.data === 'stop') {
        if (timer) clearTimeout(timer);
        reject()
      }
    }

    self.addEventListener('message', interruptTimer, false);

    timer = setTimeout(() => {
      self.removeEventListener('message', interruptTimer);
      resolve();
    }, time);
  })
}

function convertToSeconds(minutes: number) {
  return minutes * 60;
}

async function countDown(iterations: number): Promise<void> {
  self.postMessage(iterations);
  if (iterations) {
    try {
      await timeout(1000);
      return countDown(iterations - 1);
    } catch (error) {
      return self.postMessage('interrupted');
    }
  }
  return self.postMessage('done');
}

async function handleTimer(event: MessageEvent) {
  if (event.data !== 'stop') {
    const timeInMinutes = Number.parseFloat(event.data);
    await countDown(convertToSeconds(timeInMinutes));
  }
}

self.addEventListener('message', handleTimer, false);
