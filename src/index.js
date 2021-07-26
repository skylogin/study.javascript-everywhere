const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const jwt = require('jsonwebtoken');
const helmet = require('helmet');
const cors = require('cors');
const depthLimit = require('graphql-depth-limit');
const { createComplexityLimitRule } = require('graphql-validation-complexity');
// env파일에서 환경정보 가져오기
require('dotenv').config();

// DB모듈 추가
const db = require('./db');
const port = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;

const models = require('./models');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');


// jwt에서 사용자 정보가져오기
const getUser = token => {
  if(token){
    try{
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch(err){
      throw new Error('Session invalid');
    }
  }
};

// express 시작
const app = express();
app.use(helmet());
app.use(cors());

// 몽고DB 연결
db.connect(DB_HOST);

// 아폴로서버 설정
const server = new ApolloServer({ 
  typeDefs, 
  resolvers, 
  validationRules: [depthLimit(5), createComplexityLimitRule(1000)],
  context: ({ req }) => {
    // 헤더에서 jwt 가져오기 
    const token = req.headers.authorization;

    // jwt값으로 유저확인
    const user = getUser(token);
    console.log(user);

    // context 내 값 추가
    return { models, user };
  }, 
});

// /api 미들웨어 설정
server.applyMiddleware({ app, path: '/api' });


app.listen({port}, () => console.log(`GraphQL Server running at http://localhost:${port}${server.graphqlPath}`));
