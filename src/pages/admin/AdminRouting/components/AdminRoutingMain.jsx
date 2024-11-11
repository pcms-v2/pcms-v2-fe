// admin - 라우팅 관리
import { useEffect, useState, useRef } from 'react';
import { useModalStore } from '../../../../contexts/useModalStore';
import {
  BUTTON_TEXT,
  INPUT_TEXT,
  LABEL_TITLE,
  STATUS_BOX,
  TITLE,
} from '../../../../constants/text';
import InputBasic from '../../../../components/common/Input';
import Icon from '../../../../components/common/Icon';
import Header from '../../../../components/layout/Header/Header';
import Table from '../../../../components/common/Table';
import { PaginationItem } from '@mui/material';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import Box from '@mui/material/Box';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import useRoutingStore from '../../../../contexts/useRoutingStore';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import api from '../../../../utils/api';
import { ROUTING } from '../../../../constants/apiEndpoint';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { formatDate } from '../../../../utils/common';
import { ERROR_MESSAGE, WARNING_MESSAGE } from '../../../../constants/message';
import { ViewSize } from '../AdminRouting.styles';
import { useUserStore } from '../../../../contexts/useUserStore';

const AdminRoutingMain = () => {
  const { userInfo } = useUserStore();
  const location = useLocation();
  const navigate = useNavigate();

  const hideParent = location.pathname.includes([
    '/admin/routing-type/main/add',
    '/admin/routing-type/main/update',
    '/admin/routing-type/main/detail',
  ]);

  const { setModal, setErrMsg, setWarningMsg, closeModal } = useModalStore();
  const { routeType, setRouteType, setRouteMainDetail } = useRoutingStore();
  const keywordRef = useRef('');

  const [routeTypeDetailList, setRouteTypeDetailList] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [totalPage, setTotalPage] = useState(1);

  const onChangeKeyword = async keyword => {
    keywordRef.current = keyword;

    await getRouteTypeDetail(page, size);
  };

  const handlePageChange = (event, page) => {
    setPage(page);
    getRouteTypeDetail(page);
  };

  const handleSizeChange = event => {
    setSize(parseInt(event.target.value));
    setPage(1);
    getRouteTypeDetail(1, event.target.value);
  };

  const getRouteTypeDetail = async (curPage = page, curSize = size) => {
    const apiResult = await api.request({
      Authorization: `Bearer ${userInfo.accessToken}`,
      url: `${ROUTING.ROUTE_TYPE}/${routeType.routeTypeId}`,
      method: 'GET',
      params: {
        keyword: keywordRef.current,
        page: curPage,
        size: curSize,
      },
    });

    const { status, data } = apiResult;
    if (status === 200) {
      const { data: arrayData, pagination } = data;

      const routeTypeDetailList = arrayData
        .sort((a, b) => a.mainRouteId - b.mainRouteId)
        .map(data => ({
          ...data,
          viewRoute: (
            <Icon iconType='detail' onClick={() => moveToRouteDetail(data)} />
          ),
          modifyRoute: (
            <Icon iconType='modify' onClick={() => moveToModRoute(data)} />
          ),
          deleteRoute: (
            <Icon iconType='delete' onClick={() => activeDelModal(data)} />
          ),
        }));

      setRouteTypeDetailList(routeTypeDetailList);
      setTotalPage(pagination.totalPages);
    }
  };

  const deleteRoute = async routeDetail => {
    try {
      const apiResult = await api.request({
        Authorization: `Bearer ${userInfo.accessToken}`,
        url: `${ROUTING.ROUTE_MAIN}/${routeDetail.mainRouteId}`,
        method: 'DELETE',
      });

      if (apiResult.status === 200) {
        await getRouteTypeDetail();
      } else {
        setErrMsg(ERROR_MESSAGE.COMMON.DELETE);
      }

      closeModal();
    } catch (err) {
      setErrMsg(ERROR_MESSAGE.COMMON.DELETE);
    }
  };

  const activeDelModal = routeDetail => {
    setModal({
      isOpen: true,
      title: BUTTON_TEXT.DELETE.ROUTE,
      proceedBtnName: BUTTON_TEXT.DELETE.DEFAULT,
      children: (
        <>
          <InputBasic
            display='flex'
            title={LABEL_TITLE.ROUTE.ROUTE_TYPE}
            disabled={true}
            value={routeType.typeName}
            type={'modalContent'}
          />
          <InputBasic
            display='flex'
            title={LABEL_TITLE.ROUTE.ROUTE_MAIN}
            disabled={true}
            value={routeDetail.routeName}
            type={'modalContent'}
          />
          <InputBasic
            display='flex'
            title={LABEL_TITLE.ROUTE.ROUTE_SUB}
            disabled={true}
            value={routeDetail.subRouteNames}
            type={'modalContent'}
          />
        </>
      ),
      onProceed: () => deleteRoute(routeDetail),
    });

    setWarningMsg(
      <>
        <div>{WARNING_MESSAGE.ROUTE.DELETE}</div>
        <div>{WARNING_MESSAGE.COMMON.DELETE}</div>
      </>
    );
  };

  const moveToRouteType = () => {
    setRouteType({});
    navigate('/admin/routing-type');
  };

  const moveToAddRoute = () => {
    navigate('/admin/routing-type/main/add');
  };

  const moveToRouteDetail = routeMain => {
    setRouteMainDetail(routeMain);
    navigate('/admin/routing-type/main/detail');
  };

  const moveToModRoute = routeMain => {
    setRouteMainDetail(routeMain);
    navigate('/admin/routing-type/main/update');
  };

  useEffect(() => {
    getRouteTypeDetail();
  }, []);

  return hideParent ? (
    <Outlet />
  ) : (
    <>
      <Header
        title={TITLE.ROUTE.DETAIL}
        subTitle={` > ${routeType.typeName}`}
        buttonNumber={2}
        buttonLabel={[BUTTON_TEXT.BACK, BUTTON_TEXT.CREATE.ROUTE]}
        search={true}
        searchPlaceholder={INPUT_TEXT.PLACEHOLDER.ROAD_ADDRESS}
        statusNumber={3}
        statusTitle={[
          STATUS_BOX.ROUTE.CUR_VERSION,
          STATUS_BOX.ROUTE.LATEST_UPDATED_AT,
          STATUS_BOX.ROUTE.LATEST_UPDATED_USER,
        ]}
        statusValue={[
          routeType.version,
          formatDate(routeType.updatedAt),
          routeType.updatedUser,
        ]}
        onButtonClick={[moveToRouteType, moveToAddRoute]}
        onSearch={onChangeKeyword}
      />
      <Table tableType='route' data={routeTypeDetailList} />
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

export default AdminRoutingMain;
