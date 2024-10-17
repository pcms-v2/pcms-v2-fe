import { useEffect, useState } from 'react';
import { FILTER } from '../../../constants/text';
import { FilterContainer, FilterLabel } from './Filter.styles';
import PropTypes from 'prop-types';
import CommonButton from '../Button';

const Filter = ({ type, onFilterChange }) => {
  const [active, setActive] = useState(
    type === 'route' ? FILTER.BUTTON.ACTIVE : FILTER.BUTTON.ALL
  );

  useEffect(() => {}, [active, onFilterChange]);

  const buttons =
    type === 'route'
      ? [FILTER.BUTTON.ALL, FILTER.BUTTON.ACTIVE, FILTER.BUTTON.INACTIVE]
      : type === 'deliveryDriver'
        ? [FILTER.BUTTON.ALL, FILTER.BUTTON.ONE_TONE, FILTER.BUTTON.LDV]
        : type === 'sortRound'
          ? [
              FILTER.BUTTON.ALL,
              FILTER.BUTTON.SORT.BEFORE,
              FILTER.BUTTON.SORT.SORTING,
              FILTER.BUTTON.SORT.COMPLETE,
            ]
          : [];

  const handleButtonClick = button => {
    setActive(button);

    if (onFilterChange) {
      onFilterChange(button);
    }
  };

  return (
    <FilterContainer>
      <FilterLabel>
        {type === 'route'
          ? FILTER.LABEL.ROUTE
          : type === 'deliveryDriver'
            ? FILTER.LABEL.DELIVERY_DRIVER
            : type === 'sortRound'
              ? FILTER.LABEL.SORT_ROUND
              : null}
      </FilterLabel>
      {buttons.map(button => (
        <CommonButton
          key={button}
          label={button}
          isActive={active === button}
          onClick={() => handleButtonClick(button)}
          filter={true}
        />
      ))}
    </FilterContainer>
  );
};

Filter.propTypes = {
  type: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

export default Filter;
