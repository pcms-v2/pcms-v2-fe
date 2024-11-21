import { useCallback, useEffect, useRef, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
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
import { ViewSize } from '../AdminRouting/AdminRouting.styles';
import { donwloadTemplate } from '../../../utils/download';
import { setToEndOfDay, setToStartOfDay } from '../../../utils/setDate';

import Header from '../../../components/layout/Header/Header';
import Table from '../../../components/common/Table';
import Icon from '../../../components/common/Icon';
import CommonButton from '../../../components/common/Button';
import Select from '../../../components/common/Select';
import ModalFileUploader from '../../../components/common/ModalFileUploader';

import { useModalStore } from '../../../contexts/useModalStore';
import useDeliveryStore from '../../../contexts/useDeliveryStore';
import useShipperStore from '../../../contexts/useShipperStore';

import { ROUTING } from '../../../constants/apiEndpoint';
import {
  BUTTON_TEXT,
  LABEL_TITLE,
  SELECT_OPTION,
  TITLE,
} from '../../../constants/text';
import { SELECT_OPTIONS } from '../../../utils/selectOptions';
import api from '../../../utils/api';
import uploadApi from '../../../utils/uploadApi';
import { formatDate, getNo } from '../../../utils/common';

import { ModalChildren } from './AdminDeliveryRound.styles';
import { Separator } from '../../../components/common/Separator';
import { useUserStore } from '../../../contexts/useUserStore';

const AdminDeliveryRound = () => {
  const { userInfo } = useUserStore();
  const location = useLocation();
  const navigate = useNavigate();

  const { setModal, setErrMsg, closeModal } = useModalStore();
  const { setShipperList, shipperList } = useShipperStore();
  const { setDeliveryRoundDetail } = useDeliveryStore();

  const [deliveryRoundList, setDeliveryRoundList] = useState([]);
  const [selectedShipper, setSelectedShipper] = useState('전체');
  const [selectedStatus, setSelectedStatus] = useState('전체');
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [totalPage, setTotalPage] = useState(1);

  const modalSelectOption = useRef('');
  const modalFileData = useRef(null);

  const [startDate, setStartDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() - 7);
    return setToStartOfDay(date);
  });
  const [endDate, setEndDate] = useState(() => setToEndOfDay(new Date()));

  const hideParent = location.pathname.includes('/admin/deliveryRound/detail');

  // [x] 페이지 변경 핸들러
  const handlePageChange = (event, page) => {
    setPage(page);
  };

  // [x] 출력 건수 변경 핸들러
  const handleSizeChange = event => {
    setSize(parseInt(event.target.value));
    setPage(1);
  };

  // [x] 날짜 변경 핸들러(시작일, 종료일)
  const handleStartDateChange = date => {
    const newStartDate = setToStartOfDay(date);
    setStartDate(newStartDate);
  };

  const handleEndDateChange = date => {
    const newEndDate = setToEndOfDay(date);
    setEndDate(newEndDate);
  };

  // [x] 배송사 변경 핸들러
  const handleShipperChange = shipperName => {
    setSelectedShipper(shipperName);
    setPage(1);
  };

  // [x] 배송요청 상태 변경 핸들러
  const handleStatusChange = status => {
    setSelectedStatus(status);
    setPage(1);
  };

  // [x] 날짜 포맷 변경 함수
  const formatDateWithDateFns = date => {
    return format(date, "yyyy-MM-dd'T'HH:mm:ssXXX", { locale: ko });
  };

  // [x] 상태 텍스트 변경 함수
  const getStatusText = statusKey => {
    const statusMapping = {
      DELIVERY_REQUEST_WAITING: BUTTON_TEXT.STATUS.DELIVERY_REQUEST.REQUEST,
      DELIVERY_REQUEST_CLOSE: BUTTON_TEXT.STATUS.DELIVERY_REQUEST.CLOSE,
    };
    return statusMapping[statusKey] || statusKey;
  };

  // [x] 상태 키 변경 함수
  const getStatusKey = statusText => {
    const statusMapping = {
      [BUTTON_TEXT.STATUS.DELIVERY_REQUEST.REQUEST]: 'DELIVERY_REQUEST_WAITING',
      [BUTTON_TEXT.STATUS.DELIVERY_REQUEST.CLOSE]: 'DELIVERY_REQUEST_CLOSE',
    };
    return statusMapping[statusText] || statusText;
  };

  // [x] 모달 화주사 셀렉트 변경 핸들러
  const handleSelectChange = option => {
    const selectedShipper = shipperList.find(
      shipper => shipper.name === option
    );
    modalSelectOption.current = selectedShipper?.id;
  };

  // [x] 모달 파일 데이터 변경 핸들러
  const handleFileDataChange = data => {
    modalFileData.current = data;
  };

  // [x] 배송 요청 추가
  const addDeliveryRequest = async () => {
    if (modalSelectOption.current == null) {
      setErrMsg('화주사를 선택해주세요.');
      return;
    }
    if (modalFileData.current == null) {
      setErrMsg('파일이 첨부되지 않았습니다.');
      return;
    }

    const formData = new FormData();
    formData.append('shipperId', modalSelectOption.current);
    formData.append('template', modalFileData.current);

    try {
      const response = await uploadApi.request({
        Authorization: `Bearer ${userInfo.accessToken}`,
        url: ROUTING.DELIVERY,
        method: 'POST',
        data: formData,
      });

      if (response.status === 200) {
        closeModal();
        getDeliveryRoundList();
      } else {
        setErrMsg('배송 요청 추가에 실패했습니다.');
      }
    } catch (error) {
      if (error.response.data.error === 'INVALID_FIELD') {
        setErrMsg('배송 요청 템플릿에 잘못된 형식의 값이 입력되었습니다.');
      } else {
        setErrMsg('배송 요청 추가 중 오류가 발생했습니다.');
      }
    }
  };

  // [x] 배송 요청 모달 열기
  const openDeliveryRequestModal = () => {
    modalSelectOption.current = null;
    setModal({
      isOpen: true,
      title: BUTTON_TEXT.ADD.DELIVERY_REQUEST,
      proceedBtnName: '추가',
      children: (
        <ModalChildren>
          <Select
            type='modal'
            label={SELECT_OPTION.DELIVERY_ROUND.LABEL.SHIPPER}
            options={shipperList?.map(shipper => shipper.name)}
            onChange={handleSelectChange}
            modal
          />
          <Separator $top={30} $bottom={30} />
          <ModalFileUploader
            type='delivery'
            title={LABEL_TITLE.DELIVERY_ROUND.STOCK}
            setFileData={handleFileDataChange}
          />
        </ModalChildren>
      ),
      onProceed: addDeliveryRequest,
    });
  };

  // [x] 배송 상세 화면 이동
  const showDeliveryDetail = data => {
    setDeliveryRoundDetail(data);
    navigate(`/admin/deliveryRound/detail/${data.deliveryRoundId}`);
  };

  // [x] 배송 요청 리스트 조회
  const getDeliveryRoundList = useCallback(async () => {
    const params = {
      page,
      size,
      from: formatDateWithDateFns(startDate),
      to: formatDateWithDateFns(endDate),
    };
    if (selectedStatus && selectedStatus !== '전체') {
      params.deliveryRoundStatus = getStatusKey(selectedStatus);
    }

    if (selectedShipper && selectedShipper !== '전체') {
      params.shipperId = shipperList.find(
        shipper => shipper.name === selectedShipper
      )?.id;
    }

    const apiResult = await api.request({
      Authorization: `Bearer ${userInfo.accessToken}`,
      url: ROUTING.DELIVERY,
      method: 'GET',
      params,
    });

    const { status, data } = apiResult;
    if (status === 200) {
      const { data: arrayData, pagination } = data;

      const deliveryRoundList = arrayData
        .sort((a, b) => a.deliveryRoundId - b.deliveryRoundId)
        .map((data, index) => ({
          index: getNo(pagination, index),
          shipperName: data.shipperName,
          deliveryRoundName: (
            <>
              <div>{data.deliveryRoundName}</div>
              <div>{`총 요청 건 : ${data.productsCount}건`}</div>
            </>
          ),
          requestDateTime: formatDate(data.requestAt),
          requestDetail: (
            <Icon iconType='detail' onClick={() => showDeliveryDetail(data)} />
          ),
          deliveryRoundStatus:
            data.deliveryRoundStatus === 'DELIVERY_REQUEST_CLOSE' ? (
              <CommonButton
                type='disabled'
                label={getStatusText(data.deliveryRoundStatus)}
              />
            ) : (
              <CommonButton
                type='primary'
                label={getStatusText(data.deliveryRoundStatus)}
              />
            ),
        }));

      setDeliveryRoundList(deliveryRoundList);
      setTotalPage(pagination.totalPages);
    }
  }, [
    page,
    size,
    startDate,
    endDate,
    selectedShipper,
    selectedStatus,
    shipperList,
  ]);

  // [x] 화주사 리스트 조회
  const getShipperList = async () => {
    const apiResult = await api.request({
      Authorization: `Bearer ${userInfo.accessToken}`,
      url: ROUTING.SHIPPER,
      method: 'GET',
      params: { page: 1, size: 100 },
    });

    const { status, data } = apiResult;
    if (status === 200) {
      const { data: arrayData } = data;
      const uniqueShippers = [
        { id: null, name: '전체' },
        ...arrayData.map(data => ({
          id: data.shipperId,
          name: data.shipperName,
        })),
      ];
      setShipperList(uniqueShippers);
    }
  };
  useEffect(() => {
    getShipperList();
  }, []);

  useEffect(() => {
    if (location.pathname === '/admin/deliveryRound') {
      getDeliveryRoundList();
    }
  }, [
    page,
    size,
    startDate,
    endDate,
    selectedShipper,
    selectedStatus,
    getDeliveryRoundList,
    location.pathname,
  ]);

  return hideParent ? (
    <Outlet />
  ) : (
    <div>
      <Header
        title={TITLE.DELIVERY_ROUND.MAIN}
        buttonNumber={2}
        buttonLabel={[
          BUTTON_TEXT.DOWNLOAD.TEMPLATE.DELIVERY_REQUEST,
          BUTTON_TEXT.ADD.DELIVERY_REQUEST,
        ]}
        onButtonClick={[donwloadTemplate, openDeliveryRequestModal]}
        calenderPicker
        calenderPickerTitle={TITLE.DATE.DELIVERY_REQUEST}
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={handleStartDateChange}
        onEndDateChange={handleEndDateChange}
        selectNumber={2}
        selectLabel={[
          SELECT_OPTION.DELIVERY_ROUND.LABEL.SHIPPER,
          SELECT_OPTION.DELIVERY_ROUND.LABEL.REQUEST_STATUS,
        ]}
        selectOptions={[
          shipperList?.map(shipper => shipper.name),
          SELECT_OPTIONS.SMS_DELIVERY_STATUS,
        ]}
        onSelectChange={[handleShipperChange, handleStatusChange]}
      />
      <Table data={deliveryRoundList} tableType='deliveryRound' />
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

export default AdminDeliveryRound;
