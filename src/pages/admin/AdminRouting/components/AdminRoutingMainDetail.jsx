import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../../utils/api';
import useRoutingStore from '../../../../contexts/useRoutingStore';
import { ROUTING } from '../../../../constants/apiEndpoint';
import { BUTTON_TEXT, LABEL_TITLE, TITLE } from '@constants/text';
import Header from '../../../../components/layout/Header/Header';
import { Divider } from '../../../../components/common/SectionDivider/SectionDivider.styles';
import InputBasic from '../../../../components/common/Input';
import Icon from '../../../../components/common/Icon';
import { List, ListItemText, Paper } from '@mui/material';
import {
  SearchWrapper,
  SubRouteInfoBox,
  SubRouteName,
  AsignedBox,
  SubRouteInfoText,
  TextWrapper,
} from '../AdminRouting.styles';
import { useUserStore } from '../../../../contexts/useUserStore';

const AdminRoutingMainDetail = () => {
  const { userInfo } = useUserStore();
  const navigate = useNavigate();

  const { routeType, routeMainDetail } = useRoutingStore();

  const [subRouteList, setSubRouteList] = useState([]);
  const [subRouteDetail, setSubRouteDetail] = useState(null);

  const handleChangeSubRoute = subRoute => {
    setSubRouteDetail(subRoute);
  };

  const getSubRouteList = async (isRender = false) => {
    const apiResult = await api.request({
      Authorization: `Bearer ${userInfo.accessToken}`,
      url: `${ROUTING.ROUTE_MAIN}/${routeMainDetail.mainRouteId}`,
      method: 'GET',
    });

    const { status, data } = apiResult;
    if (status === 200) {
      if (isRender) {
        handleChangeSubRoute(data.subRoutes[0]);
      }
      setSubRouteList(data.subRoutes);
    }
  };

  const moveToRouteMain = () => {
    navigate('/admin/routing-type/main');
  };

  const moveToRouteUpdate = () => {
    navigate('/admin/routing-type/main/update');
  };

  useEffect(() => {
    getSubRouteList(true);
  }, []);

  return (
    <>
      <Header
        title={TITLE.ROUTE.MAIN}
        subTitle={` > ${routeType.typeName} > ${TITLE.ROUTE.VIEW}`}
        buttonNumber={2}
        buttonLabel={[BUTTON_TEXT.CANCEL.DEFAULT, BUTTON_TEXT.MODIFY.DO]}
        calenderPicker={false}
        sectionDivider={true}
        onButtonClick={[moveToRouteMain, moveToRouteUpdate]}
      />
      <InputBasic
        display='flex'
        type='basic'
        title={LABEL_TITLE.ROUTE.ROUTE_NAME}
        value={routeMainDetail.routeName}
        disabled={true}
      />
      <InputBasic
        display='flex'
        type='basic'
        title={LABEL_TITLE.ROUTE.ROUTE_DESCRIPTION}
        value={routeMainDetail.routeDescription}
        disabled={true}
      />
      <SearchWrapper>
        <SubRouteInfoBox>
          <SubRouteInfoText>
            {LABEL_TITLE.ROUTE.SUB_ROUTE_INFO}
          </SubRouteInfoText>
          <Divider type='basic' />
          {subRouteList.map(subRoute => {
            return (
              <SubRouteName
                key={subRoute.subRouteName}
                selected={subRoute.subRouteName === subRouteDetail.subRouteName}
                onClick={() => handleChangeSubRoute(subRoute)}
              >
                {subRoute.subRouteName}
              </SubRouteName>
            );
          })}
        </SubRouteInfoBox>
        <AsignedBox type='detail'>
          <Paper
            sx={{
              width: '100%',
              height: '728px',
              overflow: 'auto',
              borderRadius: '10px',
              background: '#fff',
              boxShadow: '0px 0px 8px 0px rgba(0, 0, 0, 0.1)',
            }}
          >
            <List sx={{ paddingTop: '0px' }} dense component='div' role='list'>
              {subRouteDetail &&
                subRouteDetail.addresses.map((address, index) => {
                  return (
                    <div key={`${index}${subRouteDetail.subRouteName}`}>
                      <TextWrapper>
                        <Icon iconType='period' />
                        <ListItemText
                          id={index}
                          primary={address.streetAddress}
                        />
                      </TextWrapper>

                      <Divider type='basic' />
                    </div>
                  );
                })}
            </List>
          </Paper>
        </AsignedBox>
      </SearchWrapper>
    </>
  );
};

export default AdminRoutingMainDetail;
