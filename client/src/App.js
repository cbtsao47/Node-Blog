import React, { Component } from "react";
import axios from "axios";
import UserCard from "./components/UserCard";
import styled from "styled-components";

const StyledApp = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
`;
class App extends Component {
  state = {
    users: [],
    posts: []
  };
  async componentDidMount() {
    const users = await axios.get("https://nodesblog.herokuapp.com/users");
    const posts = await axios.get("https://nodesblog.herokuapp.com/posts");
    try {
      this.setState({
        users: users.data,
        posts: posts.data
      });
    } catch (err) {
      console.log("it failed");
    }
  }
  render() {
    return (
      <StyledApp>
        {this.state.users.map(user => {
          let userPosts = this.state.posts.filter(
            post => post.userId === user.id
          );
          return <UserCard user={user} userPosts={userPosts} />;
        })}
      </StyledApp>
    );
  }
}

export default App;
