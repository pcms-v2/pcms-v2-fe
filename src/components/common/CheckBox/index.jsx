import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  CheckBoxContainer,
  CheckedIcon,
  UncheckedIcon,
} from './CheckBox.styles';

const CommonCheckBox = ({ onClickCheck, isCheck = false }) => {
  const [checked, setChecked] = useState(isCheck);

  const handleCheck = () => {
    setChecked(!checked);

    if (onClickCheck) {
      onClickCheck(!checked);
    }
  };

  useEffect(() => {
    setChecked(isCheck);
  }, [isCheck]);

  return (
    <CheckBoxContainer onClick={handleCheck}>
      {checked ? (
        <CheckedIcon
          xmlns='http://www.w3.org/2000/svg'
          width='20'
          height='20'
          viewBox='0 0 20 20'
          fill='none'
        >
          <path
            d='M13.3868 20H6.61316C2.96721 20 0 17.0328 0 13.3868V6.61316C0 2.96721 2.96721 0 6.61316 0H13.3868C17.0328 0 20 2.96721 20 6.61316V13.3868C20 17.0328 17.0328 20 13.3868 20ZM6.61316 1.32997C3.70099 1.32997 1.32997 3.70099 1.32997 6.61316V13.3868C1.32997 16.299 3.70099 18.67 6.61316 18.67H13.3868C16.299 18.67 18.67 16.299 18.67 13.3868V6.61316C18.67 3.70099 16.299 1.32997 13.3868 1.32997H6.61316Z'
            fill='#EF831F'
          />
          <path
            d='M15.6211 5.12362C15.5302 4.99516 15.3534 4.96057 15.2221 5.04951C15.217 5.04951 15.2069 5.05939 15.2019 5.06433C12.0504 7.60385 9.13623 10.6473 8.15138 12.5297L5.60087 9.70366C5.38875 9.47144 5.02512 9.44674 4.78269 9.65425L4.20188 10.1533C3.96451 10.3558 3.93926 10.7066 4.13623 10.9438L7.41401 14.8074C7.52007 14.9309 7.67663 15.005 7.8433 15.005H8.63623C8.8433 15.005 9.03522 14.8914 9.13118 14.7086C11.217 10.7906 13.0958 8.57223 15.914 5.9586C16.015 5.86472 16.0352 5.71156 15.9544 5.59792L15.6261 5.12856L15.6211 5.12362Z'
            fill='#EF831F'
          />
        </CheckedIcon>
      ) : (
        <UncheckedIcon
          xmlns='http://www.w3.org/2000/svg'
          width='20'
          height='20'
          viewBox='0 0 20 20'
          fill='none'
        >
          <path
            d='M13.3868 20H6.61316C2.96721 20 0 17.0328 0 13.3868V6.61316C0 2.96721 2.96721 0 6.61316 0H13.3868C17.0328 0 20 2.96721 20 6.61316V13.3868C20 17.0328 17.0328 20 13.3868 20ZM6.61316 1.32997C3.70099 1.32997 1.32997 3.70099 1.32997 6.61316V13.3868C1.32997 16.299 3.70099 18.67 6.61316 18.67H13.3868C16.299 18.67 18.67 16.299 18.67 13.3868V6.61316C18.67 3.70099 16.299 1.32997 13.3868 1.32997H6.61316Z'
            fill='#4D4D4D'
          />
        </UncheckedIcon>
      )}
    </CheckBoxContainer>
  );
};

CommonCheckBox.propTypes = {
  isCheck: PropTypes.bool,
  onClickCheck: PropTypes.func,
};

export default CommonCheckBox;
