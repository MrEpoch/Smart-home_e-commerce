import prisma from "../db";
import jwt from "jsonwebtoken";

export const Invalidate_REFRESH_TOKEN = async (token: string) => {
  try {
    const tokenStatus = await prisma.refresh_token.findUnique({
      where: {
        token: token,
      },
    });

    if (!tokenStatus) {
      throw new Error("Token not found");
    }

    if (!tokenStatus.valid) {
      throw new Error("Token already invalid");
    }

    await prisma.refresh_token.update({
      where: {
        token: token,
      },
      data: {
        valid: false,
      },
    });
  } catch (e) {
    console.log(e);
  }
};

export const delete_REFRESH_TOKEN = async (token: string) => {
  try {
    await prisma.refresh_token.delete({
      where: {
        token: token,
      },
    });
  } catch (e) {
    console.log(e);
  }
};

export const create_REFRESH_JWT = async (user: any, salt: string) => {
  try {
    await prisma.refresh_token.updateMany({
      where: {
        belongsToId: user.id,
      },
      data: {
        valid: false,
      },
    });

    const token = await jwt.sign(
      {
        id: user.id,
        name: user.name,
      },
      salt,
      { expiresIn: "2d" },
    );

    await prisma.refresh_token.create({
      data: {
        token: token,
        belongsToId: user.id,
      },
    });

    return token;
  } catch (e) {
    console.log(e);
  }
};

export const create_ACCESS_JWT = async (user: any, salt: string) => {
  const token = await jwt.sign(
    {
      id: user.id,
      name: user.name,
    },
    salt,
    { expiresIn: "1m" },
  );
  return token;
};
