export const ROUTING = {
  // 라우팅
  ROUTE: '/route',
  ROUTE_TYPE: '/route/type',
  ROUTE_MAIN: '/route/main',
  ROUTE_ADDRESS: '/route/address',

  // 배송
  DELIVERY: '/delivery',
  DELIVERY_TEMPLATE: '/delivery/template', // 배송 요청 템플릿 다운로드
  DELIVERY_CLOSE: '/delivery/close', //배송 요청 마감
  DELIVERY_PRODUCE: '/delivery/product', //배송 요청수정 및 삭제
  VEHICL: '/vehicle',

  DELIVERY_DRIVER: '/user/driver', //배송기사
  TRANSPORT_COMPANY: '/user/driver/company', // 운수사 리스트
  DOCK: '/dock',

  // 화주사
  SHIPPER: '/user/shipper',

  // ADMIN 사용자
  ADMIN_USER: '/user/admin',

  // 로그인
  LOGIN: '/user/login',
  PASSWORD: '/user/password',

  // 회수회차
  RECALL: '/recall',
  RECALL_TEMPLATE: '/recall/template',
  RECALL_CLOSE: '/recall/close', //배송 요청 마감
  RECALL_PRODUCE: '/recall/product', //배송 요청수정 및 삭제

  // 집하회차
  COLLECT: '/collect',
  COLLECT_TEMPLATE: '/collect/template',
  COLLECT_CLOSE: '/collect/close', //배송 요청 마감
  COLLECT_PRODUCE: '/collect/product', //배송 요청수정 및 삭제

  // 집하재고
  COLLECT_INVENTORY: '/collect/inventory',

  // 분류회차
  SORTING: '/sorting',
  SORTING_TEMPLATE: '/sorting/template',
};
