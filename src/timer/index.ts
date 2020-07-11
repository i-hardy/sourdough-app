import { useState, useEffect } from 'react';
import { makeReadableTime } from './timeUtils';
// eslint-disable-next-line import/no-webpack-loader-syntax
import * as workerPath from "file-loader?name=[name].js!./timer.worker";

const initialTime = '00:00:00'
const worker = new Worker(workerPath, { type: 'module' })

interface TimerProperties {
  ready: boolean; waiting: boolean; time: string;
}

interface TimerFunctions {
  setTimers: Function;
  stopTimers: Function;
}

export function useTimer(): [TimerProperties, TimerFunctions] {
  const [waiting, setIsWaiting] = useState(false);
  const [ready, setIsReady] = useState(false);
  const [time, setTime] = useState(initialTime);
  
  function setTimers(waitTime: number) {
    if (!waiting) {
      setIsReady(false);
      setIsWaiting(true);
      worker.postMessage(waitTime);
    }
  }

  function stopTimers() {
    if (waiting) {
      setIsWaiting(false);
      worker.postMessage('stop');
    }
  }

  function updateStatus(event: MessageEvent) {
    if (event.data === 'done') {
      setIsWaiting(false);
      setIsReady(true);
      setTime(initialTime);
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
  }, {
    setTimers,
    stopTimers
  }]
}