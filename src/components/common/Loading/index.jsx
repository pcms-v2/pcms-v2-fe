// Loading 컴포넌트
// import { Spinner } from 'basic-loading';
import { BounceDot } from 'basic-loading';
import { LoadingContainer, LoadingText } from './Loading.styles';

const Loading = () => {
  const option = {
    size: 12,
    color: '#ef831f',
  };
  return (
    <LoadingContainer>
      <BounceDot option={option} />
      <LoadingText>잠시만 기다려 주세요.</LoadingText>
    </LoadingContainer>
  );
};

export default Loading;
