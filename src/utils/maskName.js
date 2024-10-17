export default function maskName(str) {
  const length = str.length;

  if (length === 2) {
    // 두 글자일 경우: 뒷글자만 * 처리
    return str[0] + '*';
  } else if (length === 3) {
    // 세 글자일 경우: 가운데 글자만 * 처리
    return str[0] + '*' + str[2];
  } else if (length === 4) {
    // 네 글자일 경우: 가운데 두 글자만 * 처리
    return str[0] + '**' + str[3];
  } else if (length > 4) {
    // 다섯 글자 이상: 가운데 하나만 * 처리
    const middleIndex = Math.floor(length / 2);
    return str.substring(0, middleIndex) + '*' + str.substring(middleIndex + 1);
  } else {
    // 그 외의 경우: 문자열 그대로 반환
    return str;
  }
}
