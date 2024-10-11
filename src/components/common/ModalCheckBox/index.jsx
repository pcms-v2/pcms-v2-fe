import React from 'react';
import {
  CheckBoxContainer,
  CheckBoxTitle,
  CheckBoxButton,
  CheckBoxLabel,
  CheckBoxButtonContainer,
} from './ModalCheckBox.styles';
import CommonCheckBox from '../CheckBox';
import PropTypes from 'prop-types';

const ModalCheckBox = ({ title, label, onClickCheck, checkStates }) => {
  const labelMapping = {
    '택배 배송': 'isDeliveryEnable',
    '택배 회수': 'isRecallEnable',
    '택배 집하': 'isCollectEnable',
  };

  return (
    <>
      <CheckBoxContainer>
        <CheckBoxTitle>{title}</CheckBoxTitle>

        <CheckBoxButtonContainer>
          {label.map((label, index) => (
            <CheckBoxButton key={index}>
              <CheckBoxLabel>{label}</CheckBoxLabel>
              <CommonCheckBox
                isCheck={checkStates[labelMapping[label]]}
                onClickCheck={checked =>
                  onClickCheck(checked, labelMapping[label])
                }
              />
            </CheckBoxButton>
          ))}
        </CheckBoxButtonContainer>
      </CheckBoxContainer>
    </>
  );
};

ModalCheckBox.propTypes = {
  title: PropTypes.string.isRequired,
  label: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClickCheck: PropTypes.func.isRequired,
  checkStates: PropTypes.object,
};

export default ModalCheckBox;
