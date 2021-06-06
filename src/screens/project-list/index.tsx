import { useState, useEffect } from "react";
import { List } from "./list";
import { SearchPanel } from "./serach-panel";
import { cleanObject, useDebounce } from "../../utils";
import * as qs from "qs";

const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
  // param应该是请求当前人物的参数~
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  // list 是当前列表数据？
  const [list, setList] = useState([]);
  // 列表里的所有人数
  const [users, setUsers] = useState([]);
  // 防抖接口~ 重要！！
  const debounceParam = useDebounce(param, 1000);
  // 获取项目当前列表的接口
  useEffect(() => {
    fetch(
      `${apiUrl}/projects?${qs.stringify(cleanObject(debounceParam))}`
    ).then(async (response) => {
      // response是上一个Promise实例数据执行成功后获得的数据
      if (response.ok) {
        console.log("请求发送成功");
        // ---------------------------------------------------
        // 此步骤用来测试response.json() 是不是Promis 对象，如果不是，其实就可以不用await
        console.log("response.json", response.json());
        // ---------------------------------------------------
        setList(await response.json()); // 因为要使用await 所以前面包裹了个async。 这里其实可以看做是 Promise.resolve(response.json())
        console.log("list: ", list); // 这里的数据其实就相当于then里面的回调函数了
      }
    });
    // setList(...list, )
  }, [debounceParam]);

  // 加载user数据  ---> 只会加载一次~
  useEffect(() => {
    fetch(`${apiUrl}/users`).then(async (response) => {
      if (response.ok) {
        setUsers(await response.json());
      }
    });
  }, []);

  return (
    <div>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List list={list} users={users} />
    </div>
  );
};
