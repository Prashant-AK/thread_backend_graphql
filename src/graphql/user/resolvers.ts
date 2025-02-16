import UserService, {
  CreateUserPayloadInterface,
  SignInPayloadInterface,
} from "../../services/user";

export interface Context {
  user: any; // Replace 'any' with the appropriate user type if available
}

const queries = {
  getCurrentLoggedInUser: async (_: any, parameter: any, context: Context) => {
    if (!context.user) {
      throw new Error("Unauthorized");
    }
    const res = await UserService.getUserById(context.user.id);
    return res;
  },
};

const mutations = {
  createUser: async (_: any, payload: CreateUserPayloadInterface) => {
    try {
      const res = await UserService.createUser(payload);
      return res;
    } catch (error) {
      console.error(error);
      throw new Error("Error creating user");
    }
  },
  signIn: async (_: any, payload: SignInPayloadInterface) => {
    const res = await UserService.signIn(payload);
    return res;
  },
};

export const resolvers = {
  queries,
  mutations,
};
