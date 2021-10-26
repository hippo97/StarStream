const { Post } = require("../models");

const resolvers = {
  Query: {
    getPost: async (_, { id }) => {
      const getPost = await Post.findOne({ where: { id: id } });
      return getPost;
    },
    getPosts: async () => {
      const resultData = await Post.findAll();
      return resultData;
    },
    getPostsPaginated: async (_, args) => {
      const results = await Post.findAll({
        order: [["createdAt", "DESC"]],
        limit: args.per_page,
        offset: (args.page - 1) * args.per_page,
      });

      return results;
    },
  },
  Mutation: {
    createPost: async (_, args) => {
      const post = await Post.findOne({ where: { title: args.title } });

      if (post) {
        //이미 데이터베이스에 아이디가 존재하면
        return null;
      }

      const newPost = await Post.create({
        title: args.title,
        content: args.content,
        UserId: args.userid,
      });

      return newPost;
    },
    updatePost: async (_, { id, title, content }) => {
      console.log(id);
      const oldPost = await Post.update(
        { title, content },
        { where: { id: id } }
      );
      return oldPost;
    },
    deletePost: async (_, { id }) => {
      console.log(id);
      const oldPost = await Post.destroy({ where: { id: id } });
      return oldPost;
    },
  },
};

module.exports = resolvers;
