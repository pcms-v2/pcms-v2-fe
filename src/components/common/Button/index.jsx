import PropTypes from 'prop-types';
import { Button, FilterButton } from './Button.styles';

const CommonButton = ({
  label = '',
  type = '',
  isActive = false,
  disabled = false,
  onClick,
  filter = false,
}) => {
  return filter ? (
    <FilterButton isActive={isActive} onClick={onClick}>
      {label}
    </FilterButton>
  ) : (
    <Button type={type} disabled={disabled} onClick={onClick}>
      {label}
    </Button>
  );
};

CommonButton.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  isActive: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  filter: PropTypes.bool,
};

export default CommonButton;
