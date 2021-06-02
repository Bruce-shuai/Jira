import { useState, useEffect } from "react";

export const isFalsy = (value) => (value === 0 ? true : !!value);

// 在一个函数里，改变传入的对象本身是不好的
export const cleanObject = (object) => {
  const result = { ...object };
  // 下面这一招也很厉害~ 遍历对象的属性~
  Object.keys(result).forEach((key) => {
    const value = result[key];
    // 这一步删掉属性很优秀啊~ 但是要排除value = 0 的情况
    if (!isFalsy(value)) {
      delete result[key];
    }
  });
  return result;
};

// 自定义useDebounce
// 防抖函数的奥义,利用了闭包~
// const debounce = (func, delay) => {
//   let timeout;
//   return () => {
//     if (timeout) {
//       clearTimeout(timeout);
//     }
//     timeout = setTimeout(function() {
//       func();
//     }, delay);
//   }
// }

export const useDebounce = (value, delay) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      return setDebounceValue(value);
    }, delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);
  return debounceValue;
  // let timeout;
  // return () => {
  //   if (timeout) {
  //     clearTimeout(timeout)
  //   }
  //   timeout = setTimeout(() => param, delay)
  // }
};
