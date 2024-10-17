import PropTypes from 'prop-types';
import {
  StatusContainer,
  StatusTitle,
  Divider,
  StatusValue,
} from './StatusBox.styles';

const StatusBox = ({ title, value }) => {
  return (
    <StatusContainer>
      <StatusTitle>{title}</StatusTitle>
      <Divider />
      <StatusValue>{value}</StatusValue>
    </StatusContainer>
  );
};

StatusBox.propTypes = {
  title: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default StatusBox;
