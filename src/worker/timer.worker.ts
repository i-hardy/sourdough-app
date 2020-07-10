/* eslint-disable no-restricted-globals */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';

function timeout(time: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  })
}

function convertToSeconds(minutes: number) {
  return minutes * 60;
}

function convertToMilliseconds(minutes: number) {
  return convertToSeconds(minutes) * 1000;
}

async function countDown(iterations: number) {
  if (iterations) {
    self.postMessage(iterations);
    await timeout(1000);
    countDown(iterations - 1);
  }
}

async function handleTimer(event: MessageEvent) {
  const timeInMinutes = Number.parseFloat(event.data);
  countDown(convertToSeconds(timeInMinutes));
  await timeout(convertToMilliseconds(timeInMinutes));  
  self.postMessage('done');
}

self.addEventListener('message', handleTimer, false);
