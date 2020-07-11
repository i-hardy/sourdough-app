/* eslint-disable no-restricted-globals */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';

enum Timer {
  GLOBAL = 'global',
  COUNT_DOWN = 'countDown'
}

const timers: { [key: string]: NodeJS.Timeout | null } = {
  countDown: null,
  global: null,
}

function timeout(time: number, id: string) {
  return new Promise((resolve, reject) => {
    function interruptTimer(event: MessageEvent) {
      if (event.data === 'stop') {
        Object.values(timers).forEach((timerId) => {
          if (timerId) clearTimeout(timerId);
        })
        reject()
      }
    }

    self.addEventListener('message', interruptTimer, false);

    timers[id] = setTimeout(() => {
      self.removeEventListener('message', interruptTimer);
      resolve();
    }, time);
  })
}

function convertToSeconds(minutes: number) {
  return minutes * 60;
}

function convertToMilliseconds(minutes: number) {
  return convertToSeconds(minutes) * 1000;
}

async function countDown(iterations: number) {
  self.postMessage(iterations);
  if (iterations) {
    try {
      await timeout(1000, Timer.COUNT_DOWN);
      countDown(iterations - 1);
    } catch (error) {
      countDown(0);
    }
  }
}

async function handleTimer(event: MessageEvent) {
  if (event.data !== 'stop') {
    try {
      const timeInMinutes = Number.parseFloat(event.data);
      countDown(convertToSeconds(timeInMinutes));
      await timeout(convertToMilliseconds(timeInMinutes), Timer.GLOBAL);  
      self.postMessage('done');
    } catch (error) {
      self.postMessage('interrupted');
    }
  }
}

self.addEventListener('message', handleTimer, false);
