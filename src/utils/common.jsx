import dayjs from 'dayjs';

export const camelToUpperSnakeCase = str => {
  return str.replace(/[A-Z]/g, letter => `_${letter}`).toUpperCase();
};

export const formatDate = dateString => {
  const date = dayjs(dateString);
  const formattedDate = date.format('YY-MM-DD / HH:mm');

  return formattedDate;
};
