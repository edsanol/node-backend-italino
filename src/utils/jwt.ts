import jwt from "jsonwebtoken";

export const generateToken = async (id: number, roleId: number) => {
  return await new Promise((resolve, reject) => {
    jwt.sign(
      {
        id,
        roleId,
      },
      "secret key",
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
    const decoded = jwt.verify(token, "secret key");
    return decoded;
  } catch (err) {
    console.log("error", err);
    throw new Error("Failed to verify JWT");
  }
};
