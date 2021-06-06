import React from "react";
import { User } from "./serach-panel";
interface List {
  id: string;
  name: string;
  personId: string;
  organization: string;
  create: number;
}
interface ListProps {
  list: List[];
  users: User[];
}

export const List: React.FC<ListProps> = ({ list, users }) => {
  // thead 和 tbody 用起来非常显示语义化啊~不错不错~
  return (
    <table>
      <thead>
        <tr>
          <th>名称</th>
          <th>负责人</th>
        </tr>
      </thead>
      <tbody>
        {list.map((info) => (
          <tr key={info.id}>
            <td>{info.name}</td>
            {/* 这里的?. 是为了防止find 结果是undefined系统报错 */}
            <td>
              {users.find((user) => user.id === info.personId)?.name || "未知"}
            </td>
            {/* 下面是过时的用法 */}
            {/* {
            users.map((user) => {
              if (user.id === info.personId) {
                return <td>{user.name}</td>
              }
            })
          } */}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
