import encryptPassword from "@/utils/encryptPassword";
import client, { HttpRequest, NCBError } from "@/utils/client";
import Membership from "./routes";
import { AllInOneDataProps, LoginDataProps, LoginReqProps } from "./types";
import membershipErrorCodes, {
  AllInOneErrorCode,
  Category,
  LoginErrorCode,
} from "./errorCode";

type Login = HttpRequest<LoginReqProps, LoginDataProps, LoginErrorCode>;

export const login: Login = options => {
  const originPassword = options.params?.passwd;

  const encryptedPassword =
    typeof originPassword === "string" ? encryptPassword(originPassword) : "";

  return client.post<LoginReqProps>(Membership.Login, {
    ...options,
    params: {
      ...options.params!,
      passwd: encryptedPassword,
    },
  });
};

type Logout = HttpRequest;

export const logout: Logout = options =>
  client.post(Membership.Logout, options);

type AllInOne = HttpRequest<undefined, AllInOneDataProps, AllInOneErrorCode>;

export const allInOne: AllInOne = options =>
  client.post(Membership.AllInOne, options);

export const errorHandler = (
  error: NCBError<AllInOneErrorCode | LoginErrorCode, Category>,
) => {
  const { errorCode, errorCategory } = error;

  const category = membershipErrorCodes[errorCategory];

  const transformedError = category[errorCode];

  return transformedError;
};
