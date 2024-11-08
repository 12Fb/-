"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const funcList = [
      {
        name: "真值表",
        path: "/pages/truthtable/truthtable",
      },
      {
        name: "需求三",
        path: "/pages/fun3/fun3",
      },
      {
        name: "需求四",
        path: "/pages/fun4/fun4",
      },
      {
        name: "需求五",
        path: "/pages/find/find",
      },
      {
        name: "传递闭包",
        path: "/pages/closure/closure",
      },
      {
        name: "集合运算",
        path: "/pages/set/set",
      },
      {
        name: "最短路径",
        path: "/pages/shortest/shortest",
      },
      {
        name: "测试",
        path: "/pages/test/test",
      },
    ];
    const nextRoute = (path) => {
      const startTime = /* @__PURE__ */ new Date();
      common_vendor.index.redirectTo({
        url: path,
        complete() {
          const endTime = /* @__PURE__ */ new Date();
          console.log(endTime - startTime);
        },
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(funcList, (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: index,
            c: common_vendor.o(($event) => nextRoute(item.path), index),
          };
        }),
      };
    };
  },
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);
