import qs from "qs";

const apiUrl = process.env.REACT_APP_API_URL;
interface Config extends RequestInit {
  // RequestInit 是从哪儿来的呢？
  data?: string;
  token?: object;
}
export const http = async (
  endpoint: string,
  { data, token, headers, ...customConfig }: Config
) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
    },
    ...customConfig, // 后面的值 可能会覆盖前面的值
  };
  if (config.method.toUpperCase === "GET") {
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }

  return window
    .fetch(`${apiUrl}/${endpoint}`, config) // 这个window操作要好好学学~
    .then(async (response) => {
      if (response.status === 401) {
      }
    });
};
