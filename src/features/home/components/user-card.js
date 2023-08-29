import { styled } from "styled-components";
import PropTypes from "prop-types";
import { Card } from "./card";

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

export default UserCard;
