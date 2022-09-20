export namespace API {
  export interface LoginParams {
    username: "string";
    password: "string";
  }
  export type Login = (params: LoginParams) => Promise<any>;
}

export const params: API.LoginParams = {
  username: "string",
  password: "string",
};
