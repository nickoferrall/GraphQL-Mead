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

const db = {
  users,
  posts,
  comments
};

export { db as default };
