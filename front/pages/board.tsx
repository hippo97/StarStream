import React from "react";
import { gql, useQuery } from "@apollo/client";

const Board = () => {
  const {
    loading,
    data: { getPosts: posts },
  } = useQuery(FETCH_POSTS_QUERY);

  return (
    <>
      <h1>Posts</h1>
      {loading ? (
        <h2>Loading Posts...</h2>
      ) : (
        posts &&
        posts.map((post) => {
          <h2>post.title</h2>;
        })
      )}
    </>
  );
};

const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      title
    }
  }
`;

export default Board;
