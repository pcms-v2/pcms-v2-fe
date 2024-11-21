// admin - 라우팅 관리
import { useCallback, useEffect, useRef, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import api from '../../../utils/api';
import { formatDate, getNo } from '../../../utils/common';
import {
  isValidRouteTypeString,
  isValidStringLength,
} from '../../../utils/validation';
import { useModalStore } from '../../../contexts/useModalStore';
import useRoutingStore from '../../../contexts/useRoutingStore';
import {
  BUTTON_TEXT,
  FILTER,
  INPUT_TEXT,
  LABEL_TITLE,
  TITLE,
} from '@constants/text';
import { ERROR_MESSAGE } from '../../../constants/message';
import { ROUTING } from '../../../constants/apiEndpoint';
import Header from '../../../components/layout/Header/Header';
import Table from '../../../components/common/Table';
import SwitchBasic from '../../../components/common/Switch';
import Icon from '../../../components/common/Icon';
import InputBasic from '../../../components/common/Input';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { PaginationItem } from '@mui/material';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import Box from '@mui/material/Box';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import { ViewSize } from './AdminRouting.styles';
import { useUserStore } from '../../../contexts/useUserStore';

const AdminRouting = () => {
  const { userInfo } = useUserStore();
  const location = useLocation();
  const navigate = useNavigate();

  const hideParent = location.pathname.includes(['/admin/routing-type/main']);

  const { setModal, setErrMsg, closeModal } = useModalStore();
  const { setRouteType } = useRoutingStore();
  const typeNameRef = useRef('');
  const typeDescriptionRef = useRef('');
  const activeType = useRef(FILTER.BUTTON.ACTIVE);

  const [routeTypeList, setRouteTypeList] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [totalPage, setTotalPage] = useState(1);

  const initRouteType = () => {
    typeNameRef.current = '';
    typeDescriptionRef.current = '';
  };

  const onChangeTypeName = value => {
    typeNameRef.current = value;
  };

  const onChangeTypeDescription = value => {
    typeDescriptionRef.current = value;
  };

  const handleFilterChange = async newSortation => {
    activeType.current = newSortation;
    setPage(1);
    await getRouteTypeList(1, size);
  };

  const handlePageChange = (event, page) => {
    setPage(page);
    getRouteTypeList(page, size);
  };

  const handleSizeChange = event => {
    setSize(parseInt(event.target.value));
    setPage(1);
    getRouteTypeList(1, event.target.value);
  };

  const getRouteTypeList = useCallback(
    async (curPage = page, curSize = size) => {
      let params = {};

      if (activeType.current !== FILTER.BUTTON.ALL) {
        params.isActive =
          activeType.current === FILTER.BUTTON.ACTIVE ? true : false;
      }

      const apiResult = await api.request({
        Authorization: `Bearer ${userInfo.accessToken}`,
        url: ROUTING.ROUTE_TYPE,
        method: 'GET',
        params: {
          ...params,
          page: curPage,
          size: curSize,
        },
      });

      const { status, data } = apiResult;
      if (status === 200) {
        const { data: arrayData, pagination } = data;

        const routeTypeList = arrayData
          .sort((a, b) => a.routeTypeId - b.routeTypeId)
          .map((data, index) => {
            const { routeTypeId: _, ...rest } = data;
            return {
              no: getNo(pagination, index),
              ...rest,
              updatedAt: formatDate(data.updatedAt),
              isActive: (
                <SwitchBasic
                  active={data.isActive}
                  onClick={() => modIsActiveStatus(data)}
                />
              ),
              modifyRouteTypeInfo: (
                <Icon iconType='modify' onClick={() => activeModModal(data)} />
              ),
              modifyRoute: (
                <Icon
                  iconType='modify'
                  onClick={() => moveToModRouteType(data)}
                />
              ),
              deleteRouteType: (
                <Icon iconType='delete' onClick={() => activeDelModal(data)} />
              ),
            };
          });

        setRouteTypeList(routeTypeList);
        setTotalPage(pagination.totalPages);
      }
    },
    [page, size]
  );

  const modIsActiveStatus = async routeType => {
    let params = {
      typeName: routeType.typeName,
      typeDescription: routeType.typeDescription,
      isActive: !routeType.isActive,
    };

    const apiResult = await api.request({
      Authorization: `Bearer ${userInfo.accessToken}`,
      url: `${ROUTING.ROUTE_TYPE}/${routeType.routeTypeId}`,
      method: 'PUT',
      data: params,
    });

    if (apiResult.status === 200) {
      await getRouteTypeList(page, size);
    }
  };

  const modRouteTypeInfo = async routeType => {
    if (
      !isValidRouteTypeString(typeNameRef.current) ||
      (typeDescriptionRef.current &&
        !isValidRouteTypeString(typeDescriptionRef.current))
    ) {
      setErrMsg(ERROR_MESSAGE.ROUTE_TYPE.TEXT);
      return;
    } else if (!isValidStringLength(typeNameRef.current, 10)) {
      setErrMsg(ERROR_MESSAGE.ROUTE_TYPE.ROUTE_TYPE_LENGTH);
      return;
    } else if (
      typeDescriptionRef.current &&
      !isValidStringLength(typeDescriptionRef.current, 25)
    ) {
      setErrMsg(ERROR_MESSAGE.ROUTE_TYPE.ROUTE_DESCRIPTION_LENGTH);
      return;
    }

    try {
      let params = {
        typeName: typeNameRef.current,
        typeDescription: typeDescriptionRef.current,
        isActive: routeType.isActive,
      };

      const apiResult = await api.request({
        Authorization: `Bearer ${userInfo.accessToken}`,
        url: `${ROUTING.ROUTE_TYPE}/${routeType.routeTypeId}`,
        method: 'PUT',
        data: params,
      });

      if (apiResult.status === 200) {
        await getRouteTypeList();
      } else {
        setErrMsg(ERROR_MESSAGE.COMMON.MODIFY);
      }

      closeModal();
    } catch (err) {
      setErrMsg(ERROR_MESSAGE.COMMON.MODIFY);
    }
  };

  const deleteRoute = async routeTypeId => {
    try {
      const apiResult = await api.request({
        Authorization: `Bearer ${userInfo.accessToken}`,
        url: `${ROUTING.ROUTE_TYPE}/${routeTypeId}`,
        method: 'DELETE',
      });

      if (apiResult.status === 200) {
        await getRouteTypeList();
        alert('라우트 타입 삭제가 완료되었습니다.');
      } else {
        setErrMsg(ERROR_MESSAGE.COMMON.DELETE);
      }

      closeModal();
    } catch (err) {
      setErrMsg(ERROR_MESSAGE.COMMON.DELETE);
    }
  };

  const activeDelModal = routeTypeInfo => {
    setModal({
      isOpen: true,
      title: BUTTON_TEXT.DELETE.ROUTE_TYPE,
      proceedBtnName: BUTTON_TEXT.DELETE.DEFAULT,
      children: (
        <>
          <InputBasic
            display='flex'
            title={LABEL_TITLE.ROUTE.ROUTE_TYPE}
            value={routeTypeInfo.typeName}
            disabled={true}
            type={'modalContent'}
          />
        </>
      ),
      onProceed: () => deleteRoute(routeTypeInfo.routeTypeId),
    });
  };

  const moveToModRouteType = data => {
    setRouteType(data);
    navigate('/admin/routing-type/main');
  };

  const addRouteType = async () => {
    if (
      typeDescriptionRef.current &&
      !isValidRouteTypeString(typeDescriptionRef.current)
    ) {
      setErrMsg(ERROR_MESSAGE.ROUTE_TYPE.TEXT);
      return;
    } else if (!isValidStringLength(typeNameRef.current, 10)) {
      setErrMsg(ERROR_MESSAGE.ROUTE_TYPE.ROUTE_TYPE_LENGTH);
      return;
    } else if (
      typeDescriptionRef.current &&
      !isValidStringLength(typeDescriptionRef.current, 25)
    ) {
      setErrMsg(ERROR_MESSAGE.ROUTE_TYPE.ROUTE_DESCRIPTION_LENGTH);
      return;
    }

    try {
      let params = {
        typeName: typeNameRef.current,
        typeDescription: typeDescriptionRef.current,
      };

      const apiResult = await api.request({
        Authorization: `Bearer ${userInfo.accessToken}`,
        url: ROUTING.ROUTE_TYPE,
        method: 'POST',
        data: params,
      });

      if (apiResult.status === 200) {
        await getRouteTypeList();
        typeNameRef.current = '';
        typeDescriptionRef.current = '';
      } else {
        setErrMsg(ERROR_MESSAGE.COMMON.INSERT);
      }

      closeModal();
    } catch (error) {
      if (error.response.data.error === 'DUPLICATED_DATA') {
        setErrMsg('중복된 라우트 타입명이 존재합니다.');
      } else {
        setErrMsg(ERROR_MESSAGE.COMMON.INSERT);
      }
    }
  };

  const activeAddModal = () => {
    setModal({
      isOpen: true,
      title: BUTTON_TEXT.CREATE.ROUTE_TYPE,
      proceedBtnName: BUTTON_TEXT.CREATE.DEFAULT,
      children: (
        <>
          <InputBasic
            title={LABEL_TITLE.ROUTE_TYPE.ROUTE_TYPE_NAME}
            placeholder={INPUT_TEXT.PLACEHOLDER.ROUTE_NAME}
            validation='required'
            onChange={onChangeTypeName}
          />
          <InputBasic
            title={LABEL_TITLE.ROUTE_TYPE.ROUTE_TYPE_DESCRIPTION}
            placeholder={INPUT_TEXT.PLACEHOLDER.ROUTE_DESCRIPTION}
            validation='optional'
            onChange={onChangeTypeDescription}
          />
        </>
      ),
      onClose: initRouteType,
      onProceed: () => addRouteType(),
    });
  };

  const activeModModal = data => {
    const { typeName, typeDescription } = data;

    setModal({
      isOpen: true,
      title: BUTTON_TEXT.MODIFY.ROUTE_TYPE,
      proceedBtnName: BUTTON_TEXT.MODIFY.DEFAULT,
      children: (
        <>
          <InputBasic
            title={LABEL_TITLE.ROUTE_TYPE.ROUTE_TYPE_NAME}
            value={typeName}
            onChange={onChangeTypeName}
          />
          <InputBasic
            title={LABEL_TITLE.ROUTE_TYPE.ROUTE_TYPE_DESCRIPTION}
            value={typeDescription}
            onChange={onChangeTypeDescription}
          />
        </>
      ),
      onClose: initRouteType,
      onProceed: () => modRouteTypeInfo(data),
    });

    typeNameRef.current = typeName;
    typeDescriptionRef.current = typeDescription;
  };

  useEffect(() => {
    getRouteTypeList();
  }, []);

  useEffect(() => {
    getRouteTypeList(page, size);
  }, [page, size, getRouteTypeList]);

  return hideParent ? (
    <Outlet />
  ) : (
    <>
      <Header
        title={TITLE.ROUTE.MAIN}
        buttonNumber={1}
        buttonLabel={[BUTTON_TEXT.CREATE.ROUTE_TYPE]}
        calenderPicker={false}
        filter={true}
        filterType={'route'}
        onButtonClick={[activeAddModal]}
        onFilterChange={handleFilterChange}
      />
      <Table tableType='routeType' data={routeTypeList} />
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
    </>
  );
};

export default AdminRouting;
