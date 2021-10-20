const { User } = require("../models");

const resolvers = {
  Query: {
    getUserData: async () => {
      const getUsers = await User.findAll();
      return getUsers;
    },
    getAllUser: async () => {
      const resultData = await User.findAll();
      return resultData;
    },
  },
  Mutation: {
    createUser: async (_, { email, password }) => {
      const user = await User.findOne({ where: { id: email } });
      if (user) {
        //이미 데이터베이스에 아이디가 존재하면
        return null;
      }

      const newUser = await User.create({
        email,
        password,
      });

      return newUser;
    },
    updateUser: async (_, { id, firstName, lastName, password }) => {
      console.log(id);
      const oldUser = await User.update(
        { firstName, lastName, password },
        { where: { id: id } }
      );
      const user = await User.findOne({ where: { id: id } });
      return user;
    },
    deleteUser: async (_, { id }) => {
      console.log(id);
      const oldUser = await User.destroy({ where: { id: id } });
      const user = await User.findOne({ where: { id: id } });
      return user;
    },
  },
};

module.exports = resolvers;
