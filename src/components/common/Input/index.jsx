import { useState, useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import {
  LabelInputWrapper,
  Typography,
  InputWrapper,
  Input,
  ValidationText,
  IconWrapper,
  TextArea,
} from './Input.styles';
import { VALIDATION } from '../../../constants/text';
import Icon from '../Icon';

const InputBasic = ({
  display,
  type,
  title,
  placeholder = '',
  value = '',
  validation,
  disabled = false,
  onChange,
  dataType = 'text',
  textArea = false,
}) => {
  const [inputValue, setInputValue] = useState('');
  const textAreaRef = useRef(null);

  const debouncedSetValue = useCallback(
    debounce(newValue => {
      setInputValue(newValue);

      if (onChange) {
        onChange(newValue);
      }
    }, 0),
    []
  );

  const handleChange = e => {
    const newValue = e.target.value;

    setInputValue(newValue);
    debouncedSetValue(newValue);
  };

  const handleResizeHeight = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto'; // height 초기화
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight + 'px';
    }
  };

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    if (textArea) {
      handleResizeHeight();
    }
  }, [inputValue, textArea]);

  return (
    <LabelInputWrapper display={display}>
      <Typography type={type}>{title}</Typography>
      <InputWrapper type={type}>
        {disabled && textArea && (
          <>
            <TextArea value={inputValue} disabled={disabled}></TextArea>
            <IconWrapper>
              <Icon iconType='lock' />
            </IconWrapper>
          </>
        )}
        {!disabled && textArea && (
          <TextArea
            ref={textAreaRef}
            rows={1}
            maxLength={38}
            placeholder={placeholder}
            value={inputValue}
            onChange={handleChange}
            onInput={handleResizeHeight}
            type={dataType}
          ></TextArea>
        )}
        {disabled && !textArea && (
          <>
            <Input value={value} disabled={disabled} />
            <IconWrapper>
              <Icon iconType='lock' />
            </IconWrapper>
          </>
        )}
        {!disabled && !textArea && (
          <>
            <Input
              placeholder={placeholder}
              value={inputValue}
              onChange={handleChange}
              type={dataType}
            />
            {!inputValue && validation && (
              <ValidationText validation={validation}>
                {validation === 'required'
                  ? VALIDATION.INPUT.REQUIRED
                  : VALIDATION.INPUT.OPTIONAL}
              </ValidationText>
            )}
          </>
        )}
      </InputWrapper>
    </LabelInputWrapper>
  );
};

InputBasic.propTypes = {
  display: PropTypes.oneOf(['flex']),
  type: PropTypes.oneOf(['basic', 'modalContent', 'route']),
  title: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  validation: PropTypes.oneOf(['required', 'optional']),
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  dataType: PropTypes.oneOf(['text', 'number', 'tel']),
  textArea: PropTypes.bool,
};

export default InputBasic;
