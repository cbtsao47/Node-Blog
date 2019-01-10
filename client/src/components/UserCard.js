import React from "react";
import { Col, Card } from "react-materialize";
import { Route } from "react-router";
import Post from "./Post";

const UserCard = props => {
  const { name, id } = props.user;
  const { userPosts } = props;
  return (
    <Col s={12} m={6} l={4}>
      <Card className="#26a69a teal lighten-1">
        <h1 className="#fafafa grey-text lighten-55">{name}</h1>
        <Route
          path={`/${id}/posts`}
          render={props => <Post userPosts={userPosts} />}
        />
      </Card>
    </Col>
  );
};
export default UserCard;
