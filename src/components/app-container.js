import styled from "styled-components";

const AppContainer = styled.div`
  margin: 0 auto;
  padding: 0 8px;
  max-width: ${(props) => props.theme.breakpoints.desktop};

  @media (min-width: ${(props) =>
      props.theme.breakpoints.mobile}) and (max-width: ${(props) =>
      props.theme.breakpoints.tablet}) {
    padding: 0 16px; // Tablet styles
  }

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: 0 24px; // Desktop and up styles
  }
`;

export default AppContainer;
