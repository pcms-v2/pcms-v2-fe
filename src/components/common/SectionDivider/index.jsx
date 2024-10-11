import PropTypes from 'prop-types';
import { Divider } from './SectionDivider.styles';

const SectionDivider = ({ type = 'bold', margin }) => {
  return <Divider type={type} margin={margin} />;
};

SectionDivider.propTypes = {
  type: PropTypes.oneOf(['bold', 'basic']),
  margin: PropTypes.array,
};

export default SectionDivider;
