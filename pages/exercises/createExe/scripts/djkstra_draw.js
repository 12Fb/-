function  draw(algoName = 'djkstra',instance){ //返回一个函数数组
  const {algo,steps} = require(`../../../../common/algos/${algoName}`)
  let re = null
  //["图", "起始点和终点", "寻找最短路径", "得到最短路径"]
  function s1(gra){ 
    instance.Draw_Undirected_Graph(gra)
  }
  function s2 (start,end){
    draw.mark(start)
    draw.mark(end)
  }
  function s3 (gra,start,end){
    const {path,ans} =  algo(gra,start,end)
    re = ans
    if(path && path.length >1){
      for(let i=1; i < path.length;i++){
        const edge = draw.getEdgeName(path[i-1],path[i])
        draw.mark(edge)
      }
    }
    return {path,ans}
  }
  function s4(){
    return re
  }
  return {steps,funs:[s1,s2,s3,s4]} //返回算法的步骤和对应的绘画函数
}
export default draw
