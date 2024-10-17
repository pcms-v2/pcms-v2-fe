import PropTypes from 'prop-types';
import {
  SwitchWrapper,
  SwitchContainer,
  SwitchLabel,
  Switch,
  SwitchCircle,
} from './Switch.styles';
import { SWITCH_OPTION } from '../../../constants/text';

const SwitchBasic = ({ active = false, onClick }) => {
  return (
    <SwitchWrapper onClick={onClick}>
      <SwitchLabel>{active ? SWITCH_OPTION.ON : SWITCH_OPTION.OFF}</SwitchLabel>
      <SwitchContainer>
        <Switch active={active}>
          <SwitchCircle active={active}></SwitchCircle>
        </Switch>
      </SwitchContainer>
    </SwitchWrapper>
  );
};

SwitchBasic.propTypes = {
  active: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

export default SwitchBasic;
