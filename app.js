"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const e = require("./common/vendor.js");
Math;
const t = {};
function o() {
  return { app: e.createSSRApp(t) };
}

o().app.mount("#app"), (exports.createApp = o);