import PropTypes from 'prop-types';
import Icon from '../common/Icon';
import { DeleteBoxWrapper, Box, IconWrapper } from './DeleteBox.styles';

const DeleteBox = ({
  value = '',
  icon = true,
  selected,
  onClick,
  onDelete,
}) => {
  return (
    <DeleteBoxWrapper selected={selected}>
      <Box selected={selected} onClick={onClick}>
        {value}
      </Box>
      {icon && (
        <IconWrapper>
          <Icon iconType='trash' onClick={onDelete} />
        </IconWrapper>
      )}
    </DeleteBoxWrapper>
  );
};

DeleteBox.propTypes = {
  value: PropTypes.string,
  icon: PropTypes.bool,
  selected: PropTypes.bool,
  onClick: PropTypes.func,
  onDelete: PropTypes.func,
};

export default DeleteBox;
