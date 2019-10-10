const { getNextStationTimes, getStopAsDate, getTimeUntilStop } = require('@opencltbrigade/lynx-blue-line-schedule-sdk');
const constants = require('lynx-schedule-json/output/constants');

module.exports = (event, context) => {
  const {
    query: { time, station } = {
      time: null,
      station: constants.STATION_LYNX_I485_STATION
    }
  } = event;

  const dateTime = time === null ? new Date() : new Date(time);

  const inbound = getNextStationTimes(station, constants.DIRECTION_KEY_INBOUND, dateTime);
  const outbound = getNextStationTimes(station, constants.DIRECTION_KEY_OUTBOUND, dateTime);

  const inboundStopDate = getStopAsDate(inbound[0]);
  const outboundStopDate = getStopAsDate(outbound[0]);

  const minutesUntilInbound = getTimeUntilStop(inboundStopDate);
  const minutesUntilOutbound = getTimeUntilStop(outboundStopDate);

  const result = {
    station: {
      name: station
    },
    next_stops: {
      inbound,
      outbound
    },
    minutes_until: {
      inbound: minutesUntilInbound,
      outbound: minutesUntilOutbound
    }
  };

  context.status(200).succeed(result);
};
