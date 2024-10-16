"use strict";
const common_vendor = require("../../common/vendor.js");
const hooks_truthTable = require("../../utils/truthTable.js");
if (!Array) {
  const _easycom_uni_th2 = common_vendor.resolveComponent("uni-th");
  const _easycom_uni_tr2 = common_vendor.resolveComponent("uni-tr");
  const _easycom_uni_table2 = common_vendor.resolveComponent("uni-table");
  (_easycom_uni_th2 + _easycom_uni_tr2 + _easycom_uni_table2)();
}
const _easycom_uni_th = () => "../../uni_modules/uni-table/components/uni-th/uni-th.js";
const _easycom_uni_tr = () => "../../uni_modules/uni-table/components/uni-tr/uni-tr.js";
const _easycom_uni_table = () => "../../uni_modules/uni-table/components/uni-table/uni-table.js";
if (!Math) {
  (FormulaInput + _easycom_uni_th + _easycom_uni_tr + _easycom_uni_table)();
}
const FormulaInput = () => "./components/FormulaInput.js";
const _sfc_main = {
  __name: "truthtable",
  setup(__props) {
    let minus = common_vendor.ref(false);
    let f1 = common_vendor.ref("");
    let f2 = common_vendor.ref("");
    let tableTitle = common_vendor.ref("真值表1");
    let isFocus = common_vendor.ref(null);
    let cursor = common_vendor.ref(0);
    let loading = common_vendor.ref(false);
    const inpFocus = (s) => {
      isFocus.value = s;
    };
    const inpBlur = (e) => {
      cursor.value = e.target.cursor;
    };
    let header = common_vendor.ref([]);
    let content = common_vendor.ref([]);
    const getTruthTable = (expr, pos) => {
      if (expr === "")
        return;
      loading.value = true;
      tableTitle.value = pos === 2 ? "真值表2" : "真值表1";
      header.value = [];
      content.value = [];
      const { variables, table } = hooks_truthTable.useTruthTable(expr);
      header.value = [...variables];
      table.forEach((row) => {
        content.value.push(Object.values(row));
      });
      loading.value = false;
    };
    const equalHandler = () => {
      if (hooks_truthTable.isEqual(f1.value, f2.value)) {
        common_vendor.index.showToast({
          title: "两个表达式相等",
          icon: "none",
          duration: 1e3
        });
      } else {
        common_vendor.index.showToast({
          title: "两个表达式不相等",
          icon: "none",
          duration: 1e3
        });
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => common_vendor.isRef(minus) ? minus.value = $event : minus = $event),
        b: common_vendor.o(($event) => inpFocus("f1")),
        c: common_vendor.o(inpBlur),
        d: common_vendor.o(($event) => getTruthTable(common_vendor.unref(f1), 1)),
        e: common_vendor.o(($event) => common_vendor.isRef(f1) ? f1.value = $event : f1 = $event),
        f: common_vendor.p({
          type: "plus",
          modelValue: common_vendor.unref(f1)
        }),
        g: common_vendor.o(($event) => common_vendor.isRef(minus) ? minus.value = $event : minus = $event),
        h: common_vendor.unref(minus),
        i: common_vendor.o(($event) => inpFocus("f2")),
        j: common_vendor.o(inpBlur),
        k: common_vendor.o(($event) => getTruthTable(common_vendor.unref(f2), 2)),
        l: common_vendor.o(($event) => common_vendor.isRef(f2) ? f2.value = $event : f2 = $event),
        m: common_vendor.p({
          type: "minus",
          modelValue: common_vendor.unref(f2)
        }),
        n: common_vendor.t(common_vendor.unref(tableTitle)),
        o: common_vendor.f(common_vendor.unref(header), (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: index,
            c: "1df5426b-4-" + i0 + ",1df5426b-3"
          };
        }),
        p: common_vendor.f(common_vendor.unref(content), (row, i, i0) => {
          return {
            a: common_vendor.f(row, (v, j, i1) => {
              return {
                a: common_vendor.t(v),
                b: j,
                c: "1df5426b-6-" + i0 + "-" + i1 + "," + ("1df5426b-5-" + i0)
              };
            }),
            b: i,
            c: "1df5426b-5-" + i0 + ",1df5426b-2"
          };
        }),
        q: common_vendor.p({
          loading: common_vendor.unref(loading)
        }),
        r: !common_vendor.unref(minus),
        s: common_vendor.o(equalHandler)
      };
    };
  }
};
wx.createPage(_sfc_main);
