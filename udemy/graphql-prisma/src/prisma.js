import { Prisma } from 'prisma-binding';

const primsa = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: 'http://localhost:4466'
});

primsa.query.users(null, '{ id name email }').then(data => {
  console.log('Data:', data);
});
