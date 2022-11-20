import { db } from "@/utils/db.server";
import { hashToken } from "@/utils/hashToken.server";

// used when we create a refresh token.
export const addRefreshTokenToWhiteList = async ({
  jti,
  refreshToken,
  userId,
}: {
  jti: string;
  refreshToken: string;
  userId: string;
}) => {
  return db.refreshToken.create({
    data: {
      id: jti,
      hashedToken: hashToken(refreshToken),
      userId,
    },
  });
};

// used to check if the token sent by the client is in the database.
export const findRefreshToken = async (id: string) => {
  return db.refreshToken.findUnique({
    where: {
      id,
    },
  });
};

// soft delete tokens after usage.
export const deleteRefreshToken = async (id: string) => {
  return db.refreshToken.update({
    where: {
      id,
    },
    data: {
      revoked: true,
    },
  });
};
