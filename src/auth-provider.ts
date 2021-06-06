// auth-provider到底有什么用？
// 这个文件里，会定义一些函数，用来操控jwt的token  (对用户的token  进行增删改查~)
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
  window.localStorage.setItem(localStorageKey, user.token || ""); // 将用户的token 放在localStorage 里面
  return user;
};

const apiUrl = process.env.REACT_APP_API_URL;
export const login = (data: { username: string; password: string }) => {
  // 注意这里的fetch!! 这里和axios好像还真有点不一样呀！  这里的接口视频里没有直接给出。
  return fetch(`${apiUrl}/login`, {
    method: "POST",
    // 请求头，额外给请求头增加的数据。这是之前学过的~   POST 请求一定要指明请求头~？应该是这样的~
    headers: {
      "Content-Type": "application/json",
    },
    // JSON.stringify用于将 JavaScript 值转换为 JSON 字符串。   这个有什么用呢？
    body: JSON.stringify(data),
  }).then(
    // 这里的Response 是Promise成功后返回的数据！！
    async (response) => {
      if (response.ok) {
        // 因为是async函数返回的内容，所以返回的一定是Promise 实例
        return handleUserResponse(await response.json());
      } else {
        return Promise.reject(data);
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
      return Promise.reject(data); // 返回的是rejected 状态的Promise对象
    }
  });
};

// 清除指定键值对的值
export const logout = async () =>
  window.localStorage.removeItem(localStorageKey);
