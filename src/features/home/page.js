import Select from "components/select";
import React from "react";
import { styled } from "styled-components";

const BodyContainer = styled.div`
  padding: 16px;
`;

const SearchContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-direction: column;
  @media (min-width: ${(props) => props.theme.breakpoints.mobile}) {
    flex-direction: row;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 8px;
  outline: none;
  border: 1px solid #d3d3d3;
  max-width: 300px;
  &:focus {
    border-color: #a8a8a8;
  }
`;

const GridContent = styled.div`
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

const GridItem = styled.div`
  border: 1px solid #eeeeee;
  padding: 8px;
`;

const Home = () => {
  return (
    <BodyContainer>
      <SearchContainer>
        <SearchInput type="text" placeholder="Search" />
        <Select
          onChange={console.log}
          options={[
            { value: "users", label: "Users" },
            { value: "repository", label: "Repository" },
          ]}
        />
      </SearchContainer>
      <GridContent>
        <GridItem>search 1</GridItem>
        <GridItem>search 2</GridItem>
        <GridItem>search 3</GridItem>
      </GridContent>
    </BodyContainer>
  );
};

export default Home;
