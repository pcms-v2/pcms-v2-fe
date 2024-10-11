// admin select options
/**
 * 라우트
 * @param {string} status - 라우트 상태
 */
export const routeOptions = {
  status: ['전체', '활성화', '비활성화'],
};

/**
 * 배송기사
 * @param {string} activationStatus - 활성화 구분
 * @param {string} shipperType - 화주사 타입
 */
export const deliveryDriverOptions = {
  activationStatus: ['전체', '활성화', '비활성화'],
  shipperType: ['전체', '롯데택배', '한진택배', '쿠팡'], // 전역상태에서 받아와야함
};

/**
 * 배송회차
 * @param {string} shipperType - 화주사 타입
 * @param {string} deliveryStatus - 배송상태
 */
export const deliveryRoundOptions = {
  shipperType: ['전체', '롯데택배', '한진택배', '쿠팡'], // 전역상태에서 받아와야함
  deliveryStatus: [
    '전체',
    '요청 확인 대기',
    '배차 대기',
    '분류 스캔 대기',
    '분류 스캔 진행 중',
    '픽업 스캔 대기',
    '배송 중',
    '배송 완료',
  ],
};

/**
 * 회수회차
 * @param {string} shipperType - 화주사 타입
 * @param {string} recoveryStatus - 회수상태
 * @param {string} requestType - 회수요청 타입
 */
export const recoveryRoundOptions = {
  shipperType: ['전체', '롯데택배', '한진택배', '쿠팡'], // 전역상태에서 받아와야함
  recoveryStatus: [
    '전체',
    '요청 확인 대기',
    '배차 대기',
    '회수 중',
    '회수 완료',
  ],
  requestType: ['전체', '반품', '프래시백'],
};

/**
 * 집하회차
 * @param {string} companyType - 회수회차
 * @param {string} collectionStatus - 회수상태
 */
export const collectionRoundOptions = {
  companyType: ['전체', '삼성전자', '전자랜드', 'LG전자'], // 전역상태에서 받아와야함
  collectionStatus: [
    '전체',
    '요청 확인 대기',
    '배차 대기',
    '집하 중',
    '집하 완료',
    '센터 입고',
    '센터 출고',
  ],
};

// user select options
/**
 * 배송회차
 * @param {string} deliveryStatus - 배송상태
 */
