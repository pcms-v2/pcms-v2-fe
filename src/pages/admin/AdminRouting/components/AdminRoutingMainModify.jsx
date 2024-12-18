import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Checkbox,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
} from '@mui/material';
import Header from '../../../../components/layout/Header/Header';
import {
  BUTTON_TEXT,
  INPUT_TEXT,
  LABEL_TITLE,
  TITLE,
} from '../../../../constants/text';
import { Divider } from '../../../../components/common/SectionDivider/SectionDivider.styles';
import InputBasic from '../../../../components/common/Input';
import CommonButton from '../../../../components/common/Button';
import DeleteBox from '../../../../components/DeleteBox';
import { ROUTING } from '../../../../constants/apiEndpoint';
import {
  isValidEnglishNumberOnly,
  isValidStringLength,
} from '../../../../utils/validation';
import SearchInputBasic from '../../../../components/common/SearchInput';
import CommonCheckBox from '../../../../components/common/CheckBox';
import Icon from '../../../../components/common/Icon';

import api from '../../../../utils/api';
import { useModalStore } from '../../../../contexts/useModalStore';
import { ERROR_MESSAGE } from '../../../../constants/message';
import useRoutingStore from '../../../../contexts/useRoutingStore';
import {
  AddressText,
  AsignedBox,
  BootstrapButton,
  ButtonWrapper,
  CheckAllBox,
  NonAsignedBox,
  SearchInputWraaper,
  SearchWrapper,
  SubRouteInfoBox,
  SubRouteInfoText,
  SubRouteSearchWrapper,
} from '../AdminRouting.styles';
import { useUserStore } from '../../../../contexts/useUserStore';

const not = (a, b) => {
  return a.filter(value => b.indexOf(value) === -1);
};

const intersection = (a, b) => {
  return a.filter(value => b.indexOf(value) !== -1);
};

