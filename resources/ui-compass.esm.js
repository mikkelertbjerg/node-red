(function(){"use strict";try{if(typeof document<"u"){var e=document.createElement("style");e.appendChild(document.createTextNode(".ui-compass-card[data-v-584da368]{width:100%;height:100%;display:flex;flex-direction:column}.compass-container[data-v-584da368]{display:flex;flex-direction:column;align-items:center;gap:1rem}.compass-visual[data-v-584da368]{position:relative;width:150px;height:150px;display:flex;align-items:center;justify-content:center}.compass-circle[data-v-584da368]{position:absolute;width:100%;height:100%;top:0;left:0}.compass-needle[data-v-584da368]{position:absolute;width:12%;height:92%;top:4%;left:44%;transition:transform .3s ease-out;transform-origin:center center}.compass-display[data-v-584da368]{display:flex;align-items:baseline;justify-content:center;font-size:2.5rem;font-weight:300;line-height:1}.heading-value[data-v-584da368]{font-variant-numeric:tabular-nums}.degree-symbol[data-v-584da368]{font-size:1.8rem;margin-left:.1em}")),document.head.appendChild(e)}}catch(t){console.error("vite-plugin-css-injected-by-js",t)}})();
import { resolveComponent as r, createBlock as c, openBlock as n, withCtx as l, createCommentVNode as _, createVNode as x, createTextVNode as h, toDisplayString as d, createElementVNode as t, createElementBlock as v, normalizeStyle as y } from "vue";
const g = (o, e) => {
  const s = o.__vccOpts || o;
  for (const [i, a] of e)
    s[i] = a;
  return s;
}, w = {
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
    this.$dataTracker(this.id, (o) => {
      if (o && o.payload !== void 0) {
        const e = o.payload;
        typeof e == "number" && (this.heading = e);
      }
    });
  }
}, k = { class: "compass-container" }, C = { class: "compass-visual" }, b = { class: "compass-display" }, L = { class: "heading-value" };
function z(o, e, s, i, a, p) {
  const m = r("v-card-title"), f = r("v-card-text"), u = r("v-card");
  return n(), c(u, {
    class: "ui-compass-card",
    elevation: "2"
  }, {
    default: l(() => [
      s.props.label ? (n(), c(m, {
        key: 0,
        class: "text-subtitle-1 pa-2"
      }, {
        default: l(() => [
          h(d(s.props.label), 1)
        ]),
        _: 1
      })) : _("", !0),
      x(f, { class: "pa-4" }, {
        default: l(() => [
          t("div", k, [
            t("div", C, [
              e[1] || (e[1] = t("svg", {
                class: "compass-circle",
                viewBox: "0 0 64 64",
                xmlns: "http://www.w3.org/2000/svg"
              }, [
                t("circle", {
                  cx: "32",
                  cy: "32",
                  r: "31",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": "2"
                }),
                t("text", {
                  x: "32",
                  y: "10",
                  "text-anchor": "middle",
                  "font-size": "10",
                  "font-weight": "bold",
                  fill: "currentColor"
                }, "N"),
                t("text", {
                  x: "54",
                  y: "35",
                  "text-anchor": "middle",
                  "font-size": "10",
                  fill: "currentColor"
                }, "E"),
                t("text", {
                  x: "32",
                  y: "58",
                  "text-anchor": "middle",
                  "font-size": "10",
                  fill: "currentColor"
                }, "S"),
                t("text", {
                  x: "10",
                  y: "35",
                  "text-anchor": "middle",
                  "font-size": "10",
                  fill: "currentColor"
                }, "W")
              ], -1)),
              (n(), v("svg", {
                class: "compass-needle",
                viewBox: "0 0 8 62",
                xmlns: "http://www.w3.org/2000/svg",
                style: y({ transform: `rotate(${a.heading}deg)` })
              }, [...e[0] || (e[0] = [
                t("path", {
                  d: "M4 0L8 31L0 31L4 0Z",
                  fill: "#FF5252"
                }, null, -1),
                t("path", {
                  d: "M4 31L0 0L8 0L4 31Z",
                  fill: "#424242",
                  transform: "translate(0 31)"
                }, null, -1)
              ])], 4))
            ]),
            t("div", b, [
              t("span", L, d(p.displayHeading), 1),
              e[2] || (e[2] = t("span", { class: "degree-symbol" }, "°", -1))
            ])
          ])
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
const N = /* @__PURE__ */ g(w, [["render", z], ["__scopeId", "data-v-584da368"]]);
export {
  N as UICompass
};
