export const isValidString = str => {
  const regex = /^[가-힣a-zA-Z0-9\s]+$/;

  return regex.test(str);
};

export const isValidRouteTypeString = str => {
  const regex = /^[ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9\s]+$/;

  return regex.test(str);
};

export const isValidEnglishNumberOnly = str => {
  const regex = /^[a-zA-Z0-9\s]+$/;

  return regex.test(str);
};

export const isValidStringLength = (str, maxLength) => {
  return str.length >= 1 && str.length <= maxLength;
};

export const isValidPhoneNumber = str => {
  const regex = /^\d{3}-\d{4}-\d{4}$/;
  return regex.test(str);
};

export const isValidEnglishHangulOnly = str => {
  // const regex = /^[가-힣a-zA-Z\s]+$/;
  const regex = /^[가-힣a-zA-Z\sㄱ-ㅎㅏ-ㅣ]+$/; //한글 영어 혼합 3가지
  return regex.test(str);
};

export const isValidHangulOnly = str => {
  const regex = /^[가-힣\s]+$/;

  return regex.test(str);
};

export const isValidAddress = str => {
  const regex = /^[가-힣0-9,-.\s()#]+$/;
  return regex.test(str);
};

export const isValidTrackingNumber = str => {
  const number = Number(str);
  const regex = /^\d{12,13}$/;

  return regex.test(number);
};

export const isValidNumberOnly = str => {
  const number = Number(str);
  const regex = /^[0-9]+$/;

  return regex.test(String(number));
};

export const isValidIdLength = str => {
  return str.length >= 4 && str.length <= 20;
};

export const isValidEmail = str => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return regex.test(str);
};

export const isValidPassword = str => {
  // 비밀번호 정규식은 특수문자, 영어, 숫자를 포함한 10자 이상 25자 이하
  const regex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{10,25}$/;

  return regex.test(str);
};

export const isValidPasswordLength = str => {
  return str.length >= 10 && str.length <= 25;
};
