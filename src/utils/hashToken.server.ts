import crypto from "crypto";

export const hashToken = (token: string): string => {
  const hash = crypto.createHash("sha256");
  hash.update(token);
  return hash.digest("hex");
};
