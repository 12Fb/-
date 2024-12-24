class Logic {
  constructor() {
    this.pre = []; //装命题的后缀
    this.corSeq = []; //一个元素为一个真序列
    this.fakeSeq = []; //假序列,处理之后可以得到极大值
    this.rightSeq = {}; //
    this.symbol_Val = {
      "!": 0,
      "&": -1,
      "|": -2,
      ">": -3,
      "<": -4,
    };
  }
  //中缀转后缀
  trans(str) {
    str = str.replace(/\s/g, "");
    let stack1 = [];
    let stack2 = [];

    for (let i = 0; i < str.length; i++) {
      if (str[i] === "(") stack2.push(str[i]);
      else if (this.isLetter(str[i])) {
        stack1.push(str[i]);
      } else if (str[i] === ")") {
        while (stack2[stack2.length - 1] !== "(") {
          let sy = stack2.pop();
          stack1.push(sy);
        }
        stack2.pop();
      } else {
        let top = stack2[stack2.length - 1];
        if (!top) {
          stack2.push(str[i]);
        } else if (this.symbol_Val[top] <= this.symbol_Val[str[i]]) stack2.push(str[i]);
        else {
          while (this.symbol_Val[top] > this.symbol_Val[str[i]]) {
            let sy = stack2.pop();
            stack1.push(sy);
            if (stack2.length === 0) break;
          }
          stack2.push(str[i]);
        }
      }
    }
    while (stack2.length > 0) {
      let sy = stack2.pop();
      stack1.push(sy);
    }
    return stack1;
  }
  //十进制转二进制 , return 数组
  give(val = 0, n = 0) {
    let num1 = [];
    while (val >= 2) {
      let num = val % 2;
      val = (val - num) / 2;
      num1.unshift(num);
    }
    num1.unshift(val);
    let num2 = [];
    for (let i = 0; i < n - num1.length; i++) {
      num2.push(0);
    }
    return num2.concat(num1);
  }
  //是否是字母
  isLetter(ch) {
    let char = String(ch)
    const code = char.charCodeAt(0);
    return (code > 64 && code < 91) || (code > 96 && code < 123);
  }
  //添加前提
  addPreMise(str) {
    str = str.replace(" ", "");
    if (str.length === 1) {
      this.pre.push([str[0], "1", "&"]);
    } else {
      let temp = this.trans(str);
      this.pre.push(temp);
    }
    return this.pre;
  }
  getLetter(str) {
    let letters = [];
    for (let i = 0; i < str.length; i++) {
      if (this.isLetter(str[i])) letters.push(str[i]);
    }
    return letters;
  }
  //推理表达式是否正确
  /**
   *
   * @param {string} str 表达式的后缀形式
   * @param {number} letterIndex 对应val中的下标
   * @param {Array} val 存放每个元素的真假
   * @returns
   */
  infer(str, letterIndex, val) {
    let flag = 0;
    let set =  new Set();
    let stack = []; // 操作符栈
    for (let i = 0; i < str.length; i++) {
      if (this.isLetter(str[i])) {
        if (val[letterIndex[str[i]]] !== undefined) stack.push(str[i]);
        else stack.push("1");
      } else if (str[i] == 0 || str[i] == 1) {
        stack.push(str[i]);
      } else {
        let re;
        let op = str[i];
        let right = stack.pop(); //操作符右边字母
        let left;
        switch (op) {
          case "!":
            re = !val[letterIndex[right]];
            break;
          case "&":
            left = stack.pop();
            re = val[letterIndex[left]] & val[letterIndex[right]];
            break;
          case "|":
            left = stack.pop();
            re = val[letterIndex[left]] | val[letterIndex[right]];
            break;
          case ">":
            left = stack.pop();
            re = !val[letterIndex[left]] | val[letterIndex[right]];
            break;
          case "<": //相互蕴含
            left = stack.pop();
            re =
              (!val[letterIndex[left]] | val[letterIndex[right]]) &
              (!val[letterIndex[right]] | val[letterIndex[left]]);
            break;
          default:
            re = -1;
            break; //字母
        }
        if (re) stack.push(1);
        else stack.push(0);
      }
    }
    if (this.isLetter(stack[0])) {
      let letter = stack[0];
      stack[0] = val[letterIndex[letter]];
    }
    let result = stack[0] == "0" ? false : true;
    return result;
  }
  maxItem() {
    //主合取范式，由极大项得来,所有成假赋值的合取
    let str = "";
    const deal = (letter, val) => {
      if (val == 1) return "!" + letter;
      else return letter;
    };
    if (this.fakeSeq.length === 0) return str;

    for (let i = 0; i < this.fakeSeq.length; i++) {
      let obj = this.fakeSeq[i];
      let flag = 0;
      for (let key in obj) {
        if (flag === 0) {
          if (this.fakeSeq.length != 1) str += "(";
          str += deal(key, obj[key]);
          flag++;
        } else {
          str += "|";
          str += deal(key, obj[key]);
        }
      }
      if (this.fakeSeq.length != 1) str += ") & ";
    }
    if (this.fakeSeq.length != 1) str = str.slice(0, -3);
    return str;
  }
  minItem() {
    //主汲取范式，由极小项得来，所有成真赋值的汲取
    let str = "";
    const deal = (letter, val) => {
      if (val == 0) return "!" + letter;
      else return letter;
    };
    if (this.corSeq.length === 0) return str;

    for (let i = 0; i < this.corSeq.length; i++) {
      let obj = this.corSeq[i];
      let flag = 0;
      for (let key in obj) {
        if (flag === 0) {
          if (this.corSeq.length != 1) str += "(";
          str += deal(key, obj[key]);
          flag++;
        } else {
          str += "&";
          str += deal(key, obj[key]);
        }
      }
      if (this.corSeq.length != 1) str += ") | ";
    }
    if (this.fakeSeq.length != 1) str = str.slice(0, -3);
    return str;
  }
  //推理结论 , 得到真值表,将为真的序列存起来,
  addInference(str) {
    const posStr = this.trans(str);
    // console.log("后缀表达式", posStr);
    let letters = this.getLetter(str);
    let letterIndex = {};
    letters.forEach((item, index) => (letterIndex[item] = index)); //建立字母对于索引
    let max = Math.pow(2, letters.length) ;
    for (let i = 0; i < max; i++) {
      let nums = this.give(i, letters.length);
      nums.push(0);
      nums.push(1);
      letterIndex["0"] = nums.length - 2;
      letterIndex["1"] = nums.length - 1;
      let result = this.infer(posStr, letterIndex, nums);
      let temp = {}; //临时存各个字母的值
      for (let j = 0; j < letters.length; j++) {
        temp[letters[j]] = nums[j];
      }
      if (result) this.corSeq.push({ ...temp });
      else this.fakeSeq.push({ ...temp });
    }
    //用得到的corseq去计算前提
  }
  //主合取范式和主析取范式
  getDNFAndCNF() {}

  //判断结论,用得到的corSeq去遍历前提
  judInference() {
    let val, letterIndex;
    for (let i = 0; i < this.corSeq.length; i++) {
      //构建val和letterIndex
      if (i === 0) {
        val = this.corSeq[i];
        letterIndex = {};
        for (let key in this.corSeq[i]) {
          letterIndex[key] = key;
        }
        letterIndex["0"] = "0";
        letterIndex["1"] = "1";
        val["0"] = 0;
        val["1"] = 1;
      } else {
        //只用改val
        val = this.corSeq[i];
        val["0"] = 0;
        val["1"] = 1;
      }
      //用结论成立的值代入带前提中看成不成立,全部前提成立即可,所以打印的成真赋值只是保证前提成立的
      let result = false
      if (this.pre.length > 0) result = true;
      for (let i = 0; i < this.pre.length; i++) {
        
        let flag = 0;
        let set = new Set();

        for (let j = 0; j < this.pre[i].length; j++) {
          if (this.isLetter(this.pre[i][j])) {
            set.add(this.pre[i][j]);
          }
        }
        Object.entries(letterIndex).forEach((item, index) => {
          if (this.isLetter(item[0])) {
            if (set.has(item[0])) flag = 1;
          }
        });
        let re = true;
        if (flag) re = this.infer(this.pre[i], letterIndex, val);
        result = re & result;
        // console.log(this.pre[i], val, result);
        if (!result) break;
      }
      if (result) {
        console.log("成真的结论", this.corSeq[i]);
        return true;
      }
    }
    return false;
  }
}
export default Logic