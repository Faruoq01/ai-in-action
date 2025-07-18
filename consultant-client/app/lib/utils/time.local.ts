const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');

dayjs.extend(utc);
dayjs.extend(timezone);

export const getLocalTime = (timestamp: number) => {
    const tz = 'Africa/Lagos';
    const formattedDate = dayjs(timestamp).tz(tz).format('MMM DD, YY');
    return formattedDate;
}
