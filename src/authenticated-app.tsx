import { ProjectListScreen } from "./screens/project-list";
import { useAuth } from "context/auth-context";

// 已登录后的效果~
export const AuthenticatedApp = () => {
  const { logout } = useAuth();
  return (
    <div>
      {/* 我艹，感觉这个方法似乎还可以~ */}
      <button onClick={logout}>登出</button>
      <ProjectListScreen />
    </div>
  );
};
