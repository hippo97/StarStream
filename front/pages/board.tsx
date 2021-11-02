import React from "react";
import { gql, useQuery } from "@apollo/client";

const Board = () => {
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);

  if (loading) return <h2>Loading Posts...</h2>;
  console.log(data);

  return (
    <>
      <h1>Posts</h1>
      {data.getPosts && data.getPosts.map((post) => <h2>{post.title}</h2>)}
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
