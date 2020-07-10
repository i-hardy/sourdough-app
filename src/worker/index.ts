import { useState, useEffect } from 'react';
// eslint-disable-next-line import/no-webpack-loader-syntax
import * as workerPath from "file-loader?name=[name].js!./timer.worker";

const worker = new Worker(workerPath)

export function useTimer(): [boolean, boolean, Function] {
  const [isWorking, setIsWorking] = useState(false);
  const [status, setStatus] = useState(false);
  
  function sendMessage(message: any) {
    if (!isWorking) {
      setStatus(false);
      setIsWorking(true);
      worker.postMessage(message);
    }
  }

  function updateStatus(event: MessageEvent) {
    setIsWorking(false);
    setStatus(event.data);
  }

  useEffect(() => {
    worker.addEventListener('message', updateStatus)
    return () => {
      worker.removeEventListener('message', updateStatus)
    }
  });

  return [status, isWorking, sendMessage]
}