const Query = {
  users(parent, args, { db }, info) {
    if (!args.query) {
      return db.users;
    }
    return db.users.filter(user => {
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
  post(parent, args, { db }, info) {
    if (!args.query) {
      return db.posts;
    }
    return db.posts.filter(post => {
      return post.title.toLowerCase().includes(args.query.toLowerCase());
    });
  },
  comment(parent, args, { db }, info) {
    if (!args.query) {
      return db.comments;
    }
    return db.comments.filter(comment => {
      return comment.text.toLowerCase().includes(args.query.toLowerCase());
    });
  }
};

export { Query as default };
