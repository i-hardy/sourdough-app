import { useState, useEffect } from 'react';
import { makeReadableTime } from './timeUtils';
// eslint-disable-next-line import/no-webpack-loader-syntax
import * as workerPath from "file-loader?name=[name].js!./timer.worker";

const worker = new Worker(workerPath, { type: 'module' })

export function useTimer(): [{ ready: boolean, waiting: boolean, time: string }, Function] {
  const [waiting, setIsWaiting] = useState(false);
  const [ready, setIsReady] = useState(false);
  const [time, setTime] = useState('');
  
  function sendMessage(waitTime: number) {
    if (!waiting) {
      setIsReady(false);
      setIsWaiting(true);
      worker.postMessage(waitTime);
    }
  }

  function updateStatus(event: MessageEvent) {
    if (event.data === 'done') {
      setIsWaiting(false);
      setIsReady(true);
      setTime('');
    } else {
      setTime(makeReadableTime(event.data))
    }
  }

  useEffect(() => {
    worker.addEventListener('message', updateStatus)
    return () => {
      worker.removeEventListener('message', updateStatus)
    }
  });

  return [{
    ready,
    waiting,
    time,
  }, sendMessage]
}