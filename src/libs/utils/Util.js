/* eslint-disable */
const Util = {
  findArrayItem: function (arr, fun, context) {
    const len = arr.length;
    for (let i = 0; i < len; i++) {
      const item = arr[i];
      if (fun.apply(context, [item, i]) === true) {
        return item;
      }
    }
    return undefined;
  },
  removeArrayItem: function (arr, fun, context) {
    const len = arr.length;
    for (let i = 0; i < len; i++) {
      const item = arr[i];
      if (fun.apply(context, [item, i]) === true) {
        arr.splice(i, 1);
        return item;
      }
    }
    return undefined;
  },
};
export default Util;
