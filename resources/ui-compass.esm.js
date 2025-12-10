(function(){"use strict";try{if(typeof document<"u"){var e=document.createElement("style");e.appendChild(document.createTextNode(".ui-compass-card[data-v-60251664]{width:100%;height:100%;display:flex;flex-direction:column}.compass-container[data-v-60251664]{display:flex;flex-direction:column;align-items:center;gap:1rem}.compass-visual[data-v-60251664]{position:relative;width:180px;height:180px;display:flex;align-items:center;justify-content:center}.compass-circle[data-v-60251664]{position:absolute;width:100%;height:100%;top:0;left:0}.compass-needle[data-v-60251664]{position:absolute;width:10%;height:100%;top:0;left:45%;transition:transform .3s ease-out;transform-origin:center center}.compass-display[data-v-60251664]{display:flex;align-items:center;justify-content:center;gap:.5rem;font-size:2rem;font-weight:300;line-height:1}.heading-value[data-v-60251664]{font-variant-numeric:tabular-nums}.cardinal-direction[data-v-60251664]{font-size:1.5rem;font-weight:500;opacity:.8}")),document.head.appendChild(e)}}catch(t){console.error("vite-plugin-css-injected-by-js",t)}})();
import { resolveComponent as d, createBlock as u, openBlock as r, withCtx as c, createCommentVNode as _, createVNode as g, createTextVNode as w, toDisplayString as l, createElementVNode as e, createElementBlock as s, Fragment as f, renderList as h, normalizeStyle as C } from "vue";
const N = (n, t) => {
  const i = n.__vccOpts || n;
  for (const [x, a] of t)
    i[x] = a;
  return i;
}, M = {
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
    },
    cardinalDirection() {
      const n = [
        "N",
        "NNE",
        "NE",
        "ENE",
        "E",
        "ESE",
        "SE",
        "SSE",
        "S",
        "SSW",
        "SW",
        "WSW",
        "W",
        "WNW",
        "NW",
        "NNW"
      ], t = Math.round(this.heading / 22.5) % 16;
      return n[t];
    }
  },
  created() {
    this.$dataTracker(this.id, (n) => {
      if (n && n.payload !== void 0) {
        const t = n.payload;
        typeof t == "number" && (this.heading = t);
      }
    });
  }
}, S = { class: "compass-container" }, k = { class: "compass-visual" }, E = {
  class: "compass-circle",
  viewBox: "-10 -10 120 120",
  xmlns: "http://www.w3.org/2000/svg"
}, W = ["x1", "y1", "x2", "y2"], b = ["x", "y"], z = { class: "compass-display" }, I = { class: "heading-value" }, L = { class: "cardinal-direction" };
function P(n, t, i, x, a, p) {
  const y = d("v-card-title"), m = d("v-card-text"), v = d("v-card");
  return r(), u(v, {
    class: "ui-compass-card",
    elevation: "2"
  }, {
    default: c(() => [
      i.props.label ? (r(), u(y, {
        key: 0,
        class: "text-subtitle-1 pa-2"
      }, {
        default: c(() => [
          w(l(i.props.label), 1)
        ]),
        _: 1
      })) : _("", !0),
      g(m, { class: "pa-4" }, {
        default: c(() => [
          e("div", S, [
            e("div", k, [
              (r(), s("svg", E, [
                t[0] || (t[0] = e("circle", {
                  cx: "50",
                  cy: "50",
                  r: "45",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": "2"
                }, null, -1)),
                (r(), s(f, null, h([0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330], (o) => e("line", {
                  key: o,
                  x1: 50 + 45 * Math.sin(o * Math.PI / 180),
                  y1: 50 - 45 * Math.cos(o * Math.PI / 180),
                  x2: 50 + 40 * Math.sin(o * Math.PI / 180),
                  y2: 50 - 40 * Math.cos(o * Math.PI / 180),
                  stroke: "currentColor",
                  "stroke-width": "1.5"
                }, null, 8, W)), 64)),
                t[1] || (t[1] = e("text", {
                  x: "50",
                  y: "18",
                  "text-anchor": "middle",
                  "font-size": "10",
                  "font-weight": "bold",
                  fill: "currentColor"
                }, "N", -1)),
                t[2] || (t[2] = e("text", {
                  x: "82",
                  y: "53",
                  "text-anchor": "middle",
                  "font-size": "10",
                  "font-weight": "bold",
                  fill: "currentColor"
                }, "E", -1)),
                t[3] || (t[3] = e("text", {
                  x: "50",
                  y: "86",
                  "text-anchor": "middle",
                  "font-size": "10",
                  "font-weight": "bold",
                  fill: "currentColor"
                }, "S", -1)),
                t[4] || (t[4] = e("text", {
                  x: "18",
                  y: "53",
                  "text-anchor": "middle",
                  "font-size": "10",
                  "font-weight": "bold",
                  fill: "currentColor"
                }, "W", -1)),
                t[5] || (t[5] = e("text", {
                  x: "73",
                  y: "30",
                  "text-anchor": "middle",
                  "font-size": "6",
                  fill: "currentColor",
                  opacity: "0.7"
                }, "NE", -1)),
                t[6] || (t[6] = e("text", {
                  x: "73",
                  y: "73",
                  "text-anchor": "middle",
                  "font-size": "6",
                  fill: "currentColor",
                  opacity: "0.7"
                }, "SE", -1)),
                t[7] || (t[7] = e("text", {
                  x: "27",
                  y: "73",
                  "text-anchor": "middle",
                  "font-size": "6",
                  fill: "currentColor",
                  opacity: "0.7"
                }, "SW", -1)),
                t[8] || (t[8] = e("text", {
                  x: "27",
                  y: "30",
                  "text-anchor": "middle",
                  "font-size": "6",
                  fill: "currentColor",
                  opacity: "0.7"
                }, "NW", -1)),
                (r(), s(f, null, h([0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330], (o) => e("text", {
                  key: `deg-${o}`,
                  x: 50 + 52 * Math.sin(o * Math.PI / 180),
                  y: 50 - 52 * Math.cos(o * Math.PI / 180) + 2,
                  "text-anchor": "middle",
                  "font-size": "5",
                  fill: "currentColor",
                  opacity: "0.6"
                }, l(o) + "°", 9, b)), 64))
              ])),
              (r(), s("svg", {
                class: "compass-needle",
                viewBox: "0 0 10 100",
                xmlns: "http://www.w3.org/2000/svg",
                style: C({ transform: `rotate(${a.heading}deg)` })
              }, [...t[9] || (t[9] = [
                e("path", {
                  d: "M5 0L9 48L1 48L5 0Z",
                  fill: "#FF5252"
                }, null, -1),
                e("path", {
                  d: "M5 52L1 48L9 48L5 52Z",
                  fill: "#424242"
                }, null, -1),
                e("circle", {
                  cx: "5",
                  cy: "50",
                  r: "3",
                  fill: "currentColor"
                }, null, -1)
              ])], 4))
            ]),
            e("div", z, [
              e("span", I, l(p.displayHeading) + "°", 1),
              e("span", L, l(p.cardinalDirection), 1)
            ])
          ])
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
const F = /* @__PURE__ */ N(M, [["render", P], ["__scopeId", "data-v-60251664"]]);
export {
  F as UICompass
};
