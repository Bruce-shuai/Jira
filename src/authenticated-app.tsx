import { ProjectListScreen } from "./screens/project-list";
import { useAuth } from "context/auth-context";

// 已登录后的效果~
export const AuthenticatedApp = () => {
  const { logout } = useAuth();
  return (
    <div>
      {/* 用得好啊，这个代码逻辑~ */}
      <button onClick={logout}>登出</button>
      <ProjectListScreen />
    </div>
  );
};
