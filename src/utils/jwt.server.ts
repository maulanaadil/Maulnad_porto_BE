import { User } from "@prisma/client";
import jwt from "jsonwebtoken";

export const generateAccessToken = (user: User) => {
  return jwt.sign({ userId: user.id }, `${process.env.SECRET_TOKEN}`, {
    expiresIn: "15m",
  });
};

export const genereateRefreshToken = (user: User, jti: string) => {
  return jwt.sign(
    {
      userId: user.id,
      jti,
    },
    `${process.env.SECRET_REFRESH_TOKEN}`,
    {
      expiresIn: "20m",
    }
  );
};

export const generateTokens = (user: User, jti: string) => {
  const accessToken = generateAccessToken(user);
  const refreshToken = genereateRefreshToken(user, jti);
  return {
    accessToken,
    refreshToken,
  };
};
