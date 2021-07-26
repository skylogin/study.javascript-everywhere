// index.js
// This is the main entry point of our application
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

require('dotenv').config();
const db = require('./db');

const port = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;

let notes = [
  { id: '1', content: 'This is a note', author: 'Adam Scott' },
  { id: '2', content: 'This is a note2', author: 'asdfa dfet' },
  { id: '3', content: 'This is a note3', author: '34234 23' },
]

const typeDefs = gql`
type Note {
  id: ID!
  content: String!
  author: String!
},
type Mutation{
  newNote(content: String!): Note!
}
type Query {
  hello: String
  notes: [Note!]!
  note(id: ID!): Note!
},
`;

const resolvers = {
  Query: {
    hello: () => 'Hello World',
    notes: () => notes,
    note: (parent, args) => {
      return notes.find(note => note.id === args.id);
    },
  },
  Mutation: {
    newNote: (parent, args) => {
      let noteValue = {
        id: String(notes.length + 1),
        content: args.content,
        author: 'Adam Scott'
      };
      notes.push(noteValue);
      return noteValue;
    }
  },
};

// express 시작
const app = express();

// 몽고DB 연결
db.connect(DB_HOST);

// 아폴로서버 설정
const server = new ApolloServer({ typeDefs, resolvers });

// /api 미들웨어 설정
server.applyMiddleware({ app, path: '/api' });


app.listen({port}, () => console.log(`GraphQL Server running at http://localhost:${port}${server.graphqlPath}`));
