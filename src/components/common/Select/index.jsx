import { useState, useRef, useEffect } from 'react';
import {
  SelectContainer,
  SelectHeader,
  OptionsList,
  Option,
  ArrowIconWrapper,
  SelectLabel,
  SelectWrapper,
} from './Select.styles';
import PropTypes from 'prop-types';
import Icon from '../Icon';
import { SELECT_OPTION } from '../../../constants/text';

const Select = ({ options, onChange, label, modal, defaultValue, type }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    defaultValue || SELECT_OPTION.DEFAULT
  );
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
    <SelectWrapper type={type}>
      <SelectLabel type={type}>{label}</SelectLabel>
      <SelectContainer
        ref={containerRef}
        style={{ width: modal ? '300px' : '140px' }}
      >
        <SelectHeader
          isOpen={isOpen}
          onClick={() => setIsOpen(!isOpen)}
          style={{ width: modal ? '288px' : '140px' }}
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
          <OptionsList style={{ width: modal ? '288px' : '140px' }}>
            {options.map(option => (
              <Option
                key={option}
                onClick={() => handleOptionClick(option)}
                disabled={option.disabled}
                style={{ width: modal ? '100%' : '140px' }}
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
  onChange: PropTypes.func,
  customStyle: PropTypes.object,
  modal: PropTypes.bool,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  type: PropTypes.string,
};

export default Select;
