import { gql } from "@apollo-client";
import client from "../apollo-client";
import Link from "next/link";
import * as React from "react";
import { Mutation } from "react-apollo";
import Layout from "../Components/Layout";

const IndexPage: React.FunctionComponent = () => {
  return (
    <Layout title="Home | StarStream">
      <h1>hello 👋</h1>
      <p>
        <Link href="/about">
          <a>About</a>
        </Link>
      </p>
    </Layout>
  );
};

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql``,
  });
}

export default IndexPage;
