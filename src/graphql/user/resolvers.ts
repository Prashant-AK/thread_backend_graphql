import UserService, {
  CreateUserPayloadInterface,
  SignInPayloadInterface,
} from "../../services/user";

const queries = {
  hello: () => "Hello world",
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
