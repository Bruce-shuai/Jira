import { useState, useEffect } from 'react'

export const SearchPanel = ({param, setParam, users}) => {
  const changeHandle = (e) => {
    console.log('e', e.target.value);
    setParam({...param, personId: e.target.value})
  }
  return <form>
    {/* onChange 事件~ 以及e.target */}
    <div>
      <input type="text" value={param.name} onChange={(e) => {
        // console.log('e.target', e.target);
        setParam({...param, name: e.target.value})
      }} />
      <select onChange={changeHandle}>
        <option value="">负责人</option>
        {
          users.map((user) => <option 
            value={user.id} 
            key={user.id} 
          >
            {user.name}
          </option>)
        }
      </select>
    </div>
  </form>
}