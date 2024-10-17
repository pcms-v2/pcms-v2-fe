import styled from '@emotion/styled';

export const Divider = styled.hr`
  width: 100%;
  height: ${props => (props.type === 'basic' ? '1px' : '3px')};
  flex-shrink: 0;
  background-color: ${props =>
    props.type === 'basic' ? '#D5D5D5' : '#ef831f'};
  border: none;
  // margin-bottom: ${props => (props.marginBottom ? '26px' : '0px')};
  // margin-bottom: 26px;
  margin: ${props =>
    props.margin ? `${props.margin[0]}px 0 ${props.margin[1]}px 0` : '0px'};
`;
