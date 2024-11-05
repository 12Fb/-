//输入集合运算，输出文氏图
//∩，∪，- , '
//首先是集合运算,  & , | , - , ' 最后一个是补集

export default class Set {
  constructor(canvasId) {
    this.setArray = {}; //集合存放
    this.uSet = [];
    this.circle = 0;
    this.canvasId = canvasId;
    this.circleData = {}; //存放圆的数据
    this.steps = {};
    this.total = 0;
    this.circlePathAndText = {}; //为最后画边界服务
    this.compositePathFn = {}; //复合运算的path函数
    this.color = "rgba(246, 87, 54,1)";
    this.blankColor = "rgba(255,255,255)";
    this.rate = 1; // rpx*rate =px
    this.font = 45;
  }
  /**
   * 初始化全集,默认是当前所有集合的并集
   */
  inituSet() {
    let exp = "";
    for (let key in this.setArray) {
      exp += key + "|";
    }
    exp = exp.slice(0, -1);
    this.uSet = this.operate(exp, 1);
    return exp;
  }
  inituSetPath(ctx) {
    const path = new Path2D();
    ctx.fillStyle = this.color;
    path.rect(0, 0, 9999, 9999);
    this.circlePathAndText["U"] = { path };
  }
  /**
   * 返回运算符优先级
   * @return {number}
   */
  getVal(char) {
    if (char === "'") return 3;
    if (char === "&") return 2;
    if (char === "|") return 1;
    return 0;
  }
  /**
   * 预处理字符串，去除空格
   * @param {string} str
   */
  preProcess(str) {
    let temp = str.replace(/\s+/g, "");
    return temp;
  }
  /**
   * 添加一个集合
   * @param {string} str
   * @param {string} index
   * @return {void}
   */
  add(str, index) {
    let temp = this.preProcess(str).split(",");
    // console.log(temp);
    if (index.toLowerCase() === "u") {
      this.uSet = str.trim().split(",");
      this.uLock = 1;
    } else this.setArray[index] = str.trim().split(",");
  }
  /**
   * 中缀转前缀
   * @return {Array}
   */
  trans(str) {
    // (a | b) & c
    let stack1 = [];
    let stack2 = [];
    for (let i = 0; i < str.length; i++) {
      if (isLetter(str[i])) {
        stack1.push(str[i]);
      } else {
        if (str[i] === ")") {
          while (stack2[stack2.length - 1] !== "(") {
            let temp = stack2.pop();
            stack1.push(temp);
          }
          stack2.pop();
        } else {
          while (stack2.length > 0 && this.getVal(stack2[stack2.length - 1]) > this.getVal(str[i])) {
            let top = stack2.pop();
            stack1.push(top);
          }
          stack2.push(str[i]);
        }
      }
    }
    while (stack2.length > 0) {
      let temp = stack2.pop();
      stack1.push(temp);
    }
    return stack1;
  }
  /**
   * @param {string} str
   * @return {Array}
   */
  operate(str, initU = 0) {
    str = this.trans(this.preProcess(str));
    let stack = [];
    for (let i = 0; i < str.length; i++) {
      if (isLetter(str[i])) {
        stack.push(str[i]);
        if (!initU) this.total++;
        continue;
      }
      let result = [];
      if (!isLetter(str[i])) {
        let le1 = stack.pop();
        let le2 = stack.pop();
        let set1 = this.setArray[le1];
        let set2 = this.setArray[le2];
        let op = str[i];
        switch (op) {
          case "&":
            for (let i = 0; i < set1.length; i++) {
              if (set2.includes(set1[i])) result.push(set1[i]);
            }
            break;
          case "|":
            for (let i = 0; i < set1.length; i++) {
              result.push(set1[i]);
            }
            for (let i = 0; i < set2.length; i++) {
              if (!result.includes(set2[i])) result.push(set2[i]);
            }
            break;
          case "-":
            for (let i = 0; i < set2.length; i++) {
              if (!set1.includes(set2[i])) result.push(set2[i]);
            }
            break;
          case "'":
            if (le2) stack.push(le2);
            for (let i = 0; i < this.uSet.length; i++) {
              if (!set1.includes(this.uSet[i])) result.push(this.uSet[i]);
            }
            break;
          default:
            result = [];
        }
        let exp;
        if (op !== "'") {
          exp = le2 + str[i] + le1;
        } else {
          exp = le1 + str[i];
        }
        this.setArray[exp] = result;
        stack.push(exp);
        //还要存储到steps中给绘制圆提供信息
        if (!initU)
          this.steps[exp] = {
            left: le2,
            right: le1,
            op: op,
          };
      }
    }
    return this.setArray[stack[0]];
  }
  buildCircleData(num, height, width) {
    if (num === 1) {
      this.circleData[getName(0)] = {
        r: (Math.min(height, width) / 2) * 0.8,
        x: width / 2,
        y: height / 2,
        name: getName(),
      };
    } else if (num === 2) {
      const centerX = width / 2;
      let _r = Math.min(width / 3.5, height / 2.5);
      let leftX = centerX - 0.5 * _r;
      for (let i = 0; i < 2; i++) {
        this.circleData[getName(i)] = {
          r: _r,
          x: leftX + i * _r,
          y: height / 2,
          name: getName(i),
        };
      }
    } else if (num === 3) {
      const centerX = width / 2;
      const centerY = height / 2;
      const _r = Math.min(width / 3.5, height / 3.5);
      const leftX = centerX - 0.5 * _r;
      for (let i = 0; i < 2; i++) {
        this.circleData[getName(i)] = {
          r: _r,
          x: leftX + i * _r,
          y: height / 3,
          name: getName(i),
        };
      }
      //下面单独的那个圆
      this.circleData[getName(2)] = {
        r: _r,
        x: leftX + 0.5 * _r,
        y: height / 3 + Math.cos(deToRa(30)) * _r,
        name: getName(2),
      };
    }
    //全集不在这里面
  }
  initCircle = (x, y, r, name, centerX, centerY, font) => {
    let posX = getPos(x, centerX);
    let posY = getPos(y, centerY);
    const path = new Path2D();
    path.arc(x, y, r, 0, 2 * Math.PI);
    const textPos = { x: x + font * posX, y: y + font * posY };
    const text = {
      font: font,
    };
    this.circlePathAndText[name] = { path, text, textPos };
  };
  /**
   * 画韦恩图
   * @param {string} exp 通过表达式取结果
   * @param {string} set1 集合一
   * @param {string} set2 集合二
   */
  clearArea(ctx, path = null) {
    ctx.save();
    ctx.clip(path);
    ctx.clearRect(0, 0, 9999, 9999);
    ctx.restore();
  }

