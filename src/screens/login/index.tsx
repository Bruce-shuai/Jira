import React, { FormEvent } from "react";

const apiUrl = process.env.REACT_APP_API_URL;
export const LoginScreen = () => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // 阻止表单提交的默认行为,这个可在MDN查查，现学现用
    // tm的这个有点专业呀！  as 有种强制类型的感觉
    const username = (event.currentTarget.elements[0] as HTMLInputElement)
      .value;
    const password = (event.currentTarget.elements[1] as HTMLInputElement)
      .value;
    // console.log('event', event.currentTarget.elements[0].value);
    login({ username, password });
  };

  const login = (param: { username: string; password: string }) => {
    // 注意这里的fetch!! 这里和axios好像还真有点不一样呀
    fetch(`${apiUrl}/login`, {
      method: "POST",
      // 请求头，额外给请求头增加的数据。这是之前学过的~
      headers: {
        // Content-type: 指定发送数据的格式~
        "Content-Type": "application/json",
      },
      // 请求体的知识，不太熟，要好好了解一下才行
      // JSON.stringify用于将 JavaScript 值转换为 JSON 字符串
      body: JSON.stringify(param),
    }).then(
      // 这里的Response 好奇怪呀！ 是怎么来的呢？
      async (response) => {
        if (response.ok) {
        }
      }
    );
  };
  // 登录事件  onSubmit
  return (
    <form onSubmit={handleSubmit}>
      <div>
        {/* 注意： 这里是htmlFor, 这里是没有采用antd的 */}
        {/* 注意人家的input和label搭配的方法 */}
        <label htmlFor="username">用户名</label>
        <input type="text" id={"username"} />
      </div>
      <div>
        <label htmlFor="password">密码</label>
        <input type="text" id={"password"} />
      </div>
      {/* 注意按钮：submit */}
      <button type={"submit"}>登录</button>
    </form>
  );
};
