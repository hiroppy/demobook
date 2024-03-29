import { format } from 'date-fns';

export function convertStringFromUnixTime(t: number) {
  return format(t, 'MM/dd HH:mm');
}
