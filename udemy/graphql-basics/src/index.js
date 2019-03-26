import { GraphQLServer } from 'graphql-yoga';
import uuidv4 from 'uuid/v4';
import { argumentsObjectFromField } from 'apollo-utilities';

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
    published: true,
    author: '1'
  },
  {
    id: '2',
    title: 'Lambda School',
    body: 'Learn to learn',
    published: false,
    author: '1'
  },
  {
    id: '3',
    title: 'Python',
    body: 'Old Monty',
    published: false,
    author: '2'
  }
];

const comments = [
  {
    id: '1',
    text: 'What a great comment',
    author: '3',
    post: '2'
  },
  {
    id: '2',
    text: "Commenting away like nobody's business",
    author: '3',
    post: '1'
  },
  {
    id: '3',
    text: 'Comment here, comment there',
    author: '1',
    post: '1'
  }
];

// type definitions
const typeDefs = `
    type Query {
        users(query: String): [User!]!
        me: User!
        post(query: String): [Post!]!
        comment(query: String): [Comment!]!
    }

    type Mutation {
      createUser(data: CreateUserInput): User!
      createPost(data: CreatePostInput): Post!
      createComment(data: CreateCommentInput): Comment!
    }

    input CreateUserInput {
      name: String!
      email: String!
      age: Int
    }

    input CreatePostInput {
      title: String!
      body: String!
      published: Boolean!
      author: ID!
    }

    input CreateCommentInput {
      text: String!
      author: ID!
      post: ID!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
        comments: [Comment!]!
    }

    type Post {
        id: ID!
        title: String!
        body: String
        published: Boolean
        author: User!
        comments: [Comment!]!
    }
    type Comment {
      id: ID!
      text: String!
      author: User!
      post: Post!
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
        return posts;
      }
      return posts.filter(post => {
        return post.title.toLowerCase().includes(args.query.toLowerCase());
      });
    },
    comment(parent, args, ctx, info) {
      if (!args.query) {
        return comments;
      }
      return comments.filter(comment => {
        return comment.text.toLowerCase().includes(args.query.toLowerCase());
      });
    }
  },
  Mutation: {
    createUser(parent, args, ctx, info) {
      const emailTaken = users.some(user => {
        return user.email === args.data.email;
      });
      if (emailTaken) {
        throw new Error('Email taken!');
      }

      const user = {
        id: uuidv4(),
        ...args.data
      };

      users.push(user);

      return user;
    },
    createPost(parent, args, ctx, info) {
      const userExists = users.some(user => user.id === args.data.author);

      if (!userExists) {
        throw new Error('User not found');
      }

      const post = {
        id: uuidv4(),
        ...args.data
      };

      posts.push(post);

      return post;
    },
    createComment(parent, args, ctx, info) {
      const userExists = users.some(user => user.id === args.data.author);
      const postExists = posts.some(post => post.id === args.data.post);

      if (!userExists || !postExists) {
        throw new Error('User and post not found');
      }

      const comment = {
        id: uuidv4(),
        ...args.data
      };

      comments.push(comment);

      return comment;
    }
  },
  Post: {
    author(parent, args, ctx, info) {
      return users.find(user => {
        return user.id === parent.author;
      });
    },
    comments(parent, args, ctx, info) {
      return comments.filter(comment => {
        return comment.post === parent.id;
      });
    }
  },
  User: {
    posts(parent, args, ctx, info) {
      return posts.filter(post => {
        return post.author === parent.id;
      });
    },
    comments(parent, args, ctx, info) {
      return comments.filter(comment => {
        return comment.author === parent.id;
      });
    }
  },
  Comment: {
    author(parent, args, ctx, info) {
      return users.find(user => {
        return user.id === parent.author;
      });
    },
    post(parent, args, ctx, info) {
      return posts.find(post => {
        return post.id === parent.post;
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
