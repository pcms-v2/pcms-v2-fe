// ../pages/admin/AdminDeliveryRound/components/AdminDeliveryRoundDispatch.jsx
import { useNavigate } from 'react-router-dom';
import { BUTTON_TEXT, STATUS_BOX, TITLE } from '../../../../constants/text';
import useDeliveryStore from '../../../../contexts/useDeliveryStore';
import { formatDate } from '../../../../utils/common';
import { ROUTING } from '../../../../constants/apiEndpoint';
import api from '../../../../utils/api';
import { useEffect, useState } from 'react';
import Header from '../../../../components/layout/Header/Header';
import RouterTable from '../../../../components/common/RouterTable';
import Select from '../../../../components/common/Select';
import { useUserStore } from '../../../../contexts/useUserStore';
import useDockStore from '../../../../contexts/useDockStore';
import useDriverStore from '../../../../contexts/useDriverStore';
import { curry } from 'lodash';
import {
  ModalOverlay,
  ModalWrapper,
  ErrText,
  ButtonWrap,
} from '../../../Login.styles';
import CommonButton from '../../../../components/common/Button';
import VehicleDockTable from '../../../../components/common/VehicleDockTable/VehicleDockTable';
import Loading from '../../../../components/common/Loading';

// 배차 진행
const AdminDeliveryRoundDispatch = () => {
  const { userInfo } = useUserStore();
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);
  const [failInfo, setFailInfo] = useState('');
  const { deliveryRoundDetail, deliveryDispatch, setDeliveryDispatch } =
    useDeliveryStore();
  const { docksList, setDocksList } = useDockStore();
  const {
    oneTonDriverList,
    ldvDriverList,
    setOneTonDriverList,
    setLdvDriverList,
    driverList,
    setDriverList,
  } = useDriverStore();

  const [routeTable, setRouteTable] = useState([]); // 라우트 > 출하도크 할당 테이블 리스트
  const [dockTable, setDockTable] = useState(() =>
    Array.from({ length: docksList.length }, () => [])
  ); // 출하도크 > 배송기사 할당 테이블 리스트

  const [dockListLoaded, setDockListLoaded] = useState(false);
  const [driverListLoaded, setDriverListLoaded] = useState(false);

  const [dockAutoAssignTableLoaded, setDockAutoAssignTableLoaded] =
    useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // [x] 뒤로가기 핸들러
  const handleBack = () => {
    navigate(
      `/admin/deliveryRound/detail/${deliveryRoundDetail.deliveryRoundId}`
    );
  };

  // [x] 도크 선택 변경 핸들러
  const handleDocksSelectChange = (routeData, value) => {
    let newRouteData = {
      ...routeData,
      dockId: docksList.find(dock => dock.dockName === value).dockId,
      dockName: value,
      driverName: null,
      driverId: null,
    };

    const dockId = newRouteData.dockId;
    const deliveryCloseId = newRouteData.deliveryCloseId;
    const index = dockId - 1;

    setDockTable(prevState => {
      const newState = prevState.map(arr =>
        Array.isArray(arr) ? [...arr] : []
      );

      // 모든 배열에서 해당 deliveryCloseId를 가진 항목 제거
      newState.forEach((arr, i) => {
        newState[i] = arr.filter(
          data => data.deliveryCloseId !== deliveryCloseId
        );
      });

      // 새로운 위치에 항목 추가
      if (!Array.isArray(newState[index])) {
        newState[index] = [];
      }
      newState[index].push(newRouteData);

      return newState;
    });
  };

  // [x] 배송기사 선택 변경 핸들러
  const handleDriverSelectChange = (value, curr) => {
    const driverName = value;
    const driverId = driverList.find(
      driver => driver.driverName === value
    ).driverId;

    setDockTable(prevState => {
      const newState = prevState.map(arr => [...arr]);
      const dockId = curr[0].dockId;
      const index = dockId - 1;

      // 현재 dockId에 해당하는 모든 curr 항목을 업데이트
      curr.forEach(item => {
        newState[index] = newState[index].filter(
          data => data.deliveryCloseId !== item.deliveryCloseId
        );
        newState[index].push({
          ...item,
          driverId,
          driverName,
        });
      });

      return newState;
    });
  };

  // [x] 출하 도크 데이터 가져오기
  const getDockData = async () => {
    const apiResult = await api.request({
      Authorization: `Bearer ${userInfo.accessToken}`,
      url: ROUTING.DOCK,
      method: 'GET',
    });
    const { status, data } = apiResult;
    if (status === 200) {
      const { data: arrayData } = data;
      setDocksList(arrayData);
      setDockListLoaded(true);
    } else {
      console.log('데이터 통신 실패 : ', apiResult);
    }
  };

  // [x] 배송기사 리스트 조회
  const getDriverList = async () => {
    let params = {
      page: 1,
      size: 9999,
      keyword: '',
    };

    const apiResult = await api.request({
      Authorization: `Bearer ${userInfo.accessToken}`,
      url: ROUTING.DELIVERY_DRIVER,
      method: 'GET',
      params,
    });

    const { status, data } = apiResult;
    if (status === 200) {
      const { data: arrayData } = data;
      const oneTonDriverList = arrayData.filter(
        driver => driver.vehicleType === '1T'
      );
      const ldvDriverList = arrayData.filter(
        driver => driver.vehicleType === 'LDV'
      );
      setOneTonDriverList(oneTonDriverList.map(driver => driver.driverName));
      setLdvDriverList(ldvDriverList.map(driver => driver.driverName));
      setDriverList(arrayData);
      setDriverListLoaded(true);
    }
  };

  // [x] 배차 진행 데이터 가져오기
  const getDispatchData = async () => {
    try {
      const apiResult = await api.request({
        Authorization: `Bearer ${userInfo.accessToken}`,
        url: `${ROUTING.DELIVERY}/${deliveryRoundDetail.deliveryRoundId}/vehicle`,
        method: 'GET',
      });

      const { status, data } = apiResult;
      if (status === 200) {
        const [closeRoutes, docks] = [data.closeRoutes, data.docks];

        if (data.closeRoutes.length !== 0 && data.docks.length !== 0) {
          setRouteTable(closeRoutes);
          setDockTable(prevState => {
            const newState = prevState.map(arr => [...arr]);
            closeRoutes.forEach(routeData => {
              const dockId = routeData.dockId;
              const deliveryCloseId = routeData.deliveryCloseId;
              const index = dockId - 1;

              newState[index] = newState[index].filter(
                data => data.deliveryCloseId !== deliveryCloseId
              );
              newState[index].push(routeData);
            });

            return newState;
          });
        } else {
          setRouteTable(closeRoutes);
        }

        setDeliveryDispatch(data);
      }
    } catch (error) {
      console.error('API 요청 중 오류 발생:', error);
    }
  };

  // [x] 출하 도크 자동 할당
  const handleDockAutoAssign = () => {
    const updatedRouteTable = routeTable.map((route, index) => {
      const dock = docksList[index % docksList.length];
      return {
        ...route,
        deliveryCloseId: route.deliveryCloseId,
        route: route.route,
        addressesCount: route.addressesCount,
        productsCount: route.productsCount,
        dockId: dock.dockId,
        dockName: dock.dockName,
      };
    });

    // 상태를 완전히 새로 설정
    setRouteTable([]);
    setDockTable([]);

    // 약간의 지연 후 새로운 상태 설정
    setTimeout(() => {
      setRouteTable(updatedRouteTable);
      setDockTable(updatedRouteTable.map(route => [route]));
      setDockAutoAssignTableLoaded(true);
    }, 0);
  };

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([getDockData(), getDriverList()]);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (dockListLoaded && driverListLoaded) {
      getDispatchData();
    }
  }, [dockListLoaded, driverListLoaded]);

  // [x] 배차 임시 저장
  const dispatchSave = async () => {
    const dockTableFlat = dockTable.flat();

    const driverIdList = dockTableFlat.map(data => data.driverId);
    const dockIdList = dockTableFlat.map(data => data.dockId);
    const driverIdSet = new Set(driverIdList);
    const dockIdSet = new Set(dockIdList);

    if (
      dockTableFlat.length === 0 ||
      dockTableFlat.length !== deliveryDispatch.closeRoutes.length
    ) {
      setFailInfo('도크와 배송기사를 모두 할당해주세요.');
      setOpenModal(true);
      return;
    }
    // driverIdSet에 null이 포함되면 오류 발생
    else if (driverIdSet.has(null) || dockIdSet.has(null)) {
      setFailInfo('배송기사를 다시 선택해주세요.');
      setOpenModal(true);
      return;
    } else if (driverIdSet.size !== dockIdSet.size) {
      setFailInfo('같은 배송기사를 할당할 수 없습니다.');
      setOpenModal(true);
      return;
    }

    for (const data of dockTableFlat) {
      const vehicleType = data.dockName.split(' - ')[0];
      if (vehicleType === '1T' && !oneTonDriverList.includes(data.driverName)) {
        setFailInfo('1T배송기사를 할당해주세요.');
        setOpenModal(true);
        return;
      } else if (
        vehicleType === 'LDV' &&
        !ldvDriverList.includes(data.driverName)
      ) {
        setFailInfo('LDV배송기사를 할당해주세요.');
        setOpenModal(true);
        return;
      }
    }

    // 사용자가 도크를 변경하지 않고 그대로 실행했을 경우
    // 사용자가 도크를 변경하고 실행했을 경우
    const data = {
      closeRoutes: dockTableFlat.map(data => ({
        deliveryCloseId: data.deliveryCloseId,
        dockId: data.dockId,
        driverId: data.driverId,
      })),
    };

    const apiResult = await api.request({
      Authorization: `Bearer ${userInfo.accessToken}`,
      url: `${ROUTING.DELIVERY}/${deliveryRoundDetail.deliveryRoundId}/vehicle`,
      method: 'PUT',
      data,
    });

    const { status } = apiResult;
    if (status === 200) {
      alert('배차가 임시 저장되었습니다.');
    } else {
      alert('배차 임시 저장에 실패했습니다.');
    }

    if (status === 400) {
      failInfo('동일한 배차 정보를 저장할 수 없습니다.');
      setOpenModal(true);
    }
  };

  // [x] 배차 마감
  const dispatchDeadline = async () => {
    const dockTableFlat = dockTable.flat();

    const driverIdList = dockTableFlat.map(data => data.driverId);
    const dockIdList = dockTableFlat.map(data => data.dockId);
    const driverIdSet = new Set(driverIdList);
    const dockIdSet = new Set(dockIdList);

    if (
      dockTableFlat.length === 0 ||
      dockTableFlat.length !== deliveryDispatch.closeRoutes.length
    ) {
      setFailInfo('도크와 배송기사를 모두 할당해주세요.');
      setOpenModal(true);
      return;
    } else if (driverIdSet.has(null) || dockIdSet.has(null)) {
      setFailInfo('배송기사를 다시 선택해주세요.');
      setOpenModal(true);
      return;
    } else if (driverIdSet.size !== dockIdSet.size) {
      setFailInfo('같은 배송기사를 할당할 수 없습니다.');
      setOpenModal(true);
      return;
    }

    for (const data of dockTableFlat) {
      const vehicleType = data.dockName.split(' - ')[0];
      if (vehicleType === '1T' && !oneTonDriverList.includes(data.driverName)) {
        setFailInfo('1T배송기사를 할당해주세요.');
        setOpenModal(true);
        return;
      } else if (
        vehicleType === 'LDV' &&
        !ldvDriverList.includes(data.driverName)
      ) {
        setFailInfo('LDV배송기사를 할당해주세요.');
        setOpenModal(true);
        return;
      }
    }

    const data = {
      closeRoutes: dockTableFlat.map(data => ({
        deliveryCloseId: data.deliveryCloseId,
        dockId: data.dockId,
        driverId: data.driverId,
      })),
    };
    setIsLoading(true); // 로딩 시작
    try {
      const apiResult = await api.request({
        Authorization: `Bearer ${userInfo.accessToken}`,
        url: `${ROUTING.DELIVERY}/${deliveryRoundDetail.deliveryRoundId}/vehicle`,
        method: 'POST',
        data: data,
      });

      const { status } = apiResult;
      if (status === 200) {
        alert('배차 마감되었습니다.');
        navigate(`/admin/deliveryRound`);
      } else {
        alert('배차 마감에 실패했습니다.');
      }
    } catch (error) {
      console.error('배차 마감 중 오류 발생:', error);
      alert('배차 마감 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false); // 로딩 종료
    }
  };

  // [x] 배차 마감 실패 시 모달
  const OpenDeadLineFaildModal = () => {
    return (
      <>
        <ModalOverlay>
          <ModalWrapper>
            <ErrText>
              <h1>{failInfo}</h1>
            </ErrText>
            <ButtonWrap>
              <CommonButton
                type='black'
                label='닫기'
                onClick={() => setOpenModal(false)}
              />
            </ButtonWrap>
          </ModalWrapper>
        </ModalOverlay>
      </>
    );
  };

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {' '}
          <Header
            title={TITLE.DELIVERY_ROUND.DETAIL}
            subTitle={`> ${deliveryDispatch.deliveryRoundName} > ${TITLE.DELIVERY_ROUND.DISPATCH}`}
            buttonLabel={[
              BUTTON_TEXT.BACK,
              BUTTON_TEXT.SAVE.TEMP.DISPATCH,
              BUTTON_TEXT.DEADLINE.DISPATCH,
            ]}
            onButtonClick={[handleBack, dispatchSave, dispatchDeadline]}
            statusNumber={4}
            statusTitle={[
              STATUS_BOX.DELIVERY_ROUND.SHIPPER,
              STATUS_BOX.DELIVERY_ROUND.REQUEST_DATE,
              STATUS_BOX.DELIVERY_ROUND.BY_ADDRESS,
              STATUS_BOX.DELIVERY_ROUND.BY_PRODUCT,
            ]}
            statusValue={[
              deliveryDispatch.shipperName,
              formatDate(deliveryDispatch.requestAt),
              deliveryDispatch.totalAddressesCount,
              deliveryDispatch.totalProductsCount,
            ]}
            sectionDivider={true}
            sectionDividerMargin={[18, 16]}
          />
          <div style={{ display: 'flex', gap: '60px' }}>
            {dockAutoAssignTableLoaded === false && (
              <RouterTable
                title={['라우트', '출하 도크 할당']}
                subTitle={'출하 도크 자동 할당'}
                dockHandler={handleDockAutoAssign}
                headerStrings={[
                  '라우트명',
                  '주소 기준',
                  '상품 기준',
                  '출하 도크 구분',
                ]}
                data={routeTable.map(data => ({
                  route: data.route,
                  addressesCount: data.addressesCount,
                  productsCount: data.productsCount,
                  selectedDock: (
                    <Select
                      label=''
                      options={docksList.map(dock => dock.dockName)}
                      onChange={curry(handleDocksSelectChange)(data)}
                      value={data.dockName || undefined}
                      defaultValue={data.dockName || undefined}
                    />
                  ),
                }))}
                type={'delivery'}
              />
            )}
            {dockAutoAssignTableLoaded === true && (
              <RouterTable
                title={['라우트', '출하 도크 할당']}
                subTitle={'출하 도크 자동 할당'}
                dockHandler={handleDockAutoAssign}
                headerStrings={[
                  '라우트명',
                  '주소 기준',
                  '상품 기준',
                  '출하 도크 구분',
                ]}
                data={routeTable.map(data => ({
                  route: data.route,
                  addressesCount: data.addressesCount,
                  productsCount: data.productsCount,
                  selectedDock: (
                    <Select
                      label=''
                      options={docksList.map(dock => dock.dockName)}
                      onChange={curry(handleDocksSelectChange)(data)}
                      value={data.dockName || undefined}
                      defaultValue={data.dockName || undefined}
                    />
                  ),
                }))}
                type={'delivery'}
              />
            )}

            <VehicleDockTable
              title={['출하 도크', '배송 기사 할당']}
              headerStrings={[
                '출하 도크 구분',
                '주소 기준',
                '상품 기준',
                '배송 기사 할당',
              ]}
              data={dockTable
                .filter(arr => arr.length > 0)
                .map(arr => {
                  if (arr.length > 1) {
                    const combinedData = arr.reduce(
                      (acc, curr) => {
                        acc.addressesCount += curr.addressesCount;
                        acc.productsCount += curr.productsCount;
                        return acc;
                      },
                      {
                        dockName: arr[0].dockName,
                        addressesCount: 0,
                        productsCount: 0,
                        driver: (
                          <Select
                            label=''
                            options={
                              arr[0].dockName.split(' - ')[0] === '1T'
                                ? oneTonDriverList
                                : ldvDriverList
                            }
                            onChange={value =>
                              handleDriverSelectChange(value, arr)
                            }
                            value={arr[0].driverName || undefined}
                            defaultValue={arr[0].driverName || undefined}
                          />
                        ),
                      }
                    );
                    return combinedData;
                  } else {
                    return {
                      dockName: arr[0].dockName,
                      addressesCount: arr[0].addressesCount,
                      productsCount: arr[0].productsCount,

                      driver: (
                        <Select
                          label=''
                          options={
                            arr[0].dockName.split(' - ')[0] === '1T'
                              ? oneTonDriverList
                              : ldvDriverList
                          }
                          onChange={value =>
                            handleDriverSelectChange(value, arr)
                          }
                          value={arr[0].driverName || undefined}
                          defaultValue={arr[0].driverName || undefined}
                        />
                      ),
                    };
                  }
                })}
              type={'delivery'}
            />
          </div>
          {openModal && <OpenDeadLineFaildModal />}
        </>
      )}
    </div>
  );
};

export default AdminDeliveryRoundDispatch;
