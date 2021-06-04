//  这相当于一个非restful 的模板，要好好保存，以后可能会模拟类似的非标准的restful api

module.exports = (req, res, next) => {
  if (req.method === "POST" && req.path === "/login") {
    if (req.body.username === "jack" && req.body.password === "12345") {
      return res.status(200).json({
        // 这里应该是服务端的操作了吧？！
        user: {
          token: "123",
        },
      });
    } else {
      return res.status(400).json({ message: "用户名或者密码错误" });
    }
  }
  next();
};
