import { getNextStationTimes } from '@opencltbrigade/lynx-blue-line-schedule-sdk';
import * as constants from 'lynx-schedule-json/output/constants';

export async function nextTrains(event) {
  const {
    queryStringParameters: { time, direction, station } = {
      time: null,
      direction: constants.DIRECTION_KEY_INBOUND,
      station: constants.STATION_LYNX_I485_STATION
    }
  } = event;

  const dateTime = time === null ? new Date() : new Date(time);
  const schedule = getNextStationTimes(station, direction, dateTime);

  return {
    statusCode: 200,
    body: {
      schedule
    }
  };
}

export async function listStations(event) {
  return {
    statusCode: 200,
    body: {
      stationKeys: Object.keys(constants).filter((key) => key.indexOf('STATION_') === 0)
    }
  };
}
