export const TITLE = {
  ROUTE: {
    MAIN: '라우트 타입 목록',
    DETAIL: '라우트 목록',
    ADD: '신규 라우트 생성',
    MODIFY: '라우트 정보 수정',
    VIEW: '라우트 정보 조회',
  },
  DATE: {
    DEFAULT: '날짜',
    RECOVERY_REQUEST: '회수 요청일시',
    DELIVERY_REQUEST: '배송 요청일시',
    COLLECTION_REQUEST: '집하 요청일시',
  },
  PRINT: {
    PAGINATION: '출력 건수',
  },
  DELIVERY_DRIVER: {
    MAIN: '배송기사 목록',
  },
  DELIVERY_ROUND: {
    MAIN: '배송회차 목록',
    DETAIL: '배송회차 관리',
    MODAL: {
      RECIPIENT_INFO: '고객 정보 조회',
    },
    REQUSET_DETAIL: '요청내역 상세',
    DISPATCH: '배차 진행',
    DISPATCH_LIST: '배차 내역',
  },
  SROT_ROUND: {
    MAIN: '분류회차 관리',
    REQUSET_DETAIL: '요청내역 상세',
  },
  RECOVERY_ROUND: {
    MAIN: '택배 회수회차 관리',
  },
  COLLECTION_ROUND: {
    MAIN: '택배 집하회차 관리',
  },
  SHIPPER: {
    MAIN: '화주사 관리',
  },
  ADMIN_USER: {
    MAIN: 'ADMIN 사용자 관리',
  },
};

