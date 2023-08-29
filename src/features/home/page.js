import Select from "components/select";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "styled-components";
import { searchGithub } from "./search-slice";

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
  const defaultType = "users";
  const [query, setQuery] = useState("");
  const [type, setType] = useState(defaultType); // or 'users'
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.search.data[query]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setPage(1); // Reset to the first page when the query changes
    dispatch(searchGithub({ query: e.target.value, type, page }));
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
    setPage(1); // Reset to the first page when the type changes
    dispatch(searchGithub({ query, type: e.target.value, page }));
  };

  console.log(data);
  return (
    <BodyContainer>
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Search"
          value={query}
          onChange={handleInputChange}
        />
        <Select
          value={type}
          onChange={handleTypeChange}
          defaultValue={defaultType}
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
