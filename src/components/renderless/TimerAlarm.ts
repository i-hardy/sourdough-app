import { useEffect } from 'react';
import useSound from 'use-sound';
import timerAlarm from '../../assets/alarm.mp3';

export function TimerAlarm({ ready }: { ready: boolean }) {
  const [play] = useSound(timerAlarm);

  useEffect(() => {
    if (ready) {
      play()
    }
  }, [ready, play])

  return null
}