export const BUTTON_TEXT = {
  ADD: {
    DEFAULT: '추가',
    DELIVERY_DRIVER: '배송기사 추가',
    DELIVERY_REQUEST: '배송요청 추가',
    SORT_REQUEST: '분류요청 추가',
    RECOVERY_REQUEST: '회수요청 추가',
    COLLECTION_REQUEST: '집하 요청 추가',
    SHIPPER: '화주사 추가',
    USER: '사용자 추가',
    ADMIN_USER: 'ADMIN 사용자 추가',
  },
  CREATE: {
    DEFAULT: '생성',
    ROUTE_TYPE: '라우트 타입 생성',
    ROUTE: '라우트 생성',
    DELIVERY_REQUEST: '배송 요청 추가',
  },
  VIEW: '조회',
  CANCEL: {
    DEFAULT: '취소',
    DELIVERY_REQUEST: '배송 요청 취소',
    SORTING_REQUEST: '분류 요청 취소',
    RECOVERY_REQUEST: '회수 요청 취소',
    COLLECTION_REQUEST: '집하 요청 취소',
  },
  MODIFY: {
    DEFAULT: '수정',
    DO: '수정하기',
    ROUTE_TYPE: '라우트 타입 정보 수정',
    COMPLETE: '수정 완료',
    DISPLAY: '디스플레이 도크 정보 변경',
    DELIVERY_INFO: '배송 정보 수정',
    DRIVER_INFO: '배송기사 정보 수정',
    SHIPPER: '화주사 수정',
    ADMIN_USER: 'ADMIN 사용자 수정',
  },
  DELETE: {
    DEFAULT: '삭제',
    ROUTE: '라우트 삭제',
    ROUTE_TYPE: '라우트 타입 삭제',
    DRIVER_INFO: '배송기사 정보 삭제',
    ADMIN_USER: 'ADMIN 사용자 삭제',
  },
  BACK: '뒤로가기',
  DOWNLOAD: {
    DEFAULT: '다운로드',
    TEMPLATE: {
      DELIVERY_REQUEST: '배송 요청 템플릿 다운로드',
      RECOVERY_REQUEST: '회수 요청 템플릿 다운로드',
      COLLECTION_REQUEST: '집하 요청 템플릿 다운로드',
      COLLECTION_REQUEST_INFO: '집하 요청 정보 다운로드',
    },
  },
  STATUS: {
    DEFAULT: '상태',
    DELIVERY_REQUEST: {
      REQUEST: '요청 확인 대기',
      REQUEST_CONFIRM: '요청 확인 마감',
      DISPATCH: '배차 대기',
      DISPATCH_PROGRESS: '배차 진행',
      SORTING_SCAN: '분류 스캔 대기',
      SORTING_SCANING_PROGRESS: '분류 스캔 진행',
      SORTING_SCAN_PROGRESSING: '분류 스캔 진행 중',
      DISPATCH_LIST_VIEW: '배차 내역 조회',
      PICKUP_SCAN: '픽업 스캔 대기',
      DELIVERY: '배송 중',
      COMPLETE: '배송 완료',
      CLOSE: '요청 확인 마감',
    },
    SORTING_REQUEST: {
      WATING: '분류 대기',
      IN_SORTING: '분류 진행 중',
      COMPLETE: '분류 완료',
      BEFORE: '분류 요청 전',
      REQUEST: '분류 요청',
    },
    RECOVERY_REQUEST: {
      null: '전체',
      RECALL_REQUEST_WAITING: '요청 확인 대기',
      VEHICLE_ALLOCATION_WAITING: '배차 대기',
      PICKUP_SCAN_WAITING: '픽업 스캔 대기',
      IN_RECALL: '회수 중',
      RECALL_COMPLETED: '회수 완료',
      REQUEST: '요청 확인 대기',
      DISPATCH: '배차 대기',
      RECOVERY: '회수 중',
      COMPLETE: '회수 완료',
    },
    COLLECTION_REQUEST: {
      REQUEST: '요청 확인 대기',
      DISPATCH: '배차 대기',
      COLLECTION: '집하 중',
      COMPLETE: '집하 완료',
      CENTER_IN: '센터 입고',
      CENTER_OUT: '센터 출고',
    },
  },
  DEADLINE: {
    DEFAULT: '마감',
    REQUEST: '요청 확인 마감',
    DELIVERY: '배송 요청 마감',
    DISPATCH: '배차 마감',
    RECOVERY_REQUEST: '회수 요청 마감',
    COLLECTION_REQUEST: '집하 요청 마감',
    DISPATCH_DATE: '배차 마감일',
  },
  WAIT: {
    DEFAULT: '대기',
    REQUEST: '요청 확인 대기',
  },
  SAVE: {
    DEFAULT: '저장',
    TEMP: {
      DEFAULT: '임시저장',
      DISPATCH: '배차 임시저장',
    },
  },
  CONFIRM: {
    DEFAULT: '확인',
    RECOVERY_REQUEST: '회수 요청 확인',
    COLLECTION_REQUEST: '집하 요청 확인',
  },
  CLOSE: '닫기',
  PRINT: {
    DEFAULT: '출력',
    WAYBILL: '운송장 출력',
  },
  UPLOAD: {
    DEFAULT: '업로드',
    WAYBILL: '운송장 업로드',
    WAYBILL_FILE: '운송장 파일 업로드',
    COLLECT_WAYBILL: '집하 운송장 업로드',
  },
  ATTACH: {
    DEFAULT: '첨부',
  },
  LOGIN: {
    DEFAULT: '로그인',
  },
  COLLECT_PRODUCTS_COUNT: '집하 요청 건수',
  DELIVERY_COMPANY: '택배사',
};

