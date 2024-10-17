import styled from '@emotion/styled';

export const ModalSeparator = styled.div`
  width: 100%;
  height: 1px;
  flex-shrink: 0;
  background: #ebebeb;
  margin: 30px 0;
  ${props => props.top && `margin-top: ${props.top}px;`}
  ${props => props.bottom && `margin-bottom: ${props.bottom}px;`}
    ${props => props.background && `background: ${props.background};`}
    ${props => props.height && `height: ${props.height}px;`}
`;
