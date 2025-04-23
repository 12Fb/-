class Draw {
  canvas = null;
  ctx = null;
  dpr = null;
  height = null; //实际高
  width = null; //实际宽
  canvasId = '';
  elements = {};
  waiting = null;
  nameIndex = 0;
  angles = [45, -45, 0, -180, -270, -225];
  touchstart = false;
  touchedNode = '';
  lineWidth = 2;
  background = '#ddebf1';
  count = 1;
  lastCount = 0;
  oldTime = null;
  frame = 16;
  curFrame = null;
  curMarkEle = '';
  hiddenEles={};
  curMarkEles=[];
  imageDatas = [];
  cache_Elements = [];
  //
  constructor(canvasId, instance = null) {
    if (!canvasId || !instance) return;
    this.waiting = () => Promise.allSettled([this.init(canvasId, instance)]);
  }
  init(canvasId, instance) {
    return new Promise((resolve, reject) => {
      this.canvasId = canvasId;
      const query = instance.createSelectorQuery();
      query.select(`#${canvasId}`).fields({
        node: true,
        size: true,
      });
      query.select(`#${canvasId}`).boundingClientRect();
      query.exec((res) => {
        let canvas = res[0].node;
        let ctx = canvas.getContext('2d');
        const width = res[0].width;
        const height = res[0].height;
        const dpr = wx.getWindowInfo().pixelRatio;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);
        this.canvas = canvas;
        this.ctx = ctx;
        this.ctx.lineWidth = this.lineWidth;
        this.width = width;
        this.height = height;
        this.dpr = dpr;
        resolve();
      });
    });
  }
  set(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
  }
  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }
  clean(clean_cache=true){
    this.elements = {};
    if(clean_cache) this.cache_Elements = []
  }
  deepCopy(obj = {}) {
    const map = new Map();
    let temp = Array.isArray(obj) ? [] : {};
    for (let key in obj) {
      if (map.get(key)) temp[key] = map.get(key);
      else {
        if (obj[key] instanceof Object) {
          if(obj[key].toString() === "[object Path2D]"){
            const path = this.canvas.createPath2D(obj[key])
            temp[key] = path
          }
          else {

            temp[key] = this.deepCopy(obj[key]);
            map.set(key, temp[key]);
          }
        } else {
          temp[key] = obj[key];
          map.set(key, obj[key]);
        }
      }
    }
    return temp;
  }
  newName(_name = undefined) {
    if (_name) return _name;
    if (this.nameIndex >= 26) console.error('名字已经用完了');
    let name = String.fromCharCode(65 + this.nameIndex);
    this.nameIndex++;
    return name;
  }
  //监听画板事件
  onTouchStart(x, y,mark =true) {
    for (let key in this.elements) {
      if (this.elements[key].type === 'edge') continue;
      if (this.isPointInPath(x, y, key)) {
        if(mark){
          this.unMarkEle();
          this.markEle(key);
        }
        this.touchedNode = key;
        this.touchstart = true;
        if (key[0] === '_') {
        const {value} = this.elements[key]
          return {
            type: 'edge',
            name: key.substring(1),
            ori_name:key,
            value
          };
        } else {
          return {
            type: 'node',
            name: key,
            ori_name:key,
          };
        }
      }
    }
    return {};
  }
  onTouchMove(x, y) {
    // if(this.oldTime !== null && Date.now() - this.oldTime < this.frame ) return;
    if (!this.touchstart) return;
    const touchedNode = this.elements[this.touchedNode];
    let collision = this.collisionDetect(x, y, touchedNode) && !this.isPointOut(x, y, touchedNode.r);
    if (!collision) {
      return this.touchedNode;
    }
    // count = lastcount 说明上一个动画还没渲染完
    // if (this.lastCount == this.count) {
    //   this.canvas.cancelAnimationFrame(this.curFrame);
    //   this.count++;
    //   return;
    // }
    this.lastCount = this.count;

    let animation = () => {
      //删除旧的
      const clipOld = () => {
        this.ClipbyName(this.touchedNode);
        for (let edge in touchedNode.relatedEdges) {
          const { textPath } = this.elements[edge];
          this.ClipbyPath(textPath);
          this.ClipbyName(edge);
        }
      };
      // 创建新的
      const create = () => {
        const { args, path } = this.elements[this.touchedNode];
        args[0] = x;
        args[1] = y;
        const curNode = this.cNode(...args);

        for (let edge in touchedNode.relatedEdges) {
          let { value, node2, node1 } = this.elements[edge];
          this.elements[edge] = undefined;
          if (curNode.name === node1.name) {
            this.cEdge(curNode, node2, value);
          } else {
            this.cEdge(node1, curNode, value);
          }
        }
      };
      clipOld();
      create();
    };
    this.curFrame = this.canvas.requestAnimationFrame(animation);
    return this.touchedNode;
  }
  onTouchEnd() {
    this.touchstart = false;
    this.touchedNode = null;
  }
  getEdgeName(node1Name, node2Name) {
    const name1 = '_' + node1Name + node2Name;
    const name2 = '_' + node2Name + node1Name;
    if (this.elements[name1]) return this.elements[name1].name;
    if (this.elements[name2]) return this.elements[name2].name;
    return undefined;
  }
  findEle(x, y) {
    let _ele = null;
    //找
    for (let ele in this.elements) {
      if (this.isPointInPath(x, y, ele)) {
        _ele = this.elements[ele];
        break;
      }
    }
    return _ele;
  }
  save() {
    const imageData = this.ctx.getImageData(0, 0, this.width * 3, this.height * 3);
    this.imageDatas.unshift(imageData);
    this.curMarkEles.unshift(this.curMarkEle)
    this.cache_Elements.unshift(this.deepCopy(this.elements));
  }
  getImageData(){
    const imageData = this.ctx.getImageData(0, 0, this.width * 3, this.height * 3);
    return imageData
  }
  putImageData(imageData){
    this.ctx.putImageData(imageData, 0, 0);
  }
  back() {
    const curMarkEle = this.curMarkEles.shift()
    const imageData = this.imageDatas.shift();
    const elements = this.cache_Elements.shift();
    if (imageData && elements ) {
      this.elements = elements;
      this.ctx.putImageData(imageData, 0, 0);
      this.curMarkEle = curMarkEle
      delete this.hiddenEles[curMarkEle]
    }
  }
  clip(){   //不会擦除相关元素
    if (!this.curMarkEle) return;
    const name = this.curMarkEle
    this.save()
    this.curMarkEle = ''
    this.ClipbyName(name)
    if(name[0] =='_'){
      const {relatedEdge} = this.elements[name]
      this.ClipbyName(relatedEdge)
      this.hiddenEles[name] =1
      this.hiddenEles[relatedEdge] =1
      return name.substring(1)
    }
    this.hiddenEles[name] =1
    return name
  }
  del() { // 会删除相关元素 
    const _ele = this.elements[this.curMarkEle];
    if (!_ele) return;
    //删除相关元素
    this.save();
    this.curMarkEle = ''
    if (_ele.type === 'node')return this.delNode(_ele);
    else return  this.delEdge(_ele);
  }

  delEdge(edge = {}) {
    //删除数据以及图像
    const { name, textPath, path, node1, node2,textName } = edge;
    this.ClipbyPath(textPath);
    this.ClipbyPath(path);
    //删除数据层面
    delete node1.relatedEdges[name];
    delete node2.relatedEdges[name];
    delete this.elements[textName]
    delete this.elements[name]
    return textName.substring(1)
  }
  delNode(node = {}) {
    const { name, path } = node;
    if (name[0] === '_') {
      const { relatedEdge } = node;
      delEle = relatedEdge
      this.delEdge(this.elements[relatedEdge]);
      delete this.elements[name];
    } else {
      const { relatedEdges } = node;
      this.ClipbyName(name);
      for (const edge in relatedEdges) {
        this.delEdge(this.elements[edge]);
      }
    }
    delete this.elements[name];
  }
  //高亮标记一个元素
  markEle(eleName = '', strokeStyle = '#22c32e') {
    //只有点会被选中
    const ele = this.elements[eleName];
    const { name, path, value } = ele;
    if (name === this.markEle) return;
    //代表边的点
    if (name[0] === '_') {
      const { relatedEdge } = ele;
      this.modifityEdge(relatedEdge, strokeStyle);
    } else {
      //普通的点
      const { x, y, r, color, path, lineWidth, name } = ele;
      path.arc(x, y, r, 0, Math.PI * 2);
      this.ctx.save();
      this.ctx.strokeStyle = strokeStyle;
      this.ctx.lineWidth = lineWidth;
      this.ctx.stroke(path);
      this.fillText(x, y, name, r * 1.1);
      this.ctx.restore();
    }
    this.curMarkEle = name;
  }
  unMarkEle() {
    const ele = this.elements[this.curMarkEle];
    if (!ele) return;
    const { name, path, value } = ele;
    if (name === this.markEle) return;
    //代表边的点
    if (name[0] === '_') {
      const { relatedEdge } = ele;
      this.modifityEdge(relatedEdge);
    } else {
      //普通的点
      const { x, y, r, color, path, strokeStyle, lineWidth, name } = ele;
      path.arc(x, y, r, 0, Math.PI * 2);
      this.ctx.save();
      this.ctx.strokeStyle = strokeStyle;
      this.ctx.lineWidth = lineWidth;
      this.ctx.stroke(path);
      this.fillText(x, y, name, r * 1.1);
      this.ctx.restore();
    }
    this.curMarkEle = '';
  }
  ClipbyPath(path) {
    if (!path) return;
    this.ctx.save();
    this.ctx.lineWidth = this.lineWidth + 1;
    this.ctx.strokeStyle = this.background;
    this.ctx.stroke(path);
    this.ctx.clip(path);
    this.clear();
    this.ctx.restore();
  }
  ClipbyName(name) {
    const { path } = this.elements[name];
    this.ctx.save();
    this.ctx.lineWidth = this.lineWidth + 1;
    this.ctx.strokeStyle = this.background;
    this.ctx.stroke(path);
    this.ctx.clip(path);
    this.clear();
    this.ctx.restore();
  }
  fillText(x, y, value, fontSize, fontWeight = 500, radio = 1, color = 'black') {
    this.ctx.save();
    this.ctx.font = `${fontWeight} ${fontSize}px Arial`;
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    let maxWidth = this.ctx.measureText(value).width * radio;
    this.ctx.fillText(value, x, y, maxWidth);
    this.ctx.restore();
  }
  getTextPath(x, y, value, fontSize, fontWeight = 500, radio = 1, color = 'black') {
    this.ctx.save();
    this.ctx.font = `${fontWeight} ${fontSize}px Arial`;
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    let maxWidth = this.ctx.measureText(value).width * radio;
    const path = this.canvas.createPath2D(); // text的外围图形
    path.arc(x, y, maxWidth / 1.3, 0, Math.PI * 2); //1.3这个数字没有经过计算
    this.ctx.restore();
    return {
      path: path,
      r: maxWidth / 1.3,
    };
  }
  //  获取一个图形的边界像素信息
  getOccupiedPixels(name) {
    if (!this.elements[name].path) return;
    const { path } = this.elements[name];
    this.ctx.stroke(path);
    this.hid_ctx.stroke(path);

    const { data } = this.hid_ctx.getImageData(0, 0, this.width, this.height);
    let count = 0;
    data.forEach((item) => {
      if (item !== 0) count++;
    });
    const ver_cord = {};
    const hor_cord = {};

    //模拟竖线从左到右遍历, y = width *i + x
    for (let i = 0; i < this.width; i++) {
      let x = i;
      let min = Infinity,
        max = -1;
      for (let j = 0; j < this.height; j++) {
        let y = this.width * j;
        let xy = (y + x) * 4;
        if (data[xy + 3] !== 0) {
          //rgba中的a一定不为0
          min = min > y ? y : min;
          max = max < y ? y : max;
        }
      }
      if (min !== Infinity && max !== -1) {
        ver_cord[x / 3] = {
          min: min / this.dpr / this.width,
          max: max / this.dpr / this.width,
        };
      }
    }
    //模拟横线从上至下遍历
    for (let i = 0; i < this.height; i++) {
      let y = i * this.width;
      let min = Infinity,
        max = -1;
      for (let j = 0; j < this.width; j++) {
        let x = j;
        let xy = (x + y) * 4;
        if (data[xy + 3] !== 0) {
          min = min > x ? x : min;
          max = max < x ? x : max;
        }
      }
      if (min !== Infinity && max !== -1) {
        hor_cord[y / 3 / this.width] = {
          min: min / this.dpr,
          max: max / this.dpr,
        };
      }
    }
    // console.log('hor_cord:',Object.keys(hor_cord).length, hor_cord);
  }
  //判断一个坐标是否在某个图形
  isPointInPath(x, y, name) {
    const { path } = this.elements[name];
    if (!path || this.hiddenEles[name]) return false;
    let re = this.ctx.isPointInPath(path, x * this.dpr, y * this.dpr);
    return re;
  }
  modifyNode(name, newAttr = {}) {
    // todo
  }

  cNode(x = 100, y = 100, size = 10, name = null, color = '#4c88fe') {
    let _name = name;
    const path = this.canvas.createPath2D();
    const draw = () => {
      path.arc(x, y, size, 0, Math.PI * 2);
      this.ctx.save();
      this.ctx.strokeStyle = color;
      this.ctx.lineWidth = this.lineWidth;
      this.ctx.stroke(path);
      this.fillText(x, y, _name, size * 1.1);
      this.ctx.restore();
    };
    draw();
    let node = {
      args: Array.from(arguments),
      x: x,
      y: y,
      r: size,
      strokeStyle: color,
      lineWidth: this.lineWidth,
      type: 'node',
      name: _name,
      relatedEdges: {},
      relatedNodes: {},
      angles: [],
      path: path,
    };

    this.elements[node.name] = node;

    return {
      ...node,
    };
  }
  cNode_Ab(x = 100, y = 100, size = 10, name, value,relatedEdge, color = '#4c88fe', ) {
    const path = this.canvas.createPath2D();
    path.arc(x, y, size, 0, Math.PI * 2);
    let _name = name;
    const node = {
      args: Array.from(arguments),
      x: x,
      y: y,
      r: size,
      type: 'node',
      name: _name,
      relatedEdge: relatedEdge,
      relatedNodes: {},
      angles: [],
      path: path,
      value
    };
    this.elements[node.name] = node;
    return node;
  }
  modifityEdge(edgeName, strokeStyle = '') {
    const edge = this.elements[edgeName];
    const { path, textPath, textX, textY, textR, value } = edge;
    this.ctx.save();
    if (strokeStyle) this.ctx.strokeStyle = strokeStyle;
    this.ctx.stroke(path); //画边
    this.ClipbyPath(textPath);
    this.fillText(textX, textY, value, this.lineWidth * 8, 900, 0.8);
    this.ctx.restore();
  }
  hideEdgeValue(name){
    // console.log(this.elements[name])
    if(!this.elements[name]) return undefined
    const {path} = this.elements[name]
    this.ClipbyPath(path);
  }
  cEdge(node1, node2, value = 'null', color = 'rgba(0,0,0)', lineWidth = 2) {
    const { x: x1, y: y1, r: r1 } = node1;
    const { x: x2, y: y2, r: r2 } = node2;
    const path = this.canvas.createPath2D();
    this.ctx.save();
    this.ctx.lineWidth = lineWidth;
    this.ctx.strokeStyle = color;
    //不能直接画到圆心，所以要计算两个新的点
    let h = Math.abs(x1 - x2); //水平差
    let v = Math.abs(y1 - y2); //垂直差
    //
    let angle = Math.atan(v / h);
    //默认第一个左下角，第二个右上角
    let flagX = x1 <= x2 ? 1 : -1;
    let flagY = y1 >= y2 ? 1 : -1;
    this.ctx.beginPath();
    let startX = x1 + (r1 + this.lineWidth / 2) * Math.cos(angle) * flagX;
    let startY = y1 - (r1 + this.lineWidth / 2) * Math.sin(angle) * flagY;
    let endX = x2 - (r2 + this.lineWidth / 2) * Math.cos(angle) * flagX;
    let endY = y2 + (r2 + this.lineWidth / 2) * Math.sin(angle) * flagY;
    path.moveTo(startX, startY);
    path.lineTo(endX, endY);
    this.ctx.stroke(path);
    this.ctx.restore();
    //画边和中间点
    const { name: name1 } = node1;
    const { name: name2 } = node2;
    const edgeName = name1 + 'edge' + name2;
    const textX = (startX + endX) / 2;
    const textY = (startY + endY) / 2;
    const { path: textPath, r: textR } = this.getTextPath(
      textX,
      textY,
      value,
      this.lineWidth * 8,
      900,
      0.8,
    );
    this.ClipbyPath(textPath);
    this.fillText(textX, textY, value, this.lineWidth * 8, 900, 0.8);
    const abNode = '_' + node1.name + node2.name;
    this.cNode_Ab(textX, textY, textR,abNode,value,edgeName);
    let x, y;
    let edge = {
      node1: node1,
      node2: node2,
      textX: textX,
      textY: textY,
      textR: textR,
      textName:abNode,
      lineWidth: lineWidth,
      color: color,
      type: 'edge',
      name: edgeName,
      value: value,
      path: path,
      textPath: textPath,
    };
    this.elements[edge.name] = edge;
    this.elements[name1].relatedEdges[edgeName] = 1;
    this.elements[name2].relatedEdges[edgeName] = 1;
    this.elements[name1].relatedNodes[abNode] = 1;
    this.elements[name2].relatedNodes[abNode] = 1;

    return edge;
  }
  //获取高
  getHeight() {
    //逻辑高
    return this.height;
  }
  getWidth() {
    //逻辑宽
    return this.width;
  }
  getDpr(){
    return this.dpr
  }
  //平均点半径, 平均边长/6
  avg_r_point(nums) {
    return this.avg_len_edge(nums) / 6;
  }
  // 平均边长:  最大宽 / 点的个数
  avg_len_edge(nums) {
    return Math.floor((this.width / nums) * 2);
  }
  //判断点是否出界
  isPointOut(x, y, r) {
    const r1 = r + this.lineWidth;
    const toLeftBoard = Math.ceil(x - r1);
    const toRightBoard = Math.ceil(x + r1);
    const toUpBoard = Math.ceil(y - r1);
    const toBottomBoard = Math.ceil(y + r1);
    if (toLeftBoard <= 0 || toRightBoard >= this.width || toUpBoard <= 0 || toBottomBoard >= this.height)
      return true;
    //出界
    else return false;
  }
  //计算新增的点的位置
  calPos(x1, y1, l, angle) {
    //angle是角度制
    const x2 = x1 + Math.cos((angle * Math.PI) / 180) * l;
    const y2 = y1 - Math.sin((angle * Math.PI) / 180) * l;
    return {
      x: x2,
      y: y2,
    };
  }
  getPos(node, l, r) {
    //得到角度
    const { x, y, angles } = node;
    for (let i = 0; i < this.angles.length; i++) {
      let angle = this.angles[i];
      if (!angles[angle]) {
        let pos = this.calPos(x, y, l, angle);
        if (!this.isPointOut(pos.x, pos.y, r)) {
          angles[angle] = 1;
          return pos;
        }
      }
    }
    return {
      x: null,
      y: null,
    };
  }
  getNodeLen(gra = {}) {
    let count = 0;
    let set = {};
    for (let key in gra) {
    }
  }
  Draw_Undirected_Graph(gra = {}) {
    this.elements = {};
    //绘制无向图
    const ar = Object.values(gra)
      .reduce((pre, cur) => {
        return pre.concat(Object.keys(cur));
      }, [])
      .concat(Object.keys(gra));
    let tempSet = new Set(ar);
    let len = tempSet.size;
    const l = this.avg_len_edge(len);
    const r = this.avg_r_point(len);
    const startX = r * 1.2;
    const startY = this.height / 2;
    for (let key in gra) {
      let curNode = this.elements[key];
      if (!curNode) {
        //第一个点
        this.cNode(startX, startY, r, key);
        curNode = this.elements[key];
      }
      for (let sub_key in gra[key]) {
        let nextNode = this.elements[sub_key];
        // 1:cur == A  2: A节点 3: 不存在关系 4: 已经有这个点了
        if (sub_key !== key && gra[key][sub_key] !== undefined && !this.elements[sub_key]) {
          const { x, y } = this.getPos(curNode, l, r); //获取下一个点的坐标
          nextNode = this.cNode(x, y, r, sub_key);
        }
        this.cEdge(curNode, nextNode, gra[key][sub_key]); // 连接两个点
      }
    }
  }
  distanceFromNodeToLine(nodeName, edgeName) {
    const { x: x0, y: y0 } = this.elements[nodeName];
    const { node1, node2, lineWidth } = this.elements[edgeName];
    const { x: x1, y: y1 } = node1;
    const { x: x2, y: y2 } = node2;
    const numerator = Math.abs((x0 - x1) * (y2 - y1) - (y0 - y1) * (x2 - x1));
    const denominator = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    const dis = Math.abs(numerator / denominator - lineWidth);
    return dis;
  }
  changeEdge(name,obj={}){
    const ele = this.elements[name]
    for(let key in obj){
      if(ele[key]) {
        ele[key] =obj[key]
      }
    }
}
  collisionDetect(x, y, curNode) {
    let count = 1;
    const { r } = curNode;
    let flag = 0;
    //点和线之间
    for (let key in this.elements) {
      count++;
      const ele = this.elements[key];
      if (ele.type === 'node' && ele.name !== curNode.name) {
        let edge = null;
        let textR = 0;
        const edgeName1 = curNode.name + 'edge' + ele.name;
        const edgeName2 = ele.name + 'edge' + curNode.name;
        if (this.elements[edgeName1] || this.elements[edgeName2]) {
          edge = this.elements[edgeName1] ? this.elements[edgeName1] : this.elements[edgeName2];
          textR = edge.textR;
        }
        const { x: x1, y: y1, r: r1 } = ele;
        const distance = Math.sqrt((x - x1) * (x - x1) + (y - y1) * (y - y1));
        if (distance - textR * 2 < r + r1 + this.lineWidth * 2) flag = 1;
      } else if (ele.type === 'edge' && !curNode.relatedEdges[ele.name]) {
        let now = Date.now();
        const dis = this.distanceFromNodeToLine(curNode.name, ele.name);
        // if(dis <= r) flag=1
      }
    }
    if (flag) return false;
    return true;
  }
}
export default Draw