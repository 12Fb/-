
/**
 * 
 * @param {*} id 
 * @param {*} size 
 * @param {*} node 
 * @return {promise}
 */
export function promiseSelector(id, size = true, node = true) {
  console.log(id,'ID')
  return new Promise((resolve, reject) => {
    wx.createSelectorQuery()
      .select(id)
      .fields({ node: node, size: size })
      .exec((res) => {
        if (res[0]) resolve(res[0]);
        else reject(new Error("元素未找到"));
      });
  });
}
