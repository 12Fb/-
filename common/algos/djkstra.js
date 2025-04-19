//迪杰斯特拉
const djkstra = (arr, start, end) => {
  //初始化一个distance
  let dis = {};
  let unVisitNode = new Set();
  for (let key in arr) {
    unVisitNode.add(key); // 添加顶层键
    for (let neighbor in arr[key]) {
      unVisitNode.add(neighbor); // 添加邻接节点
    }
  }
  //未被访问的节点

  unVisitNode = Array.from(unVisitNode); //值为-1表示已经访问过
  let count = 0;
  //记录前驱节点
  let prev = {};
  dis[start] = 0;
  unVisitNode[start] = -1;
  count++;
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
      if (!dis[node] || dis[node] > cost + dis[cur]) {
        dis[node] = cost + dis[cur];
        prev[node] = cur;
      }
    }
    let minNode = findMin(dis); //找到下一个节点
    cur = minNode;
    unVisitNode[minNode] = -1;
    count++;
  }
  //构建path
  let node = end;
  let path = [node];
  while (node != start) {
    path.unshift(prev[node]);
    node = prev[node];
  }
  return { ans: dis[end], path: path.map((v) => String(v)) };
};
const steps = ['图','起始点和终点','寻找最短路径','得到最短路径']
export  default djkstra