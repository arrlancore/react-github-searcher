import { styled } from "styled-components";

export const GridContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(calc(100% - 16px), 1fr));
  gap: 16px;
  font-size: 14px;

  @media (min-width: ${(props) => props.theme.breakpoints.mobile}) {
    grid-template-columns: repeat(auto-fill, minmax(calc(50% - 16px), 1fr));
  }

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}) {
    grid-template-columns: repeat(auto-fill, minmax(calc(33.333% - 16px), 1fr));
  }
`;

export const GridItem = styled.div`
  padding: 8px;
`;
