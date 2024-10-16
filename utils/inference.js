"use strict";
const utils_parse = require("./parse.js");
function satisfiable(expr) {
  const parsedExpr = utils_parse.parse(expr);
  let variables = Array.from(new Set(parsedExpr.match(/[a-zA-Z]+/g)));
  let totalRows = Math.pow(2, variables.length);
  for (let i = 0; i < totalRows; i++) {
    let values = {};
    variables.forEach((variable, index) => {
      values[variable] = (i & 1 << variables.length - 1 - index) >> variables.length - 1 - index;
    });
    let result = utils_parse.calc(parsedExpr, values);
    if (result === 1)
      return true;
  }
  return false;
}
exports.satisfiable = satisfiable;
