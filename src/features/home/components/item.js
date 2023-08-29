import PropTypes from "prop-types";
const { default: RepositoryCard } = require("./repo-card");
const { default: UserCard } = require("./user-card");

const [USERS, REPOSITORIES] = ["users", "repositories"];

export const Item = ({ type, data }) => {
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
