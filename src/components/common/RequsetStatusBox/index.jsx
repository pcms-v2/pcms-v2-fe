import React from 'react';
import PropTypes from 'prop-types';
import {
  ButtonWrapper,
  Label,
  RequsetStatusBoxContainer,
} from './RequsetStatusBox.styles';
import CommonButton from '../Button';

const RequsetStatusBox = ({ label = '', onClick = [], buttonTitle = [] }) => {
  const [statusButtonTitle, onClickButtonTitle, onClickButtonTitle2] =
    buttonTitle;
  const [buttonOnClick, buttonOnClick2] = onClick;
  return (
    <RequsetStatusBoxContainer>
      <Label>{label}</Label>
      <ButtonWrapper>
        <CommonButton type='white' label={statusButtonTitle} />
        {buttonTitle.length >= 2 ? (
          <CommonButton
            type='black'
            label={onClickButtonTitle}
            onClick={buttonOnClick}
          />
        ) : null}
        {buttonTitle.length === 3 ? (
          <CommonButton
            type='black'
            label={onClickButtonTitle2}
            onClick={buttonOnClick2}
          />
        ) : null}
      </ButtonWrapper>
    </RequsetStatusBoxContainer>
  );
};

RequsetStatusBox.propTypes = {
  label: PropTypes.string.isRequired,
  onClicks: PropTypes.func,
};

export default RequsetStatusBox;