export const TABLE_HEADER = {
  NO_DATA: '데이터가 없습니다.',
  // 라우트 타입 목록
  ROUTE_TYPE: {
    NO: 'No',
    TYPE_NAME: '타입 명',
    TYPE_DESCRIPTION: '타입 설명',
    VERSION: '마지막 버전',
    UPDATED_AT: '마지막 수정일시',
    UPDATED_USER: '수정자',
    IS_ACTIVE: '활성/비활성',
    MODIFY_ROUTE_TYPE_INFO: '라우트 타입 정보 수정',
    MODIFY_ROUTE: '라우트 수정',
    DELETE_ROUTE_TYPE: '라우트 타입 삭제',
  },
  // 라우트 목록
  ROUTE: {
    NO: 'No',
    ROUTE_NAME: '메인 라우트 명',
    SUB_ROUTE_NAMES: '할당된 서브라우트',
    ROUTE_DESCRIPTION: '라우트 설명',
    VIEW_ROUTE: '라우트 조회',
    MODIFY_ROUTE: '라우트 수정',
    DELETE_ROUTE: '라우트 삭제',
  },
  // 배송기사 목록
  DELIVERY_DRIVER: {
    DRIVER_ID: 'No',
    TRANSPORT_COMPANY_NAME: '운수사',
    LOGIN_ID: '아이디',
    PHONE_NUMBER: '휴대폰 번호',
    DRIVER_NAME: '이름',
    VEHICLE_TYPE: '구분',
    CREATED_AT: '생성일',
    LOGIN_ENABLE: '로그인 제한',
    MODIFY: '수정',
    PASSWORD_RESET: '비밀번호 초기화',
    ACCOUNT_DELETE: '계정 삭제',
  },
  // 분류 회차 목록
  SORTING_ROUND: {
    SORTING_ROUND_ID: 'No',
    SHIPPER_NAME: '화주사',
    SORTING_ROUND_NAME: '회차 명',
    REQUEST_AT: '요청 일시',
    SORTING_ROUND_DETAIL: '요청 상세',
    SORTING_ROUND_STATUS: '분류 요청 상태',
    REQUEST_DETAIL: '요청상세',
    TRACKING_NUMBER: '운송장 번호',
    ROUTE: '라우트',
    SORTING_PRODUCT_ID: 'No',
  },
  // 배송 회차 목록
  DELIVERY_ROUND: {
    INDEX: 'No',
    DELIVERY_ROUND_ID: 'No',
    SHIPPER_NAME: '화주사',
    DELIVERY_ROUND_NAME: '회차 명',
    REQUEST_DATE_TIME: '요청일시',
    REQUEST_DETAIL: '요청상세',
    DELIVERY_ROUND_STATUS: '배송 요청 상태',

    TRACKING_NUMBER: '운송장 번호',
    STREET_ADDRESS: '도로명 / 지번 주소',
    ROUTE: '라우트',
    CHUTE_NUMBER: '슈트',
    DOCK_AND_DRIVER: '도크/기사',
    RECIPIENT_INFO: '고객 정보',
    DELIVERY_INFO_MODIFY: '수정',
    DELIVERY_INFO_DELETE: '삭제',
  },

  // 회수 회차 목록
  RECOVERY_ROUND: {
    INDEX: 'No',
    COMPANY: '화주사',
    NAME: '회차 명',
    DATE: '요청일시',
    DETAIL: '요청상세',
    STATUS: '회수 요청 상태',
    REQUEST: {},
    DRIVER: '배송 기사',
    WAYBILL: '운송장 번호',
    SORTATION: '구분',
    ADDRESS: '도로명 / 지번 주소',
    ROUTE: '라우트',
    CUSTOMER_INFO: '고객 정보',
    MODIFY: '수정',
    DELETE: '삭제',
  },

  // 집하 회차 목록
  COLLECTION_ROUND: {
    INDEX: 'No',
    COMPANY: '화주사',
    NAME: '회차 명',
    DATE: '요청일시',
    DETAIL: '요청상세',
    STATUS: '회수 요청 상태',
    TRACKING_NUMBER: '운송장 번호',
    PRINT: '운송장 출력',
    RECIPIENT_NAME: '이름',
    PHONE: '휴대폰 번호(뒤 4자리)',
    CUSTOMER_INFO: '고객 정보',
    MODIFY: '수정',
    DELETE: '삭제',
    DRIVER: '집하기사',
    ROUTE: '라우트',
  },

  // 집하 재고 목록
  COLLECTION_INVENTORY: {
    SHIPPER_ID: 'No',
    SHIPPER_NAME: '화주사',
    INBOUND_COUNT: '입고 수',
    OUTBOUND_COUNT: '출고 수',
    BALANCE: '재고 수',
  },

  // ADMIN 사용자 목록
  ADMIN_USER: {
    USER_ID: 'No',
    LOGIN_ID: '아이디',
    DEPARTMENT: '소속/부서',
    USER_NAME: '이름',
    PHONE_NUMBER: '휴대폰 번호',
    ADMIN_ROLE: '권한',
    LOGIN_ENABLE: '로그인 제한',
    MODIFY: '수정',
    PASSWORD_RESET: '비밀번호 초기화',
    ACCOUNT_DELETE: '계정 삭제',
  },

  // 화주사 관리
  SHIPPER: {
    SHIPPER_ID: 'No',
    SHIPPER_NAME: '화주사 명',
    LOGIN_ID: '관리자 아이디',
    USER_NAME: '담당자 이름',
    PHONE_NUMBER: '휴대폰 번호',
    EMAIL: '담당자 이메일',
    IS_DELIVERY_ENABLE: '택배 배송',
    IS_RECALL_ENABLE: '택배 회수',
    IS_COLLECT_ENABLE: '택배 집하',
    MODIFY: '수정',
    PASSWORD_RESET: '비밀번호 초기화',
  },
};

