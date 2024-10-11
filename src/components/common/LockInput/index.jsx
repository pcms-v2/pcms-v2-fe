import { LockIconContainer, LockInput as LockInputTag, LockInputWrapper, LockTitle } from './LockInput.styles.js';
import Icon from '@components/common/Icon/index.jsx';

export default function LockInput({ title, name }) {
  return (
    <LockInputWrapper>
      <LockTitle>
        {title}
      </LockTitle>
      <LockInputTag disabled value={name} />
      <LockIconContainer>
        <Icon iconType="lock" />
      </LockIconContainer>
    </LockInputWrapper>
  );
}
