import { createContext, useReducer, PropsWithChildren, Dispatch } from 'react'

export interface AuthUser {
    token : string,
    isAuthenticated?: boolean,
    username: string,
    id: number
}

export interface Action {
    type: string,
    payload: AuthUser
}

const defaultValue : AuthUser = {
    token: '',
    isAuthenticated: false,
    username: '',
    id: -1
}

const userReducer = (state:AuthUser = defaultValue,  action: Action) : AuthUser => {
  switch (action.type) {
    case "LOG_IN":
        return {...action.payload, isAuthenticated: true }
    case "LOG_OUT":
        return defaultValue;
    default:
        return state;
  }
}

const UserContext = createContext<(AuthUser | Dispatch<Action>)[] | null>(null);


export const UserContextProvider = (props : PropsWithChildren) => {

    const [user, userDispatch] = useReducer(userReducer, defaultValue);

    return <UserContext.Provider value={[user, userDispatch]}>
      {props.children}
    </UserContext.Provider>
  
}

export default UserContext;

