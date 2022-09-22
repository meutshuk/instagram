// create context for user
import { createContext } from "react";

type UserContextType = {
  user: any;
  username: any;
};
export const UserContext = createContext<UserContextType>({
  user: null,
  username: null,
});