export const SELECT_OPTION = {
  DEFAULT: '전체',
  DELIVERY_DRIVER: {
    LABEL: '운수사 선택',
  },
  DELIVERY_ROUND: {
    LABEL: {
      SHIPPER: '화주사',
      REQUEST_STATUS: '배송요청 상태',
      ROUTE_TYPE: '라우트 타입',
    },
  },
  SORTING_ROUND: {
    LABEL: '화주사',
    REQUEST_STATUS: '배송요청 상태',
  },
  RECOVERY_ROUND: {
    LABEL: {
      SHIPPER: '화주사',
      REQUEST_STATUS: '회수요청 상태',
    },
    RECALL_TYPE: {
      RETURN_ORDER: '반품',
      FRESH_BAG: '프레쉬백',
    },
  },
  COLLECTION_ROUND: {
    LABEL: {
      SHIPPER: '화주사',
      DELIVERY_COMPANY: '택배사',
      REQUEST_STATUS: '집하요청 상태',
    },
  },
};

export const SWITCH_OPTION = {
  ON: 'ON',
  OFF: 'OFF',
};

export const INPUT_TEXT = {
  PLACEHOLDER: {
    SEARCH: '검색어를 입력하세요',
    DELIVERY_DRIVER: '배송기사 이름을 입력하세요',
    ROUTE_NAME: '라우트 타입명을 입력해 주세요.',
    ROUTE_DESCRIPTION: '라우트 설명이 필요하다면 입력해 주세요.',
    SUB_ROUTE: '서브라우트 명을 입력해 주세요.',
    ROAD_ADDRESS: '찾고자 하는 도로명 주소를 검색해 주세요.',
    DELIVERY_ROUND: '운송장 번호, 주소를 검색해 주세요.',
    DELIVERY_DRIVER_NAME: '배송기사 이름을 입력해 주세요.',
  },
};

export const FILTER = {
  LABEL: {
    ROUTE: '상태값 선택',
    DELIVERY_DRIVER: '구분 선택',
    SORT_ROUND: '배송 요청 상태',
  },
  BUTTON: {
    ALL: '전체',
    ONE_TONE: '1T',
    LDV: 'LDV',
    ACTIVE: '활성',
    INACTIVE: '비활성',
    SORT: {
      BEFORE: '분류 요청 전',
      SORTING: '분류 진행 중',
      COMPLETE: '분류 완료',
    },
  },
};

