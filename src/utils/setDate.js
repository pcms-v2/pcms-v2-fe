// DateFns를 사용하여 첫날짜 형식을 변경하는 함수
export const setToStartOfDay = date => {
  const newDate = new Date(date);
  newDate.setHours(0, 0, 0, 0);
  return newDate;
};

// DateFns를 사용하여 끝날짜 형식을 변경하는 함수
export const setToEndOfDay = date => {
  const newDate = new Date(date);
  newDate.setHours(23, 59, 59, 999);
  return newDate;
};
