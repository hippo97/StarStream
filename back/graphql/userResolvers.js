const {
  AuthenticationError,
  ForbiddenError,
} = require("apollo-server-express");
const { User } = require("../models");
const bcrypt = require("bcrypt");
const sha256 = require("crypto-js/sha256");

const resolvers = {
  Query: {
    getUser: async (_, { email }) => {
      const user = await User.findOne({ where: { email: email } });
      if (!user) throw new AuthenticationError("Not Authenticated");

      return user;
    },
    getAllUser: async (_, { email }) => {
      const user = await User.findOne({ where: { email: email } });
      if (!user) throw new AuthenticationError("Not Authenticated");
      if (user.type !== "admin") throw new ForbiddenError("Not Authorized");

      const users = await User.findAll();
      return users;
    },
  },
  Mutation: {
    signup: async (_, { email, password }) => {
      const user = await User.findOne({ where: { email: email } });
      if (user) {
        //이미 데이터베이스에 아이디가 존재하면
        return false;
      }

      bcrypt.hash(password, 10, async (err, hashpw) => {
        await User.create({
          email,
          hashpw,
          type: "user",
          token: "",
        });
      });

      return true;
    },
    login: async (_, { email, pwssword }) => {
      const user = await User.findOne({ where: { email: email } });

      if (!user) return null; //해당 유저 없음
      if (user.token) return null; //해당 유저가 이미 로그인한 상태일때
      if (!bcrypt.compareSync(password, user.password)) return null; //비밀번호 일치X

      user.token = sha256(rand(160, 36) + email + password).toString();
      return user;
    },
    logout: async (_, { email }) => {
      const user = await User.findOne({ where: { email: email } });
      if (user?.token) {
        //로그인 상태(토큰 존재)
        user.token = "";
        return true;
      }

      throw new AuthenticationError("Not Authenticated"); //로그인 하지 않은 상태이거나 토큰이 없는 경우
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
