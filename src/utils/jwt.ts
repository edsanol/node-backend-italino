import jwt from "jsonwebtoken";

export const generateToken = async (id: number, roleId: number) => {
  return await new Promise((resolve, reject) => {
    jwt.sign(
      {
        id,
        roleId,
      },
      String(process.env.TOKEN_SECRET_KEY),
      {
        expiresIn: "1h",
      },
      (err, token) => {
        if (err) {
          console.log("error", err);
          reject(new Error("Failed to generate JWT"));
        }
        resolve(token);
      }
    );
  });
};

export const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, String(process.env.TOKEN_SECRET_KEY));
    return decoded;
  } catch (err) {
    console.log("error", err);
    throw new Error("Failed to verify JWT");
  }
};
