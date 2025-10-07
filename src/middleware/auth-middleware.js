import User from "../models/user-models.js";

export const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res
      .status(401)
      .json({
        errors: "Unauthorized",
      })
      .end();
  }

  const user = await User.findOne({
    token,
  });
  if (!user) {
    return res
      .status(401)
      .json({
        errors: "Unauthorized",
      })
      .end();
  } else {
    req.user = user;
    next();
  }
};
