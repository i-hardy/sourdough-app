import { useEffect } from 'react';
import useSound from 'use-sound';
import timerAlarm from '../../assets/alarm.mp3';

export function TimerAlarm({ ready, suppressTimer = false }: 
  { ready: boolean, suppressTimer?: boolean }) {
  const [play, { stop }] = useSound(timerAlarm);

  useEffect(() => {
    if (ready && !suppressTimer) {
      play();
    } else {
      stop();
    }
  }, [ready, play, stop, suppressTimer])

  return null
}