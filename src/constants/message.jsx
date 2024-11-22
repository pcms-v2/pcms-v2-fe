export const MESSAGE = {
  APPLY: {
    COMPLETE: '신청이 완료되었습니다.',
  },
};

export const ERROR_MESSAGE = {
  LOGIN: {
    ID: '아이디는 영문, 숫자만 입력 가능합니다.',
    ID_LENGTH: '아이디는 최소 4자, 최대 20자만 입력 가능합니다.',
    PASSWORD: '비밀번호는 영문, 숫자, 특수문자 모두 입력 해야합니다.',
    PASSWORD_LENGTH: '비밀번호는 최소 10자, 최대 25자만 입력 가능합니다.',
    NOT_SAME_PASSWORD:
      '입력하신 비밀번호가 일치하지 않습니다. 다시 확인해 주세요.',
    DEFAULT: '아이디와 비밀번호를 확인해주세요.',
    PASSWORD_RESET: '비밀번호를 초기화할 수 없습니다.',
    //비밀번호 변경
    PASSWORD_CHANGE: '비밀번호 변경에 실패했습니다.',
    AUTHORITY: '권한이 없습니다. 관리자에게 문의하세요.',
    EMPTY: '아이디와 비밀번호를 입력해주세요.',
  },

  COMMON: {
    INSERT: '오류가 발생했습니다. 다시 생성해 주세요.',
    MODIFY: '오류가 발생했습니다. 다시 수정해 주세요.',
    DELETE: '오류가 발생했습니다. 다시 삭제해 주세요.',
    INFO: {
      ALL: '모든 항목을 입력해주세요.',
      ID: '아이디는 영문, 숫자만 입력 가능합니다.',
      ID_LENGTH: '아이디는 최소4자, 최대 20자만 입력 가능합니다.',
      NAME: '이름은 한글, 영문만 입력 가능합니다.',
      NAME_LENGTH: '이름은 최대 8자만 입력 가능합니다.',
      PHONE: '전화번호는 000-0000-0000 형식만 입력 가능합니다.',
      PHONE_LENGTH: '전화번호는 11자리만 입력 가능합니다.',
      EMAIL: '이메일 형식이 올바르지 않습니다.',
      NO_CHANGE: '변경된 내용이 없습니다.',
    },
    DUPLICATED_DATA: '중복된 데이터가 존재합니다.',
  },
  ROUTE_TYPE: {
    TEXT: '라우트 타입명과 설명은 한글, 영문, 숫자만 입력 가능합니다.',
    ROUTE_TYPE_LENGTH: '라우트 타입명은 최대 10자만 입력 가능합니다.',
    ROUTE_DESCRIPTION_LENGTH: '라우트 타입 설명은 최대 25자만 입력 가능합니다.',
  },
  ROUTE: {
    TEXT: '메인 라우트명은 영문, 숫자만 입력 가능합니다.',
    SUB_ROUTE_TEXT: '서브라우트는 영문, 숫자만 입력 가능합니다.',
    ROUTE_NAME_LENGTH: '메인 라우트명은 최대 10자만 입력 가능합니다.',
    ROUTE_DESCRIPTION_LENGTH: '라우트 설명은 최대 20자만 입력 가능합니다.',
    SUB_ROUTE_NAME_LENGTH: '서브 라우트명은 최대 8자만 입력 가능합니다.',
    NO_SUB_ROUTE: '서브 라우트를 추가해주세요.',
  },
  DELIVERY: {
    DRIVER: {
      ALL: '모든 항목을 입력해주세요.',
      DRIVER_ID: '아이디는 영문, 숫자만 입력 가능합니다.',
      DRIVER_ID_LENGTH: '아이디는 최소4자, 최대 20자만 입력 가능합니다.',
      DRIVER_NAME: '배송기사명은 한글, 영문만 입력 가능합니다.',
      DRIVER_NAME_LENGTH: '배송기사명은 최대 8자만 입력 가능합니다.',
      DRIVER_PHONE: '전화번호는 숫자만 입력 가능합니다.',
      DRIVER_PHONE_LENGTH: '전화번호는 11자리만 입력 가능합니다.',
    },
    ROUND: {
      TEXT: '배송회차명은 한글, 영문, 숫자만 입력 가능합니다.',
      ROUND_NAME_LENGTH: '고객이름은 최대 10자만 입력 가능합니다.',
      DELIVERY_INFO_NAME: '고객이름은 한글, 영문만 입력 가능합니다.',
      DELIVERY_INFO_NAME_LENGTH: '고객이름은 최대 8자까지 입력 가능합니다.',
      DELIVERY_INFO_PHONE: '전화번호는 숫자만 입력 가능합니다.',
      DELIVERY_INFO_PHONE_LENGTH: '전화번호는 11자리만 입력 가능합니다.',
      DELIVERY_INFO_TRACKING: '운송장 번호는 숫자만 입력 가능합니다.',
      DELIVERY_INFO_TRACKING_LENGTH:
        '운송장 번호는 최소 12자리 이상, 최대 13자리까지 입력 가능합니다.',
      DELIVERY_INFO_ADDRESS:
        '주소는 한글, 숫자, 특수문자(쉼표, 하이픈)만 입력 가능합니다.',
      DELIVERY_REQUEST_DEADLINE: '올바른 라우트 타입을 선택해주세요.',
    },
  },

  SHIPPER: {
    NAME: '화주사명은 한글, 영문, 숫자만 입력 가능합니다.',
    SHIPPER_NAME_LENGTH: '화주사명은 최대 12자만 입력 가능합니다.',
    LOGIN_ID_LENGTH: '관리자 ID는 최대 20자만 입력 가능합니다.',
    USER_NAME: '담당자 이름은 한글만 입력 가능합니다.',
    USER_NAME_LENGTH: '담당자 이름은 최대 5자만 입력 가능합니다.',
  },

  ADMIN_USER: {
    NAME: '이름은 한글만 입력 가능합니다.',
    NAME_LENGTH: '이름은 최대 5자만 입력 가능합니다.',
    DEPARTMENT: '부서명은 한글, 영문만 입력 가능합니다.',
    DEPARTMENT_LENGTH: '부서명은 최대 12자만 입력 가능합니다.',
    ID_DUPLICATE: '중복된 아이디가 존재합니다.',
  },

  RECOVERY: {
    ERROR: '회차의 현재 상태에서 이 작업을 수행할 수 없습니다.',
    NAME_MIN_ERROR: '이름은 최소 2자 이상 입력해주세요.',
    NAME_MAX_ERROR: '이름은 최대 8자 까지 입력해주세요',
    DEADLINE_ERROR: '라우트 타입을 확인해 주세요.',
    NO_NAME: '고객이름은 필수값입니다.',
    NO_PHONE: '연락처는 필수값입니다.',
    ERR_PHONE: '연락처는 000-0000-0000 형식만 입력 가능합니다.',
    NO_TRACKING: '운송장 번호는 필수값입니다.',
    NO_LOT_ADDRESS: '지번 주소는 필수값입니다.',
    NO_STREET_ADDRESS: '도로명 주소는 필수값입니다.',
  },
};

export const WARNING_MESSAGE = {
  COMMON: {
    DELETE: '삭제 후에는 복구가 불가능 합니다.',
  },
  ROUTE: {
    DELETE: '해당 라우트를 삭제 하시겠습니까?',
  },

  ADMIN_USER: {
    DELETE: '해당 ADMIN 사용자를 삭제 하시겠습니까?',
  },
};
