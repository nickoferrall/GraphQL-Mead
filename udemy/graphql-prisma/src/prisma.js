import { Prisma } from 'prisma-binding';

const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: 'http://localhost:4466'
});

// primsa.query.comments(null, '{ id text author { id name } }').then(data => {
//   console.log(JSON.stringify(data, undefined, 2));
// });

const createPostForUser = async (authorId, data) => {
  const userExists = await prisma.exists.User({ id: authorId });
  if (!userExists) {
    throw new Error('User not found');
  }
  const post = await prisma.mutation.createPost(
    {
      data: {
        ...data,
        author: {
          connect: {
            id: authorId
          }
        }
      }
    },
    '{author {id name email posts {id title published}}}'
  );
  return post.author;
};

const updatePostForUser = async (postId, data) => {
  const postExists = await prisma.exists.Post({ id: postId });
  if (!postExists) {
    throw new Error('Post not found');
  }
  const post = await prisma.mutation.updatePost(
    {
      where: {
        id: postId
      },
      data
    },
    '{author {id name email posts {id title published}}}'
  );
  return post.author;
};

updatePostForUser('cjtxktvyo003f0863jummfse4', { published: false })
  .then(user => {
    console.log(JSON.stringify(user, undefined, 2));
  })
  .catch(error => {
    console.log(error.message);
  });

// createPostForUser('cjtw479fk00fn08638es0ga7m', {
//   title: 'Great books to read',
//   body: 'The Art of War',
//   published: true
// })
//   .then(user => {
//     console.log(JSON.stringify(user, undefined, 2));
//   })
//   .catch(error => {
//     console.log(error);
//   });
