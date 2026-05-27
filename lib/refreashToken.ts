import jwt from "jsonwebtoken"

export function isExpired(token: string) {
  try {
    jwt.verify(token, process.env.JWT_SECRET as string);
    return false;
  } catch {
    return true;
  }
}

