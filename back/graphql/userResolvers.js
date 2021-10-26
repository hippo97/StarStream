const {
  AuthenticationError,
  ForbiddenError,
} = require("apollo-server-express");
const { User } = require("../models");
const bcrypt = require("bcrypt");
const sha256 = require("crypto-js/sha256");

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
    login: async (_, args) => {
      const user = await User.findOne({ where: { email: args.email } });

      if (!user) return null; //유저가 없을때
      if (user.token) return null; //이미 로그인 중일때(토큰이 있다는건 로그인중이라는 뜻)
      if (!bcrypt.compareSync(args.password, user.password)) return null; //비번이 틀렸을때(로그인 시 입력한 비번)

      const newToken = sha256(
        args.email + args.password + args.email
      ).toString();

      const updateUser = await User.update(
        {
          token: newToken,
        },
        {
          where: { email: args.email },
        }
      );

      return updateUser;
    },
    logout: async (_, __, context) => {
      if (context?.token) {
        //로그인 상태라면
        await User.update({ token: "" }, { where: { token: context.token } });
        return true;
      }

      throw new AuthenticationError("Not Authenticated"); //로그인 X 또는 토큰 없음
    },
  },
};
module.exports = resolvers;
