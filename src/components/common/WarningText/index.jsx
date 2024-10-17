import { WarningTextContainer, WarningText1 } from './WarningText.styles';

const WarningText = ({ msg1, msg2 }) => {
  return (
    <WarningTextContainer>
      <WarningText1>{msg1}</WarningText1>
      <WarningText1>{msg2}</WarningText1>
    </WarningTextContainer>
  );
};

export default WarningText;
