import { useState } from 'react';
import {
  CheckBoxContainer,
  CheckedIcon,
  UncheckedIcon,
} from './MoveIcon.stlyes';

const MoveIcon = () => {
  const [checked, setChecked] = useState(false);

  const handleCheck = () => {
    setChecked(!checked);
  };

  return (
    <CheckBoxContainer onClick={handleCheck}>
      {checked ? (
        <UncheckedIcon
          xmlns='http://www.w3.org/2000/svg'
          width='46'
          height='46'
          viewBox='0 0 46 46'
          fill='none'
        >
          <circle cx='23' cy='23' r='23' fill='#EF831F' />
          <path
            d='M15.3316 22.3143L19.9579 18.2788C20.3842 17.9071 21.0947 17.9071 21.5211 18.2788C21.9474 18.6506 21.9474 19.2701 21.5211 19.6419L18.7895 22.0376L28.8947 22.0376C29.5105 22.0376 30 22.4644 30 23.0014C30 23.5383 29.5105 23.9652 28.8947 23.9652L18.7895 23.9652L21.5211 26.3471C21.9474 26.7188 21.9474 27.3384 21.5211 27.7102C21.3 27.9029 21.0158 27.9993 20.7316 27.9993C20.4474 27.9993 20.1632 27.9029 19.9421 27.7102L15.3316 23.6898C15.1263 23.5108 15 23.263 15 23.0014C15 22.7398 15.1105 22.4919 15.3316 22.313L15.3316 22.3143Z'
            fill='white'
          />
        </UncheckedIcon>
      ) : (
        <CheckedIcon
          xmlns='http://www.w3.org/2000/svg'
          width='46'
          height='46'
          viewBox='0 0 46 46'
          fill='none'
        >
          <circle cx='23' cy='23' r='22.5' fill='white' stroke='#D8D8D8' />
          <path
            d='M15.3316 22.3143L19.9579 18.2788C20.3842 17.9071 21.0947 17.9071 21.5211 18.2788C21.9474 18.6506 21.9474 19.2701 21.5211 19.6419L18.7895 22.0376L28.8947 22.0376C29.5105 22.0376 30 22.4644 30 23.0014C30 23.5383 29.5105 23.9652 28.8947 23.9652L18.7895 23.9652L21.5211 26.3471C21.9474 26.7188 21.9474 27.3384 21.5211 27.7102C21.3 27.9029 21.0158 27.9993 20.7316 27.9993C20.4474 27.9993 20.1632 27.9029 19.9421 27.7102L15.3316 23.6898C15.1263 23.5108 15 23.263 15 23.0014C15 22.7398 15.1105 22.4919 15.3316 22.313L15.3316 22.3143Z'
            fill='#EF831F'
          />
        </CheckedIcon>
      )}
    </CheckBoxContainer>
  );
};

export default MoveIcon;
