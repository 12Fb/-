export function warshall(matrix) {
  let n = matrix.length
  let result = Array.from({length: n}, (_, i) => Array.from(matrix[i]))
  for(let k = 0; k < n; k++)
    for(let i = 0; i < n; i++)
      for(let j = 0; j < n; j++)
        result[i][j] = result[i][j] || (result[i][k] && result[k][j])
  return result
}