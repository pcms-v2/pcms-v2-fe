// ../pages/admin/AdminDeliveryRound/components/AdminDeliveryRoundDetail.jsx
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import Header from '../../../../components/layout/Header/Header';
import {
  BUTTON_TEXT,
  INPUT_TEXT,
  SELECT_OPTION,
  STATUS_BOX,
  TITLE,
} from '../../../../constants/text';
import useDeliveryStore from '../../../../contexts/useDeliveryStore';
import {
  Box,
  FormControl,
  NativeSelect,
  Pagination,
  PaginationItem,
  Stack,
} from '@mui/material';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { ViewSize } from '../../AdminRouting/AdminRouting.styles';
import { useModalStore } from '../../../../contexts/useModalStore';
import { useCallback, useEffect, useRef, useState } from 'react';
import api from '../../../../utils/api';
import { ROUTING } from '../../../../constants/apiEndpoint';
import { formatDate, getNo } from '../../../../utils/common';
import Table from '../../../../components/common/Table';
import Icon from '../../../../components/common/Icon';
import InputBasic from '../../../../components/common/Input';
import { ModalChildren } from '../AdminDeliveryRound.styles';
import { Separator } from '../../../../components/common/Separator';
import { ERROR_MESSAGE } from '../../../../constants/message';
import {
  isValidAddress,
  isValidEnglishHangulOnly,
  isValidNumberOnly,
  isValidPhoneNumber,
  isValidStringLength,
  isValidTrackingNumber,
} from '../../../../utils/validation';
import Select from '../../../../components/common/Select';
import { useUserStore } from '../../../../contexts/useUserStore';
import WarningText from '../../../../components/common/WarningText';

