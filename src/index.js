const express = require('express');
const { ApolloServer } = require('apollo-server-express');
// env파일에서 환경정보 가져오기
require('dotenv').config();

// DB모듈 추가
const db = require('./db');
const port = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;

const models = require('./models');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');


// express 시작
const app = express();

// 몽고DB 연결
db.connect(DB_HOST);

// 아폴로서버 설정
const server = new ApolloServer({ 
  typeDefs, 
  resolvers, 
  context: () => {
    // context 내 models 추가
    return { models };
  }, 
});

// /api 미들웨어 설정
server.applyMiddleware({ app, path: '/api' });


app.listen({port}, () => console.log(`GraphQL Server running at http://localhost:${port}${server.graphqlPath}`));
