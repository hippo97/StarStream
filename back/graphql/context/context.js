const { User } = require("../../models");

const context = async ({ req }) => {
  const token = req.headers.authorization || "";
  // 로그인되어 있지 않거나 로그인 토큰이 없을 때
  if (token.length != 64) return null;
  console.log(req.headers.authorization);
  const user = await User.findOne({ where: { token: token } });

  return user;
};

module.exports = context;
