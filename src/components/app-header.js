import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import AppContainer from "./app-container";
import theme from "theme";

const HeaderContainer = styled.header`
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
`;

const Logo = styled.div`
  width: 40px;
  height: 40px;
  margin-right: 16px;
  background: url("/github-mark.svg") no-repeat center;
  background-size: contain;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 16px;
  color: #333;
`;

const Description = styled.p`
  margin: 4px 0 0 0;
  font-size: 12px;
  color: #888;
`;

const Header = ({ logoSrc, title, description }) => (
  <HeaderContainer>
    <AppContainer theme={theme}>
      <HeaderWrapper>
        <Logo />
        <div>
          <Title>{title}</Title>
          <Description>{description}</Description>
        </div>
      </HeaderWrapper>
    </AppContainer>
  </HeaderContainer>
);

Header.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default Header;
