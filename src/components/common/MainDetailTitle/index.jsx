import React from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';
import Icon from '@components/common/Icon/index.jsx';

function Index({ title, customStyle, iconType }) {
  return (
    <TitleContainer style={customStyle}>
      {title.map((t, index) => (
        <React.Fragment key={index}>
          {index === 0 ? (
            <FirstTitle style={{ fontSize: customStyle?.fontSize }}>
              {t}
            </FirstTitle>
          ) : (
            <SubTitle style={{ fontSize: customStyle?.fontSize }}>{t}</SubTitle>
          )}
          {index < title.length - 1 && <Icon iconType={iconType} />}
        </React.Fragment>
      ))}
    </TitleContainer>
  );
}

// <Icon iconType="rightArrow"/>

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #2c2c2c;
`;

export const FirstTitle = styled.h1`
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.6px;
`;

export const SubTitle = styled.h1`
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.48px;
`;

export default Index;

Index.propTypes = {
  title: propTypes.arrayOf(propTypes.string),
  iconType: propTypes.oneOf(['whiteSidebarArrow', 'rightArrow']),
  customStyle: propTypes.object,
};
