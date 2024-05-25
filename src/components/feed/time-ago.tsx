import React from 'react';
import { Text } from 'react-native';
import { differenceInMinutes, differenceInHours, differenceInSeconds, differenceInMonths } from 'date-fns';

interface TimeAgoProps {
  createdAt: Date;
}

const TimeAgo = ({ createdAt }: TimeAgoProps) => {
  const getTimeDifference = () => {
    const createdDate = createdAt;
    const now = new Date();

    const minutesDiff = differenceInMinutes(now, createdDate);
    const hoursDiff = differenceInHours(now, createdDate);
    const secondsDiff = differenceInSeconds(now, createdDate);
    const monthsDiff = differenceInMonths(now, createdDate);

    if (monthsDiff > 0) {
      return `${monthsDiff} month${monthsDiff > 1 ? 's' : ''} ago`;
    } else if (minutesDiff < 60) {
      return `${minutesDiff} minute${minutesDiff !== 1 ? 's' : ''} ago`;
    } else if (hoursDiff < 24) {
      return `${hoursDiff} hour${hoursDiff !== 1 ? 's' : ''} ago`;
    } else {
      return `${secondsDiff} second${secondsDiff !== 1 ? 's' : ''} ago`;
    }
  };

  return <Text>{getTimeDifference()}</Text>;
};

export default TimeAgo;
