import dayjs from 'dayjs';

export const camelToUpperSnakeCase = str => {
  return str.replace(/[A-Z]/g, letter => `_${letter}`).toUpperCase();
};

export const formatDate = dateString => {
  const date = dayjs(dateString);
  return date.format('YY-MM-DD / HH:mm');
};

export const getNo = (pagination, index) => {
  const start =
    (pagination.totalPages - pagination.pageNumber) * pagination.pageSize;
  return start + index + 1;
};
