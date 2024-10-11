import PropTypes from 'prop-types';
import { Typography } from './LabelText.styles';

const LabelText = ({ title }) => {
  return <Typography>{title}</Typography>;
};

LabelText.propTypes = {
  title: PropTypes.string,
};

export default LabelText;
