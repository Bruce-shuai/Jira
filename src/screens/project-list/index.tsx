// 函数组件~
import { useState, useEffect } from "react";
import { List } from "./list";
import { SearchPanel } from "./serach-panel";
import { cleanObject, useDebounce } from "../../utils";
import * as qs from "qs";

const apiUrl = process.env.REACT_APP_API_URL; // process.env
export const ProjectListScreen = () => {
  // 有点困惑这个param 到底是个什么呀~  应该是请求当前人物的参数~
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);
  // hooks底层原理似乎我在理解上有点问题。
  // debounceParam似乎不是只生成一次就完事的。可能会不断的生成新的debounceParam
  const debounceParam = useDebounce(param, 1000);
  // 获取项目列表的接口
  useEffect(() => {
    console.log("param: 我已有了改变", param);
    // 弱弱的想问一问，then 里面不应该是同步代码吗？那为什么要用 async 和 await呢？
    fetch(
      `${apiUrl}/projects?${qs.stringify(cleanObject(debounceParam))}`
    ).then(async (response) => {
      if (response.ok) {
        console.log("请求发送成功");
        setList(await response.json());
        console.log("list: ", list);
      }
    });
    // setList(...list, )
  }, [debounceParam]);

  useEffect(() => {
    fetch(`${apiUrl}/users`).then(async (response) => {
      if (response.ok) {
        // 这里的response.json() 有学问~ 有空看看fetch的官网讲解
        setUsers(await response.json());
      }
    });
  }, []);

  // useMount(
  //   () => {
  //     fetch(`${apiUrl}/users`).then(async response => {
  //     if (response.ok) {
  //       // 这里的response.json() 有学问~ 有空看看fetch的官网讲解
  //       setUsers(await response.json())
  //     }
  //     })
  //   }
  // )

  return (
    <div>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List list={list} users={users} />
    </div>
  );
};
