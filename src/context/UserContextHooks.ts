import { useContext } from "react";
import UserContext, { Action, AuthUser } from "./UserContext";
export const useUserValue = () => {
  const userAndDispatch = useContext(UserContext) as (
    | AuthUser
    | React.Dispatch<Action>
  )[];
  return userAndDispatch[0] as AuthUser;
};

export const useAuthDispatch = () => {
  const userAndDispatch = useContext(UserContext) as (
    | AuthUser
    | React.Dispatch<Action>
  )[];

  return userAndDispatch[1] as React.Dispatch<Action>;
};
