"use strict";
const utils_parse = require("./parse.js");
function generateTruthTable(expr) {
  let variables = Array.from(new Set(expr.match(/[a-zA-Z]+/g)));
  let table = [];
  let totalRows = Math.pow(2, variables.length);
  for (let i = 0; i < totalRows; i++) {
    let values = {};
    variables.forEach((variable, index) => {
      values[variable] = (i & 1 << variables.length - 1 - index) >> variables.length - 1 - index;
    });
    let result = utils_parse.calc(expr, values);
    if (result !== null) {
      table.push({ ...values, result });
    }
  }
  return { variables, table };
}
function useTruthTable(expr) {
  const newExpr = utils_parse.parse(expr);
  let { variables, table } = generateTruthTable(newExpr);
  variables.push(expr);
  return { variables, table };
}
function objectsEqual(obj1, obj2) {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length)
    return false;
  for (const key of keys1) {
    if (obj1[key] !== obj2[key])
      return false;
  }
  return true;
}
function isEqual(expr1, expr2) {
  if (expr1 === "" || expr2 === "")
    return false;
  const table1 = useTruthTable(expr1).table;
  const table2 = useTruthTable(expr2).table;
  if (table1.length !== table2.length)
    return false;
  for (let i = 0; i < table1.length; i++) {
    const obj1 = table1[i];
    let j = 0;
    while (j < table2.length) {
      const obj2 = table2[j];
      if (objectsEqual(obj1, obj2)) {
        break;
      }
      j++;
    }
    if (j >= table2.length)
      return false;
  }
  return true;
}
exports.isEqual = isEqual;
exports.useTruthTable = useTruthTable;
