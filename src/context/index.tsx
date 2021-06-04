import { ReactNode } from "react";
import { AuthProvider } from "./auth-context";

// ReactNode
export const AppProviders = ({ children }: { children: ReactNode }) => {
  // children 用法是很厉害的
  return <AuthProvider>{children}</AuthProvider>;
};
