/**
 *
 * @param {*} id
 * @param {*} size
 * @param {*} node
 * @return {promise}
 */
export function promiseSelector(id, _this, size = true, node = true) {
  return new Promise((resolve, reject) => {
    _this
      .createSelectorQuery()
      .select(id)
      .fields({ node: node, size: size })
      .exec((res) => {
        if (res[0]) resolve(res[0]);
        else reject(new Error("元素未找到"));
      });
  });
}

export function pxRaterpx(num = 1) {
  // 获取设备屏幕宽度
  const systemInfo = wx.getWindowInfo();
  if (num === 1) return (systemInfo.screenWidth / 750).toFixed(4);
  else return (750 / systemInfo.screenWidth).toFixed(4);
}
