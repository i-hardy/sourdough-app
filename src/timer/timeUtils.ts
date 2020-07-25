const HOURS_FROM_SECONDS = 3600;

function remainingHours(seconds: number) {
  return Math.floor(seconds / HOURS_FROM_SECONDS)
}

function remainingMinutes(seconds: number) {
  const remainderAfterHour = seconds % HOURS_FROM_SECONDS || 0;
  return Math.floor(remainderAfterHour / 60);
}

function remainingSeconds(seconds: number) {
  return seconds % 60 || 0;
}

function timeStringSegment(timeSegment: number) {
  return timeSegment > 9 ? `${timeSegment}` : `0${timeSegment}`
}

function withTime(time: number) {
  return function callWithTime(fn: Function) {
    return timeStringSegment(fn(time))
  }
}

export function makeReadableTime(timeInSeconds: number) {
  return [remainingHours, remainingMinutes, remainingSeconds]
    .map(withTime(timeInSeconds))
    .join(':')
}