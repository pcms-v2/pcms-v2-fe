import styled from '@emotion/styled';

export const SearchInputWrapper = styled.label`
  position: relative;
`;

export const SearchInput = styled.input`
  width: ${props => (props.inputWidth === 's' ? '295px' : '325px')};
  height: 2.125rem;
  padding-left: 0.61rem;
  border-radius: 0.5rem;
  border: 1px solid #d5d5d5;
  background: #fff;

  color: #4d4d4d;
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.03rem;

  &::placeholder {
    color: #b5b5b5;
  }
`;

export const SearchButton = styled.button`
  position: absolute;
  right: 5px;
  // top: 3px;
  top: 10px;
`;
