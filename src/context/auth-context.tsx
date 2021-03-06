import React, { ReactNode, useState, useContext } from "react";
import { User } from "../screens/project-list/serach-panel";
// 这里的 * as auth 用得挺好的~
import * as auth from "../auth-provider";

interface AuthForm {
  username: string;
  password: string;
}

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

// 这里写得好，把AuthContext.Provider 封装成了一个AuthProvider 组件  这里的用法真的可以好好学学
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
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
  /**
   * useContext 效果：
   * 接受一个context对象，并返回该context的当前值
   * context的值是 AuthContext.Provider中value的值即：{user, login, register, logout}
   * 注意： 调用了 useContext 的组件总会在 context 值变化时重新渲染
   */
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth必须在AuthProvider中使用");
  }
  return context;
};
