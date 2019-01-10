import React from "react";
import { Col, Card } from "react-materialize";
import { Route } from "react-router";
import { Link } from "react-router-dom";
import Post from "./Post";
import styled from "styled-components";

const StyledCard = styled.div`
  border: 5px solid #4c7aa3;
  margin: 1rem;
  width: 30%;
  padding: 2rem;
  text-align: center;
  background-color: #c2e3ff;
`;
const StyledName = styled.h1`
  font-size: 3rem;
`;

const UserCard = props => {
  const { name, id } = props.user;
  const { userPosts } = props;
  return (
    <StyledCard className="user-card">
      <StyledName>{name}</StyledName>
      <Link to={`/${id}/posts`}>View Quotes</Link>
      <Route
        path={`/${id}/posts`}
        render={props => <Post userPosts={userPosts} />}
      />
    </StyledCard>
  );
};
export default UserCard;
