// auth-provider到底有什么用？
// 这个文件里，会定义一些函数，用来操控jwt的token
// auth 是个什么呢？
// 在真实环境中，如果使用firebase这种第三方auth服务的话，本文件不需要开发者开发

const localStorageKey = "__auth_provider_token__";

// 获取localStorage 里面的token数据？
export const getToken = () => window.localStorage.getItem(localStorageKey);
// 处理从服务端获取的token，放到localStorage里面
export const handleUserResponse = ({
  user,
}: {
  user: { id: string; name: string; token: string };
}) => {
  window.localStorage.setItem(localStorageKey, user.token || "");
  return user;
};

const apiUrl = process.env.REACT_APP_API_URL;
export const login = (data: { username: string; password: string }) => {
  // 注意这里的fetch!! 这里和axios好像还真有点不一样呀！  这里的接口视频里没有直接给出。
  return fetch(`${apiUrl}/login`, {
    method: "POST",
    // 请求头，额外给请求头增加的数据。这是之前学过的~
    headers: {
      // Content-type: 指定发送数据的格式~
      "Content-Type": "application/json",
    },
    // 请求体的知识，不太熟，要好好了解一下才行
    // JSON.stringify用于将 JavaScript 值转换为 JSON 字符串
    body: JSON.stringify(data),
  }).then(
    // 这里的Response 好奇怪呀！ 是怎么来的呢？
    async (response) => {
      if (response.ok) {
        // 获取到的数据就只有json吗？
        return handleUserResponse(await response.json());
      } else {
        return Promise.reject(data); // reject 接受data 是为什么呢？
      }
    }
  );
};

export const register = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      return handleUserResponse(await response.json());
    } else {
      return Promise.reject(data);
    }
  });
};

// 这些localStorage的操作要好好学学想想~
export const logout = async () =>
  window.localStorage.removeItem(localStorageKey);
