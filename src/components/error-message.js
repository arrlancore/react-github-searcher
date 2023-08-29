import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const ErrorWrapper = styled.div`
  background-color: #f44336;
  color: white;
  padding: 10px 15px;
  border-radius: 4px;
  margin: 10px 0;
  text-align: center;
  font-size: 16px;
`;

const ErrorMessage = ({ message }) => {
  return <ErrorWrapper>{message}</ErrorWrapper>;
};

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorMessage;
