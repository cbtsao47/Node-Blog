import React from "react";
import Quote from "./Quote";
const Post = props => {
  const { userPosts } = props;

  return (
    <div>
      {userPosts.map(post => (
        <Quote quote={post.text} />
      ))}
    </div>
  );
};
export default Post;
