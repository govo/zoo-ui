'use strict';function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}//
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
      default: function _default() {
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
  data: function data() {
    return {
      selectedGameId: 0
    };
  },
  created: function created() {},
  computed: {
    _maxHeight: function _maxHeight() {
      return this.maxHeight || Math.max(window.innerHeight - 150, 200);
    },
    gameName: function gameName() {
      return this.findGamebyId(this.selectedGameId).name;
    }
  },
  mounted: function mounted() {},
  methods: {
    findGamebyId: function findGamebyId(gameId) {
      gameId = +gameId;
      var game = {};
      this.gameList.forEach(function (item) {
        if (item._id === gameId) {
          game = item;
        }
      });
      return game;
    },
    gameSelect: function gameSelect(gameId) {
      var game = this.findGamebyId(gameId);
      this.selectedGameId = gameId;
      this.$emit('change', game);
    }
  },
  components: {}
};function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
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
}function createInjectorSSR(context) {
    if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
    }
    if (!context)
        return () => { };
    if (!('styles' in context)) {
        context._styles = context._styles || {};
        Object.defineProperty(context, 'styles', {
            enumerable: true,
            get: () => context._renderStyles(context._styles)
        });
        context._renderStyles = context._renderStyles || renderStyles;
    }
    return (id, style) => addStyle(id, style, context);
}
function addStyle(id, css, context) {
    const group = css.media || 'default' ;
    const style = context._styles[group] || (context._styles[group] = { ids: [], css: '' });
    if (!style.ids.includes(id)) {
        style.media = css.media;
        style.ids.push(id);
        let code = css.source;
        style.css += code + '\n';
    }
}
function renderStyles(styles) {
    let css = '';
    for (const key in styles) {
        const style = styles[key];
        css +=
            '<style data-vue-ssr-id="' +
                Array.from(style.ids).join(' ') +
                '"' +
                (style.media ? ' media="' + style.media + '"' : '') +
                '>' +
                style.css +
                '</style>';
    }
    return css;
}/* script */
var __vue_script__$1 = script$1;
/* template */

var __vue_render__$1 = function __vue_render__() {
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
  }, [_vm._v("\n    " + _vm._s(_vm.gameName || '请选择游戏') + "\n    "), _vm.selectedGameId ? _c('span', {
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

var __vue_inject_styles__$1 = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-3de025b6_0", {
    source: ".zoo__game___selector{overflow-y:scroll}.zoo__game__game-id{font-size:.85;font-weight:400;color:#bbb}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$1 = undefined;
/* module identifier */

var __vue_module_identifier__$1 = "data-v-3de025b6";
/* functional template */

var __vue_is_functional_template__$1 = false;
/* style inject shadow dom */

var __vue_component__$1 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, undefined, createInjectorSSR, undefined);//
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
      default: function _default() {
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
  data: function data() {
    return {
      selectedGameId: 0
    };
  },
  created: function created() {},
  computed: {
    _maxHeight: function _maxHeight() {
      return this.maxHeight || Math.max(window.innerHeight - 150, 200);
    },
    gameName: function gameName() {
      return this.findGamebyId(this.selectedGameId).name;
    }
  },
  mounted: function mounted() {},
  methods: {
    findGamebyId: function findGamebyId(gameId) {
      gameId = +gameId;
      var game = {};
      this.gameList.forEach(function (item) {
        if (item._id === gameId) {
          game = item;
        }
      });
      return game;
    },
    gameSelect: function gameSelect(gameId) {
      var game = this.findGamebyId(gameId);
      this.selectedGameId = gameId;
      this.$emit('change', game);
    }
  },
  components: {}
};/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
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
  }, [_vm._v("\n    " + _vm._s(_vm.gameName || '请选择游戏') + "\n    "), _vm.selectedGameId ? _c('span', {
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

var __vue_inject_styles__ = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-b1c2cafa_0", {
    source: ".zoo__channel___selector{overflow-y:scroll}.zoo__channel__game-id{font-size:.85;font-weight:400;color:#bbb}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__ = undefined;
/* module identifier */

var __vue_module_identifier__ = "data-v-b1c2cafa";
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject shadow dom */

var __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, createInjectorSSR, undefined);/* eslint-disable import/prefer-default-export */var components$1=/*#__PURE__*/Object.freeze({__proto__:null,GameSelector: __vue_component__$1,ChannelSelector: __vue_component__});var install = function ZooUI(Vue) {
  Object.entries(components$1).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        componentName = _ref2[0],
        component = _ref2[1];

    Vue.component(componentName, component);
  });
}; // Create module definition for Vue.use()
var components=/*#__PURE__*/Object.freeze({__proto__:null,'default': install,GameSelector: __vue_component__$1,ChannelSelector: __vue_component__});// only expose one global var, with component exports exposed as properties of
// that global var (eg. plugin.component)

Object.entries(components).forEach(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      componentName = _ref2[0],
      component = _ref2[1];

  if (componentName !== 'default') {
    install[componentName] = component;
  }
});module.exports=install;