const AdminDeliveryRoundDetail = () => {
  const { userInfo } = useUserStore();
  const navigate = useNavigate();

  const { deliveryRoundId } = useParams();

  const { setModal, setErrMsg, closeModal } = useModalStore();
  const { deliveryRoundDetail } = useDeliveryStore();
  const keywordRef = useRef('');
  const [byAddress, setByAddress] = useState(0);
  const [byProduct, setByProduct] = useState(0);
  const [deliveryRoundDetailList, setDeliveryRoundDetailList] = useState([]);
  const [buttonLabel, setButtonLabel] = useState([]);

  const [routeTypeList, setRouteTypeList] = useState([]);
  const routeTypeId = useRef(null);

  const recipientNameRef = useRef(null);
  const phoneNumberRef = useRef(null);
  const trackingNumberRef = useRef(null);
  const streetAddressRef = useRef(null);
  const lotAddressRef = useRef(null);

  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [totalPage, setTotalPage] = useState(1);

  // [x] 페이지 변경 핸들러
  const handlePageChange = (event, page) => {
    setPage(page);
    getDeliveryRoundDetail(page);
  };

  // [x] 출력 건수 변경 핸들러
  const handleSizeChange = event => {
    setSize(parseInt(event.target.value));
    setPage(1);
    getDeliveryRoundDetail(1, event.target.value);
  };

  // [x] 검색어 변경 핸들러
  const onChangeKeyword = async keyword => {
    keywordRef.current = keyword;
    await getDeliveryRoundDetail(1, size, keyword);
  };

  // [x] 배송회차 상세목록 조회
  const getDeliveryRoundDetail = useCallback(
    async (curPage = page, curSize = size, curKeyword = keywordRef.current) => {
      const params = {
        page: curPage,
        size: curSize,
        keyword: curKeyword,
      };

      const apiResult = await api.request({
        Authorization: `Bearer ${userInfo.accessToken}`,
        url: `${ROUTING.DELIVERY}/${deliveryRoundId}`,
        method: 'GET',
        params,
      });

      const { status, data } = apiResult;
      if (status === 200) {
        const { products: arrayData, pagination } = data;

        const deliveryRoundDetailList = arrayData
          .sort((a, b) => a.productId - b.productId)
          .map((data, index) => {
            const baseObject = {
              index: getNo(pagination, index),
              trackingNumber: data.trackingNumber,
              streetAddress: (
                <>
                  <div>{data.streetAddress}</div>
                  <div>{data.lotAddress}</div>
                </>
              ),
              route: data.route || '-',
              recipientInfo: (
                <Icon
                  iconType='detail'
                  onClick={() => {
                    openRecipientInfoModal(
                      data.recipientName,
                      data.phoneNumber
                    );
                  }}
                />
              ),
              deliveryInfoModify: (
                <Icon
                  iconType='modify'
                  onClick={() => {
                    openDeliveryInfoModifyModal(
                      data.recipientName,
                      data.phoneNumber,
                      data.trackingNumber,
                      data.streetAddress,
                      data.lotAddress,
                      data.productId
                    );
                  }}
                />
              ),
            };

            if (
              deliveryRoundDetail.deliveryRoundStatus ===
              'DELIVERY_REQUEST_WAITING'
            ) {
              baseObject.deliveryInfoDelete = (
                <Icon
                  iconType='delete'
                  onClick={() => {
                    openDeliveryInfoDeleteModal(
                      data.trackingNumber,
                      data.productId
                    );
                  }}
                />
              );
            }

            return baseObject;
          });
        setByAddress(data.totalAddressesCount);
        setByProduct(data.totalProductsCount);
        setDeliveryRoundDetailList(deliveryRoundDetailList);
        setTotalPage(pagination.totalPages);
      }
    },
    [page, size]
  );

  useEffect(() => {
    getDeliveryRoundDetail();
  }, [page, size]);

  // [x] 뒤로가기 핸들러
  const handleBack = () => {
    navigate(`/admin/deliveryRound`);
  };

  // [x] 배송요청 삭제
  const cancleDeliveryRequest = async () => {
    const deliveryRoundId = deliveryRoundDetail.deliveryRoundId;

    const apiResult = await api.request({
      Authorization: `Bearer ${userInfo.accessToken}`,
      url: `${ROUTING.DELIVERY}/${deliveryRoundId}`,
      method: 'DELETE',
      deliveryRoundId: deliveryRoundId,
    });

    if (apiResult.status === 200) {
      alert('배송요청이 삭제되었습니다.');
      closeModal();
      navigate(`/admin/deliveryRound`);
    }
  };

  // [x] 배송요청 취소 모달 오픈
  const openDeliveryRequestCancelModal = () => {
    setModal({
      isOpen: true,
      title: BUTTON_TEXT.CANCEL.DELIVERY_REQUEST,
      proceedBtnName: '삭제',
      warningMsg: `해당 회차의 화주사 배송 요청을 삭제 하시겠습니까?`,
      paddingSize: '15px',
      children: (
        <ModalChildren>
          <InputBasic
            display='flex'
            type='modalContent'
            title='배송회차명'
            value={deliveryRoundDetail.deliveryRoundName}
            disabled={true}
          />
          <Separator $top={10} $bottom={20} />
          <WarningText
            msg1={'해당 회차의 화주사 배송 요청을 삭제 하시겠습니까?'}
            msg2={'삭제 후에는 복구가 불가능 합니다.'}
          ></WarningText>
          <Separator $top={20} $bottom={10} />
        </ModalChildren>
      ),
      onProceed: () => cancleDeliveryRequest(),
    });
  };

  // [x] 배송요청 취소 버튼 핸들러(모달 오픈 여부)
  const cancleDeliveryRound = () => {
    const deliveryRoundStatus = deliveryRoundDetail.deliveryRoundStatus;

    if (deliveryRoundStatus === 'DELIVERY_REQUEST_WAITING') {
      openDeliveryRequestCancelModal();
      return;
    }
  };

  // [x] 배송요청 상태 버튼 렌더링
  const handleRequestStatus = () => {
    const deliveryRoundStatus = deliveryRoundDetail.deliveryRoundStatus;

    switch (deliveryRoundStatus) {
      case 'DELIVERY_REQUEST_WAITING':
        setButtonLabel([
          BUTTON_TEXT.STATUS.DELIVERY_REQUEST.REQUEST,
          BUTTON_TEXT.STATUS.DELIVERY_REQUEST.REQUEST_CONFIRM,
        ]);
        return;

      case 'DELIVERY_REQUEST_CLOSE':
        setButtonLabel([BUTTON_TEXT.STATUS.DELIVERY_REQUEST.CLOSE]);
        return;
    }
  };

  // [x] 배송요청 상태에 따른 버튼 렌더링
  useEffect(() => {
    handleRequestStatus();
  }, [deliveryRoundDetail.deliveryRoundStatus]);

  // [x] 배송요청 상태 버튼 메인 핸들러 (배송요청 마감핸들러 추가)
  const handleDeliveryRequestMain = () => {
    const deliveryRoundStatus = deliveryRoundDetail.deliveryRoundStatus;
    switch (deliveryRoundStatus) {
      case 'DELIVERY_REQUEST_WAITING': // 요청확인대기 상태에서 요청확인 마감 핸들러
        openDeliveryRequestDeadlineModal();
        return;
    }
  };
  // [x] 배송요청 상태 버튼 서브 핸들러 > 배차 내역 확인하기
  const moveDeliveryRoundDispatchList = () => {
    navigate(
      `/admin/deliveryRound/detail/${deliveryRoundDetail.deliveryRoundId}/dispatchDetail`
    );
  };

  // [x] 라우트타입 리스트 조회
  const getRouteTypeList = async (curPage = page) => {
    const apiResult = await api.request({
      Authorization: `Bearer ${userInfo.accessToken}`,
      url: ROUTING.ROUTE_TYPE,
      method: 'GET',
      params: {
        isActive: true,
        page: curPage,
        size: 9999,
      },
    });

    if (apiResult.status === 200) {
      const { data } = apiResult;
      setRouteTypeList(data.data);
    }
  };

  // [x] 페이지 첫 로드시 라우트타입 리스트 조회
  useEffect(() => {
    getRouteTypeList();
  }, []);

  // [x] 요청 확인 마감 모달 셀렉트박스 변경 핸들러
  const handleSelectChange = option => {
    const selectedRouteTypeId = routeTypeList.find(
      typeName => typeName.typeName === option
    ).routeTypeId;
    routeTypeId.current = selectedRouteTypeId;
  };
  // [x] 배송 요청 확인 마감 핸들러
  const deliveryRequestDeadline = async (deliveryRoundId, routeTypeId) => {
    if (routeTypeId.current === null) {
      setErrMsg('라우트 타입을 선택해주세요.');
      return;
    }
    const routeTypeIdToString = String(routeTypeId.current);
    const data = {
      deliveryRoundId: deliveryRoundId,
      routeTypeId: routeTypeIdToString,
    };
    try {
      const apiResult = await api.request({
        Authorization: `Bearer ${userInfo.accessToken}`,
        url: `${ROUTING.DELIVERY_CLOSE}`,
        method: 'POST',
        data: {
          ...data,
        },
      });

      if (apiResult.status === 200) {
        alert('배송요청이 마감되었습니다.');
        closeModal();
        navigate(`/admin/deliveryRound`);
      }
    } catch (error) {
      setErrMsg(ERROR_MESSAGE.DELIVERY.ROUND.DELIVERY_REQUEST_DEADLINE);
    }
  };

  // [x] 배송요청 확인 마감 모달 오픈
  const openDeliveryRequestDeadlineModal = () => {
    setModal({
      isOpen: true,
      title: BUTTON_TEXT.DEADLINE.DELIVERY,
      proceedBtnName: '마감',
      children: (
        <ModalChildren>
          <InputBasic
            display='flex'
            type='modalContent'
            title='배송회차명'
            value={deliveryRoundDetail.deliveryRoundName}
            disabled={true}
          />
          <Select
            type='modal'
            label={SELECT_OPTION.DELIVERY_ROUND.LABEL.ROUTE_TYPE}
            options={routeTypeList.map(typeName => typeName.typeName)}
            onChange={handleSelectChange}
            modal
          />
          <Separator $top={30} $bottom={20} />
          <WarningText
            msg1={'해당 회차의 화주사 배송 요청을 마감 하시겠습니까?'}
            msg2={'마감 후에는 배송 정보 변경이 불가능 합니다.'}
          ></WarningText>
          <Separator $top={20} $bottom={10} />
        </ModalChildren>
      ),
      onProceed: () => deliveryRequestDeadline(deliveryRoundId, routeTypeId),
    });
  };

  // [x] 배송정보 삭제
  const deleteDeliveryInfo = async productId => {
    if (
      deliveryRoundDetail.deliveryRoundStatus === 'VEHICLE_ALLOCATION_WAITING'
    ) {
      alert('요청 확인 대기 상태에서만 삭제가 가능합니다.');
      return;
    }

    const apiResult = await api.request({
      Authorization: `Bearer ${userInfo.accessToken}`,
      url: `${ROUTING.DELIVERY_PRODUCE}/${productId}`,
      method: 'DELETE',
      productId: productId,
    });

    if (apiResult.status === 200) {
      alert('배송정보가 삭제되었습니다.');
      closeModal();
      await getDeliveryRoundDetail();
    }
  };

  // [x] 배송정보 삭제 모달 오픈
  const openDeliveryInfoDeleteModal = (trackingNumber, pdId) => {
    setModal({
      isOpen: true,
      title: '배송 정보 삭제',
      proceedBtnName: '삭제',
      warningMsg: `해당 회차의 화주사 배송 요청을 삭제 하시겠습니까?`,
      paddingSize: '20px 20px 20px 15px',
      children: (
        <ModalChildren>
          <InputBasic
            display='flex'
            type='modalContent'
            title='운송장 번호'
            value={trackingNumber}
            disabled={true}
          />
          <Separator $top={10} $bottom={20} />
          <WarningText
            msg1={'해당 운송장 번호를 삭제 하시겠습니까'}
            msg2={'삭제 후에는 복구가 불가능 합니다.'}
          ></WarningText>
          <Separator $top={20} $bottom={10} />
        </ModalChildren>
      ),
      onProceed: () => deleteDeliveryInfo(pdId),
    });
  };

  const onChangeNameInputValue = value => {
    recipientNameRef.current = value;
  };

  const onChangePhoneNumberInputValue = value => {
    phoneNumberRef.current = value;
  };

  const onChangeTrackingNumberInputValue = value => {
    trackingNumberRef.current = value;
  };

  const onChangeStreetAddressInputValue = value => {
    streetAddressRef.current = value;
  };

  const onChangeLotAddressInputValue = value => {
    lotAddressRef.current = value;
  };

  // [x] 배송정보 수정 핸들러
  const modifyDeliveryInfo = async (
    recipientName,
    phoneNumber,
    trackingNumber,
    streetAddress,
    lotAddress,
    productId
  ) => {
    if (recipientNameRef.current === null) {
      recipientNameRef.current = recipientName;
    }
    if (phoneNumberRef.current === null) {
      phoneNumberRef.current = phoneNumber;
    }
    if (trackingNumberRef.current === null) {
      trackingNumberRef.current = Number(trackingNumber);
    }
    if (streetAddressRef.current === null) {
      streetAddressRef.current = streetAddress;
    }
    if (lotAddressRef.current === null) {
      lotAddressRef.current = lotAddress;
    }

    if (
      // 고객 이름이 한글이나 영어가 아닐때
      !isValidEnglishHangulOnly(recipientNameRef.current)
    ) {
      setErrMsg(ERROR_MESSAGE.DELIVERY.ROUND.DELIVERY_INFO_NAME);
      return;
    } else if (
      // 고객이름이 10자넘을때
      !isValidStringLength(recipientNameRef.current, 10)
    ) {
      setErrMsg(ERROR_MESSAGE.DELIVERY.ROUND.ROUND_NAME_LENGTH);
      return;
    } else if (
      // 전화번호가 11자리가 아닐때
      !isValidPhoneNumber(phoneNumberRef.current)
    ) {
      setErrMsg(ERROR_MESSAGE.COMMON.INFO.PHONE);
      return;
    } else if (
      // 주소가 한글이나 숫자, 특수문자가 아닐때
      !isValidAddress(streetAddressRef.current) ||
      !isValidAddress(lotAddressRef.current)
    ) {
      setErrMsg(ERROR_MESSAGE.DELIVERY.ROUND.DELIVERY_INFO_ADDRESS);
      return;
    } else if (
      // 운송장번호가 숫자가 아닐때
      !isValidNumberOnly(trackingNumberRef.current)
    ) {
      setErrMsg(ERROR_MESSAGE.DELIVERY.ROUND.DELIVERY_INFO_TRACKING);
      return;
    } else if (
      // 운송장번호가 14자리 이상이거나, 11자리 이하 일때
      !isValidTrackingNumber(trackingNumberRef.current)
    ) {
      setErrMsg(ERROR_MESSAGE.DELIVERY.ROUND.DELIVERY_INFO_TRACKING_LENGTH);
      return;
    }

    try {
      let params = {
        trackingNumber: trackingNumberRef.current,
        streetAddress: streetAddressRef.current,
        lotAddress: lotAddressRef.current,
        recipientName: recipientNameRef.current,
        phoneNumber: phoneNumberRef.current,
      };

      const apiResult = await api.request({
        Authorization: `Bearer ${userInfo.accessToken}`,
        url: `${ROUTING.DELIVERY_PRODUCE}/${productId}`,
        method: 'PUT',
        data: params,
      });

      if (apiResult.status === 200) {
        alert('배송정보가 변경되었습니다.');
        closeModal();
        await getDeliveryRoundDetail();
      }
    } catch (error) {
      setErrMsg(ERROR_MESSAGE.COMMON.MODIFY);
    }

    recipientNameRef.current = null;
    phoneNumberRef.current = null;
    trackingNumberRef.current = null;
    streetAddressRef.current = null;
    lotAddressRef.current = null;
  };

  // [x]: 배송정보(고객정보) 수정 모달 오픈
  const openDeliveryInfoModifyModal = useCallback(
    (
      recipientName,
      phoneNumber,
      trackingNumber,
      streetAddress,
      lotAddress,
      pdId
    ) => {
      const deliveryRoundStatus = deliveryRoundDetail.deliveryRoundStatus;

      if (deliveryRoundStatus !== 'DELIVERY_REQUEST_WAITING') {
        setModal({
          isOpen: true,
          title: BUTTON_TEXT.MODIFY.DELIVERY_INFO,
          proceedBtnName: BUTTON_TEXT.MODIFY.DEFAULT,
          oneBtn: true,
          paddingSize: '20px 20px 10px 15px',
          children: (
            <ModalChildren>
              <InputBasic
                display='flex'
                type='modalContent'
                dataType='text'
                title='이름'
                value={recipientName}
                disabled={true}
              />
              <InputBasic
                display='flex'
                type='modalContent'
                dataType='tel'
                title='연락처'
                value={phoneNumber}
                disabled={true}
              />
              <InputBasic
                display='flex'
                type='modalContent'
                dataType='text'
                title='운송장번호'
                value={trackingNumber}
                disabled={true}
              />
              <InputBasic
                display='flex'
                type='modalContent'
                dataType='text'
                title='도로명 주소'
                value={streetAddress}
                textArea={true}
                disabled={true}
              />
              <InputBasic
                display='flex'
                type='modalContent'
                dataType='text'
                title='지번 주소'
                value={lotAddress}
                textArea={true}
                disabled={true}
              />
            </ModalChildren>
          ),
        });
      } else {
        setModal({
          isOpen: true,
          title: BUTTON_TEXT.MODIFY.DELIVERY_INFO,
          proceedBtnName: BUTTON_TEXT.MODIFY.DEFAULT,
          paddingSize: '20px 20px 10px 15px',
          children: (
            <ModalChildren>
              <InputBasic
                display='flex'
                type='modalContent'
                dataType='text'
                title='이름'
                value={recipientName}
                onChange={onChangeNameInputValue}
              />
              <InputBasic
                display='flex'
                type='modalContent'
                dataType='tel'
                title='연락처'
                value={phoneNumber}
                onChange={onChangePhoneNumberInputValue}
              />
              <InputBasic
                display='flex'
                type='modalContent'
                dataType='text'
                title='운송장번호'
                value={trackingNumber}
                onChange={onChangeTrackingNumberInputValue}
              />
              <InputBasic
                display='flex'
                type='modalContent'
                dataType='text'
                title='도로명 주소'
                value={streetAddress}
                onChange={onChangeStreetAddressInputValue}
                textArea={true}
              />
              <InputBasic
                display='flex'
                type='modalContent'
                dataType='text'
                title='지번 주소'
                value={lotAddress}
                onChange={onChangeLotAddressInputValue}
                textArea={true}
              />
            </ModalChildren>
          ),
          onProceed: () =>
            modifyDeliveryInfo(
              recipientName,
              phoneNumber,
              trackingNumber,
              streetAddress,
              lotAddress,
              pdId
            ),
        });
      }
    },
    []
  );

  // [x] 고객정보 조회 모달 오픈
  const openRecipientInfoModal = (recipientName, phoneNumber) => {
    setModal({
      isOpen: true,
      title: TITLE.DELIVERY_ROUND.MODAL.RECIPIENT_INFO,
      paddingSize: '20px 20px 10px 16px',
      children: (
        <ModalChildren>
          <InputBasic
            display='flex'
            type='modalContent'
            title='이름'
            disabled={true}
            value={recipientName}
          />
          <InputBasic
            display='flex'
            type='modalContent'
            title='연락처'
            disabled={true}
            value={phoneNumber}
          />
        </ModalChildren>
      ),
      oneBtn: true,
    });
  };
  return (
    <div>
      <Header
        title={TITLE.DELIVERY_ROUND.DETAIL}
        subTitle={`> ${deliveryRoundDetail.deliveryRoundName} > ${TITLE.DELIVERY_ROUND.REQUSET_DETAIL}`}
        buttonNumber={2}
        buttonLabel={
          deliveryRoundDetail.deliveryRoundStatus === 'DELIVERY_REQUEST_WAITING'
            ? [BUTTON_TEXT.BACK, BUTTON_TEXT.CANCEL.DELIVERY_REQUEST]
            : [BUTTON_TEXT.BACK]
        }
        onButtonClick={[handleBack, cancleDeliveryRound]}
        search={true}
        searchPlaceholder={INPUT_TEXT.PLACEHOLDER.DELIVERY_ROUND}
        onSearch={onChangeKeyword}
        statusNumber={4}
        statusTitle={[
          STATUS_BOX.DELIVERY_ROUND.SHIPPER,
          STATUS_BOX.DELIVERY_ROUND.REQUEST_DATE,
          STATUS_BOX.DELIVERY_ROUND.BY_ADDRESS,
          STATUS_BOX.DELIVERY_ROUND.BY_PRODUCT,
        ]}
        statusValue={[
          deliveryRoundDetail.shipperName,
          formatDate(deliveryRoundDetail.requestAt),
          byAddress,
          byProduct,
        ]}
        requestStatusBox={true}
        requestStatusBoxTitle={
          SELECT_OPTION.DELIVERY_ROUND.LABEL.REQUEST_STATUS
        }
        requestStatusButtonTitle={buttonLabel}
        requestStatusBoxOnclick={[
          handleDeliveryRequestMain,
          moveDeliveryRoundDispatchList,
        ]}
        middleElement={true}
      />
      <Table data={deliveryRoundDetailList} tableType='deliveryRound' />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '39px',
        }}
      >
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
          <Stack spacing={1}>
            <Pagination
              count={totalPage}
              defaultPage={1}
              page={page}
              onChange={handlePageChange}
              renderItem={item => (
                <PaginationItem
                  sx={{ color: 'grey', borderRadius: '0.5rem' }}
                  slots={{
                    first: KeyboardDoubleArrowLeftIcon,
                    last: KeyboardDoubleArrowRightIcon,
                  }}
                  {...item}
                />
              )}
              color='white'
              shape='rounded'
              showFirstButton
              showLastButton
            />
          </Stack>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <ViewSize>출력 건수</ViewSize>
          <FormControl>
            <NativeSelect
              sx={{
                color: '#4D4D4D',
                '&::before': {
                  borderBottom: 'initial',
                },
                '&::after': {
                  borderBottom: 'initial',
                },
              }}
              IconComponent={KeyboardArrowDownIcon}
              defaultValue={10}
              onChange={handleSizeChange}
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
            </NativeSelect>
          </FormControl>
        </Box>
      </Box>
      <Outlet />
    </div>
  );
};

export default AdminDeliveryRoundDetail;
