import React from "react";

export interface User {
  id: string;
  name: string;
  token: string;
}

// SearchPanelProps 学习人家的命名规范~
interface SearchPanelProps {
  param: { name: string; personId: string };
  setParam: (param: SearchPanelProps["param"]) => void; // (hooks useState)set系列的ts类型
  users: User[];
}

export const SearchPanel: React.FC<SearchPanelProps> = ({
  param,
  setParam,
  users,
}) => {
  const changeHandle = (e: any) => {
    console.log("e", e.target.value);
    setParam({ ...param, personId: e.target.value });
  };
  return (
    <form>
      {/* onChange 事件~ 以及e.target */}
      <div>
        <input
          type="text"
          value={param.name}
          onChange={(e) => {
            // console.log('e.target', e.target);
            setParam({ ...param, name: e.target.value });
          }}
        />
        <select onChange={changeHandle}>
          <option value="">负责人</option>
          {users.map((user) => (
            <option value={user.id} key={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
};
