"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  (_easycom_uni_icons + SymbolInput)();
}
const SymbolInput = () => "./SymbolInput.js";
const _sfc_main = {
  __name: "FormulaInput",
  props: {
    "modelValue": {},
    "modelModifiers": {}
  },
  emits: /* @__PURE__ */ common_vendor.mergeModels(["addOrDel", "focus", "blur", "click"], ["update:modelValue"]),
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const modelValue = common_vendor.useModel(__props, "modelValue");
    const handleIconClick = (type) => {
      if (type === "plus") {
        emit("addOrDel", 2);
      } else if (type === "minus") {
        emit("addOrDel", 1);
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => handleIconClick(_ctx.$attrs.type)),
        b: common_vendor.p({
          type: _ctx.$attrs.type,
          size: "20"
        }),
        c: common_vendor.o(($event) => modelValue.value = $event),
        d: common_vendor.p({
          modelValue: modelValue.value
        }),
        e: common_vendor.o(($event) => emit("click"))
      };
    };
  }
};
wx.createComponent(_sfc_main);
