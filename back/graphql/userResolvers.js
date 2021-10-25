const {
  AuthenticationError,
  ForbiddenError,
} = require("apollo-server-express");
const { User } = require("../models");
const bcrypt = require("bcrypt");

const resolvers = {
  Query: {
    getUser: async (_, args) => {
      const getUser = await User.findOne({ where: { id: args.id } });
      if (!getUser) throw new AuthenticationError("Not Authenticated");
      return getUser;
    },
    getAllUser: async () => {
      const users = await User.findAll();
      return users;
    },
  },
  Mutation: {
    createUser: async (_, { email, password }) => {
      const user = await User.findOne({ where: { email: email } });
      if (user) {
        //이미 데이터베이스에 아이디가 존재하면
        return null;
      }

      const hashpw = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        email,
        password: hashpw,
        type: "user",
        token: null,
      });
      return newUser;
    },
    updateUser: async (_, args) => {
      const user = await User.findOne({ where: { email: args.email } });
      if (user === null) {
        //만약 유저가 없다면
        return null;
      }
      await User.update(
        { password: args.password },
        { where: { email: args.email } }
      );

      return user;
    },
    deleteUser: async (_, args) => {
      const user = await User.findOne({ where: { email: args.email } });
      await User.destroy({ where: { email: args.email } });

      return user;
    },
  },
};
module.exports = resolvers;
