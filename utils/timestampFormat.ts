import dayjs from 'dayjs';

export const timeFormat = (timestamp: string) =>
  dayjs(timestamp).format('hh:mm A');
