import React, { Component } from "react";
import axios from "axios";
import UserCard from "./components/UserCard";
import { Row } from "react-materialize";
class App extends Component {
  // constructor() {
  // }
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
      <div className="App">
        <Row>
          {this.state.users.map(user => {
            let userPosts = this.state.posts.filter(
              post => post.userId === user.id
            );
            return <UserCard user={user} userPosts={userPosts} />;
          })}
        </Row>
      </div>
    );
  }
}

export default App;
