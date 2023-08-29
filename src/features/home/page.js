import Select from "components/select";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "styled-components";
import { searchGithub } from "./search-slice";
import PropTypes from "prop-types";
import Spinner from "components/spinner";
import ErrorMessage from "components/error-message";

const [USERS, REPOSITORIES] = ["users", "repositories"];

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
  justify-content: flex-start;
  align-items: center;
  height: max-content;
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
  avatarUrl: PropTypes.string.isRequired,
  htmlUrl: PropTypes.string.isRequired,
  login: PropTypes.string.isRequired,
  name: PropTypes.string,
  location: PropTypes.string,
};

const RepoName = styled.a`
  font-size: 18px;
  font-weight: bold;
  color: #0366d6;
  text-decoration: none;
  margin-bottom: 12px;
  &:hover {
    text-decoration: underline;
  }
`;

const Author = styled.p`
  font-size: 16px;
  color: #586069;
  margin-top: 8px;
`;

const Stats = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  margin-top: 12px;
  margin-bottom: 12px;
  gap: 8px;
`;

const RepositoryCard = ({
  name,
  description,
  htmlUrl,
  owner,
  stargazersCount,
  forksCount,
  updatedAt,
  language,
}) => {
  return (
    <Card title={description}>
      <RepoName href={htmlUrl} target="_blank" rel="noopener noreferrer">
        {name}
      </RepoName>
      <Author>by {owner}</Author>
      <Stats>
        <span>⭐ {stargazersCount}</span>
        <span>🔗 {forksCount}</span>
        <span title="Last update">
          📅 {new Date(updatedAt).toLocaleDateString()}
        </span>
      </Stats>
      <div>
        <b>{language}</b>
      </div>
    </Card>
  );
};

RepositoryCard.propTypes = {
  htmlUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  owner: PropTypes.string.isRequired,
  stargazersCount: PropTypes.number.isRequired,
  forksCount: PropTypes.number.isRequired,
  updatedAt: PropTypes.string.isRequired,
  language: PropTypes.string,
};

const EmptyContent = styled.div`
  padding: 20px 8px;
  font-size: 14px;
  color: #888;
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const PageButton = styled.button`
  padding: 5px 10px;
  margin: 0 5px;
  border: 1px solid #e1e4e8;
  border-radius: 4px;
  cursor: pointer;
  background-color: #fafbfc;
  &:hover {
    background-color: #f6f8fa;
  }
`;

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const renderFirstEllipsis = currentPage - 2 > 1;
  const renderLastEllipsis = currentPage + 2 < totalPages;
  return (
    <PaginationWrapper>
      <PageButton
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </PageButton>

      {currentPage - 1 > 1 && (
        <PageButton onClick={() => onPageChange(1)}>{1}</PageButton>
      )}

      {renderFirstEllipsis && "..."}

      {currentPage > 1 && (
        <PageButton onClick={() => onPageChange(currentPage - 1)}>
          {currentPage - 1}
        </PageButton>
      )}

      <PageButton style={{ backgroundColor: "#333", color: "white" }}>
        {currentPage}
      </PageButton>

      {currentPage < totalPages && (
        <PageButton onClick={() => onPageChange(currentPage + 1)}>
          {currentPage + 1}
        </PageButton>
      )}

      {renderLastEllipsis && "..."}

      {currentPage + 1 < totalPages && (
        <PageButton onClick={() => onPageChange(totalPages)}>
          {totalPages}
        </PageButton>
      )}

      <PageButton
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </PageButton>
    </PaginationWrapper>
  );
};

Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

const Item = ({ type, data }) => {
  switch (type) {
    case USERS:
      return (
        <UserCard
          avatarUrl={data.avatar_url}
          htmlUrl={data.html_url}
          login={data.login}
          name={data.name}
          location={data.location}
        />
      );

    case REPOSITORIES:
      return (
        <RepositoryCard
          htmlUrl={data.html_url}
          name={data.name}
          description={data.description}
          owner={data.owner?.login}
          stargazersCount={data.stargazers_count}
          forksCount={data.forks_count}
          updatedAt={data.updated_at}
          language={data.language}
        />
      );

    default:
      return null;
  }
};

Item.propTypes = {
  type: PropTypes.oneOf([USERS, REPOSITORIES]),
  data: PropTypes.object,
};

const Home = () => {
  const defaultType = "users";
  const pageSize = 9;
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [type, setType] = useState(defaultType);
  const dispatch = useDispatch();

  const key = `${query}_${type}_${page}_${pageSize}`;
  const data = useSelector((state) => state.search.data[key]);
  const totalPages = useSelector((state) => state.search.totalPages);
  const loadingStatus = useSelector((state) => state.search.status);
  const error = useSelector((state) => state.search.error);

  const isLoading = loadingStatus === "loading";

  const params = { page, pageSize, type, query };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setPage(1); // Reset page
    if (e.target.value.trim()) {
      dispatch(searchGithub({ ...params, query: e.target.value }));
    }
  };

  const handleTypeChange = (value) => {
    setType(value);
    setPage(1); // Reset page
    dispatch(searchGithub({ ...params, type: value }));
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    dispatch(searchGithub({ ...params, page: newPage }));
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
            { value: USERS, label: "Users" },
            { value: REPOSITORIES, label: "Repository" },
          ]}
        />
      </SearchContainer>
      {isLoading && <Spinner />}
      {error && query && !isLoading && <ErrorMessage message={error} />}
      <GridContent>
        {data?.items?.map((item) => (
          <GridItem key={item.id}>
            <Item type={type} data={item} />
          </GridItem>
        ))}
      </GridContent>
      {data?.items.length === 0 && (
        <EmptyContent>{`There are no result for keyword "${query}"`}</EmptyContent>
      )}
      {!query && (
        <EmptyContent>Type some keywords on search input</EmptyContent>
      )}
      {data?.items.length && totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={page}
          onPageChange={(newPage) => handlePageChange(newPage)}
        />
      )}
    </BodyContainer>
  );
};

export default Home;
