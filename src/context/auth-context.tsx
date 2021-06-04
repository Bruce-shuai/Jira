import React, { ReactNode, useState, useContext } from "react";
import { User } from "../screens/project-list/serach-panel";
// 这里的 * as auth 用得挺好的~
import * as auth from "../auth-provider";

interface AuthForm {
  username: string;
  password: string;
}

// 这里说明了 user, register，login, logout 是可以全局使用的吗？
const AuthContext =
  React.createContext<
    | {
        user: User | null;
        register: (form: AuthForm) => Promise<void>; // 这个类型加<void>是为什么呢？
        login: (form: AuthForm) => Promise<void>;
        logout: () => Promise<void>;
      }
    | undefined
  >(undefined); // 创建一个Context
AuthContext.displayName = "AuthContext"; // 这个主要是用在devtools里面

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  // 这里的.then 操作还是不懂啊~
  const login = (form: AuthForm) =>
    auth.login(form).then((user) => setUser(user));
  const register = (form: AuthForm) =>
    auth.register(form).then((user) => setUser(user));
  const logout = () => auth.logout().then(() => setUser(null));

  // 这里是将AuthContext.Provider 封装为一个组件，名字叫做AuthProvider
  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout }}
    />
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth必须在AuthProvider中使用");
  }
  return context;
};
