import { useEffect, useRef, useState } from 'react';
import {
  ArrowIconWrapper,
  Option,
  OptionsList,
  SelectContainer,
  SelectHeader,
  SelectLabel,
  SelectWrapper,
} from './ModalSelect.styles.js';
import PropTypes from 'prop-types';
import Icon from '../Icon';

const Select = ({
  options,
  onChange,
  label,
  customStyle,
  value = null,
  placeHolder = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(value ?? placeHolder);

  const containerRef = useRef(null);

  const handleOptionClick = option => {
    if (!option.disabled) {
      setSelectedOption(option);
      setIsOpen(false);
      onChange(option);
    }
  };

  useEffect(() => {
    const handleClickOutside = event => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <SelectWrapper style={customStyle}>
      <SelectLabel>{label}</SelectLabel>
      <SelectContainer ref={containerRef}>
        <SelectHeader
          style={{
            color: selectedOption === placeHolder && '#B5B5B5',
          }}
          selectText={selectedOption}
          isOpen={isOpen}
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedOption}
          <ArrowIconWrapper>
            {isOpen ? (
              <Icon iconType='topArrow' />
            ) : (
              <Icon iconType='bottomArrow' />
            )}
          </ArrowIconWrapper>
        </SelectHeader>
        {isOpen && (
          <OptionsList>
            {options.map(option => (
              <Option
                key={option}
                onClick={() => handleOptionClick(option)}
                disabled={option.disabled}
              >
                {option}
              </Option>
            ))}
          </OptionsList>
        )}
      </SelectContainer>
    </SelectWrapper>
  );
};

Select.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  // onChange: PropTypes.func.isRequired,
  onChange: PropTypes.func,
  customStyle: PropTypes.object,
};

export default Select;
