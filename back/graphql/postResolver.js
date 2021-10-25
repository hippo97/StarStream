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
  },
  Mutation: {
    createPost: async (_, { title, content }) => {
      const post = await Post.findOne({ where: { title: title } });
      console.log("hehhs", post);
      if (post) {
        //이미 데이터베이스에 아이디가 존재하면
        return null;
      }

      const newPost = await Post.create({
        title,
        content,
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

//module.exports = resolvers;