export const VALIDATION = {
  INPUT: {
    REQUIRED: '필수',
    OPTIONAL: '선택',
  },
};

export const LABEL_TITLE = {
  ROUTE_TYPE: {
    ROUTE_TYPE_NAME: '라우트 타입 명',
    ROUTE_TYPE_DESCRIPTION: '라우트 타입 설명',
  },
  ROUTE: {
    ROUTE_TYPE: '타입명',
    ROUTE_MAIN: '메인',
    ROUTE_SUB: '할당 서브',
    ROUTE_NAME: '메인 라우트명:',
    ROUTE_DESCRIPTION: '라우트 설명:',
    SUB_ROUTE: '서브라우트:',
    SUB_ROUTE_INFO: '서브라우트 정보',
    ASINGED_ADDRESS: '할당 주소',
    NON_ASINGED_ADDRESS: '미할당 주소',
  },

  DELIVERY_ROUND: {
    ATTACH: '배송 회차 예정 목록',
    STOCK: '택배 배송 입고 예정 목록',
  },
  RECOVERY_ROUND: {
    ATTACH: '택배 회수 예정 목록',
  },
  COLLECTION_ROUND: {
    ATTACH: '택배 집하 예정 목록',
  },
};

export const STATUS_BOX = {
  ROUTE: {
    CUR_VERSION: '현재버전',
    LATEST_UPDATED_AT: '마지막 수정일시',
    LATEST_UPDATED_USER: '마지막 수정자',
  },

  DELIVERY_ROUND: {
    SHIPPER: '요청 화주사',
    REQUEST_DATE: '요청일',
    BY_ADDRESS: '주소 기준',
    BY_PRODUCT: '상품 기준',
  },

  SORTING_ROUND: {
    SHIPPER: '대상 화주사',
    REQUEST_DATE: '요청일',
    ALL_COUNT: '총개수',
    TARGET_ROUTE: '대상 라우트',
  },
};

export const RecoveryMockData = [
  {
    index: 1 - 1,
    company: '롯데택배',
    name: '240506-배송-한진택배-3회차',
    productsCount: 10000,
    date: new Date('2024-01-01T15:00:00').getDate(),
    status: 'RECOVERY_COMPLETED',
  },
  {
    index: 2 - 1,
    company: '한진택배',
    name: '240506-배송-한진택배-3회차',
    productsCount: 10000,
    date: new Date('2024-01-11T15:00:00').getDate(),
    status: 'RECOVERY_COMPLETED',
  },
  {
    index: 3 - 1,
    company: '롯데택배',
    name: '240506-배송-한진택배-3회차',
    productsCount: 10000,
    date: new Date('2024-01-21T15:00:00').getDate(),
    status: 'RECOVERY_COMPLETED',
  },
  {
    index: 4 - 1,
    company: '한진택배',
    name: '240506-배송-한진택배-2회차',
    productsCount: 10000,
    date: new Date('2024-01-30T15:00:00').getDate(),
    status: 'RECOVERY_COMPLETED',
  },
];

export const RECOVERY_DETAIL_STATUS = {
  REQUEST_COMPANY: '요청 화주사',
  REQUEST_DATE: '요청일',
  ADDRESS_STANDARD: '주소 기준',
  PRODUCT_STANDARD: '상품 기준',
};

export const MODAL = {
  TITLE: {
    CUSTOMER: {
      CHECK: '고객 정보 조회',
    },
    DELIVERY: {
      SORTING_SCAN: '분류 스캔 진행 요청',
    },
    RECOVERY: {
      MODIFY: '회수 정보 수정',
      DELETE: '회수 정보 삭제',
      NAME: '회수회차명',
    },
    COLLECTION: {
      MODIFY: '집하 정보 수정',
      DELETE: '집하 정보 삭제',
      NAME: '집하회차명',
    },
  },
};
