export function warshall(n, graph) {
  const result = {}
  graph.forEach(({u, v}) => {
	if(u === null || v === null) return;
    if(!result[u]) result[u] = {}
    if(!result[v]) result[v] = {}
    result[u][v] = 1
  })
  const nodes = Object.keys(result)
  if(n < nodes.length) {
	throw new Error("节点数量异常")
  }
  for(const x of nodes)
    for(const y of nodes)
      if(!result[x][y]) result[x][y] = 0
  for(const k of nodes)
    for(const i of nodes)
      for(const j of nodes)
        result[i][j] = result[i][j] || (result[i][k] && result[k][j])
  let s = '{'
  for(const x of nodes)
    for(const y of nodes)
	  if(result[x][y])
	    s += `<${x},${y}>,`
  s += '}'
  return s
}