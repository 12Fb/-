// pages/Find/find.js  

Page({  
  data: {  
      inputFormula: '', // 用户输入的逻辑公式  
      result: '', // 计算结果  
      formulaType: '' // 公式类型  
  },  

  // 处理输入事件  
  onInput: function(event) {  
      this.setData({  
          inputFormula: event.detail.value // 更新输入的公式  
      });  
  },  

  // 插入逻辑符号  
  insertSymbol: function(event) {  
      const symbol = event.currentTarget.dataset.symbol;  
      this.setData({  
          inputFormula: this.data.inputFormula + symbol // 在输入框中插入符号  
      });  
  },  

  // 计算逻辑公式类型和前束范式  
  onCalculate: function() {  
      const formula = new Formula(this.data.inputFormula);  
      this.setData({  
          result: formula.toPrenexForm(), // 设置计算结果  
          formulaType: formula.getType() // 设置公式类型  
      });  
  }  
});  

// 逻辑公式处理类  
class Formula {  
  constructor(expression) {  
      this.expression = expression.replace(/\s+/g, ''); // 去除空格  
      this.index = 0;  
  }  

  // 获取公式类型并转换为中文  
  getType() {  
      return this.expression.match(/(∀|∃)/) ? '量词公式' : '命题公式';  
  }  

  // 转换为前束范式  
  toPrenexForm() {  
      const { quantifiers, body } = this.parseFormula();  
      return quantifiers.join(' ') + ' ' + body;  
  }  

  // 解析公式  
  parseFormula() {  
    let quantifiers = [];  
    let body = this.parseExpression();  

    while (this.index < this.expression.length) {  
        const char = this.expression[this.index];  
        if (char === '∀' || char === '∃') {  
            const quantifier = char;  
            this.index++;  
            const variable = this.expression[this.index++];  
            quantifiers.unshift(quantifier + variable); // 将量词放在前面  
            // 继续解析后续的表达式  
            body = this.parseExpression();  
        } else {  
            break;  
        }  
    }  

    return { quantifiers, body };  
}  

   

  // 解析表达式  
  parseExpression() {  
      let left = this.parseTerm();  

      while (this.index < this.expression.length) {  
          const operator = this.expression[this.index];  
          if (operator === '∧' || operator === '∨' || operator === '→') {  
              this.index++;  
              const right = this.parseTerm();  
              left = `(${left} ${operator} ${right})`; // 组合表达式  
          } else {  
              break;  
          }  
      }  

      return left;  
  }  

  // 解析项  
  parseTerm() {  
      const char = this.expression[this.index];  

      if (char === '(') {  
          this.index++; // 跳过 '('  
          const inner = this.parseExpression();  
          this.index++; // 跳过 ')'  
          return inner;  
      } else {  
          let term = char;  
          this.index++;  
          // 处理后续的变量或函数  
          while (this.index < this.expression.length && /[a-zA-Z0-9]/.test(this.expression[this.index])) {  
              term += this.expression[this.index];  
              this.index++;  
          }  
          return term; // 返回单个项  
      }  
  }  
}