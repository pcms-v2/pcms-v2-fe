// Modal.js
import { memo } from 'react';
import PropTypes from 'prop-types';
import CommonButton from '../Button';
import {
  ModalOverlay,
  ModalWrapper,
  ModalHeader,
  Divider,
  ModalTitle,
  ButtonGroup,
  ModalContent,
  ErrText,
  WarningText,
} from './Modal.styles';
import { BUTTON_TEXT } from '../../../constants/text';

const Modal = ({
  isOpen,
  title,
  proceedBtnName,
  errMsg,
  warningMsg,
  children,
  onClose,
  onProceed,
  oneBtn = false,
  paddingSize = '20px',
}) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalWrapper>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          {!oneBtn ? (
            <ButtonGroup>
              <CommonButton
                type='black'
                label={BUTTON_TEXT.CANCEL.DEFAULT}
                onClick={onClose}
              />
              <CommonButton
                type='black'
                label={proceedBtnName}
                onClick={onProceed}
              />
            </ButtonGroup>
          ) : (
            <CommonButton
              type='black'
              label={BUTTON_TEXT.CLOSE}
              onClick={onClose}
            />
          )}
        </ModalHeader>
        <Divider />
        <ModalContent paddingSize={paddingSize}>
          {children}
          {warningMsg && (
            <>
              <Divider />
              <WarningText>{warningMsg}</WarningText>
              <Divider />
            </>
          )}
        </ModalContent>
        {errMsg && <ErrText>{errMsg}</ErrText>}
      </ModalWrapper>
    </ModalOverlay>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool,
  title: PropTypes.string.isRequired,
  proceedBtnName: PropTypes.string.isRequired,
  errMsg: PropTypes.string,
  warningMsg: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
  onProceed: PropTypes.func.isRequired,
  oneBtn: PropTypes.bool,
  paddingSize: PropTypes.string,
};

export default memo(Modal);
