import { useAuth } from "context/auth-context";
import React from "react";

const apiUrl = process.env.REACT_APP_API_URL;
export const RegisterScreen = () => {
  const { register, user } = useAuth();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault(); // 阻止表单提交的默认行为,这个可在MDN查查，现学现用
    // tm的这个有点专业呀！要记记  as 有种强制类型的感觉
    const username = (event.currentTarget.elements[0] as HTMLInputElement)
      .value;
    const password = (event.currentTarget.elements[1] as HTMLInputElement)
      .value;
    // console.log('event', event.currentTarget.elements[0].value);
    register({ username, password }); // 一个函数组件内部也是可以函数函数与函数之间组合或者嵌套的~
  };

  // const login = (param: { username: string; password: string }) => {};
  return (
    // 登录事件  onSubmit  这个感觉还是挺有意思的~
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">用户名</label>
        <input type="text" id={"username"} />
      </div>
      <div>
        <label htmlFor="password">密码</label>
        <input type="text" id={"password"} />
      </div>
      {/* 注意按钮：submit */}
      <button type={"submit"}>注册</button>
    </form>
  );
};
