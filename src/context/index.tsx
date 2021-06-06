import { ReactNode } from "react";
import { AuthProvider } from "./auth-context";

// ReactNode 这个点很重要~
// 这里的解构运算符好像在类型定义这个版块有点奇怪  为什么不能直接写成({children: ReactNode}) ??
export const AppProviders = ({ children }: { children: ReactNode }) => {
  // 这里多层组件 + children 就玩得很六啊~
  return <AuthProvider>{children}</AuthProvider>;
};
