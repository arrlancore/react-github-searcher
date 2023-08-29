import { styled } from "styled-components";
import PropTypes from "prop-types";
import { Card } from "./card";

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

export default RepositoryCard;
