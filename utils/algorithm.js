export function warshall(graph) {
  const n = graph.length
  let result = [];
  result.push(graph.map(row => row.slice()));
  // Warshall 算法
  for(let k = 0; k < n; k++) {
	for(let i = 0; i < n; i++) {
	  for(let j = 0; j < n; j++) {
		graph[i][j] |= graph[i][k] * graph[k][j]
	  }
	}
	result.push(graph.map(row => row.slice()))
  }
  return result
}