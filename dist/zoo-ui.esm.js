//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// @ is an alias to /src
var script$1 = {
  name: 'GameSelector',
  props: {
    gameList: {
      type: Array,

      default() {
        return [];
      }

    },
    gameId: {
      type: Number
    },
    maxHeight: {
      type: Number,
      default: 0
    }
  },
  data: function () {
    return {
      selectedGameId: 0
    };
  },

  created() {},

  computed: {
    _maxHeight() {
      return this.maxHeight || Math.max(window.innerHeight - 150, 200);
    },

    gameName() {
      return this.findGamebyId(this.selectedGameId).name;
    }

  },

  mounted() {},

  methods: {
    findGamebyId(gameId) {
      gameId = +gameId;
      let game = {};
      this.gameList.forEach(item => {
        if (item._id === gameId) {
          game = item;
        }
      });
      return game;
    },

    gameSelect(gameId) {
      let game = this.findGamebyId(gameId);
      this.selectedGameId = gameId;
      this.$emit('change', game);
    }

  },
  components: {}
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
const __vue_script__$1 = script$1;
/* template */

var __vue_render__$1 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('el-dropdown', {
    attrs: {
      "trigger": "click"
    },
    on: {
      "command": _vm.gameSelect
    }
  }, [_c('el-button', {
    staticClass: "nav-drop-btn",
    attrs: {
      "type": "text"
    }
  }, [_vm._v("\n    " + _vm._s(_vm.gameName || '???????????????') + "\n    "), _vm.selectedGameId ? _c('span', {
    staticClass: "zoo__game__game-id"
  }, [_vm._v("[" + _vm._s(_vm.selectedGameId) + "]")]) : _vm._e(), _vm._v(" "), _c('i', {
    staticClass: "el-icon-arrow-down el-icon--right"
  })]), _vm._v(" "), _c('el-dropdown-menu', {
    staticClass: "zoo__game___selector",
    style: 'max-height:' + _vm._maxHeight + 'px',
    attrs: {
      "slot": "dropdown"
    },
    slot: "dropdown"
  }, _vm._l(_vm.gameList, function (item) {
    return _c('el-dropdown-item', {
      key: item._id,
      attrs: {
        "command": item._id
      }
    }, [_vm._v("\n      " + _vm._s(item.name) + "\n      "), _c('span', {
      staticClass: "game-id"
    }, [_vm._v("- " + _vm._s(item._id))])]);
  }), 1)], 1);
};

var __vue_staticRenderFns__$1 = [];
/* style */

const __vue_inject_styles__$1 = function (inject) {
  if (!inject) return;
  inject("data-v-3de025b6_0", {
    source: ".zoo__game___selector{overflow-y:scroll}.zoo__game__game-id{font-size:.85;font-weight:400;color:#bbb}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$1 = undefined;
/* module identifier */

const __vue_module_identifier__$1 = undefined;
/* functional template */

const __vue_is_functional_template__$1 = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$1 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, createInjector, undefined, undefined);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// @ is an alias to /src
var script = {
  name: 'ChannelSelector',
  props: {
    gameList: {
      type: Array,

      default() {
        return [];
      }

    },
    gameId: {
      type: Number
    },
    maxHeight: {
      type: Number,
      default: 0
    }
  },
  data: function () {
    return {
      selectedGameId: 0
    };
  },

  created() {},

  computed: {
    _maxHeight() {
      return this.maxHeight || Math.max(window.innerHeight - 150, 200);
    },

    gameName() {
      return this.findGamebyId(this.selectedGameId).name;
    }

  },

  mounted() {},

  methods: {
    findGamebyId(gameId) {
      gameId = +gameId;
      let game = {};
      this.gameList.forEach(item => {
        if (item._id === gameId) {
          game = item;
        }
      });
      return game;
    },

    gameSelect(gameId) {
      let game = this.findGamebyId(gameId);
      this.selectedGameId = gameId;
      this.$emit('change', game);
    }

  },
  components: {}
};

/* script */
const __vue_script__ = script;
/* template */

var __vue_render__ = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('el-dropdown', {
    attrs: {
      "trigger": "click"
    },
    on: {
      "command": _vm.gameSelect
    }
  }, [_c('el-button', {
    staticClass: "nav-drop-btn",
    attrs: {
      "type": "text"
    }
  }, [_vm._v("\n    " + _vm._s(_vm.gameName || '???????????????') + "\n    "), _vm.selectedGameId ? _c('span', {
    staticClass: "zoo__channel__game-id"
  }, [_vm._v("[" + _vm._s(_vm.selectedGameId) + "]")]) : _vm._e(), _vm._v(" "), _c('i', {
    staticClass: "el-icon-arrow-down el-icon--right"
  })]), _vm._v(" "), _c('el-dropdown-menu', {
    staticClass: "zoo__channel___selector",
    style: 'max-height:' + _vm._maxHeight + 'px',
    attrs: {
      "slot": "dropdown"
    },
    slot: "dropdown"
  }, _vm._l(_vm.gameList, function (item) {
    return _c('el-dropdown-item', {
      key: item._id,
      attrs: {
        "command": item._id
      }
    }, [_vm._v("\n      " + _vm._s(item.name) + "\n      "), _c('span', {
      staticClass: "game-id"
    }, [_vm._v("- " + _vm._s(item._id))])]);
  }), 1)], 1);
};

var __vue_staticRenderFns__ = [];
/* style */

const __vue_inject_styles__ = function (inject) {
  if (!inject) return;
  inject("data-v-b1c2cafa_0", {
    source: ".zoo__channel___selector{overflow-y:scroll}.zoo__channel__game-id{font-size:.85;font-weight:400;color:#bbb}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__ = undefined;
/* module identifier */

const __vue_module_identifier__ = undefined;
/* functional template */

const __vue_is_functional_template__ = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, createInjector, undefined, undefined);

/* eslint-disable import/prefer-default-export */

var components = /*#__PURE__*/Object.freeze({
  __proto__: null,
  GameSelector: __vue_component__$1,
  ChannelSelector: __vue_component__
});

// Import vue components

const install = function ZooUI(Vue) {
  Object.entries(components).forEach(([componentName, component]) => {
    Vue.component(componentName, component);
  });
}; // Create module definition for Vue.use()

export default install;
export { __vue_component__ as ChannelSelector, __vue_component__$1 as GameSelector };
