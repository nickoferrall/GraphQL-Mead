import { GraphQLServer } from 'graphql-yoga';

const users = [
  {
    id: '1',
    name: 'Nick',
    email: 'nick@gmail.com',
    age: 25
  },
  {
    id: '2',
    name: 'Sarah',
    email: 'sarah@example.com'
  },
  {
    id: '3',
    name: 'Dave',
    email: 'dave@example.com'
  }
];

const posts = [
  {
    id: '1',
    title: 'The title',
    body: "Here's some more info",
    published: 2008,
    author: '1'
  },
  {
    id: '2',
    title: 'Lambda School',
    body: 'Learn to learn',
    published: 2018,
    author: '1'
  },
  {
    id: '3',
    title: 'Python',
    body: 'Old Monty',
    published: 1998,
    author: '2'
  }
];

const comments = [
  {
    id: '1',
    comment: 'What a great comment'
  },
  {
    id: '2',
    comment: "Commenting away like nobody's business"
  },
  {
    id: '3',
    comment: 'Comment here, comment there'
  }
];

// type definitions
const typeDefs = `
    type Query {
        users(query: String): [User!]!
        me: User!
        post(query: String): [Post!]!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
    }

    type Post {
        id: ID!
        title: String!
        body: String
        published: Int
        author: User!
    }
`;

// Resolvers
const resolvers = {
  Query: {
    users(parent, args, ctx, info) {
      if (!args.query) {
        return users;
      }
      return users.filter(user => {
        return user.name.toLowerCase().includes(args.query.toLowerCase());
      });
    },
    me() {
      return {
        id: '123456',
        name: 'John',
        email: 'bigjohn@gmail.com'
      };
    },
    post(parent, args, ctx, info) {
      if (!args.query) {
        console.log('What what', args.query);
        return posts;
      }
      return posts.filter(post => {
        return post.title
          .toLocaleLowerCase()
          .includes(args.query.toLowerCase());
      });
    }
  },
  Post: {
    author(parent, args, ctx, info) {
      return users.find(user => {
        return user.id === parent.author;
      });
    }
  },
  User: {
    posts(parent, args, ctx, info) {
      return posts.filter(post => {
        return post.author === parent.id;
      });
    }
  }
};

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(() => {
  console.log('The server is up!');
});
