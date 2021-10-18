const resolvers = {
  Query: {
    getUserData: async () => {
      const getUsers = await User.findAll();
      return getUsers;
    },
    getAllUser: async (_, args) => {
      await context.User.findOne();
      console.log(args);
      const { id } = args;
      const resultData = await User.findOne({ where: { id: id } });
      return resultData;
    },
  },
  Mutation: {
    createUser: async (_, { firstName, lastName, password }) => {
      const newUser = await User.create({
        firstName,
        lastName,
        password,
      });

      const user = await User.findOne({ where: { id: id } });
      return user;
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
