import { useNavigate } from 'react-router-dom';
import { BUTTON_TEXT, STATUS_BOX, TITLE } from '../../../../constants/text';
import useDeliveryStore from '../../../../contexts/useDeliveryStore';
import { formatDate } from '../../../../utils/common';
import { ROUTING } from '../../../../constants/apiEndpoint';
import api from '../../../../utils/api';
import { useEffect, useState } from 'react';
import Header from '../../../../components/layout/Header/Header';
import RouterTable from '../../../../components/common/RouterTable';
import { useUserStore } from '../../../../contexts/useUserStore';
import { SelectBox } from '../AdminDeliveryRound.styles';
import VehicleDockTable from '../../../../components/common/VehicleDockTable/VehicleDockTable';

// 배차 내역
const AdminDeliveryRoundDispatchDetail = () => {
  const { userInfo } = useUserStore();
  const navigate = useNavigate();

  const { deliveryRoundDetail, deliveryDispatch, setDeliveryDispatch } =
    useDeliveryStore();

  const [routeForDock, setRouteForDock] = useState([]); // 라우트 > 출하도크 할당 테이블 리스트
  const [dockForDriver, setDockForDriver] = useState([]); // 출하도크 > 배송기사 할당 테이블 리스트

  // [x] 뒤로가기 핸들러
  const handleBack = () => {
    navigate(
      `/admin/deliveryRound/detail/${deliveryRoundDetail.deliveryRoundId}`
    );
  };

  // [x] 배차 내역 데이터 조회
  const getDispatchData = async () => {
    try {
      const apiResult = await api.request({
        Authorization: `Bearer ${userInfo.accessToken}`,
        url: `${ROUTING.DELIVERY}/${deliveryRoundDetail.deliveryRoundId}/vehicle`,
        method: 'GET',
      });

      const { status, data } = apiResult;
      if (status === 200) {
        setDeliveryDispatch(data);
        setRouteForDock(data.closeRoutes);
        setDockForDriver(data.docks);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDispatchData();
  }, []);

  return (
    <div>
      <Header
        title={TITLE.DELIVERY_ROUND.DETAIL}
        subTitle={`> ${deliveryDispatch.deliveryRoundName} > ${TITLE.DELIVERY_ROUND.DISPATCH}`}
        buttonLabel={[BUTTON_TEXT.BACK]}
        onButtonClick={[handleBack]}
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
        <RouterTable
          title={['라우트', '출하 도크 할당']}
          headerStrings={[
            '라우트명',
            '주소 기준',
            '상품 기준',
            '출하 도크 구분',
          ]}
          data={routeForDock.map(data => ({
            route: data.route,
            addressesCount: data.addressesCount,
            productsCount: data.productsCount,
            selectedDock: <SelectBox>{data.dockName}</SelectBox>,
          }))}
          type={'delivery'}
        />

        <VehicleDockTable
          title={['출하 도크', '배송 기사 할당']}
          headerStrings={[
            '출하 도크 구분',
            '주소 기준',
            '상품 기준',
            '배송 기사 할당',
          ]}
          data={dockForDriver.map(data => ({
            dockName: data.dockName,
            addressesCount: data.addressesCount,
            productsCount: data.productsCount,
            driver: <SelectBox>{data.driverName}</SelectBox>,
          }))}
          type={'delivery'}
        />
      </div>
    </div>
  );
};

export default AdminDeliveryRoundDispatchDetail;