const AdminRoutingMainModify = () => {
  const { userInfo } = useUserStore();
  const navigate = useNavigate();

  const { routeType, routeMainDetail } = useRoutingStore();
  const { setModal, setErrMsg, closeModal } = useModalStore();

  const keywordRef = useRef('');
  const signedKeywordRef = useRef('');
  const routeNameRef = useRef('');
  const routeDescriptionRef = useRef('');
  // const subRoutNameRef = useRef('');

  const [subRouteName, setSubRouteName] = useState('');

  const [newSubRoute, setNewSubRoute] = useState({
    subRouteName: '',
    addresses: [],
  });
  const [newSubRouteList, setNewSubRouteList] = useState([]);
  const [unsignedAddressList, setUnsignedAddressList] = useState([]);

  const [checked, setChecked] = useState([]);
  const [isLeftCheck, setIsLeftCheck] = useState(false);
  const [isRightCheck, setIsRightCheck] = useState(false);

  const leftChecked = intersection(checked, newSubRoute.addresses);
  const rightChecked = intersection(checked, unsignedAddressList);

  const onChangeKeyword = keyword => {
    keywordRef.current = keyword;
  };

  const onChangeSignedKeyword = keyword => {
    signedKeywordRef.current = keyword;
  };

  const onChangeRouteName = routeName => {
    routeNameRef.current = routeName;
  };

  const onChangeRouteDescription = description => {
    routeDescriptionRef.current = description;
  };

  const onChangeSubRouteName = event => {
    setSubRouteName(event);
  };

  const handleCheckBox = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleCheckedRight = () => {
    const findIndex = newSubRouteList.findIndex(
      subRoute => subRoute.subRouteName === newSubRoute.subRouteName
    );
    const newValue = {
      ...newSubRoute,
      addresses: not(newSubRoute.addresses, leftChecked),
    };
    const updatedNewSubRoute = newSubRouteList.map((subRoute, index) =>
      index === findIndex ? newValue : subRoute
    );

    setNewSubRoute(newValue);
    setNewSubRouteList(updatedNewSubRoute);
    setUnsignedAddressList(unsignedAddressList.concat(leftChecked));
    setChecked(not(checked, leftChecked));
    setIsLeftCheck(false);
  };

  const handleCheckedLeft = () => {
    const findIndex = newSubRouteList.findIndex(
      subRoute => subRoute.subRouteName === newSubRoute.subRouteName
    );
    const newValue = {
      ...newSubRoute,
      addresses: newSubRoute.addresses.concat(rightChecked),
    };
    const updatedNewSubRoute = newSubRouteList.map((subRoute, index) =>
      index === findIndex ? newValue : subRoute
    );

    setNewSubRoute(newValue);
    setNewSubRouteList(updatedNewSubRoute);
    setUnsignedAddressList(not(unsignedAddressList, rightChecked));
    setChecked(not(checked, rightChecked));
    setIsRightCheck(false);
  };

  const handleAllSignedAddress = isCheck => {
    setIsLeftCheck(true);

    if (isCheck) {
      setChecked([...newSubRoute.addresses]);
    } else {
      setChecked([]);
    }
  };

  const handleAllUnsignedAddress = isCheck => {
    setIsRightCheck(true);

    if (isCheck) {
      setChecked([...unsignedAddressList]);
    } else {
      setChecked([]);
    }
  };

  const handleClickNewSubRoute = subRoute => {
    setNewSubRoute(subRoute);
  };

  const addNewSubRoute = () => {
    if (!subRouteName.trim()) {
      alert('서브라우트 이름을 입력해주세요.');
      return;
    }

    const isExistName = newSubRouteList.some(
      subRoute => subRoute.subRouteName === subRouteName
    );

    if (isExistName) {
      alert('중복된 이름의 서브 라우트가 존재합니다.');
      return;
    }
    setNewSubRoute({ subRouteName: subRouteName, addresses: [] });
    setNewSubRouteList([
      ...newSubRouteList,
      { subRouteName: subRouteName, addresses: [] },
    ]);
    setSubRouteName('');
  };

  const deleteSubRoute = subRoute => {
    const updatedList = newSubRouteList.filter(
      newSubRoute => newSubRoute.subRouteName !== subRoute.subRouteName
    );

    setUnsignedAddressList(unsignedAddressList.concat(subRoute.addresses));
    setNewSubRouteList(updatedList);
    setNewSubRoute(
      updatedList.length > 0
        ? updatedList[0]
        : { subRouteName: '', addresses: [] }
    );
  };

  const findRoadAddress = () => {
    let filteredList = newSubRouteList.find(
      subRoute => subRoute.subRouteName === newSubRoute.subRouteName
    ).addresses;

    if (signedKeywordRef.current) {
      filteredList = newSubRoute.addresses.filter(address =>
        address.streetAddress.includes(signedKeywordRef.current)
      );
    }

    setNewSubRoute({ ...newSubRoute, addresses: filteredList });
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
        routeNameRef.current = data.routeName;
        routeDescriptionRef.current = data.routeDescription;
        setNewSubRoute(
          data.subRoutes.length > 0
            ? data.subRoutes[0]
            : { subRouteName: '', addresses: [] }
        );
      }

      setNewSubRouteList(data.subRoutes);
    }
  };

  const getAddressList = useCallback(async () => {
    if (keywordRef.current == null || keywordRef.current === '') {
      alert('검색어를 입력해주세요.');
    }

    const apiResult = await api.request({
      Authorization: `Bearer ${userInfo.accessToken}`,
      url: ROUTING.ROUTE_ADDRESS,
      method: 'GET',
      params: {
        keyword: keywordRef.current,
        routeTypeId: routeType.routeTypeId,
      },
    });

    const { status, data } = apiResult;
    if (status === 200) {
      const newAddressSet = new Set(
        newSubRouteList.flatMap(route =>
          route.addresses.map(address => address.streetAddress)
        )
      );

      const unsignedAddresses = data.data.filter(
        address => !newAddressSet.has(address.streetAddress)
      );
      setUnsignedAddressList(unsignedAddresses);
    }
  });

  const modRoute = async () => {
    if (!isValidEnglishNumberOnly(routeNameRef.current)) {
      setModal({
        isOpen: true,
        proceedBtnName: BUTTON_TEXT.CONFIRM.DEFAULT,
        onProceed: closeModal,
      });
      setErrMsg(ERROR_MESSAGE.ROUTE.TEXT);
      return;
    } else if (
      newSubRouteList.some(
        subRoute => !isValidEnglishNumberOnly(subRoute.subRouteName)
      )
    ) {
      setModal({
        isOpen: true,
        proceedBtnName: BUTTON_TEXT.CONFIRM.DEFAULT,
        onProceed: closeModal,
      });
      setErrMsg(ERROR_MESSAGE.ROUTE.SUB_ROUTE_TEXT);
      return;
    } else if (!isValidStringLength(routeNameRef.current, 10)) {
      setModal({
        isOpen: true,
        proceedBtnName: BUTTON_TEXT.CONFIRM.DEFAULT,
        onProceed: closeModal,
      });
      setErrMsg(ERROR_MESSAGE.ROUTE.ROUTE_NAME_LENGTH);
      return;
    } else if (
      routeDescriptionRef.current &&
      !isValidStringLength(routeDescriptionRef.current, 20)
    ) {
      setModal({
        isOpen: true,
        proceedBtnName: BUTTON_TEXT.CONFIRM.DEFAULT,
        onProceed: closeModal,
      });
      setErrMsg(ERROR_MESSAGE.ROUTE.ROUTE_DESCRIPTION_LENGTH);
      return;
    } else if (
      newSubRouteList.some(
        subRoute => !isValidStringLength(subRoute.subRouteName, 8)
      )
    ) {
      setModal({
        isOpen: true,
        proceedBtnName: BUTTON_TEXT.CONFIRM.DEFAULT,
        onProceed: closeModal,
      });
      setErrMsg(ERROR_MESSAGE.ROUTE.SUB_ROUTE_NAME_LENGTH);
      return;
    }

    try {
      let params = {
        routeName: routeNameRef.current,
        routeDescription: routeDescriptionRef.current,
        subRoutes: newSubRouteList,
      };

      const apiResult = await api.request({
        Authorization: `Bearer ${userInfo.accessToken}`,
        url: `${ROUTING.ROUTE_MAIN}/${routeMainDetail.mainRouteId}`,
        method: 'PUT',
        data: params,
      });

      if (apiResult.status === 200) {
        navigate('/admin/routing-type/main');
      } else {
        setModal({
          isOpen: true,
          proceedBtnName: BUTTON_TEXT.CONFIRM.DEFAULT,
          onProceed: closeModal,
        });
        setErrMsg(ERROR_MESSAGE.COMMON.MODIFY);
      }
    } catch (error) {
      setModal({
        isOpen: true,
        proceedBtnName: BUTTON_TEXT.CONFIRM.DEFAULT,
        onProceed: closeModal,
      });
      if (error.response.data.error === 'DUPLICATED_DATA') {
        setErrMsg('중복된 메인 라우트명이 존재합니다.');
      } else {
        setErrMsg(ERROR_MESSAGE.COMMON.MODIFY);
      }
    }
  };

  const customList = items => {
    return (
      <Paper
        sx={{
          width: '100%',
          height: 611,
          overflow: 'auto',
          borderRadius: '10px',
          background: '#fff',
          boxShadow: '0px 0px 8px 0px rgba(0, 0, 0, 0.1)',
        }}
      >
        <List dense component='div' role='list'>
          {items?.map((value, index) => {
            const labelId = `transfer-list-item-${index}-label`;

            return (
              <ListItemButton
                key={index}
                role='listitem'
                onClick={handleCheckBox(value)}
              >
                <ListItemIcon sx={{ marginLeft: '-9px' }}>
                  <Checkbox
                    icon={<Icon iconType='unchecked' />}
                    checkedIcon={<Icon iconType='checked' />}
                    checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={value.streetAddress} />
              </ListItemButton>
            );
          })}
        </List>
      </Paper>
    );
  };

  const moveToRouteMain = () => {
    navigate('/admin/routing-type/main');
  };

  useEffect(() => {
    getSubRouteList(true);
  }, []);

  return (
    <>
      <Header
        title={TITLE.ROUTE.MAIN}
        subTitle={` > ${routeType.typeName} > ${TITLE.ROUTE.MODIFY}`}
        buttonNumber={2}
        buttonLabel={[BUTTON_TEXT.CANCEL.DEFAULT, BUTTON_TEXT.MODIFY.COMPLETE]}
        calenderPicker={false}
        sectionDivider={true}
        onButtonClick={[moveToRouteMain, modRoute]}
      />
      <div style={{ width: '550px' }}>
        <InputBasic
          display='flex'
          type='basic'
          title={LABEL_TITLE.ROUTE.ROUTE_NAME}
          value={routeNameRef.current}
          onChange={onChangeRouteName}
        ></InputBasic>
        <InputBasic
          display='flex'
          type='basic'
          title={LABEL_TITLE.ROUTE.ROUTE_DESCRIPTION}
          value={routeDescriptionRef.current}
          onChange={onChangeRouteDescription}
        ></InputBasic>
        <Divider type='basic' marginBottom='26px' />
        <SubRouteSearchWrapper>
          <InputBasic
            display='flex'
            type='basic'
            value={subRouteName}
            title={LABEL_TITLE.ROUTE.SUB_ROUTE}
            placeholder={INPUT_TEXT.PLACEHOLDER.SUB_ROUTE}
            onChange={onChangeSubRouteName}
          ></InputBasic>
          <CommonButton
            label={BUTTON_TEXT.ADD.DEFAULT}
            type='black'
            onClick={addNewSubRoute}
          />
        </SubRouteSearchWrapper>
      </div>

      <SearchWrapper>
        <SubRouteInfoBox>
          <SubRouteInfoText>
            {LABEL_TITLE.ROUTE.SUB_ROUTE_INFO}
          </SubRouteInfoText>
          <Divider type='basic' />
          {newSubRouteList.map((subRoute, index) => {
            return (
              <DeleteBox
                key={index}
                value={subRoute.subRouteName}
                selected={subRoute.subRouteName === newSubRoute.subRouteName}
                onClick={() => handleClickNewSubRoute(subRoute)}
                onDelete={() => deleteSubRoute(subRoute)}
              ></DeleteBox>
            );
          })}
        </SubRouteInfoBox>
        <AsignedBox type='add'>
          <SearchInputWraaper>
            <SearchInputBasic
              placeholder={INPUT_TEXT.PLACEHOLDER.ROAD_ADDRESS}
              onChange={onChangeSignedKeyword}
              onSearch={findRoadAddress}
            ></SearchInputBasic>
            <CommonButton
              label={BUTTON_TEXT.VIEW}
              type='black'
              onClick={findRoadAddress}
            />
          </SearchInputWraaper>
          <CheckAllBox>
            <CommonCheckBox
              onClickCheck={handleAllSignedAddress}
              isCheck={isLeftCheck}
            ></CommonCheckBox>
            <AddressText>{LABEL_TITLE.ROUTE.ASINGED_ADDRESS}</AddressText>
          </CheckAllBox>
          {customList(newSubRoute.addresses)}
        </AsignedBox>

        <ButtonWrapper>
          <BootstrapButton
            variant='text'
            size='small'
            aria-label='move selected left'
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
          >
            <Icon iconType='leftArrow' />
          </BootstrapButton>
          <BootstrapButton
            variant='text'
            size='small'
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label='move selected right'
          >
            <Icon iconType='rightArrow' />
          </BootstrapButton>
        </ButtonWrapper>

        <NonAsignedBox>
          <SearchInputWraaper>
            <SearchInputBasic
              placeholder={INPUT_TEXT.PLACEHOLDER.ROAD_ADDRESS}
              onChange={onChangeKeyword}
              onSearch={() => getAddressList()}
            ></SearchInputBasic>
            <CommonButton
              label={BUTTON_TEXT.VIEW}
              type='black'
              onClick={() => getAddressList()}
            />
          </SearchInputWraaper>
          <CheckAllBox>
            <CommonCheckBox
              onClickCheck={handleAllUnsignedAddress}
              isCheck={isRightCheck}
            ></CommonCheckBox>
            <AddressText>{LABEL_TITLE.ROUTE.NON_ASINGED_ADDRESS}</AddressText>
          </CheckAllBox>
          {customList(unsignedAddressList)}
        </NonAsignedBox>
      </SearchWrapper>
    </>
  );
};

export default AdminRoutingMainModify;
