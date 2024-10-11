import PropTypes from 'prop-types';
import { MainContainer } from './Main.styles';

const Main = ({ children }) => {
  return <MainContainer>{children}</MainContainer>;
};

Main.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Main;