  //返回一个绘画相关cir的函数,以便存起来反复运用
  Cal(cir) {
    //用一个隐藏画布是为了解决globalCompositeOperation冲突
    let fun;
    fun = () => {
      const hidCanvas = document.createElement("canvas");
      const hidCtx = hidCanvas.getContext("2d");
      hidCanvas.width = this.width;
      hidCanvas.height = this.height;
      let { path } = this.circlePathAndText[cir];
      hidCtx.fillStyle = this.color;
      hidCtx.fill(path);
      return hidCanvas;
    };
    return fun;
  }
  PaintVenm(ctx) {
    Object.entries(this.steps).forEach((step) => {
      ctx.fillStyle = this.blankColor;
      ctx.fillRect(0, 0, 9999, 9999);

      const [exp, detail] = step;
      console.log(exp, detail);
      let { op, left, right } = detail;
      let fn1, fn2, midFn;
      if (op === "'") {
        left = "U";
      }
      fn1 = left.length > 1 ? this.compositePathFn[left] : this.Cal(left);
      fn2 = right.length > 1 ? this.compositePathFn[right] : this.Cal(right);
      midFn = (hidCtx) => {
        switch (op) {
          case "&":
            hidCtx.globalCompositeOperation = "source-in";
            break;
          case "|":
            hidCtx.globalCompositeOperation = "source-over";
            break;
          case "-":
            hidCtx.globalCompositeOperation = "destination-out";
            break;
          case "'":
            hidCtx.globalCompositeOperation = "destination-out";
            break;
          default:
            hidCtx.globalCompositeOperation = "source-over";

            break;
        }
      };
      const fn = () => {
        const hidCanvas = document.createElement("canvas");
        const hidCtx = hidCanvas.getContext("2d");
        hidCanvas.width = this.width;
        hidCanvas.height = this.height;
        let canvas1 = fn1 && fn1();
        hidCtx.drawImage(canvas1, 0, 0);
        midFn(hidCtx);
        let canvas2 = fn2 && fn2();
        hidCtx.drawImage(canvas2, 0, 0);
        hidCtx.globalCompositeOperation = "source-over"; //默认值
        return hidCanvas;
      };
      let _canvas = fn();
      ctx.drawImage(_canvas, 0, 0);
      this.compositePathFn[exp] = fn;
    });
  }
}

//********************************************************************************************* */

//判断是不是字母
function isLetter(char) {
  const code = char.charCodeAt(0);
  return (code > 64 && code < 91) || (code > 96 && code < 123);
}
function rpxTopx(num) {
  return num;
}

//函数柯里化
function curry(fn, ...args) {
  if (args.length >= fn.length) throw Error;
  let ar = args;
  const _curry = (..._args) => {
    ar = ar.concat(_args);
    if (ar.length < fn.length) return _curry;
    else return fn.apply(this, ar.slice(0, fn.length));
  };
  return _curry;
}

//弧度转角度制
function RaTode(ra) {
  return ceilDec((ra * 180) / Math.PI, 3);
}

//角度制转弧度
function deToRa(anl) {
  return ceilDec((anl / 360) * Math.PI * 2, 4);
}
//得到op
function getOp(str) {
  for (let i = 0; i < str.length; i++) {
    if (str[i] === "|" || str[i] === "&" || str[i] === "'") return str[i];
  }
  return -1;
}
function getLetter(str) {
  let re = [];
  for (let i = 0; i < str.length; i++) {
    if (isLetter(str[i])) re.push(str[i]);
  }
  return re;
}
function getName(num) {
  return String.fromCharCode(65 + (num % 26));
}
function getPos(pos, centerPos) {
  if (pos === centerPos) return 0;
  if (pos > centerPos) return 1; //圆在右边或者下面
  else return -1; //圆在左边或者上面
}
//对小数部分向上取整
function ceilDec(val, n = 2) {
  let temp = val * 1.0 * Math.pow(10, n - 1);
  temp = Math.ceil(temp) * Math.pow(1 / 10, n - 1);
  return Number(temp.toFixed(n));
}
