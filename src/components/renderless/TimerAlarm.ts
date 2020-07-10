import { useEffect } from 'react';
import useSound from 'use-sound';
import timerAlarm from '../../assets/alarm.mp3';

export function TimerAlarm({ ready }: { ready: boolean }) {
  const [play, { stop }] = useSound(timerAlarm);

  useEffect(() => {
    if (ready) {
      play();
    } else {
      stop();
    }
  }, [ready, play, stop])

  return null
}