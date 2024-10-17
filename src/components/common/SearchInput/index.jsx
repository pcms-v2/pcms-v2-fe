import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import {
  SearchInputWrapper,
  SearchInput,
  SearchButton,
} from './SearchInput.styles';
import SearchOffIcon from '../Icon/SearchOffIcon';
import SearchOnIcon from '../Icon/SearchOnIcon';

const SearchInputBasic = ({
  inputWidth = 's',
  placeholder = '',
  onChange,
  onSearch,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [value, setValue] = useState('');

  const debouncedSetValue = useCallback(
    debounce(newValue => {
      setValue(newValue);

      if (onChange) {
        onChange(newValue);
      }
    }, 200),
    []
  );

  const handleChange = e => {
    debouncedSetValue(e.target.value);
  };

  return (
    <SearchInputWrapper>
      <SearchInput
        inputWidth={inputWidth}
        placeholder={placeholder}
        onChange={handleChange}
      ></SearchInput>
      <SearchButton
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => onSearch(value)}
      >
        {isHovered ? <SearchOnIcon /> : <SearchOffIcon />}
      </SearchButton>
    </SearchInputWrapper>
  );
};

SearchInputBasic.propTypes = {
  inputWidth: PropTypes.oneOf(['s', 'm']),
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onSearch: PropTypes.func,
};

export default SearchInputBasic;
