import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { bodyParserGraphQL } from 'body-parser-graphql';
import compression from 'compression';
import resolvers from '../src/graphql/resolvers';
import fs from 'fs';

// Node file system을 사용하여 gql schema 가져옴
const typeDefs = fs.readFileSync(
  'src/graphql/schema.graphql',
  {
    encoding: 'utf-8',
  }
);

const port = 4000;
const app = express();

app.use(bodyParserGraphQL()); //gql 쿼리 해석하기 위함
app.use(compression()); //gzip 압축을 사용하여 웹앱의 속도를 높이기 위함

// ApolloServer 생성
const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true, // 스키마 검사 활성화 default: true
  playground: true, // playgorund 활성화 default: true
});

server.applyMiddleware({
  app,
  path: '/graphql',
});

app.listen(port, async () => {
  console.log('graphql api server open');
});
