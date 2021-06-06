import { useAuth } from "./context/auth-context";
import "./App.css";
import { AuthenticatedApp } from "authenticated-app"; // 登录后的状态
import { UnauthenticatedApp } from "unauthenticated-app"; // 未登录的状态

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      {/* 秀啊~ */}
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </div>
  );
}

export default App;
