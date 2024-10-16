"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "SymbolInput",
  props: {
    "modelValue": {},
    "modelModifiers": {}
  },
  emits: ["update:modelValue"],
  setup(__props) {
    const symbolGroup = ["¬", "⋀", "⋁", "→", "↔", "(", ")"];
    const modelValue = common_vendor.useModel(__props, "modelValue");
    let isFocus = common_vendor.ref(false);
    const handleFocus = () => {
      isFocus.value = true;
    };
    const handleBlur = () => {
      setTimeout(() => {
        isFocus.value = false;
      }, 0);
    };
    const handleTap = (symbol) => {
      modelValue.value += symbol;
      setTimeout(() => {
        isFocus.value = true;
      }, 0);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(isFocus),
        b: common_vendor.o(handleFocus),
        c: common_vendor.o(handleBlur),
        d: modelValue.value,
        e: common_vendor.o(($event) => modelValue.value = $event.detail.value),
        f: common_vendor.f(symbolGroup, (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: index,
            c: common_vendor.n(`item_${index}`),
            d: common_vendor.o(($event) => handleTap(item), index)
          };
        }),
        g: common_vendor.unref(isFocus) ? 1 : ""
      };
    };
  }
};
wx.createComponent(_sfc_main);
