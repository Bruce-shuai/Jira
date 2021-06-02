import { useState, useEffect } from "react";

export const isFalsy = (value: any) => (value === 0 ? true : !!value);

// 在一个函数里，改变传入的对象本身是不好的  还有object类型
export const cleanObject = (object: object) => {
  const result = { ...object };
  // 下面这一招也很厉害~ 遍历对象的属性~
  Object.keys(result).forEach((key) => {
    // @ts-ignore
    const value = result[key];
    // 这一步删掉属性很优秀啊~ 但是要排除value = 0 的情况
    if (!isFalsy(value)) {
      // @ts-ignore
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

export const useDebounce = (value: any, delay?: number) => {
  // react官网： useState(state) React会在重复渲染时保留这个 state
  // react官网：一般来说，在函数退出后变量就会”消失”，而 state 中的变量会被 React 保留。!!
  // react官网：使用的useEffect已经保存在函数作用域中。Hook 使用了 JavaScript 的闭包机制
  // useState(value)，这里的value，只有在最开始赋初值的时候有效果！
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      return setDebounceValue(value);
    }, delay);
    return () => clearTimeout(timeout); // 注意： 定时器使用后，必须要删除掉才行~
  }, [value, delay]); // 这里的 delay 有什么用呢？
  return debounceValue; // 如果在输入框输入的数据太快，返回的还是以前的数据，没有发生改变。
};
