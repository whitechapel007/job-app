import { UnauthenticatedError } from "../errors/index.js";
import jwt from "jsonwebtoken";
const auth = async (req, res, next) => {
  const authHeaders = req.headers.authorization;

  if (!authHeaders || !authHeaders.startsWith("Bearer ")) {
    throw new UnauthenticatedError("unauthorized user");
  }

  const token = authHeaders.split(" ")[1];

  try {
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: decodedToken.userId };

    next();
  } catch (error) {
    throw new UnauthenticatedError("unauthenticated user");
  }
};

export default auth;
