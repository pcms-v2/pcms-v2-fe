import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BackgroundContainer,
  LoginContainer,
  ImageContainer,
  MainTitle,
  SubTitle,
  LoginForm,
  ModalOverlay,
  ModalWrapper,
  ErrText,
  ButtonWrap,
  ExplanWrap,
} from './Login.styles';
import loginImage from '../assets/images/loginMain.png';
import CommonButton from '../components/common/Button';
import { useUserStore } from '../contexts/useUserStore';
import api, { noneTokenApi } from '../utils/api';
import { ROUTING } from '../constants/apiEndpoint';
import { useModalStore } from '../contexts/useModalStore';
import { ERROR_MESSAGE } from '../constants/message';
import InputBasic from '../components/common/Input';
import { ModalChildren } from './admin/AdminDeliveryRound/AdminDeliveryRound.styles';
import { isValidPassword, isValidPasswordLength } from '../utils/validation';

const Login = ({ display }) => {
  const { setUserInfo, userInfo } = useUserStore();
  const [openModal, setOpenModal] = useState(false);
  const { setModal, setErrMsg, closeModal } = useModalStore();

  const loginId = useRef('');
  const password = useRef('');
  const modalPassword = useRef('');
  const passwordConfirmInputValue = useRef('');

  const navigate = useNavigate();

  const [failInfo, setFailInfo] = useState(false);

  // [x] 아이디 인풋 핸들러
  const onChangeIdInputValue = e => {
    loginId.current = e.target.value;
  };

  // [x] 비밀번호 인풋 핸들러
  const onChangePasswordInputValue = e => {
    password.current = e.target.value;
  };

  // [x] 모달 비밀번호 인풋 핸들러
  const onChangeModalPasswordInputValue = value => {
    modalPassword.current = value;
  };

  // [x] 모달 비밀번호 확인 인풋 핸들러
  const onChangePasswordConfirmInputValue = value => {
    passwordConfirmInputValue.current = value;
  };

  // [x] 로그인 버튼 핸들러
  const handleLogin = async e => {
    e.preventDefault();
    let params = { loginId: loginId.current, password: password.current };
    try {
      const apiResult = await noneTokenApi.request({
        url: ROUTING.LOGIN,
        method: 'POST',
        data: { ...params },
      });

      const { status, data } = apiResult;
      if (status === 200) {
        if (data?.roles?.length === 1 && data?.roles?.includes('SHIPPER')) {
          setFailInfo('EMPTY_ROLE_SHIPPER');
          openLoginFail();
        } else {
          setUserInfo({ ...data, displayShow: display });
          openFirstLoginModal(data);
        }
      }
    } catch (error) {
      const { error: errorType } = error.response.data;

      openLoginFail(error);
      setFailInfo(errorType);
    }
  };

  // [x] 로그인 실패 로직
  const openLoginFail = () => {
    setOpenModal(true);
  };

  // [x] 로그인 실패 시 모달
  const OpenLoginFaildModal = () => {
    return (
      <>
        <ModalOverlay>
          <ModalWrapper>
            <ErrText>
              {failInfo === 'NOT_FOUND_DATA' && (
                <>
                  <p>회원 정보를 확인할 수 없습니다.</p>
                  <p>아이디를 다시 입력해 주세요.</p>
                </>
              )}
              {failInfo === 'AUTHENTICATION_FAILED' && (
                <>
                  <p>
                    비밀번호를 잘못 입력하셨어요.
                    <br />
                    비밀번호를 다시 입력해 주세요.
                  </p>
                </>
              )}
              {failInfo === 'ACCESS_DENIED' && (
                <>
                  <p>
                    로그인이 제한되었습니다.
                    <br />
                    관리자에게 문의하세요.
                  </p>
                </>
              )}
              {failInfo === 'EMPTY_ROLE_SHIPPER' && (
                <>
                  <p>
                    택배 권한이 없습니다.
                    <br />
                    관리자에게 문의하세요.
                  </p>
                </>
              )}
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

  // [x] 초기 로그인 성공 시 로직
  const handleFirstLogin = async () => {
    if (!modalPassword.current || !passwordConfirmInputValue.current) {
      setErrMsg(ERROR_MESSAGE.LOGIN.EMPTY);
      return;
    }
    if (modalPassword.current !== passwordConfirmInputValue.current) {
      setErrMsg(ERROR_MESSAGE.LOGIN.NOT_SAME_PASSWORD);
      return;
    }

    if (!isValidPassword(modalPassword.current)) {
      setErrMsg(ERROR_MESSAGE.LOGIN.PASSWORD);
      return;
    } else if (!isValidPasswordLength(modalPassword.current)) {
      setErrMsg(ERROR_MESSAGE.LOGIN.PASSWORD_LENGTH);
      return;
    } else {
      setErrMsg('');
    }

    try {
      const apiResult = await api.request({
        Authorization: `Bearer ${userInfo.accessToken}`,
        url: ROUTING.PASSWORD,
        method: 'PUT',
        data: {
          password: modalPassword.current,
        },
      });

      if (apiResult.status === 200) {
        alert('비밀번호 변경이 완료되었습니다.');
        closeModal();
        navigate('/');
      }
    } catch (error) {
      console.log(error);
      setErrMsg(ERROR_MESSAGE.LOGIN.PASSWORD_CHANGE);
    }
  };

  // [x] 초기 로그인 성공 시 모달
  const openFirstLoginModal = data => {
    if (!data.isFirstLogin) {
      navigate('/');
      return;
    } else {
      navigate('/');
      setModal({
        isOpen: true,
        title: '비밀 번호 변경',
        errMsg: ERROR_MESSAGE.LOGIN.NOT_SAME_PASSWORD,
        proceedBtnName: '변경',
        children: (
          <ModalChildren>
            <ExplanWrap>
              <p>초기 비밀번호로 로그인 하셨습니다.</p>
              <p>비밀번호 변경 이후 이용해 주세요.</p>
            </ExplanWrap>

            <InputBasic
              title='비밀 번호'
              value={''}
              onChange={onChangeModalPasswordInputValue}
              placeholder={'변경할 비밀번호를 입력해 주세요.'}
            />
            <InputBasic
              title='비밀 번호 확인'
              value={''}
              onChange={onChangePasswordConfirmInputValue}
              placeholder={'변경할 비밀번호를 다시 입력해 주세요.'}
            />
          </ModalChildren>
        ),
        onProceed: () => handleFirstLogin(data),
      });
    }
  };

  return (
    <BackgroundContainer>
      <ImageContainer>
        <img src={`${loginImage}`} alt='로그인' />
      </ImageContainer>
      <LoginContainer>
        <MainTitle>{display ? '김천 CMS 디스플레이' : '김천 CMS'}</MainTitle>
        <SubTitle>
          Center Management System에 오신 것을 환영 합니다. 계정 관련 문의는
          센터 책임자를 통해 문의 바랍니다.
        </SubTitle>
        <LoginForm onSubmit={handleLogin}>
          <input
            type='text'
            onChange={onChangeIdInputValue}
            placeholder='아이디를 입력해 주세요.'
            required
          />
          <input
            type='password'
            onChange={onChangePasswordInputValue}
            placeholder='비밀번호를 입력해 주세요.'
            required
          />
          <CommonButton label='로그인' type='black' />
        </LoginForm>
      </LoginContainer>
      {openModal && <OpenLoginFaildModal />}
    </BackgroundContainer>
  );
};

export default Login;
