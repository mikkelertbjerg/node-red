(function(){"use strict";try{if(typeof document<"u"){var e=document.createElement("style");e.appendChild(document.createTextNode(".ui-compass-card[data-v-b23bdf87]{width:100%;height:100%;display:flex;flex-direction:column}.compass-display[data-v-b23bdf87]{display:flex;align-items:baseline;justify-content:center;font-size:3rem;font-weight:300;line-height:1}.heading-value[data-v-b23bdf87]{font-variant-numeric:tabular-nums}.degree-symbol[data-v-b23bdf87]{font-size:2rem;margin-left:.1em}")),document.head.appendChild(e)}}catch(t){console.error("vite-plugin-css-injected-by-js",t)}})();
import { resolveComponent as s, createBlock as r, openBlock as i, withCtx as o, createCommentVNode as m, createVNode as h, createTextVNode as v, toDisplayString as p, createElementVNode as d } from "vue";
const y = (e, t) => {
  const a = e.__vccOpts || e;
  for (const [c, n] of t)
    a[c] = n;
  return a;
}, g = {
  name: "UICompass",
  inject: ["$socket", "$dataTracker"],
  props: {
    id: { type: String, required: !0 },
    props: { type: Object, default: () => ({}) },
    state: { type: Object, default: () => ({}) }
  },
  data() {
    return {
      heading: 0
    };
  },
  computed: {
    displayHeading() {
      return this.heading % 1 === 0 ? this.heading.toFixed(0) : this.heading.toFixed(1);
    }
  },
  created() {
    this.$dataTracker(this.id, (e) => {
      if (e && e.payload !== void 0) {
        const t = e.payload;
        typeof t == "number" && (this.heading = t);
      }
    });
  }
}, x = { class: "compass-display" }, b = { class: "heading-value" };
function k(e, t, a, c, n, l) {
  const _ = s("v-card-title"), u = s("v-card-text"), f = s("v-card");
  return i(), r(f, {
    class: "ui-compass-card",
    elevation: "2"
  }, {
    default: o(() => [
      a.props.label ? (i(), r(_, {
        key: 0,
        class: "text-subtitle-1 pa-2"
      }, {
        default: o(() => [
          v(p(a.props.label), 1)
        ]),
        _: 1
      })) : m("", !0),
      h(u, { class: "pa-4" }, {
        default: o(() => [
          d("div", x, [
            d("span", b, p(l.displayHeading), 1),
            t[0] || (t[0] = d("span", { class: "degree-symbol" }, "°", -1))
          ])
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
const N = /* @__PURE__ */ y(g, [["render", k], ["__scopeId", "data-v-b23bdf87"]]);
export {
  N as UICompass
};
