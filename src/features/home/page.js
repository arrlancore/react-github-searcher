import Select from "components/select";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "styled-components";
import { searchGithub } from "./search-slice";
import PropTypes from "prop-types";

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
  padding: 8px;
`;

// user card component
const Card = styled.div`
  border: 1px solid #e1e4e8;
  border-radius: 6px;
  padding: 16px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ProfileImage = styled.img`
  border-radius: 50%;
  width: 80px;
  height: 80px;
  margin-bottom: 12px;
`;

const NameLink = styled.a`
  font-size: 18px;
  font-weight: bold;
  color: #0366d6;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const Location = styled.p`
  font-size: 14px;
  color: #586069;
  margin-top: 8px;
`;

const UserCard = (props) => {
  return (
    <Card>
      <ProfileImage src={props.avatarUrl} alt={props.login} />
      <NameLink href={props.htmlUrl} target="_blank" rel="noopener noreferrer">
        {props.name || props.login}
      </NameLink>
      {props.location && <Location>{props.location}</Location>}
    </Card>
  );
};

UserCard.propTypes = {
  avatar_url: PropTypes.string.isRequired,
  html_url: PropTypes.string.isRequired,
  login: PropTypes.string.isRequired,
  name: PropTypes.string,
  location: PropTypes.string,
};

const Item = ({ type, data }) => {
  switch (type) {
    case "users":
      return (
        <UserCard
          avatarUrl={data.avatar_url}
          htmlUrl={data.html_url}
          login={data.login}
          name={data.name}
          location={data.location}
        />
      );

    case "repository":
      return null;

    default:
      return null;
  }
};

const Home = () => {
  const defaultType = "users";
  const [query, setQuery] = useState("");
  const [type, setType] = useState(defaultType);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.search.data[query]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setPage(1); // Reset page
    dispatch(searchGithub({ query: e.target.value, type, page }));
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
    setPage(1); // Reset page
    dispatch(searchGithub({ query, type: e.target.value, page }));
  };

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
        {data?.items?.map((item) => (
          <GridItem key={item.id}>
            <Item type={type} data={item} />
          </GridItem>
        ))}
      </GridContent>
    </BodyContainer>
  );
};

export default Home;
