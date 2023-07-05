import dayjs from 'dayjs';

export function getThreeDays() {
  const today = dayjs();
  const dayArray = [];

  for (let i = 0; i < 3; i++) {
    const date = today.add(i, 'day');
    const dayObject = {
      day: date.format('dddd'),
      date: date.format('DD MMM'),
      longDate: date.format("YYYY-MM-DD"),
    };
    dayArray.push(dayObject);
  }

  return dayArray;
}
