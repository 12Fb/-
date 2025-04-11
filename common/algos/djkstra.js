const djkstra = (arr, start, end) => {
  //初始化一个distance
  let dis = {};
  //未被访问的节点
  let unVisitNode = [0, 1, 2, 3, 4, 5, 6]; //值为-1表示已经访问过
  let count = 0;
  //记录过程
  let path = [];
  const init = () => {
    dis[start] = 0;
    const obj = {};
    obj[start] = 0;
    path.push(obj);
    unVisitNode[start] = -1;
    count++;
  };
  init();
  //
  const findMin = (ar) => {
    let minNode;
    let min = Infinity;
    for (let index in ar) {
      let val = ar[index];
      if (val < min && unVisitNode[index] !== -1) {
        min = val;
        minNode = index;
      } else if (val === min) {
      }
    }
    return minNode;
  };
  let cur = start;
  while (count !== unVisitNode.length) {
    let nextArr = arr[cur];
    for (let node in nextArr) {
      // 遍历当前节点的邻接节点计算距离
      let cost = nextArr[node];
      if (!dis[node] || dis[node] > cost + dis[cur]) dis[node] = cost + dis[cur];
    }
    let minNode = findMin(dis);
    cur = minNode;
    unVisitNode[minNode] = -1;
    const obj = {};
    obj[cur] = dis[cur];
    path.push(obj);
    count++;
  }
  // console.log(path);
  const re = path.find((val, index) => {
    return val[end] !== undefined;
  });
  return re[end];
};
export default djkstra