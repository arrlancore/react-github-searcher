import { styled } from "styled-components";
import PropTypes from "prop-types";
import React from "react";
import Select from "components/select";
import theme from "theme";

const SearchContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-direction: column;
  @media (min-width: ${(props) => theme.breakpoints.mobile}) {
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

const options = [
  { value: "users", label: "Users" },
  { value: "repositories", label: "Repository" },
];

const Search = ({
  query,
  handleInputChange,
  type,
  handleTypeChange,
  defaultType,
}) => {
  return (
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
        options={options}
      />
    </SearchContainer>
  );
};

Search.propTypes = {
  query: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  type: PropTypes.oneOf(["users", "repositories"]).isRequired,
  handleTypeChange: PropTypes.func.isRequired,
  defaultType: PropTypes.oneOf(["users", "repositories"]).isRequired,
};

export default Search;
