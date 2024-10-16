const priority = {
	'(': 6,
	'!': 5,
	'&': 4,
	'|': 3,
	'-': 2,
	'=': 1
}
export function parse(expr) {
  // 解析 非 ¬
  expr = expr.replace(/¬/g, '!')
  
  // 解析 合取符号 ⋀
  expr = expr.replace(/⋀/g, '&')
  
  // 解析 析取符号 ⋁
  expr = expr.replace(/⋁/g, '|')

  // 解析 蕴含符号 →
  expr = expr.replace(/→/g, "-")
  
  // 解析 等价符号 ↔
  expr = expr.replace(/↔/g, "=")
  return expr
}

function _evaluate(op, st) {
	let res = ''
	if(op === '!') {
		const a = st.pop()
		res = +!Number(a)
	}
	if(op === '&') {
		const a = st.pop()
		const b = st.pop()
		res = Number(a) && Number(b)
	}
	if(op === '|') {
		const a = st.pop()
		const b = st.pop()
		res = Number(a) || Number(b)
	}
	if(op === '-') {
		const a = st.pop()
		const b = st.pop()
		res = +!Number(b) || Number(a)
	}
	if(op === '=') {
		const a = st.pop()
		const b = st.pop()
		res = Number(a) === Number(b)
	}
	return res.toString()
}

function evaluate(expr) {
	const st = []
	const op = []
	for(let c of expr) {
		if(c === '0' || c === '1') {
			st.push(c)
		} else if(c !== ')') {
			if(op.length === 0) {
				op.push(c)
			} else {
				// 栈不为空，判断优先级
				const top = op[op.length - 1]
				if(top !== '(' && priority[top] >= priority[c]) {
					const result = _evaluate(top, st)
					st.push(result)
					op.pop()
				}
				op.push(c)
			}
		} else {
			// 遇到 ) 
			while(op[op.length - 1] !== '(') {
				const top = op.pop()
				const result = _evaluate(top, st)
				st.push(result)
			}
			op.pop() // ( 出栈
		}
	}
	while(op.length !== 0) {
		const top = op.pop()
		const result = _evaluate(top, st)
		st.push(result)
	}
	if(st.length > 1) {
		throw new Error('无效的表达式')
	} 
	return st[0]
}
export function calc(expr, values) {
  // 替换变量
  let keys = Object.keys(values)
  let tmp = expr
  keys.forEach((key) => {
    tmp = tmp.replace(new RegExp(key, "g"), values[key])
  })
  try {
	  return +evaluate(tmp)
  } catch (e) {
    console.error("无效的表达式", e)
    return null
  }
}
