import { createHmac, randomBytes } from "node:crypto";
import prismaClient from "../lib/db";
import Jwt from "jsonwebtoken";

export interface CreateUserPayloadInterface {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  salt?: string;
  phoneNumber: string;
}
export interface SignInPayloadInterface {
  email: string;
  password: string;
}

class UserService {
  private static getUserByEmail(email: string) {
    return prismaClient.user.findUnique({
      where: {
        email,
      },
      // select: {
      //   id: true,
      //   email: true,
      //   firstName: true,
      //   lastName: true,
      //   salt: true,
      //   password: true,
      //    phoneNumber:true
      // },
    });
  }

  private static generateHash(salt: string, password: string) {
    return createHmac("sha256", salt).update(password).digest("hex");
  }

  public static async createUser(payload: CreateUserPayloadInterface) {
    const { firstName, lastName, email, password, phoneNumber } = payload;
    const salt = randomBytes(32).toString("hex");
    const hashPassword = UserService.generateHash(salt, password);

    try {
      const user = await prismaClient.user.create({
        data: {
          email,
          firstName,
          lastName,
          salt,
          phoneNumber,
          password: hashPassword,
        },
      });
      return user;
    } catch (error) {
      console.error("Error creating user:", error);
      throw new Error("User creation failed");
    }
  }

  public static async signIn(payload: SignInPayloadInterface) {
    const { email, password } = payload;
    const user = await UserService.getUserByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }

    const hashPassword = UserService.generateHash(user?.salt, password);

    if (hashPassword !== user.password) {
      throw new Error("Invalid email & password");
    }

    const token = Jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET ? process.env.JWT_SECRET : "secret",
      {
        expiresIn: "1d",
      }
    );

    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      token,
    };
  }
}

export default UserService;
