const express = require("express");
const graphqlHTTP = require("express-graphql");
const { buildSchema } = require("graphql");
// Dummy data
var users = [
  {
    id: 1,
    name: "Brian",
    age: "21",
    gender: "M"
  },
  {
    id: 2,
    name: "Kim",
    age: "22",
    gender: "M"
  },
  {
    id: 3,
    name: "Joseph",
    age: "23",
    gender: "M"
  },
  {
    id: 3,
    name: "Faith",
    age: "23",
    gender: "F"
  },
  {
    id: 5,
    name: "Joy",
    age: "25",
    gender: "F"
  }
];
const schema = buildSchema(`
  type Query {
    user(id: Int!): Person
    users(gender: String): [Person]
  },
  type Person {
    id: Int
    name: String
    age: Int
    gender: String
  }
`);

let getUser = args => {
  let userID = args.id;
  return users.filter(user => {
    return user.id == userID;
  })[0];
};

let retrieveUsers = args => {
  if (args.gender) {
    let gender = args.gender;
    return users.filter(user => user.gender === gender);
  } else {
    return users;
  }
};
const root = {
  user: getUser, // Resolver function to return user with specific id
  users: retrieveUsers
};
const app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
);

app.listen(4000, () => console.log("Now browse to localhost:4000/graphql"));
