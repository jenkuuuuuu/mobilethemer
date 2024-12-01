var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name2 in all)
    __defProp(target, name2, { get: all[name2], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key2 of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key2) && key2 !== except)
        __defProp(to, key2, { get: () => from[key2], enumerable: !(desc = __getOwnPropDesc(from, key2)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// .svelte-kit/output/server/chunks/ssr.js
function noop() {
}
function run(fn) {
  return fn();
}
function blank_object() {
  return /* @__PURE__ */ Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function safe_not_equal(a2, b2) {
  return a2 != a2 ? b2 == b2 : a2 !== b2 || a2 && typeof a2 === "object" || typeof a2 === "function";
}
function subscribe(store, ...callbacks) {
  if (store == null) {
    for (const callback of callbacks) {
      callback(void 0);
    }
    return noop;
  }
  const unsub = store.subscribe(...callbacks);
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function compute_rest_props(props, keys) {
  const rest = {};
  keys = new Set(keys);
  for (const k in props) if (!keys.has(k) && k[0] !== "$") rest[k] = props[k];
  return rest;
}
function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
  return new CustomEvent(type, { detail, bubbles, cancelable });
}
function set_current_component(component4) {
  current_component = component4;
}
function get_current_component() {
  if (!current_component) throw new Error("Function called outside component initialization");
  return current_component;
}
function createEventDispatcher() {
  const component4 = get_current_component();
  return (type, detail, { cancelable = false } = {}) => {
    const callbacks = component4.$$.callbacks[type];
    if (callbacks) {
      const event = custom_event(
        /** @type {string} */
        type,
        detail,
        { cancelable }
      );
      callbacks.slice().forEach((fn) => {
        fn.call(component4, event);
      });
      return !event.defaultPrevented;
    }
    return true;
  };
}
function setContext(key2, context) {
  get_current_component().$$.context.set(key2, context);
  return context;
}
function getContext(key2) {
  return get_current_component().$$.context.get(key2);
}
function ensure_array_like(array_like_or_iterator) {
  return array_like_or_iterator?.length !== void 0 ? array_like_or_iterator : Array.from(array_like_or_iterator);
}
function escape(value, is_attr = false) {
  const str = String(value);
  const pattern2 = is_attr ? ATTR_REGEX : CONTENT_REGEX;
  pattern2.lastIndex = 0;
  let escaped2 = "";
  let last = 0;
  while (pattern2.test(str)) {
    const i2 = pattern2.lastIndex - 1;
    const ch = str[i2];
    escaped2 += str.substring(last, i2) + (ch === "&" ? "&amp;" : ch === '"' ? "&quot;" : "&lt;");
    last = i2 + 1;
  }
  return escaped2 + str.substring(last);
}
function spread(args, attrs_to_add) {
  const attributes = Object.assign({}, ...args);
  if (attrs_to_add) {
    const classes_to_add = attrs_to_add.classes;
    const styles_to_add = attrs_to_add.styles;
    if (classes_to_add) {
      if (attributes.class == null) {
        attributes.class = classes_to_add;
      } else {
        attributes.class += " " + classes_to_add;
      }
    }
    if (styles_to_add) {
      if (attributes.style == null) {
        attributes.style = style_object_to_string(styles_to_add);
      } else {
        attributes.style = style_object_to_string(
          merge_ssr_styles(attributes.style, styles_to_add)
        );
      }
    }
  }
  let str = "";
  Object.keys(attributes).forEach((name2) => {
    if (invalid_attribute_name_character.test(name2)) return;
    const value = attributes[name2];
    if (value === true) str += " " + name2;
    else if (boolean_attributes.has(name2.toLowerCase())) {
      if (value) str += " " + name2;
    } else if (value != null) {
      str += ` ${name2}="${value}"`;
    }
  });
  return str;
}
function merge_ssr_styles(style_attribute, style_directive) {
  const style_object = {};
  for (const individual_style of style_attribute.split(";")) {
    const colon_index = individual_style.indexOf(":");
    const name2 = individual_style.slice(0, colon_index).trim();
    const value = individual_style.slice(colon_index + 1).trim();
    if (!name2) continue;
    style_object[name2] = value;
  }
  for (const name2 in style_directive) {
    const value = style_directive[name2];
    if (value) {
      style_object[name2] = value;
    } else {
      delete style_object[name2];
    }
  }
  return style_object;
}
function escape_attribute_value(value) {
  const should_escape = typeof value === "string" || value && typeof value === "object";
  return should_escape ? escape(value, true) : value;
}
function escape_object(obj) {
  const result = {};
  for (const key2 in obj) {
    result[key2] = escape_attribute_value(obj[key2]);
  }
  return result;
}
function each(items, fn) {
  items = ensure_array_like(items);
  let str = "";
  for (let i2 = 0; i2 < items.length; i2 += 1) {
    str += fn(items[i2], i2);
  }
  return str;
}
function validate_component(component4, name2) {
  if (!component4 || !component4.$$render) {
    if (name2 === "svelte:component") name2 += " this={...}";
    throw new Error(
      `<${name2}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules. Otherwise you may need to fix a <${name2}>.`
    );
  }
  return component4;
}
function create_ssr_component(fn) {
  function $$render(result, props, bindings, slots, context) {
    const parent_component = current_component;
    const $$ = {
      on_destroy,
      context: new Map(context || (parent_component ? parent_component.$$.context : [])),
      // these will be immediately discarded
      on_mount: [],
      before_update: [],
      after_update: [],
      callbacks: blank_object()
    };
    set_current_component({ $$ });
    const html = fn(result, props, bindings, slots);
    set_current_component(parent_component);
    return html;
  }
  return {
    render: (props = {}, { $$slots = {}, context = /* @__PURE__ */ new Map() } = {}) => {
      on_destroy = [];
      const result = { title: "", head: "", css: /* @__PURE__ */ new Set() };
      const html = $$render(result, props, {}, $$slots, context);
      run_all(on_destroy);
      return {
        html,
        css: {
          code: Array.from(result.css).map((css2) => css2.code).join("\n"),
          map: null
          // TODO
        },
        head: result.title + result.head
      };
    },
    $$render
  };
}
function add_attribute(name2, value, boolean) {
  if (value == null || boolean && !value) return "";
  const assignment = boolean && value === true ? "" : `="${escape(value, true)}"`;
  return ` ${name2}${assignment}`;
}
function style_object_to_string(style_object) {
  return Object.keys(style_object).filter((key2) => style_object[key2] != null && style_object[key2] !== "").map((key2) => `${key2}: ${escape_attribute_value(style_object[key2])};`).join(" ");
}
function add_styles(style_object) {
  const styles2 = style_object_to_string(style_object);
  return styles2 ? ` style="${styles2}"` : "";
}
var current_component, _boolean_attributes, boolean_attributes, ATTR_REGEX, CONTENT_REGEX, invalid_attribute_name_character, missing_component, on_destroy;
var init_ssr = __esm({
  ".svelte-kit/output/server/chunks/ssr.js"() {
    _boolean_attributes = /** @type {const} */
    [
      "allowfullscreen",
      "allowpaymentrequest",
      "async",
      "autofocus",
      "autoplay",
      "checked",
      "controls",
      "default",
      "defer",
      "disabled",
      "formnovalidate",
      "hidden",
      "inert",
      "ismap",
      "loop",
      "multiple",
      "muted",
      "nomodule",
      "novalidate",
      "open",
      "playsinline",
      "readonly",
      "required",
      "reversed",
      "selected"
    ];
    boolean_attributes = /* @__PURE__ */ new Set([..._boolean_attributes]);
    ATTR_REGEX = /[&"<]/g;
    CONTENT_REGEX = /[&<]/g;
    invalid_attribute_name_character = /[\s'">/=\u{FDD0}-\u{FDEF}\u{FFFE}\u{FFFF}\u{1FFFE}\u{1FFFF}\u{2FFFE}\u{2FFFF}\u{3FFFE}\u{3FFFF}\u{4FFFE}\u{4FFFF}\u{5FFFE}\u{5FFFF}\u{6FFFE}\u{6FFFF}\u{7FFFE}\u{7FFFF}\u{8FFFE}\u{8FFFF}\u{9FFFE}\u{9FFFF}\u{AFFFE}\u{AFFFF}\u{BFFFE}\u{BFFFF}\u{CFFFE}\u{CFFFF}\u{DFFFE}\u{DFFFF}\u{EFFFE}\u{EFFFF}\u{FFFFE}\u{FFFFF}\u{10FFFE}\u{10FFFF}]/u;
    missing_component = {
      $$render: () => ""
    };
  }
});

// .svelte-kit/output/server/chunks/exports.js
function resolve(base2, path) {
  if (path[0] === "/" && path[1] === "/") return path;
  let url = new URL(base2, internal);
  url = new URL(path, url);
  return url.protocol === internal.protocol ? url.pathname + url.search + url.hash : url.href;
}
function normalize_path(path, trailing_slash) {
  if (path === "/" || trailing_slash === "ignore") return path;
  if (trailing_slash === "never") {
    return path.endsWith("/") ? path.slice(0, -1) : path;
  } else if (trailing_slash === "always" && !path.endsWith("/")) {
    return path + "/";
  }
  return path;
}
function decode_pathname(pathname) {
  return pathname.split("%25").map(decodeURI).join("%25");
}
function decode_params(params) {
  for (const key2 in params) {
    params[key2] = decodeURIComponent(params[key2]);
  }
  return params;
}
function make_trackable(url, callback, search_params_callback) {
  const tracked = new URL(url);
  Object.defineProperty(tracked, "searchParams", {
    value: new Proxy(tracked.searchParams, {
      get(obj, key2) {
        if (key2 === "get" || key2 === "getAll" || key2 === "has") {
          return (param) => {
            search_params_callback(param);
            return obj[key2](param);
          };
        }
        callback();
        const value = Reflect.get(obj, key2);
        return typeof value === "function" ? value.bind(obj) : value;
      }
    }),
    enumerable: true,
    configurable: true
  });
  for (const property of tracked_url_properties) {
    Object.defineProperty(tracked, property, {
      get() {
        callback();
        return url[property];
      },
      enumerable: true,
      configurable: true
    });
  }
  {
    tracked[Symbol.for("nodejs.util.inspect.custom")] = (depth, opts, inspect) => {
      return inspect(url, opts);
    };
  }
  {
    disable_hash(tracked);
  }
  return tracked;
}
function disable_hash(url) {
  allow_nodejs_console_log(url);
  Object.defineProperty(url, "hash", {
    get() {
      throw new Error(
        "Cannot access event.url.hash. Consider using `$page.url.hash` inside a component instead"
      );
    }
  });
}
function disable_search(url) {
  allow_nodejs_console_log(url);
  for (const property of ["search", "searchParams"]) {
    Object.defineProperty(url, property, {
      get() {
        throw new Error(`Cannot access url.${property} on a page with prerendering enabled`);
      }
    });
  }
}
function allow_nodejs_console_log(url) {
  {
    url[Symbol.for("nodejs.util.inspect.custom")] = (depth, opts, inspect) => {
      return inspect(new URL(url), opts);
    };
  }
}
function has_data_suffix(pathname) {
  return pathname.endsWith(DATA_SUFFIX) || pathname.endsWith(HTML_DATA_SUFFIX);
}
function add_data_suffix(pathname) {
  if (pathname.endsWith(".html")) return pathname.replace(/\.html$/, HTML_DATA_SUFFIX);
  return pathname.replace(/\/$/, "") + DATA_SUFFIX;
}
function strip_data_suffix(pathname) {
  if (pathname.endsWith(HTML_DATA_SUFFIX)) {
    return pathname.slice(0, -HTML_DATA_SUFFIX.length) + ".html";
  }
  return pathname.slice(0, -DATA_SUFFIX.length);
}
function validator(expected) {
  function validate(module, file) {
    if (!module) return;
    for (const key2 in module) {
      if (key2[0] === "_" || expected.has(key2)) continue;
      const values = [...expected.values()];
      const hint = hint_for_supported_files(key2, file?.slice(file.lastIndexOf("."))) ?? `valid exports are ${values.join(", ")}, or anything with a '_' prefix`;
      throw new Error(`Invalid export '${key2}'${file ? ` in ${file}` : ""} (${hint})`);
    }
  }
  return validate;
}
function hint_for_supported_files(key2, ext = ".js") {
  const supported_files = [];
  if (valid_layout_exports.has(key2)) {
    supported_files.push(`+layout${ext}`);
  }
  if (valid_page_exports.has(key2)) {
    supported_files.push(`+page${ext}`);
  }
  if (valid_layout_server_exports.has(key2)) {
    supported_files.push(`+layout.server${ext}`);
  }
  if (valid_page_server_exports.has(key2)) {
    supported_files.push(`+page.server${ext}`);
  }
  if (valid_server_exports.has(key2)) {
    supported_files.push(`+server${ext}`);
  }
  if (supported_files.length > 0) {
    return `'${key2}' is a valid export in ${supported_files.slice(0, -1).join(", ")}${supported_files.length > 1 ? " or " : ""}${supported_files.at(-1)}`;
  }
}
var internal, tracked_url_properties, DATA_SUFFIX, HTML_DATA_SUFFIX, valid_layout_exports, valid_page_exports, valid_layout_server_exports, valid_page_server_exports, valid_server_exports, validate_layout_exports, validate_page_exports, validate_layout_server_exports, validate_page_server_exports, validate_server_exports;
var init_exports = __esm({
  ".svelte-kit/output/server/chunks/exports.js"() {
    internal = new URL("sveltekit-internal://");
    tracked_url_properties = /** @type {const} */
    [
      "href",
      "pathname",
      "search",
      "toString",
      "toJSON"
    ];
    DATA_SUFFIX = "/__data.json";
    HTML_DATA_SUFFIX = ".html__data.json";
    valid_layout_exports = /* @__PURE__ */ new Set([
      "load",
      "prerender",
      "csr",
      "ssr",
      "trailingSlash",
      "config"
    ]);
    valid_page_exports = /* @__PURE__ */ new Set([...valid_layout_exports, "entries"]);
    valid_layout_server_exports = /* @__PURE__ */ new Set([...valid_layout_exports]);
    valid_page_server_exports = /* @__PURE__ */ new Set([...valid_layout_server_exports, "actions", "entries"]);
    valid_server_exports = /* @__PURE__ */ new Set([
      "GET",
      "POST",
      "PATCH",
      "PUT",
      "DELETE",
      "OPTIONS",
      "HEAD",
      "fallback",
      "prerender",
      "trailingSlash",
      "config",
      "entries"
    ]);
    validate_layout_exports = validator(valid_layout_exports);
    validate_page_exports = validator(valid_page_exports);
    validate_layout_server_exports = validator(valid_layout_server_exports);
    validate_page_server_exports = validator(valid_page_server_exports);
    validate_server_exports = validator(valid_server_exports);
  }
});

// ../../../node_modules/cookie/index.js
var require_cookie = __commonJS({
  "../../../node_modules/cookie/index.js"(exports) {
    "use strict";
    exports.parse = parse3;
    exports.serialize = serialize2;
    var __toString = Object.prototype.toString;
    var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
    function parse3(str, options2) {
      if (typeof str !== "string") {
        throw new TypeError("argument str must be a string");
      }
      var obj = {};
      var opt = options2 || {};
      var dec = opt.decode || decode;
      var index4 = 0;
      while (index4 < str.length) {
        var eqIdx = str.indexOf("=", index4);
        if (eqIdx === -1) {
          break;
        }
        var endIdx = str.indexOf(";", index4);
        if (endIdx === -1) {
          endIdx = str.length;
        } else if (endIdx < eqIdx) {
          index4 = str.lastIndexOf(";", eqIdx - 1) + 1;
          continue;
        }
        var key2 = str.slice(index4, eqIdx).trim();
        if (void 0 === obj[key2]) {
          var val = str.slice(eqIdx + 1, endIdx).trim();
          if (val.charCodeAt(0) === 34) {
            val = val.slice(1, -1);
          }
          obj[key2] = tryDecode(val, dec);
        }
        index4 = endIdx + 1;
      }
      return obj;
    }
    function serialize2(name2, val, options2) {
      var opt = options2 || {};
      var enc = opt.encode || encode2;
      if (typeof enc !== "function") {
        throw new TypeError("option encode is invalid");
      }
      if (!fieldContentRegExp.test(name2)) {
        throw new TypeError("argument name is invalid");
      }
      var value = enc(val);
      if (value && !fieldContentRegExp.test(value)) {
        throw new TypeError("argument val is invalid");
      }
      var str = name2 + "=" + value;
      if (null != opt.maxAge) {
        var maxAge = opt.maxAge - 0;
        if (isNaN(maxAge) || !isFinite(maxAge)) {
          throw new TypeError("option maxAge is invalid");
        }
        str += "; Max-Age=" + Math.floor(maxAge);
      }
      if (opt.domain) {
        if (!fieldContentRegExp.test(opt.domain)) {
          throw new TypeError("option domain is invalid");
        }
        str += "; Domain=" + opt.domain;
      }
      if (opt.path) {
        if (!fieldContentRegExp.test(opt.path)) {
          throw new TypeError("option path is invalid");
        }
        str += "; Path=" + opt.path;
      }
      if (opt.expires) {
        var expires = opt.expires;
        if (!isDate(expires) || isNaN(expires.valueOf())) {
          throw new TypeError("option expires is invalid");
        }
        str += "; Expires=" + expires.toUTCString();
      }
      if (opt.httpOnly) {
        str += "; HttpOnly";
      }
      if (opt.secure) {
        str += "; Secure";
      }
      if (opt.partitioned) {
        str += "; Partitioned";
      }
      if (opt.priority) {
        var priority = typeof opt.priority === "string" ? opt.priority.toLowerCase() : opt.priority;
        switch (priority) {
          case "low":
            str += "; Priority=Low";
            break;
          case "medium":
            str += "; Priority=Medium";
            break;
          case "high":
            str += "; Priority=High";
            break;
          default:
            throw new TypeError("option priority is invalid");
        }
      }
      if (opt.sameSite) {
        var sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
        switch (sameSite) {
          case true:
            str += "; SameSite=Strict";
            break;
          case "lax":
            str += "; SameSite=Lax";
            break;
          case "strict":
            str += "; SameSite=Strict";
            break;
          case "none":
            str += "; SameSite=None";
            break;
          default:
            throw new TypeError("option sameSite is invalid");
        }
      }
      return str;
    }
    function decode(str) {
      return str.indexOf("%") !== -1 ? decodeURIComponent(str) : str;
    }
    function encode2(val) {
      return encodeURIComponent(val);
    }
    function isDate(val) {
      return __toString.call(val) === "[object Date]" || val instanceof Date;
    }
    function tryDecode(str, decode2) {
      try {
        return decode2(str);
      } catch (e3) {
        return str;
      }
    }
  }
});

// .svelte-kit/output/server/entries/fallbacks/layout.svelte.js
var layout_svelte_exports = {};
__export(layout_svelte_exports, {
  default: () => Layout
});
var Layout;
var init_layout_svelte = __esm({
  ".svelte-kit/output/server/entries/fallbacks/layout.svelte.js"() {
    init_ssr();
    Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `${slots.default ? slots.default({}) : ``}`;
    });
  }
});

// .svelte-kit/output/server/nodes/0.js
var __exports = {};
__export(__exports, {
  component: () => component,
  fonts: () => fonts,
  imports: () => imports,
  index: () => index,
  stylesheets: () => stylesheets
});
var index, component_cache, component, imports, stylesheets, fonts;
var init__ = __esm({
  ".svelte-kit/output/server/nodes/0.js"() {
    index = 0;
    component = async () => component_cache ??= (await Promise.resolve().then(() => (init_layout_svelte(), layout_svelte_exports))).default;
    imports = ["_app/immutable/nodes/0.DPslNx2k.js", "_app/immutable/chunks/scheduler.DExV6eFp.js", "_app/immutable/chunks/index.Bd35QqEY.js"];
    stylesheets = [];
    fonts = [];
  }
});

// .svelte-kit/output/server/entries/fallbacks/error.svelte.js
var error_svelte_exports = {};
__export(error_svelte_exports, {
  default: () => Error$1
});
function get(key2, parse3 = JSON.parse) {
  try {
    return parse3(sessionStorage[key2]);
  } catch {
  }
}
var SNAPSHOT_KEY, SCROLL_KEY, getStores, page, Error$1;
var init_error_svelte = __esm({
  ".svelte-kit/output/server/entries/fallbacks/error.svelte.js"() {
    init_ssr();
    init_exports();
    SNAPSHOT_KEY = "sveltekit:snapshot";
    SCROLL_KEY = "sveltekit:scroll";
    get(SCROLL_KEY) ?? {};
    get(SNAPSHOT_KEY) ?? {};
    getStores = () => {
      const stores = getContext("__svelte__");
      return {
        /** @type {typeof page} */
        page: {
          subscribe: stores.page.subscribe
        },
        /** @type {typeof navigating} */
        navigating: {
          subscribe: stores.navigating.subscribe
        },
        /** @type {typeof updated} */
        updated: stores.updated
      };
    };
    page = {
      subscribe(fn) {
        const store = getStores().page;
        return store.subscribe(fn);
      }
    };
    Error$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $page, $$unsubscribe_page;
      $$unsubscribe_page = subscribe(page, (value) => $page = value);
      $$unsubscribe_page();
      return `<h1>${escape($page.status)}</h1> <p>${escape($page.error?.message)}</p>`;
    });
  }
});

// .svelte-kit/output/server/nodes/1.js
var __exports2 = {};
__export(__exports2, {
  component: () => component2,
  fonts: () => fonts2,
  imports: () => imports2,
  index: () => index2,
  stylesheets: () => stylesheets2
});
var index2, component_cache2, component2, imports2, stylesheets2, fonts2;
var init__2 = __esm({
  ".svelte-kit/output/server/nodes/1.js"() {
    index2 = 1;
    component2 = async () => component_cache2 ??= (await Promise.resolve().then(() => (init_error_svelte(), error_svelte_exports))).default;
    imports2 = ["_app/immutable/nodes/1.DPEOGG5l.js", "_app/immutable/chunks/scheduler.DExV6eFp.js", "_app/immutable/chunks/index.Bd35QqEY.js", "_app/immutable/chunks/entry.Br0ynyO8.js"];
    stylesheets2 = [];
    fonts2 = [];
  }
});

// node_modules/.pnpm/@fortawesome+free-solid-svg-icons@6.6.0/node_modules/@fortawesome/free-solid-svg-icons/index.mjs
var faFolder, faUser, faGift, faSquare, faCircle, faArrowLeft, faGear, faBell, faMagnifyingGlass, faChevronDown, faPlus, faChevronRight, faHashtag;
var init_free_solid_svg_icons = __esm({
  "node_modules/.pnpm/@fortawesome+free-solid-svg-icons@6.6.0/node_modules/@fortawesome/free-solid-svg-icons/index.mjs"() {
    faFolder = {
      prefix: "fas",
      iconName: "folder",
      icon: [512, 512, [128193, 128447, 61716, "folder-blank"], "f07b", "M64 480H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H288c-10.1 0-19.6-4.7-25.6-12.8L243.2 57.6C231.1 41.5 212.1 32 192 32H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64z"]
    };
    faUser = {
      prefix: "fas",
      iconName: "user",
      icon: [448, 512, [128100, 62144], "f007", "M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"]
    };
    faGift = {
      prefix: "fas",
      iconName: "gift",
      icon: [512, 512, [127873], "f06b", "M190.5 68.8L225.3 128l-1.3 0-72 0c-22.1 0-40-17.9-40-40s17.9-40 40-40l2.2 0c14.9 0 28.8 7.9 36.3 20.8zM64 88c0 14.4 3.5 28 9.6 40L32 128c-17.7 0-32 14.3-32 32l0 64c0 17.7 14.3 32 32 32l448 0c17.7 0 32-14.3 32-32l0-64c0-17.7-14.3-32-32-32l-41.6 0c6.1-12 9.6-25.6 9.6-40c0-48.6-39.4-88-88-88l-2.2 0c-31.9 0-61.5 16.9-77.7 44.4L256 85.5l-24.1-41C215.7 16.9 186.1 0 154.2 0L152 0C103.4 0 64 39.4 64 88zm336 0c0 22.1-17.9 40-40 40l-72 0-1.3 0 34.8-59.2C329.1 55.9 342.9 48 357.8 48l2.2 0c22.1 0 40 17.9 40 40zM32 288l0 176c0 26.5 21.5 48 48 48l144 0 0-224L32 288zM288 512l144 0c26.5 0 48-21.5 48-48l0-176-192 0 0 224z"]
    };
    faSquare = {
      prefix: "fas",
      iconName: "square",
      icon: [448, 512, [9632, 9723, 9724, 61590], "f0c8", "M0 96C0 60.7 28.7 32 64 32H384c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96z"]
    };
    faCircle = {
      prefix: "fas",
      iconName: "circle",
      icon: [512, 512, [128308, 128309, 128992, 128993, 128994, 128995, 128996, 9679, 9898, 9899, 11044, 61708, 61915], "f111", "M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"]
    };
    faArrowLeft = {
      prefix: "fas",
      iconName: "arrow-left",
      icon: [448, 512, [8592], "f060", "M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"]
    };
    faGear = {
      prefix: "fas",
      iconName: "gear",
      icon: [512, 512, [9881, "cog"], "f013", "M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z"]
    };
    faBell = {
      prefix: "fas",
      iconName: "bell",
      icon: [448, 512, [128276, 61602], "f0f3", "M224 0c-17.7 0-32 14.3-32 32l0 19.2C119 66 64 130.6 64 208l0 18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416l384 0c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8l0-18.8c0-77.4-55-142-128-156.8L256 32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3l-64 0-64 0c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z"]
    };
    faMagnifyingGlass = {
      prefix: "fas",
      iconName: "magnifying-glass",
      icon: [512, 512, [128269, "search"], "f002", "M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"]
    };
    faChevronDown = {
      prefix: "fas",
      iconName: "chevron-down",
      icon: [512, 512, [], "f078", "M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"]
    };
    faPlus = {
      prefix: "fas",
      iconName: "plus",
      icon: [448, 512, [10133, 61543, "add"], "2b", "M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"]
    };
    faChevronRight = {
      prefix: "fas",
      iconName: "chevron-right",
      icon: [320, 512, [9002], "f054", "M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"]
    };
    faHashtag = {
      prefix: "fas",
      iconName: "hashtag",
      icon: [448, 512, [62098], "23", "M181.3 32.4c17.4 2.9 29.2 19.4 26.3 36.8L197.8 128l95.1 0 11.5-69.3c2.9-17.4 19.4-29.2 36.8-26.3s29.2 19.4 26.3 36.8L357.8 128l58.2 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-68.9 0L325.8 320l58.2 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-68.9 0-11.5 69.3c-2.9 17.4-19.4 29.2-36.8 26.3s-29.2-19.4-26.3-36.8l9.8-58.7-95.1 0-11.5 69.3c-2.9 17.4-19.4 29.2-36.8 26.3s-29.2-19.4-26.3-36.8L90.2 384 32 384c-17.7 0-32-14.3-32-32s14.3-32 32-32l68.9 0 21.3-128L64 192c-17.7 0-32-14.3-32-32s14.3-32 32-32l68.9 0 11.5-69.3c2.9-17.4 19.4-29.2 36.8-26.3zM187.1 192L165.8 320l95.1 0 21.3-128-95.1 0z"]
    };
  }
});

// .svelte-kit/output/server/entries/pages/_page.svelte.js
var page_svelte_exports = {};
__export(page_svelte_exports, {
  default: () => Page
});
function schedule_update() {
  if (!update_scheduled) {
    update_scheduled = true;
    resolved_promise.then(flush);
  }
}
function tick() {
  schedule_update();
  return resolved_promise;
}
function add_render_callback(fn) {
  render_callbacks.push(fn);
}
function flush() {
  if (flushidx !== 0) {
    return;
  }
  const saved_component = current_component;
  do {
    try {
      while (flushidx < dirty_components.length) {
        const component4 = dirty_components[flushidx];
        flushidx++;
        set_current_component(component4);
        update(component4.$$);
      }
    } catch (e23) {
      dirty_components.length = 0;
      flushidx = 0;
      throw e23;
    }
    set_current_component(null);
    dirty_components.length = 0;
    flushidx = 0;
    while (binding_callbacks.length) binding_callbacks.pop()();
    for (let i2 = 0; i2 < render_callbacks.length; i2 += 1) {
      const callback = render_callbacks[i2];
      if (!seen_callbacks.has(callback)) {
        seen_callbacks.add(callback);
        callback();
      }
    }
    render_callbacks.length = 0;
  } while (dirty_components.length);
  while (flush_callbacks.length) {
    flush_callbacks.pop()();
  }
  update_scheduled = false;
  seen_callbacks.clear();
  set_current_component(saved_component);
}
function update($$) {
  if ($$.fragment !== null) {
    $$.update();
    run_all($$.before_update);
    const dirty = $$.dirty;
    $$.dirty = [-1];
    $$.fragment && $$.fragment.p($$.ctx, dirty);
    $$.after_update.forEach(add_render_callback);
  }
}
function classList(props) {
  const {
    beat,
    fade,
    beatFade,
    bounce,
    shake,
    flash,
    spin,
    spinPulse,
    spinReverse,
    pulse,
    fixedWidth,
    inverse,
    border,
    listItem,
    flip,
    size,
    rotation,
    pull
  } = props;
  const classes = {
    "fa-beat": beat,
    "fa-fade": fade,
    "fa-beat-fade": beatFade,
    "fa-bounce": bounce,
    "fa-shake": shake,
    "fa-flash": flash,
    "fa-spin": spin,
    "fa-spin-reverse": spinReverse,
    "fa-spin-pulse": spinPulse,
    "fa-pulse": pulse,
    "fa-fw": fixedWidth,
    "fa-inverse": inverse,
    "fa-border": border,
    "fa-li": listItem,
    "fa-flip": flip === true,
    "fa-flip-horizontal": flip === "horizontal" || flip === "both",
    "fa-flip-vertical": flip === "vertical" || flip === "both",
    [`fa-${size}`]: typeof size !== "undefined" && size !== null,
    [`fa-rotate-${rotation}`]: typeof rotation !== "undefined" && rotation !== null && rotation !== 0,
    [`fa-pull-${pull}`]: typeof pull !== "undefined" && pull !== null,
    "fa-swap-opacity": props.swapOpacity
  };
  return Object.keys(classes).map((key2) => classes[key2] ? key2 : null).filter((key2) => key2);
}
function _isNumerical(obj) {
  obj = obj - 0;
  return obj === obj;
}
function camelize(string) {
  if (_isNumerical(string)) {
    return string;
  }
  string = string.replace(/[\-_\s]+(.)?/g, function(match, chr) {
    return chr ? chr.toUpperCase() : "";
  });
  return string.substr(0, 1).toLowerCase() + string.substr(1);
}
function styleToString(style) {
  if (typeof style === "string") {
    return style;
  }
  return Object.keys(style).reduce((acc, key2) => acc + key2.split(/(?=[A-Z])/).join("-").toLowerCase() + ":" + style[key2] + ";", "");
}
function convert(createElement2, element, extraProps = {}) {
  if (typeof element === "string") {
    return element;
  }
  const children = (element.children || []).map((child) => {
    return convert(createElement2, child);
  });
  const mixins = Object.keys(element.attributes || {}).reduce(
    (acc, key2) => {
      const val = element.attributes[key2];
      if (key2 === "style") {
        acc.attrs["style"] = styleToString(val);
      } else {
        if (key2.indexOf("aria-") === 0 || key2.indexOf("data-") === 0) {
          acc.attrs[key2.toLowerCase()] = val;
        } else {
          acc.attrs[camelize(key2)] = val;
        }
      }
      return acc;
    },
    { attrs: {} }
  );
  return createElement2(element.tag, { ...mixins.attrs }, children);
}
function familyProxy(obj) {
  return new Proxy(obj, {
    get(target, prop) {
      return prop in target ? target[prop] : target[a$1];
    }
  });
}
function getAttrConfig(attr) {
  var element = DOCUMENT.querySelector("script[" + attr + "]");
  if (element) {
    return element.getAttribute(attr);
  }
}
function coerce(val) {
  if (val === "") return true;
  if (val === "false") return false;
  if (val === "true") return true;
  return val;
}
function onChange(cb) {
  _onChangeCb.push(cb);
  return () => {
    _onChangeCb.splice(_onChangeCb.indexOf(cb), 1);
  };
}
function insertCss(css2) {
  if (!css2 || !IS_DOM) {
    return;
  }
  const style = DOCUMENT.createElement("style");
  style.setAttribute("type", "text/css");
  style.innerHTML = css2;
  const headChildren = DOCUMENT.head.childNodes;
  let beforeChild = null;
  for (let i2 = headChildren.length - 1; i2 > -1; i2--) {
    const child = headChildren[i2];
    const tagName = (child.tagName || "").toUpperCase();
    if (["STYLE", "LINK"].indexOf(tagName) > -1) {
      beforeChild = child;
    }
  }
  DOCUMENT.head.insertBefore(style, beforeChild);
  return css2;
}
function nextUniqueId() {
  let size = 12;
  let id = "";
  while (size-- > 0) {
    id += idPool[Math.random() * 62 | 0];
  }
  return id;
}
function toArray(obj) {
  const array2 = [];
  for (let i2 = (obj || []).length >>> 0; i2--; ) {
    array2[i2] = obj[i2];
  }
  return array2;
}
function classArray(node) {
  if (node.classList) {
    return toArray(node.classList);
  } else {
    return (node.getAttribute("class") || "").split(" ").filter((i2) => i2);
  }
}
function htmlEscape(str) {
  return "".concat(str).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function joinAttributes(attributes) {
  return Object.keys(attributes || {}).reduce((acc, attributeName) => {
    return acc + "".concat(attributeName, '="').concat(htmlEscape(attributes[attributeName]), '" ');
  }, "").trim();
}
function joinStyles(styles2) {
  return Object.keys(styles2 || {}).reduce((acc, styleName) => {
    return acc + "".concat(styleName, ": ").concat(styles2[styleName].trim(), ";");
  }, "");
}
function transformIsMeaningful(transform) {
  return transform.size !== meaninglessTransform.size || transform.x !== meaninglessTransform.x || transform.y !== meaninglessTransform.y || transform.rotate !== meaninglessTransform.rotate || transform.flipX || transform.flipY;
}
function transformForSvg(_ref) {
  let {
    transform,
    containerWidth,
    iconWidth
  } = _ref;
  const outer = {
    transform: "translate(".concat(containerWidth / 2, " 256)")
  };
  const innerTranslate = "translate(".concat(transform.x * 32, ", ").concat(transform.y * 32, ") ");
  const innerScale = "scale(".concat(transform.size / 16 * (transform.flipX ? -1 : 1), ", ").concat(transform.size / 16 * (transform.flipY ? -1 : 1), ") ");
  const innerRotate = "rotate(".concat(transform.rotate, " 0 0)");
  const inner = {
    transform: "".concat(innerTranslate, " ").concat(innerScale, " ").concat(innerRotate)
  };
  const path = {
    transform: "translate(".concat(iconWidth / 2 * -1, " -256)")
  };
  return {
    outer,
    inner,
    path
  };
}
function transformForCss(_ref2) {
  let {
    transform,
    width = UNITS_IN_GRID,
    height = UNITS_IN_GRID,
    startCentered = false
  } = _ref2;
  let val = "";
  if (startCentered && IS_IE) {
    val += "translate(".concat(transform.x / d$2 - width / 2, "em, ").concat(transform.y / d$2 - height / 2, "em) ");
  } else if (startCentered) {
    val += "translate(calc(-50% + ".concat(transform.x / d$2, "em), calc(-50% + ").concat(transform.y / d$2, "em)) ");
  } else {
    val += "translate(".concat(transform.x / d$2, "em, ").concat(transform.y / d$2, "em) ");
  }
  val += "scale(".concat(transform.size / d$2 * (transform.flipX ? -1 : 1), ", ").concat(transform.size / d$2 * (transform.flipY ? -1 : 1), ") ");
  val += "rotate(".concat(transform.rotate, "deg) ");
  return val;
}
function css$a() {
  const dcp = DEFAULT_CSS_PREFIX;
  const drc = DEFAULT_REPLACEMENT_CLASS;
  const fp = config.cssPrefix;
  const rc = config.replacementClass;
  let s22 = baseStyles;
  if (fp !== dcp || rc !== drc) {
    const dPatt = new RegExp("\\.".concat(dcp, "\\-"), "g");
    const customPropPatt = new RegExp("\\--".concat(dcp, "\\-"), "g");
    const rPatt = new RegExp("\\.".concat(drc), "g");
    s22 = s22.replace(dPatt, ".".concat(fp, "-")).replace(customPropPatt, "--".concat(fp, "-")).replace(rPatt, ".".concat(rc));
  }
  return s22;
}
function ensureCss() {
  if (config.autoAddCss && !_cssInserted) {
    insertCss(css$a());
    _cssInserted = true;
  }
}
function domready(fn) {
  if (!IS_DOM) return;
  loaded ? setTimeout(fn, 0) : functions.push(fn);
}
function toHtml(abstractNodes) {
  const {
    tag,
    attributes = {},
    children = []
  } = abstractNodes;
  if (typeof abstractNodes === "string") {
    return htmlEscape(abstractNodes);
  } else {
    return "<".concat(tag, " ").concat(joinAttributes(attributes), ">").concat(children.map(toHtml).join(""), "</").concat(tag, ">");
  }
}
function iconFromMapping(mapping, prefix, iconName) {
  if (mapping && mapping[prefix] && mapping[prefix][iconName]) {
    return {
      prefix,
      iconName,
      icon: mapping[prefix][iconName]
    };
  }
}
function ucs2decode(string) {
  const output = [];
  let counter = 0;
  const length = string.length;
  while (counter < length) {
    const value = string.charCodeAt(counter++);
    if (value >= 55296 && value <= 56319 && counter < length) {
      const extra = string.charCodeAt(counter++);
      if ((extra & 64512) == 56320) {
        output.push(((value & 1023) << 10) + (extra & 1023) + 65536);
      } else {
        output.push(value);
        counter--;
      }
    } else {
      output.push(value);
    }
  }
  return output;
}
function toHex(unicode) {
  const decoded = ucs2decode(unicode);
  return decoded.length === 1 ? decoded[0].toString(16) : null;
}
function codePointAt(string, index4) {
  const size = string.length;
  let first = string.charCodeAt(index4);
  let second;
  if (first >= 55296 && first <= 56319 && size > index4 + 1) {
    second = string.charCodeAt(index4 + 1);
    if (second >= 56320 && second <= 57343) {
      return (first - 55296) * 1024 + second - 56320 + 65536;
    }
  }
  return first;
}
function normalizeIcons(icons) {
  return Object.keys(icons).reduce((acc, iconName) => {
    const icon2 = icons[iconName];
    const expanded = !!icon2.icon;
    if (expanded) {
      acc[icon2.iconName] = icon2.icon;
    } else {
      acc[iconName] = icon2;
    }
    return acc;
  }, {});
}
function defineIcons(prefix, icons) {
  let params = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  const {
    skipHooks = false
  } = params;
  const normalized = normalizeIcons(icons);
  if (typeof namespace.hooks.addPack === "function" && !skipHooks) {
    namespace.hooks.addPack(prefix, normalizeIcons(icons));
  } else {
    namespace.styles[prefix] = {
      ...namespace.styles[prefix] || {},
      ...normalized
    };
  }
  if (prefix === "fas") {
    defineIcons("fa", icons);
  }
}
function isReserved(name2) {
  return ~RESERVED_CLASSES.indexOf(name2);
}
function getIconName(cssPrefix, cls) {
  const parts = cls.split("-");
  const prefix = parts[0];
  const iconName = parts.slice(1).join("-");
  if (prefix === cssPrefix && iconName !== "" && !isReserved(iconName)) {
    return iconName;
  } else {
    return null;
  }
}
function byUnicode(prefix, unicode) {
  return (_byUnicode[prefix] || {})[unicode];
}
function byLigature(prefix, ligature) {
  return (_byLigature[prefix] || {})[ligature];
}
function byAlias(prefix, alias) {
  return (_byAlias[prefix] || {})[alias];
}
function byOldName(name2) {
  return _byOldName[name2] || {
    prefix: null,
    iconName: null
  };
}
function byOldUnicode(unicode) {
  const oldUnicode = _byOldUnicode[unicode];
  const newUnicode = byUnicode("fas", unicode);
  return oldUnicode || (newUnicode ? {
    prefix: "fas",
    iconName: newUnicode
  } : null) || {
    prefix: null,
    iconName: null
  };
}
function getDefaultUsablePrefix() {
  return _defaultUsablePrefix;
}
function getCanonicalPrefix(styleOrPrefix) {
  let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  const {
    family = a$1
  } = params;
  const style = PREFIX_TO_STYLE[family][styleOrPrefix];
  const prefix = STYLE_TO_PREFIX[family][styleOrPrefix] || STYLE_TO_PREFIX[family][style];
  const defined = styleOrPrefix in namespace.styles ? styleOrPrefix : null;
  const result = prefix || defined || null;
  return result;
}
function getCanonicalIcon(values) {
  let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  const {
    skipLookups = false
  } = params;
  const famProps = {
    [a$1]: "".concat(config.cssPrefix, "-").concat(a$1),
    [r$1]: "".concat(config.cssPrefix, "-").concat(r$1),
    [o$1]: "".concat(config.cssPrefix, "-").concat(o$1)
  };
  let givenPrefix = null;
  let family = a$1;
  const nonDuotoneFamilyIds = c$1.filter((familyId) => familyId !== t$1);
  nonDuotoneFamilyIds.forEach((familyId) => {
    if (values.includes(famProps[familyId]) || values.some((v$$1) => PREFIXES_FOR_FAMILY[familyId].includes(v$$1))) {
      family = familyId;
    }
  });
  const canonical = values.reduce((acc, cls) => {
    const iconName = getIconName(config.cssPrefix, cls);
    if (styles[cls]) {
      cls = LONG_STYLE[family].includes(cls) ? LONG_STYLE_TO_PREFIX[family][cls] : cls;
      givenPrefix = cls;
      acc.prefix = cls;
    } else if (PREFIXES[family].indexOf(cls) > -1) {
      givenPrefix = cls;
      acc.prefix = getCanonicalPrefix(cls, {
        family
      });
    } else if (iconName) {
      acc.iconName = iconName;
    } else if (cls !== config.replacementClass && !nonDuotoneFamilyIds.some((familyName) => cls === famProps[familyName])) {
      acc.rest.push(cls);
    }
    if (!skipLookups && acc.prefix && acc.iconName) {
      const shim = givenPrefix === "fa" ? byOldName(acc.iconName) : {};
      const aliasIconName = byAlias(acc.prefix, acc.iconName);
      if (shim.prefix) {
        givenPrefix = null;
      }
      acc.iconName = shim.iconName || aliasIconName || acc.iconName;
      acc.prefix = shim.prefix || acc.prefix;
      if (acc.prefix === "far" && !styles["far"] && styles["fas"] && !config.autoFetchSvg) {
        acc.prefix = "fas";
      }
    }
    return acc;
  }, emptyCanonicalIcon());
  if (values.includes("fa-brands") || values.includes("fab")) {
    canonical.prefix = "fab";
  }
  if (values.includes("fa-duotone") || values.includes("fad")) {
    canonical.prefix = "fad";
  }
  if (!canonical.prefix && family === r$1 && (styles["fass"] || config.autoFetchSvg)) {
    canonical.prefix = "fass";
    canonical.iconName = byAlias(canonical.prefix, canonical.iconName) || canonical.iconName;
  }
  if (!canonical.prefix && family === o$1 && (styles["fasds"] || config.autoFetchSvg)) {
    canonical.prefix = "fasds";
    canonical.iconName = byAlias(canonical.prefix, canonical.iconName) || canonical.iconName;
  }
  if (canonical.prefix === "fa" || givenPrefix === "fa") {
    canonical.prefix = getDefaultUsablePrefix() || "fas";
  }
  return canonical;
}
function registerPlugins(nextPlugins, _ref) {
  let {
    mixoutsTo: obj
  } = _ref;
  _plugins = nextPlugins;
  _hooks = {};
  Object.keys(providers).forEach((k) => {
    if (defaultProviderKeys.indexOf(k) === -1) {
      delete providers[k];
    }
  });
  _plugins.forEach((plugin) => {
    const mixout = plugin.mixout ? plugin.mixout() : {};
    Object.keys(mixout).forEach((tk) => {
      if (typeof mixout[tk] === "function") {
        obj[tk] = mixout[tk];
      }
      if (typeof mixout[tk] === "object") {
        Object.keys(mixout[tk]).forEach((sk) => {
          if (!obj[tk]) {
            obj[tk] = {};
          }
          obj[tk][sk] = mixout[tk][sk];
        });
      }
    });
    if (plugin.hooks) {
      const hooks = plugin.hooks();
      Object.keys(hooks).forEach((hook) => {
        if (!_hooks[hook]) {
          _hooks[hook] = [];
        }
        _hooks[hook].push(hooks[hook]);
      });
    }
    if (plugin.provides) {
      plugin.provides(providers);
    }
  });
  return obj;
}
function chainHooks(hook, accumulator) {
  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }
  const hookFns = _hooks[hook] || [];
  hookFns.forEach((hookFn) => {
    accumulator = hookFn.apply(null, [accumulator, ...args]);
  });
  return accumulator;
}
function callHooks(hook) {
  for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    args[_key2 - 1] = arguments[_key2];
  }
  const hookFns = _hooks[hook] || [];
  hookFns.forEach((hookFn) => {
    hookFn.apply(null, args);
  });
  return void 0;
}
function callProvided() {
  const hook = arguments[0];
  const args = Array.prototype.slice.call(arguments, 1);
  return providers[hook] ? providers[hook].apply(null, args) : void 0;
}
function findIconDefinition(iconLookup) {
  if (iconLookup.prefix === "fa") {
    iconLookup.prefix = "fas";
  }
  let {
    iconName
  } = iconLookup;
  const prefix = iconLookup.prefix || getDefaultUsablePrefix();
  if (!iconName) return;
  iconName = byAlias(prefix, iconName) || iconName;
  return iconFromMapping(library.definitions, prefix, iconName) || iconFromMapping(namespace.styles, prefix, iconName);
}
function domVariants(val, abstractCreator) {
  Object.defineProperty(val, "abstract", {
    get: abstractCreator
  });
  Object.defineProperty(val, "html", {
    get: function() {
      return val.abstract.map((a2) => toHtml(a2));
    }
  });
  Object.defineProperty(val, "node", {
    get: function() {
      if (!IS_DOM) return;
      const container = DOCUMENT.createElement("div");
      container.innerHTML = val.html;
      return container.children;
    }
  });
  return val;
}
function asIcon(_ref) {
  let {
    children,
    main,
    mask,
    attributes,
    styles: styles2,
    transform
  } = _ref;
  if (transformIsMeaningful(transform) && main.found && !mask.found) {
    const {
      width,
      height
    } = main;
    const offset = {
      x: width / height / 2,
      y: 0.5
    };
    attributes["style"] = joinStyles({
      ...styles2,
      "transform-origin": "".concat(offset.x + transform.x / 16, "em ").concat(offset.y + transform.y / 16, "em")
    });
  }
  return [{
    tag: "svg",
    attributes,
    children
  }];
}
function asSymbol(_ref) {
  let {
    prefix,
    iconName,
    children,
    attributes,
    symbol
  } = _ref;
  const id = symbol === true ? "".concat(prefix, "-").concat(config.cssPrefix, "-").concat(iconName) : symbol;
  return [{
    tag: "svg",
    attributes: {
      style: "display: none;"
    },
    children: [{
      tag: "symbol",
      attributes: {
        ...attributes,
        id
      },
      children
    }]
  }];
}
function makeInlineSvgAbstract(params) {
  const {
    icons: {
      main,
      mask
    },
    prefix,
    iconName,
    transform,
    symbol,
    title,
    maskId,
    titleId,
    extra,
    watchable = false
  } = params;
  const {
    width,
    height
  } = mask.found ? mask : main;
  const isUploadedIcon = prefix === "fak";
  const attrClass = [config.replacementClass, iconName ? "".concat(config.cssPrefix, "-").concat(iconName) : ""].filter((c22) => extra.classes.indexOf(c22) === -1).filter((c22) => c22 !== "" || !!c22).concat(extra.classes).join(" ");
  let content = {
    children: [],
    attributes: {
      ...extra.attributes,
      "data-prefix": prefix,
      "data-icon": iconName,
      "class": attrClass,
      "role": extra.attributes.role || "img",
      "xmlns": "http://www.w3.org/2000/svg",
      "viewBox": "0 0 ".concat(width, " ").concat(height)
    }
  };
  const uploadedIconWidthStyle = isUploadedIcon && !~extra.classes.indexOf("fa-fw") ? {
    width: "".concat(width / height * 16 * 0.0625, "em")
  } : {};
  if (watchable) {
    content.attributes[DATA_FA_I2SVG] = "";
  }
  if (title) {
    content.children.push({
      tag: "title",
      attributes: {
        id: content.attributes["aria-labelledby"] || "title-".concat(titleId || nextUniqueId())
      },
      children: [title]
    });
    delete content.attributes.title;
  }
  const args = {
    ...content,
    prefix,
    iconName,
    main,
    mask,
    maskId,
    transform,
    symbol,
    styles: {
      ...uploadedIconWidthStyle,
      ...extra.styles
    }
  };
  const {
    children,
    attributes
  } = mask.found && main.found ? callProvided("generateAbstractMask", args) || {
    children: [],
    attributes: {}
  } : callProvided("generateAbstractIcon", args) || {
    children: [],
    attributes: {}
  };
  args.children = children;
  args.attributes = attributes;
  if (symbol) {
    return asSymbol(args);
  } else {
    return asIcon(args);
  }
}
function makeLayersTextAbstract(params) {
  const {
    content,
    width,
    height,
    transform,
    title,
    extra,
    watchable = false
  } = params;
  const attributes = {
    ...extra.attributes,
    ...title ? {
      "title": title
    } : {},
    "class": extra.classes.join(" ")
  };
  if (watchable) {
    attributes[DATA_FA_I2SVG] = "";
  }
  const styles2 = {
    ...extra.styles
  };
  if (transformIsMeaningful(transform)) {
    styles2["transform"] = transformForCss({
      transform,
      startCentered: true,
      width,
      height
    });
    styles2["-webkit-transform"] = styles2["transform"];
  }
  const styleString = joinStyles(styles2);
  if (styleString.length > 0) {
    attributes["style"] = styleString;
  }
  const val = [];
  val.push({
    tag: "span",
    attributes,
    children: [content]
  });
  if (title) {
    val.push({
      tag: "span",
      attributes: {
        class: "sr-only"
      },
      children: [title]
    });
  }
  return val;
}
function makeLayersCounterAbstract(params) {
  const {
    content,
    title,
    extra
  } = params;
  const attributes = {
    ...extra.attributes,
    ...title ? {
      "title": title
    } : {},
    "class": extra.classes.join(" ")
  };
  const styleString = joinStyles(extra.styles);
  if (styleString.length > 0) {
    attributes["style"] = styleString;
  }
  const val = [];
  val.push({
    tag: "span",
    attributes,
    children: [content]
  });
  if (title) {
    val.push({
      tag: "span",
      attributes: {
        class: "sr-only"
      },
      children: [title]
    });
  }
  return val;
}
function asFoundIcon(icon2) {
  const width = icon2[0];
  const height = icon2[1];
  const [vectorData] = icon2.slice(4);
  let element = null;
  if (Array.isArray(vectorData)) {
    element = {
      tag: "g",
      attributes: {
        class: "".concat(config.cssPrefix, "-").concat(DUOTONE_CLASSES.GROUP)
      },
      children: [{
        tag: "path",
        attributes: {
          class: "".concat(config.cssPrefix, "-").concat(DUOTONE_CLASSES.SECONDARY),
          fill: "currentColor",
          d: vectorData[0]
        }
      }, {
        tag: "path",
        attributes: {
          class: "".concat(config.cssPrefix, "-").concat(DUOTONE_CLASSES.PRIMARY),
          fill: "currentColor",
          d: vectorData[1]
        }
      }]
    };
  } else {
    element = {
      tag: "path",
      attributes: {
        fill: "currentColor",
        d: vectorData
      }
    };
  }
  return {
    found: true,
    width,
    height,
    icon: element
  };
}
function maybeNotifyMissing(iconName, prefix) {
  if (!PRODUCTION$1 && !config.showMissingIcons && iconName) {
    console.error('Icon with name "'.concat(iconName, '" and prefix "').concat(prefix, '" is missing.'));
  }
}
function findIcon(iconName, prefix) {
  let givenPrefix = prefix;
  if (prefix === "fa" && config.styleDefault !== null) {
    prefix = getDefaultUsablePrefix();
  }
  return new Promise((resolve2, reject) => {
    if (givenPrefix === "fa") {
      const shim = byOldName(iconName) || {};
      iconName = shim.iconName || iconName;
      prefix = shim.prefix || prefix;
    }
    if (iconName && prefix && styles$1[prefix] && styles$1[prefix][iconName]) {
      const icon2 = styles$1[prefix][iconName];
      return resolve2(asFoundIcon(icon2));
    }
    maybeNotifyMissing(iconName, prefix);
    resolve2({
      ...missingIconResolutionMixin,
      icon: config.showMissingIcons && iconName ? callProvided("missingIconAbstract") || {} : {}
    });
  });
}
function isWatched(node) {
  const i2svg = node.getAttribute ? node.getAttribute(DATA_FA_I2SVG) : null;
  return typeof i2svg === "string";
}
function hasPrefixAndIcon(node) {
  const prefix = node.getAttribute ? node.getAttribute(DATA_PREFIX) : null;
  const icon2 = node.getAttribute ? node.getAttribute(DATA_ICON) : null;
  return prefix && icon2;
}
function hasBeenReplaced(node) {
  return node && node.classList && node.classList.contains && node.classList.contains(config.replacementClass);
}
function getMutator() {
  if (config.autoReplaceSvg === true) {
    return mutators.replace;
  }
  const mutator = mutators[config.autoReplaceSvg];
  return mutator || mutators.replace;
}
function createElementNS(tag) {
  return DOCUMENT.createElementNS("http://www.w3.org/2000/svg", tag);
}
function createElement(tag) {
  return DOCUMENT.createElement(tag);
}
function convertSVG(abstractObj) {
  let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  const {
    ceFn = abstractObj.tag === "svg" ? createElementNS : createElement
  } = params;
  if (typeof abstractObj === "string") {
    return DOCUMENT.createTextNode(abstractObj);
  }
  const tag = ceFn(abstractObj.tag);
  Object.keys(abstractObj.attributes || []).forEach(function(key2) {
    tag.setAttribute(key2, abstractObj.attributes[key2]);
  });
  const children = abstractObj.children || [];
  children.forEach(function(child) {
    tag.appendChild(convertSVG(child, {
      ceFn
    }));
  });
  return tag;
}
function nodeAsComment(node) {
  let comment = " ".concat(node.outerHTML, " ");
  comment = "".concat(comment, "Font Awesome fontawesome.com ");
  return comment;
}
function performOperationSync(op) {
  op();
}
function perform(mutations, callback) {
  const callbackFunction = typeof callback === "function" ? callback : noop$2;
  if (mutations.length === 0) {
    callbackFunction();
  } else {
    let frame = performOperationSync;
    if (config.mutateApproach === MUTATION_APPROACH_ASYNC) {
      frame = WINDOW.requestAnimationFrame || performOperationSync;
    }
    frame(() => {
      const mutator = getMutator();
      const mark = perf.begin("mutate");
      mutations.map(mutator);
      mark();
      callbackFunction();
    });
  }
}
function disableObservation() {
  disabled = true;
}
function enableObservation() {
  disabled = false;
}
function observe(options2) {
  if (!MUTATION_OBSERVER) {
    return;
  }
  if (!config.observeMutations) {
    return;
  }
  const {
    treeCallback = noop$2,
    nodeCallback = noop$2,
    pseudoElementsCallback = noop$2,
    observeMutationsRoot = DOCUMENT
  } = options2;
  mo$1 = new MUTATION_OBSERVER((objects) => {
    if (disabled) return;
    const defaultPrefix = getDefaultUsablePrefix();
    toArray(objects).forEach((mutationRecord) => {
      if (mutationRecord.type === "childList" && mutationRecord.addedNodes.length > 0 && !isWatched(mutationRecord.addedNodes[0])) {
        if (config.searchPseudoElements) {
          pseudoElementsCallback(mutationRecord.target);
        }
        treeCallback(mutationRecord.target);
      }
      if (mutationRecord.type === "attributes" && mutationRecord.target.parentNode && config.searchPseudoElements) {
        pseudoElementsCallback(mutationRecord.target.parentNode);
      }
      if (mutationRecord.type === "attributes" && isWatched(mutationRecord.target) && ~ATTRIBUTES_WATCHED_FOR_MUTATION.indexOf(mutationRecord.attributeName)) {
        if (mutationRecord.attributeName === "class" && hasPrefixAndIcon(mutationRecord.target)) {
          const {
            prefix,
            iconName
          } = getCanonicalIcon(classArray(mutationRecord.target));
          mutationRecord.target.setAttribute(DATA_PREFIX, prefix || defaultPrefix);
          if (iconName) mutationRecord.target.setAttribute(DATA_ICON, iconName);
        } else if (hasBeenReplaced(mutationRecord.target)) {
          nodeCallback(mutationRecord.target);
        }
      }
    });
  });
  if (!IS_DOM) return;
  mo$1.observe(observeMutationsRoot, {
    childList: true,
    attributes: true,
    characterData: true,
    subtree: true
  });
}
function disconnect() {
  if (!mo$1) return;
  mo$1.disconnect();
}
function styleParser(node) {
  const style = node.getAttribute("style");
  let val = [];
  if (style) {
    val = style.split(";").reduce((acc, style2) => {
      const styles2 = style2.split(":");
      const prop = styles2[0];
      const value = styles2.slice(1);
      if (prop && value.length > 0) {
        acc[prop] = value.join(":").trim();
      }
      return acc;
    }, {});
  }
  return val;
}
function classParser(node) {
  const existingPrefix = node.getAttribute("data-prefix");
  const existingIconName = node.getAttribute("data-icon");
  const innerText = node.innerText !== void 0 ? node.innerText.trim() : "";
  let val = getCanonicalIcon(classArray(node));
  if (!val.prefix) {
    val.prefix = getDefaultUsablePrefix();
  }
  if (existingPrefix && existingIconName) {
    val.prefix = existingPrefix;
    val.iconName = existingIconName;
  }
  if (val.iconName && val.prefix) {
    return val;
  }
  if (val.prefix && innerText.length > 0) {
    val.iconName = byLigature(val.prefix, node.innerText) || byUnicode(val.prefix, toHex(node.innerText));
  }
  if (!val.iconName && config.autoFetchSvg && node.firstChild && node.firstChild.nodeType === Node.TEXT_NODE) {
    val.iconName = node.firstChild.data;
  }
  return val;
}
function attributesParser(node) {
  const extraAttributes = toArray(node.attributes).reduce((acc, attr) => {
    if (acc.name !== "class" && acc.name !== "style") {
      acc[attr.name] = attr.value;
    }
    return acc;
  }, {});
  const title = node.getAttribute("title");
  const titleId = node.getAttribute("data-fa-title-id");
  if (config.autoA11y) {
    if (title) {
      extraAttributes["aria-labelledby"] = "".concat(config.replacementClass, "-title-").concat(titleId || nextUniqueId());
    } else {
      extraAttributes["aria-hidden"] = "true";
      extraAttributes["focusable"] = "false";
    }
  }
  return extraAttributes;
}
function blankMeta() {
  return {
    iconName: null,
    title: null,
    titleId: null,
    prefix: null,
    transform: meaninglessTransform,
    symbol: false,
    mask: {
      iconName: null,
      prefix: null,
      rest: []
    },
    maskId: null,
    extra: {
      classes: [],
      styles: {},
      attributes: {}
    }
  };
}
function parseMeta(node) {
  let parser = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
    styleParser: true
  };
  const {
    iconName,
    prefix,
    rest: extraClasses
  } = classParser(node);
  const extraAttributes = attributesParser(node);
  const pluginMeta = chainHooks("parseNodeAttributes", {}, node);
  let extraStyles = parser.styleParser ? styleParser(node) : [];
  return {
    iconName,
    title: node.getAttribute("title"),
    titleId: node.getAttribute("data-fa-title-id"),
    prefix,
    transform: meaninglessTransform,
    mask: {
      iconName: null,
      prefix: null,
      rest: []
    },
    maskId: null,
    symbol: false,
    extra: {
      classes: extraClasses,
      styles: extraStyles,
      attributes: extraAttributes
    },
    ...pluginMeta
  };
}
function generateMutation(node) {
  const nodeMeta = config.autoReplaceSvg === "nest" ? parseMeta(node, {
    styleParser: false
  }) : parseMeta(node);
  if (~nodeMeta.extra.classes.indexOf(LAYERS_TEXT_CLASSNAME)) {
    return callProvided("generateLayersText", node, nodeMeta);
  } else {
    return callProvided("generateSvgReplacementMutation", node, nodeMeta);
  }
}
function onTree(root) {
  let callback = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
  if (!IS_DOM) return Promise.resolve();
  const htmlClassList = DOCUMENT.documentElement.classList;
  const hclAdd = (suffix) => htmlClassList.add("".concat(HTML_CLASS_I2SVG_BASE_CLASS, "-").concat(suffix));
  const hclRemove = (suffix) => htmlClassList.remove("".concat(HTML_CLASS_I2SVG_BASE_CLASS, "-").concat(suffix));
  const prefixes2 = config.autoFetchSvg ? knownPrefixes : FAMILIES.map((f$$1) => "fa-".concat(f$$1)).concat(Object.keys(styles$2));
  if (!prefixes2.includes("fa")) {
    prefixes2.push("fa");
  }
  const prefixesDomQuery = [".".concat(LAYERS_TEXT_CLASSNAME, ":not([").concat(DATA_FA_I2SVG, "])")].concat(prefixes2.map((p$$1) => ".".concat(p$$1, ":not([").concat(DATA_FA_I2SVG, "])"))).join(", ");
  if (prefixesDomQuery.length === 0) {
    return Promise.resolve();
  }
  let candidates = [];
  try {
    candidates = toArray(root.querySelectorAll(prefixesDomQuery));
  } catch (e$$1) {
  }
  if (candidates.length > 0) {
    hclAdd("pending");
    hclRemove("complete");
  } else {
    return Promise.resolve();
  }
  const mark = perf.begin("onTree");
  const mutations = candidates.reduce((acc, node) => {
    try {
      const mutation = generateMutation(node);
      if (mutation) {
        acc.push(mutation);
      }
    } catch (e$$1) {
      if (!PRODUCTION$1) {
        if (e$$1.name === "MissingIcon") {
          console.error(e$$1);
        }
      }
    }
    return acc;
  }, []);
  return new Promise((resolve2, reject) => {
    Promise.all(mutations).then((resolvedMutations) => {
      perform(resolvedMutations, () => {
        hclAdd("active");
        hclAdd("complete");
        hclRemove("pending");
        if (typeof callback === "function") callback();
        mark();
        resolve2();
      });
    }).catch((e$$1) => {
      mark();
      reject(e$$1);
    });
  });
}
function onNode(node) {
  let callback = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
  generateMutation(node).then((mutation) => {
    if (mutation) {
      perform([mutation], callback);
    }
  });
}
function resolveIcons(next) {
  return function(maybeIconDefinition) {
    let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    const iconDefinition = (maybeIconDefinition || {}).icon ? maybeIconDefinition : findIconDefinition(maybeIconDefinition || {});
    let {
      mask
    } = params;
    if (mask) {
      mask = (mask || {}).icon ? mask : findIconDefinition(mask || {});
    }
    return next(iconDefinition, {
      ...params,
      mask
    });
  };
}
function hexValueFromContent(content) {
  const cleaned = content.replace(CLEAN_CONTENT_PATTERN, "");
  const codePoint = codePointAt(cleaned, 0);
  const isPrependTen = codePoint >= SECONDARY_UNICODE_RANGE[0] && codePoint <= SECONDARY_UNICODE_RANGE[1];
  const isDoubled = cleaned.length === 2 ? cleaned[0] === cleaned[1] : false;
  return {
    value: isDoubled ? toHex(cleaned[0]) : toHex(cleaned),
    isSecondary: isPrependTen || isDoubled
  };
}
function getPrefix(fontFamily, fontWeight) {
  const fontFamilySanitized = fontFamily.replace(/^['"]|['"]$/g, "").toLowerCase();
  const fontWeightInteger = parseInt(fontWeight);
  const fontWeightSanitized = isNaN(fontWeightInteger) ? "normal" : fontWeightInteger;
  return (FONT_FAMILY_WEIGHT_TO_PREFIX[fontFamilySanitized] || {})[fontWeightSanitized] || FONT_FAMILY_WEIGHT_FALLBACK[fontFamilySanitized];
}
function replaceForPosition(node, position) {
  const pendingAttribute = "".concat(DATA_FA_PSEUDO_ELEMENT_PENDING).concat(position.replace(":", "-"));
  return new Promise((resolve2, reject) => {
    if (node.getAttribute(pendingAttribute) !== null) {
      return resolve2();
    }
    const children = toArray(node.children);
    const alreadyProcessedPseudoElement = children.filter((c22) => c22.getAttribute(DATA_FA_PSEUDO_ELEMENT) === position)[0];
    const styles2 = WINDOW.getComputedStyle(node, position);
    const fontFamily = styles2.getPropertyValue("font-family");
    const fontFamilyMatch = fontFamily.match(FONT_FAMILY_PATTERN);
    const fontWeight = styles2.getPropertyValue("font-weight");
    const content = styles2.getPropertyValue("content");
    if (alreadyProcessedPseudoElement && !fontFamilyMatch) {
      node.removeChild(alreadyProcessedPseudoElement);
      return resolve2();
    } else if (fontFamilyMatch && content !== "none" && content !== "") {
      const content2 = styles2.getPropertyValue("content");
      let prefix = getPrefix(fontFamily, fontWeight);
      const {
        value: hexValue,
        isSecondary
      } = hexValueFromContent(content2);
      const isV4 = fontFamilyMatch[0].startsWith("FontAwesome");
      let iconName = byUnicode(prefix, hexValue);
      let iconIdentifier = iconName;
      if (isV4) {
        const iconName4 = byOldUnicode(hexValue);
        if (iconName4.iconName && iconName4.prefix) {
          iconName = iconName4.iconName;
          prefix = iconName4.prefix;
        }
      }
      if (iconName && !isSecondary && (!alreadyProcessedPseudoElement || alreadyProcessedPseudoElement.getAttribute(DATA_PREFIX) !== prefix || alreadyProcessedPseudoElement.getAttribute(DATA_ICON) !== iconIdentifier)) {
        node.setAttribute(pendingAttribute, iconIdentifier);
        if (alreadyProcessedPseudoElement) {
          node.removeChild(alreadyProcessedPseudoElement);
        }
        const meta = blankMeta();
        const {
          extra
        } = meta;
        extra.attributes[DATA_FA_PSEUDO_ELEMENT] = position;
        findIcon(iconName, prefix).then((main) => {
          const abstract = makeInlineSvgAbstract({
            ...meta,
            icons: {
              main,
              mask: emptyCanonicalIcon()
            },
            prefix,
            iconName: iconIdentifier,
            extra,
            watchable: true
          });
          const element = DOCUMENT.createElementNS("http://www.w3.org/2000/svg", "svg");
          if (position === "::before") {
            node.insertBefore(element, node.firstChild);
          } else {
            node.appendChild(element);
          }
          element.outerHTML = abstract.map((a2) => toHtml(a2)).join("\n");
          node.removeAttribute(pendingAttribute);
          resolve2();
        }).catch(reject);
      } else {
        resolve2();
      }
    } else {
      resolve2();
    }
  });
}
function replace(node) {
  return Promise.all([replaceForPosition(node, "::before"), replaceForPosition(node, "::after")]);
}
function processable(node) {
  return node.parentNode !== document.head && !~TAGNAMES_TO_SKIP_FOR_PSEUDOELEMENTS.indexOf(node.tagName.toUpperCase()) && !node.getAttribute(DATA_FA_PSEUDO_ELEMENT) && (!node.parentNode || node.parentNode.tagName !== "svg");
}
function searchPseudoElements(root) {
  if (!IS_DOM) return;
  return new Promise((resolve2, reject) => {
    const operations = toArray(root.querySelectorAll("*")).filter(processable).map(replace);
    const end2 = perf.begin("searchPseudoElements");
    disableObservation();
    Promise.all(operations).then(() => {
      end2();
      enableObservation();
      resolve2();
    }).catch(() => {
      end2();
      enableObservation();
      reject();
    });
  });
}
function fillBlack(abstract) {
  let force = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
  if (abstract.attributes && (abstract.attributes.fill || force)) {
    abstract.attributes.fill = "black";
  }
  return abstract;
}
function deGroup(abstract) {
  if (abstract.tag === "g") {
    return abstract.children;
  } else {
    return [abstract];
  }
}
function log(...args) {
  if (!PRODUCTION && console && typeof console.error === "function") {
    console.error(...args);
  }
}
function normalizeIconArgs(icon2) {
  if (icon2 && typeof icon2 === "object" && icon2.prefix && icon2.iconName && icon2.icon) {
    return icon2;
  }
  if (parse$12.icon) {
    return parse$12.icon(icon2);
  }
  if (icon2 === null) {
    return null;
  }
  if (icon2 && typeof icon2 === "object" && icon2.prefix && icon2.iconName) {
    return icon2;
  }
  if (Array.isArray(icon2) && icon2.length === 2) {
    return { prefix: icon2[0], iconName: icon2[1] };
  }
  if (typeof icon2 === "string") {
    return { prefix: "fas", iconName: icon2 };
  }
}
function objectWithKey(key2, value) {
  return Array.isArray(value) && value.length > 0 || !Array.isArray(value) && value ? { [key2]: value } : {};
}
function getCSSVariables() {
  const styles2 = getComputedStyle(document.documentElement);
  const cssVariables = {};
  for (let i2 = 0; i2 < styles2.length; i2++) {
    const name2 = styles2[i2];
    if (name2.startsWith("--")) {
      cssVariables[name2.replace("--", "")] = styles2.getPropertyValue(name2).trim();
    }
  }
  return cssVariables;
}
function downloadTheme(json2, filename = "theme.json") {
  const blob = new Blob([json2], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a2 = document.createElement("a");
  a2.href = url;
  a2.download = filename;
  document.body.appendChild(a2);
  a2.click();
  URL.revokeObjectURL(url);
  document.body.removeChild(a2);
}
function exportVars() {
  const variables = getCSSVariables();
  if (document.getElementById("themename").value) {
    var themeName = document.getElementById("themename").value;
  } else {
    var themeName = "Custom Theme";
  }
  if (document.getElementById("username").value) {
    var username = document.getElementById("username").value;
  } else {
    var username = "None inputted";
  }
  if (document.getElementById("userid").value) {
    var userId = document.getElementById("userid").value;
  } else {
    var userId = "None inputted";
  }
  const json2 = {
    "name": themeName,
    "description": "Made with themer.jenku.xyz",
    "authors": [{ "name": username, "id": userId }],
    "semanticColors": {},
    "rawColors": {},
    "spec": 2
  };
  for (const [key2, value] of Object.entries(variables)) {
    const rgbaMatch = value.match(/rgba?\(\s*(\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d*\.?\d*))?\)/);
    if (rgbaMatch) {
      const r23 = parseInt(rgbaMatch[1]);
      const g2 = parseInt(rgbaMatch[2]);
      const b2 = parseInt(rgbaMatch[3]);
      const toHex2 = (c22) => {
        const hex = c22.toString(16).padStart(2, "0");
        return hex;
      };
      const hexColor = `#${toHex2(r23)}${toHex2(g2)}${toHex2(b2)}`;
      switch (key2.toUpperCase()) {
        case "BG_BASE_PRIMARY":
          json2.rawColors["PLUM_20"] = hexColor;
        case "BACKGROUND_SECONDARY_ALT":
          json2.semanticColors["EXPRESSION_PICKER_BG"] = [hexColor];
      }
      json2.semanticColors[key2.toUpperCase()] = [hexColor];
    }
  }
  console.log(JSON.stringify(json2, null, 2));
  downloadTheme(JSON.stringify(json2, null, 2));
}
var dirty_components, binding_callbacks, render_callbacks, flush_callbacks, resolved_promise, update_scheduled, seen_callbacks, flushidx, noop2, _WINDOW, _DOCUMENT, _MUTATION_OBSERVER, _PERFORMANCE, userAgent, WINDOW, DOCUMENT, MUTATION_OBSERVER, PERFORMANCE, IS_DOM, IS_IE, a$1, t$1, r$1, o$1, c$1, et$1, bt, Ct, Dt, Kt, ao, eo, lo, y$1, no, fo, ho, x$1, u$1, m$1, t$1$1, yo, mo, Io, Fo, So, NAMESPACE_IDENTIFIER, UNITS_IN_GRID, DEFAULT_CSS_PREFIX, DEFAULT_REPLACEMENT_CLASS, DATA_FA_I2SVG, DATA_FA_PSEUDO_ELEMENT, DATA_FA_PSEUDO_ELEMENT_PENDING, DATA_PREFIX, DATA_ICON, HTML_CLASS_I2SVG_BASE_CLASS, MUTATION_APPROACH_ASYNC, TAGNAMES_TO_SKIP_FOR_PSEUDOELEMENTS, PRODUCTION$1, FAMILIES, _PREFIX_TO_STYLE, PREFIX_TO_STYLE, _STYLE_TO_PREFIX, STYLE_TO_PREFIX, _PREFIX_TO_LONG_STYLE, PREFIX_TO_LONG_STYLE, _LONG_STYLE_TO_PREFIX, LONG_STYLE_TO_PREFIX, ICON_SELECTION_SYNTAX_PATTERN, LAYERS_TEXT_CLASSNAME, FONT_FAMILY_PATTERN, _FONT_WEIGHT_TO_PREFIX, ATTRIBUTES_WATCHED_FOR_MUTATION, DUOTONE_CLASSES, prefixes, RESERVED_CLASSES, initial2, _default, _config, config, _onChangeCb, d$2, meaninglessTransform, idPool, baseStyles, _cssInserted, InjectCSS, w$1, namespace, functions, listener, loaded, reduce, styles, shims, LONG_STYLE, _defaultUsablePrefix, _byUnicode, _byLigature, _byOldName, _byOldUnicode, _byAlias, PREFIXES, build, emptyCanonicalIcon, PREFIXES_FOR_FAMILY, Library, _plugins, _hooks, providers, defaultProviderKeys, library, noAuto, dom, parse2, api, autoReplace, styles$1, missingIconResolutionMixin, noop$1, p$2, preamble, begin, end, perf, noop$2, mutators, disabled, mo$1, styles$2, knownPrefixes, render, ReplaceElements, Layers, LayersCounter, LayersText, CLEAN_CONTENT_PATTERN, SECONDARY_UNICODE_RANGE, _FONT_FAMILY_WEIGHT_TO_PREFIX, FONT_FAMILY_WEIGHT_TO_PREFIX, FONT_FAMILY_WEIGHT_FALLBACK, PseudoElements, _unwatched, MutationObserver$1, parseTransformString, PowerTransforms, ALL_SPACE, Masks, MissingIconIndicator, SvgSymbols, plugins, parse$12, icon, PRODUCTION, SvgElement, FontAwesomeIcon, r, t, n, e, u, a, o, i, s2, h, b, g, d, f, c, l, p, v, m, y, N, x, M, H, $, j, w, css$9, Slider, css$8, Picker, css$7, PickerIndicator, css$6, TextInput, css$5, Input, css$4, Wrapper, defaultTexts, css$3, NullabilityCheckbox, css$2, wrapperPadding, ColorPicker, name, description, authors, semanticColors, rawColors, spec, defaultTheme, css$1, localStorageKey, ColorPicker_1, css, ColorGrid, Page;
var init_page_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/_page.svelte.js"() {
    init_ssr();
    init_free_solid_svg_icons();
    dirty_components = [];
    binding_callbacks = [];
    render_callbacks = [];
    flush_callbacks = [];
    resolved_promise = /* @__PURE__ */ Promise.resolve();
    update_scheduled = false;
    seen_callbacks = /* @__PURE__ */ new Set();
    flushidx = 0;
    noop2 = () => {
    };
    _WINDOW = {};
    _DOCUMENT = {};
    _MUTATION_OBSERVER = null;
    _PERFORMANCE = {
      mark: noop2,
      measure: noop2
    };
    try {
      if (typeof window !== "undefined") _WINDOW = window;
      if (typeof document !== "undefined") _DOCUMENT = document;
      if (typeof MutationObserver !== "undefined") _MUTATION_OBSERVER = MutationObserver;
      if (typeof performance !== "undefined") _PERFORMANCE = performance;
    } catch (e23) {
    }
    ({
      userAgent = ""
    } = _WINDOW.navigator || {});
    WINDOW = _WINDOW;
    DOCUMENT = _DOCUMENT;
    MUTATION_OBSERVER = _MUTATION_OBSERVER;
    PERFORMANCE = _PERFORMANCE;
    !!WINDOW.document;
    IS_DOM = !!DOCUMENT.documentElement && !!DOCUMENT.head && typeof DOCUMENT.addEventListener === "function" && typeof DOCUMENT.createElement === "function";
    IS_IE = ~userAgent.indexOf("MSIE") || ~userAgent.indexOf("Trident/");
    a$1 = "classic";
    t$1 = "duotone";
    r$1 = "sharp";
    o$1 = "sharp-duotone";
    c$1 = [a$1, t$1, r$1, o$1];
    et$1 = {
      classic: {
        900: "fas",
        400: "far",
        normal: "far",
        300: "fal",
        100: "fat"
      },
      sharp: {
        900: "fass",
        400: "fasr",
        300: "fasl",
        100: "fast"
      },
      "sharp-duotone": {
        900: "fasds"
      }
    };
    bt = {
      kit: {
        fak: "kit",
        "fa-kit": "kit"
      },
      "kit-duotone": {
        fakd: "kit-duotone",
        "fa-kit-duotone": "kit-duotone"
      }
    };
    Ct = ["kit"];
    Dt = /fa(s|r|l|t|d|b|k|kd|ss|sr|sl|st|sds)?[\-\ ]/;
    Kt = /Font ?Awesome ?([56 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Sharp Duotone|Sharp|Kit)?.*/i;
    ao = {
      "Font Awesome 5 Free": {
        900: "fas",
        400: "far"
      },
      "Font Awesome 5 Pro": {
        900: "fas",
        400: "far",
        normal: "far",
        300: "fal"
      },
      "Font Awesome 5 Brands": {
        400: "fab",
        normal: "fab"
      },
      "Font Awesome 5 Duotone": {
        900: "fad"
      }
    };
    eo = {
      "Font Awesome 6 Free": {
        900: "fas",
        400: "far"
      },
      "Font Awesome 6 Pro": {
        900: "fas",
        400: "far",
        normal: "far",
        300: "fal",
        100: "fat"
      },
      "Font Awesome 6 Brands": {
        400: "fab",
        normal: "fab"
      },
      "Font Awesome 6 Duotone": {
        900: "fad"
      },
      "Font Awesome 6 Sharp": {
        900: "fass",
        400: "fasr",
        normal: "fasr",
        300: "fasl",
        100: "fast"
      },
      "Font Awesome 6 Sharp Duotone": {
        900: "fasds"
      }
    };
    lo = {
      classic: {
        "fa-brands": "fab",
        "fa-duotone": "fad",
        "fa-light": "fal",
        "fa-regular": "far",
        "fa-solid": "fas",
        "fa-thin": "fat"
      },
      sharp: {
        "fa-solid": "fass",
        "fa-regular": "fasr",
        "fa-light": "fasl",
        "fa-thin": "fast"
      },
      "sharp-duotone": {
        "fa-solid": "fasds"
      }
    };
    y$1 = {
      classic: ["fas", "far", "fal", "fat"],
      sharp: ["fass", "fasr", "fasl", "fast"],
      "sharp-duotone": ["fasds"]
    };
    no = {
      classic: {
        fab: "fa-brands",
        fad: "fa-duotone",
        fal: "fa-light",
        far: "fa-regular",
        fas: "fa-solid",
        fat: "fa-thin"
      },
      sharp: {
        fass: "fa-solid",
        fasr: "fa-regular",
        fasl: "fa-light",
        fast: "fa-thin"
      },
      "sharp-duotone": {
        fasds: "fa-solid"
      }
    };
    fo = {
      classic: {
        solid: "fas",
        regular: "far",
        light: "fal",
        thin: "fat",
        duotone: "fad",
        brands: "fab"
      },
      sharp: {
        solid: "fass",
        regular: "fasr",
        light: "fasl",
        thin: "fast"
      },
      "sharp-duotone": {
        solid: "fasds"
      }
    };
    ho = {
      classic: {
        fa: "solid",
        fas: "solid",
        "fa-solid": "solid",
        far: "regular",
        "fa-regular": "regular",
        fal: "light",
        "fa-light": "light",
        fat: "thin",
        "fa-thin": "thin",
        fad: "duotone",
        "fa-duotone": "duotone",
        fab: "brands",
        "fa-brands": "brands"
      },
      sharp: {
        fa: "solid",
        fass: "solid",
        "fa-solid": "solid",
        fasr: "regular",
        "fa-regular": "regular",
        fasl: "light",
        "fa-light": "light",
        fast: "thin",
        "fa-thin": "thin"
      },
      "sharp-duotone": {
        fa: "solid",
        fasds: "solid",
        "fa-solid": "solid"
      }
    };
    x$1 = ["solid", "regular", "light", "thin", "duotone", "brands"];
    u$1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    m$1 = u$1.concat([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
    t$1$1 = {
      GROUP: "duotone-group",
      SWAP_OPACITY: "swap-opacity",
      PRIMARY: "primary",
      SECONDARY: "secondary"
    };
    yo = [...Object.keys(y$1), ...x$1, "2xs", "xs", "sm", "lg", "xl", "2xl", "beat", "border", "fade", "beat-fade", "bounce", "flip-both", "flip-horizontal", "flip-vertical", "flip", "fw", "inverse", "layers-counter", "layers-text", "layers", "li", "pull-left", "pull-right", "pulse", "rotate-180", "rotate-270", "rotate-90", "rotate-by", "shake", "spin-pulse", "spin-reverse", "spin", "stack-1x", "stack-2x", "stack", "ul", t$1$1.GROUP, t$1$1.SWAP_OPACITY, t$1$1.PRIMARY, t$1$1.SECONDARY].concat(u$1.map((o22) => "".concat(o22, "x"))).concat(m$1.map((o22) => "w-".concat(o22)));
    mo = {
      "Font Awesome Kit": {
        400: "fak",
        normal: "fak"
      },
      "Font Awesome Kit Duotone": {
        400: "fakd",
        normal: "fakd"
      }
    };
    Io = {
      kit: {
        "fa-kit": "fak"
      },
      "kit-duotone": {
        "fa-kit-duotone": "fakd"
      }
    };
    Fo = {
      kit: {
        fak: "fa-kit"
      },
      "kit-duotone": {
        fakd: "fa-kit-duotone"
      }
    };
    So = {
      kit: {
        kit: "fak"
      },
      "kit-duotone": {
        "kit-duotone": "fakd"
      }
    };
    NAMESPACE_IDENTIFIER = "___FONT_AWESOME___";
    UNITS_IN_GRID = 16;
    DEFAULT_CSS_PREFIX = "fa";
    DEFAULT_REPLACEMENT_CLASS = "svg-inline--fa";
    DATA_FA_I2SVG = "data-fa-i2svg";
    DATA_FA_PSEUDO_ELEMENT = "data-fa-pseudo-element";
    DATA_FA_PSEUDO_ELEMENT_PENDING = "data-fa-pseudo-element-pending";
    DATA_PREFIX = "data-prefix";
    DATA_ICON = "data-icon";
    HTML_CLASS_I2SVG_BASE_CLASS = "fontawesome-i2svg";
    MUTATION_APPROACH_ASYNC = "async";
    TAGNAMES_TO_SKIP_FOR_PSEUDOELEMENTS = ["HTML", "HEAD", "STYLE", "SCRIPT"];
    PRODUCTION$1 = (() => {
      try {
        return false;
      } catch (e$$1) {
        return false;
      }
    })();
    FAMILIES = [a$1, r$1, o$1];
    _PREFIX_TO_STYLE = {
      ...ho
    };
    _PREFIX_TO_STYLE[a$1] = {
      ...ho[a$1],
      ...bt["kit"],
      ...bt["kit-duotone"]
    };
    PREFIX_TO_STYLE = familyProxy(_PREFIX_TO_STYLE);
    _STYLE_TO_PREFIX = {
      ...fo
    };
    _STYLE_TO_PREFIX[a$1] = {
      ..._STYLE_TO_PREFIX[a$1],
      ...So["kit"],
      ...So["kit-duotone"]
    };
    STYLE_TO_PREFIX = familyProxy(_STYLE_TO_PREFIX);
    _PREFIX_TO_LONG_STYLE = {
      ...no
    };
    _PREFIX_TO_LONG_STYLE[a$1] = {
      ..._PREFIX_TO_LONG_STYLE[a$1],
      ...Fo["kit"]
    };
    PREFIX_TO_LONG_STYLE = familyProxy(_PREFIX_TO_LONG_STYLE);
    _LONG_STYLE_TO_PREFIX = {
      ...lo
    };
    _LONG_STYLE_TO_PREFIX[a$1] = {
      ..._LONG_STYLE_TO_PREFIX[a$1],
      ...Io["kit"]
    };
    LONG_STYLE_TO_PREFIX = familyProxy(_LONG_STYLE_TO_PREFIX);
    ICON_SELECTION_SYNTAX_PATTERN = Dt;
    LAYERS_TEXT_CLASSNAME = "fa-layers-text";
    FONT_FAMILY_PATTERN = Kt;
    _FONT_WEIGHT_TO_PREFIX = {
      ...et$1
    };
    familyProxy(_FONT_WEIGHT_TO_PREFIX);
    ATTRIBUTES_WATCHED_FOR_MUTATION = ["class", "data-prefix", "data-icon", "data-fa-transform", "data-fa-mask"];
    DUOTONE_CLASSES = t$1$1;
    prefixes = /* @__PURE__ */ new Set();
    Object.keys(STYLE_TO_PREFIX[a$1]).map(prefixes.add.bind(prefixes));
    Object.keys(STYLE_TO_PREFIX[r$1]).map(prefixes.add.bind(prefixes));
    Object.keys(STYLE_TO_PREFIX[o$1]).map(prefixes.add.bind(prefixes));
    RESERVED_CLASSES = [...Ct, ...yo];
    initial2 = WINDOW.FontAwesomeConfig || {};
    if (DOCUMENT && typeof DOCUMENT.querySelector === "function") {
      const attrs = [["data-family-prefix", "familyPrefix"], ["data-css-prefix", "cssPrefix"], ["data-family-default", "familyDefault"], ["data-style-default", "styleDefault"], ["data-replacement-class", "replacementClass"], ["data-auto-replace-svg", "autoReplaceSvg"], ["data-auto-add-css", "autoAddCss"], ["data-auto-a11y", "autoA11y"], ["data-search-pseudo-elements", "searchPseudoElements"], ["data-observe-mutations", "observeMutations"], ["data-mutate-approach", "mutateApproach"], ["data-keep-original-source", "keepOriginalSource"], ["data-measure-performance", "measurePerformance"], ["data-show-missing-icons", "showMissingIcons"]];
      attrs.forEach((_ref) => {
        let [attr, key2] = _ref;
        const val = coerce(getAttrConfig(attr));
        if (val !== void 0 && val !== null) {
          initial2[key2] = val;
        }
      });
    }
    _default = {
      styleDefault: "solid",
      familyDefault: "classic",
      cssPrefix: DEFAULT_CSS_PREFIX,
      replacementClass: DEFAULT_REPLACEMENT_CLASS,
      autoReplaceSvg: true,
      autoAddCss: true,
      autoA11y: true,
      searchPseudoElements: false,
      observeMutations: true,
      mutateApproach: "async",
      keepOriginalSource: true,
      measurePerformance: false,
      showMissingIcons: true
    };
    if (initial2.familyPrefix) {
      initial2.cssPrefix = initial2.familyPrefix;
    }
    _config = {
      ..._default,
      ...initial2
    };
    if (!_config.autoReplaceSvg) _config.observeMutations = false;
    config = {};
    Object.keys(_default).forEach((key2) => {
      Object.defineProperty(config, key2, {
        enumerable: true,
        set: function(val) {
          _config[key2] = val;
          _onChangeCb.forEach((cb) => cb(config));
        },
        get: function() {
          return _config[key2];
        }
      });
    });
    Object.defineProperty(config, "familyPrefix", {
      enumerable: true,
      set: function(val) {
        _config.cssPrefix = val;
        _onChangeCb.forEach((cb) => cb(config));
      },
      get: function() {
        return _config.cssPrefix;
      }
    });
    WINDOW.FontAwesomeConfig = config;
    _onChangeCb = [];
    d$2 = UNITS_IN_GRID;
    meaninglessTransform = {
      size: 16,
      x: 0,
      y: 0,
      rotate: 0,
      flipX: false,
      flipY: false
    };
    idPool = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    baseStyles = ':root, :host {\n  --fa-font-solid: normal 900 1em/1 "Font Awesome 6 Free";\n  --fa-font-regular: normal 400 1em/1 "Font Awesome 6 Free";\n  --fa-font-light: normal 300 1em/1 "Font Awesome 6 Pro";\n  --fa-font-thin: normal 100 1em/1 "Font Awesome 6 Pro";\n  --fa-font-duotone: normal 900 1em/1 "Font Awesome 6 Duotone";\n  --fa-font-brands: normal 400 1em/1 "Font Awesome 6 Brands";\n  --fa-font-sharp-solid: normal 900 1em/1 "Font Awesome 6 Sharp";\n  --fa-font-sharp-regular: normal 400 1em/1 "Font Awesome 6 Sharp";\n  --fa-font-sharp-light: normal 300 1em/1 "Font Awesome 6 Sharp";\n  --fa-font-sharp-thin: normal 100 1em/1 "Font Awesome 6 Sharp";\n  --fa-font-sharp-duotone-solid: normal 900 1em/1 "Font Awesome 6 Sharp Duotone";\n}\n\nsvg:not(:root).svg-inline--fa, svg:not(:host).svg-inline--fa {\n  overflow: visible;\n  box-sizing: content-box;\n}\n\n.svg-inline--fa {\n  display: var(--fa-display, inline-block);\n  height: 1em;\n  overflow: visible;\n  vertical-align: -0.125em;\n}\n.svg-inline--fa.fa-2xs {\n  vertical-align: 0.1em;\n}\n.svg-inline--fa.fa-xs {\n  vertical-align: 0em;\n}\n.svg-inline--fa.fa-sm {\n  vertical-align: -0.0714285705em;\n}\n.svg-inline--fa.fa-lg {\n  vertical-align: -0.2em;\n}\n.svg-inline--fa.fa-xl {\n  vertical-align: -0.25em;\n}\n.svg-inline--fa.fa-2xl {\n  vertical-align: -0.3125em;\n}\n.svg-inline--fa.fa-pull-left {\n  margin-right: var(--fa-pull-margin, 0.3em);\n  width: auto;\n}\n.svg-inline--fa.fa-pull-right {\n  margin-left: var(--fa-pull-margin, 0.3em);\n  width: auto;\n}\n.svg-inline--fa.fa-li {\n  width: var(--fa-li-width, 2em);\n  top: 0.25em;\n}\n.svg-inline--fa.fa-fw {\n  width: var(--fa-fw-width, 1.25em);\n}\n\n.fa-layers svg.svg-inline--fa {\n  bottom: 0;\n  left: 0;\n  margin: auto;\n  position: absolute;\n  right: 0;\n  top: 0;\n}\n\n.fa-layers-counter, .fa-layers-text {\n  display: inline-block;\n  position: absolute;\n  text-align: center;\n}\n\n.fa-layers {\n  display: inline-block;\n  height: 1em;\n  position: relative;\n  text-align: center;\n  vertical-align: -0.125em;\n  width: 1em;\n}\n.fa-layers svg.svg-inline--fa {\n  transform-origin: center center;\n}\n\n.fa-layers-text {\n  left: 50%;\n  top: 50%;\n  transform: translate(-50%, -50%);\n  transform-origin: center center;\n}\n\n.fa-layers-counter {\n  background-color: var(--fa-counter-background-color, #ff253a);\n  border-radius: var(--fa-counter-border-radius, 1em);\n  box-sizing: border-box;\n  color: var(--fa-inverse, #fff);\n  line-height: var(--fa-counter-line-height, 1);\n  max-width: var(--fa-counter-max-width, 5em);\n  min-width: var(--fa-counter-min-width, 1.5em);\n  overflow: hidden;\n  padding: var(--fa-counter-padding, 0.25em 0.5em);\n  right: var(--fa-right, 0);\n  text-overflow: ellipsis;\n  top: var(--fa-top, 0);\n  transform: scale(var(--fa-counter-scale, 0.25));\n  transform-origin: top right;\n}\n\n.fa-layers-bottom-right {\n  bottom: var(--fa-bottom, 0);\n  right: var(--fa-right, 0);\n  top: auto;\n  transform: scale(var(--fa-layers-scale, 0.25));\n  transform-origin: bottom right;\n}\n\n.fa-layers-bottom-left {\n  bottom: var(--fa-bottom, 0);\n  left: var(--fa-left, 0);\n  right: auto;\n  top: auto;\n  transform: scale(var(--fa-layers-scale, 0.25));\n  transform-origin: bottom left;\n}\n\n.fa-layers-top-right {\n  top: var(--fa-top, 0);\n  right: var(--fa-right, 0);\n  transform: scale(var(--fa-layers-scale, 0.25));\n  transform-origin: top right;\n}\n\n.fa-layers-top-left {\n  left: var(--fa-left, 0);\n  right: auto;\n  top: var(--fa-top, 0);\n  transform: scale(var(--fa-layers-scale, 0.25));\n  transform-origin: top left;\n}\n\n.fa-1x {\n  font-size: 1em;\n}\n\n.fa-2x {\n  font-size: 2em;\n}\n\n.fa-3x {\n  font-size: 3em;\n}\n\n.fa-4x {\n  font-size: 4em;\n}\n\n.fa-5x {\n  font-size: 5em;\n}\n\n.fa-6x {\n  font-size: 6em;\n}\n\n.fa-7x {\n  font-size: 7em;\n}\n\n.fa-8x {\n  font-size: 8em;\n}\n\n.fa-9x {\n  font-size: 9em;\n}\n\n.fa-10x {\n  font-size: 10em;\n}\n\n.fa-2xs {\n  font-size: 0.625em;\n  line-height: 0.1em;\n  vertical-align: 0.225em;\n}\n\n.fa-xs {\n  font-size: 0.75em;\n  line-height: 0.0833333337em;\n  vertical-align: 0.125em;\n}\n\n.fa-sm {\n  font-size: 0.875em;\n  line-height: 0.0714285718em;\n  vertical-align: 0.0535714295em;\n}\n\n.fa-lg {\n  font-size: 1.25em;\n  line-height: 0.05em;\n  vertical-align: -0.075em;\n}\n\n.fa-xl {\n  font-size: 1.5em;\n  line-height: 0.0416666682em;\n  vertical-align: -0.125em;\n}\n\n.fa-2xl {\n  font-size: 2em;\n  line-height: 0.03125em;\n  vertical-align: -0.1875em;\n}\n\n.fa-fw {\n  text-align: center;\n  width: 1.25em;\n}\n\n.fa-ul {\n  list-style-type: none;\n  margin-left: var(--fa-li-margin, 2.5em);\n  padding-left: 0;\n}\n.fa-ul > li {\n  position: relative;\n}\n\n.fa-li {\n  left: calc(-1 * var(--fa-li-width, 2em));\n  position: absolute;\n  text-align: center;\n  width: var(--fa-li-width, 2em);\n  line-height: inherit;\n}\n\n.fa-border {\n  border-color: var(--fa-border-color, #eee);\n  border-radius: var(--fa-border-radius, 0.1em);\n  border-style: var(--fa-border-style, solid);\n  border-width: var(--fa-border-width, 0.08em);\n  padding: var(--fa-border-padding, 0.2em 0.25em 0.15em);\n}\n\n.fa-pull-left {\n  float: left;\n  margin-right: var(--fa-pull-margin, 0.3em);\n}\n\n.fa-pull-right {\n  float: right;\n  margin-left: var(--fa-pull-margin, 0.3em);\n}\n\n.fa-beat {\n  animation-name: fa-beat;\n  animation-delay: var(--fa-animation-delay, 0s);\n  animation-direction: var(--fa-animation-direction, normal);\n  animation-duration: var(--fa-animation-duration, 1s);\n  animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  animation-timing-function: var(--fa-animation-timing, ease-in-out);\n}\n\n.fa-bounce {\n  animation-name: fa-bounce;\n  animation-delay: var(--fa-animation-delay, 0s);\n  animation-direction: var(--fa-animation-direction, normal);\n  animation-duration: var(--fa-animation-duration, 1s);\n  animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));\n}\n\n.fa-fade {\n  animation-name: fa-fade;\n  animation-delay: var(--fa-animation-delay, 0s);\n  animation-direction: var(--fa-animation-direction, normal);\n  animation-duration: var(--fa-animation-duration, 1s);\n  animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));\n}\n\n.fa-beat-fade {\n  animation-name: fa-beat-fade;\n  animation-delay: var(--fa-animation-delay, 0s);\n  animation-direction: var(--fa-animation-direction, normal);\n  animation-duration: var(--fa-animation-duration, 1s);\n  animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));\n}\n\n.fa-flip {\n  animation-name: fa-flip;\n  animation-delay: var(--fa-animation-delay, 0s);\n  animation-direction: var(--fa-animation-direction, normal);\n  animation-duration: var(--fa-animation-duration, 1s);\n  animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  animation-timing-function: var(--fa-animation-timing, ease-in-out);\n}\n\n.fa-shake {\n  animation-name: fa-shake;\n  animation-delay: var(--fa-animation-delay, 0s);\n  animation-direction: var(--fa-animation-direction, normal);\n  animation-duration: var(--fa-animation-duration, 1s);\n  animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  animation-timing-function: var(--fa-animation-timing, linear);\n}\n\n.fa-spin {\n  animation-name: fa-spin;\n  animation-delay: var(--fa-animation-delay, 0s);\n  animation-direction: var(--fa-animation-direction, normal);\n  animation-duration: var(--fa-animation-duration, 2s);\n  animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  animation-timing-function: var(--fa-animation-timing, linear);\n}\n\n.fa-spin-reverse {\n  --fa-animation-direction: reverse;\n}\n\n.fa-pulse,\n.fa-spin-pulse {\n  animation-name: fa-spin;\n  animation-direction: var(--fa-animation-direction, normal);\n  animation-duration: var(--fa-animation-duration, 1s);\n  animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  animation-timing-function: var(--fa-animation-timing, steps(8));\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .fa-beat,\n.fa-bounce,\n.fa-fade,\n.fa-beat-fade,\n.fa-flip,\n.fa-pulse,\n.fa-shake,\n.fa-spin,\n.fa-spin-pulse {\n    animation-delay: -1ms;\n    animation-duration: 1ms;\n    animation-iteration-count: 1;\n    transition-delay: 0s;\n    transition-duration: 0s;\n  }\n}\n@keyframes fa-beat {\n  0%, 90% {\n    transform: scale(1);\n  }\n  45% {\n    transform: scale(var(--fa-beat-scale, 1.25));\n  }\n}\n@keyframes fa-bounce {\n  0% {\n    transform: scale(1, 1) translateY(0);\n  }\n  10% {\n    transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);\n  }\n  30% {\n    transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));\n  }\n  50% {\n    transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);\n  }\n  57% {\n    transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));\n  }\n  64% {\n    transform: scale(1, 1) translateY(0);\n  }\n  100% {\n    transform: scale(1, 1) translateY(0);\n  }\n}\n@keyframes fa-fade {\n  50% {\n    opacity: var(--fa-fade-opacity, 0.4);\n  }\n}\n@keyframes fa-beat-fade {\n  0%, 100% {\n    opacity: var(--fa-beat-fade-opacity, 0.4);\n    transform: scale(1);\n  }\n  50% {\n    opacity: 1;\n    transform: scale(var(--fa-beat-fade-scale, 1.125));\n  }\n}\n@keyframes fa-flip {\n  50% {\n    transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));\n  }\n}\n@keyframes fa-shake {\n  0% {\n    transform: rotate(-15deg);\n  }\n  4% {\n    transform: rotate(15deg);\n  }\n  8%, 24% {\n    transform: rotate(-18deg);\n  }\n  12%, 28% {\n    transform: rotate(18deg);\n  }\n  16% {\n    transform: rotate(-22deg);\n  }\n  20% {\n    transform: rotate(22deg);\n  }\n  32% {\n    transform: rotate(-12deg);\n  }\n  36% {\n    transform: rotate(12deg);\n  }\n  40%, 100% {\n    transform: rotate(0deg);\n  }\n}\n@keyframes fa-spin {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n.fa-rotate-90 {\n  transform: rotate(90deg);\n}\n\n.fa-rotate-180 {\n  transform: rotate(180deg);\n}\n\n.fa-rotate-270 {\n  transform: rotate(270deg);\n}\n\n.fa-flip-horizontal {\n  transform: scale(-1, 1);\n}\n\n.fa-flip-vertical {\n  transform: scale(1, -1);\n}\n\n.fa-flip-both,\n.fa-flip-horizontal.fa-flip-vertical {\n  transform: scale(-1, -1);\n}\n\n.fa-rotate-by {\n  transform: rotate(var(--fa-rotate-angle, 0));\n}\n\n.fa-stack {\n  display: inline-block;\n  vertical-align: middle;\n  height: 2em;\n  position: relative;\n  width: 2.5em;\n}\n\n.fa-stack-1x,\n.fa-stack-2x {\n  bottom: 0;\n  left: 0;\n  margin: auto;\n  position: absolute;\n  right: 0;\n  top: 0;\n  z-index: var(--fa-stack-z-index, auto);\n}\n\n.svg-inline--fa.fa-stack-1x {\n  height: 1em;\n  width: 1.25em;\n}\n.svg-inline--fa.fa-stack-2x {\n  height: 2em;\n  width: 2.5em;\n}\n\n.fa-inverse {\n  color: var(--fa-inverse, #fff);\n}\n\n.sr-only,\n.fa-sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  border-width: 0;\n}\n\n.sr-only-focusable:not(:focus),\n.fa-sr-only-focusable:not(:focus) {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  border-width: 0;\n}\n\n.svg-inline--fa .fa-primary {\n  fill: var(--fa-primary-color, currentColor);\n  opacity: var(--fa-primary-opacity, 1);\n}\n\n.svg-inline--fa .fa-secondary {\n  fill: var(--fa-secondary-color, currentColor);\n  opacity: var(--fa-secondary-opacity, 0.4);\n}\n\n.svg-inline--fa.fa-swap-opacity .fa-primary {\n  opacity: var(--fa-secondary-opacity, 0.4);\n}\n\n.svg-inline--fa.fa-swap-opacity .fa-secondary {\n  opacity: var(--fa-primary-opacity, 1);\n}\n\n.svg-inline--fa mask .fa-primary,\n.svg-inline--fa mask .fa-secondary {\n  fill: black;\n}\n\n.fad.fa-inverse,\n.fa-duotone.fa-inverse {\n  color: var(--fa-inverse, #fff);\n}';
    _cssInserted = false;
    InjectCSS = {
      mixout() {
        return {
          dom: {
            css: css$a,
            insertCss: ensureCss
          }
        };
      },
      hooks() {
        return {
          beforeDOMElementCreation() {
            ensureCss();
          },
          beforeI2svg() {
            ensureCss();
          }
        };
      }
    };
    w$1 = WINDOW || {};
    if (!w$1[NAMESPACE_IDENTIFIER]) w$1[NAMESPACE_IDENTIFIER] = {};
    if (!w$1[NAMESPACE_IDENTIFIER].styles) w$1[NAMESPACE_IDENTIFIER].styles = {};
    if (!w$1[NAMESPACE_IDENTIFIER].hooks) w$1[NAMESPACE_IDENTIFIER].hooks = {};
    if (!w$1[NAMESPACE_IDENTIFIER].shims) w$1[NAMESPACE_IDENTIFIER].shims = [];
    namespace = w$1[NAMESPACE_IDENTIFIER];
    functions = [];
    listener = function() {
      DOCUMENT.removeEventListener("DOMContentLoaded", listener);
      loaded = 1;
      functions.map((fn) => fn());
    };
    loaded = false;
    if (IS_DOM) {
      loaded = (DOCUMENT.documentElement.doScroll ? /^loaded|^c/ : /^loaded|^i|^c/).test(DOCUMENT.readyState);
      if (!loaded) DOCUMENT.addEventListener("DOMContentLoaded", listener);
    }
    reduce = function fastReduceObject(subject, fn, initialValue, thisContext) {
      var keys = Object.keys(subject), length = keys.length, iterator = fn, i2, key2, result;
      if (initialValue === void 0) {
        i2 = 1;
        result = subject[keys[0]];
      } else {
        i2 = 0;
        result = initialValue;
      }
      for (; i2 < length; i2++) {
        key2 = keys[i2];
        result = iterator(result, subject[key2], key2, subject);
      }
      return result;
    };
    ({
      styles,
      shims
    } = namespace);
    LONG_STYLE = {
      [a$1]: Object.values(PREFIX_TO_LONG_STYLE[a$1]),
      [r$1]: Object.values(PREFIX_TO_LONG_STYLE[r$1]),
      [o$1]: Object.values(PREFIX_TO_LONG_STYLE[o$1])
    };
    _defaultUsablePrefix = null;
    _byUnicode = {};
    _byLigature = {};
    _byOldName = {};
    _byOldUnicode = {};
    _byAlias = {};
    PREFIXES = {
      [a$1]: Object.keys(PREFIX_TO_STYLE[a$1]),
      [r$1]: Object.keys(PREFIX_TO_STYLE[r$1]),
      [o$1]: Object.keys(PREFIX_TO_STYLE[o$1])
    };
    build = () => {
      const lookup = (reducer) => {
        return reduce(styles, (o$$1, style, prefix) => {
          o$$1[prefix] = reduce(style, reducer, {});
          return o$$1;
        }, {});
      };
      _byUnicode = lookup((acc, icon2, iconName) => {
        if (icon2[3]) {
          acc[icon2[3]] = iconName;
        }
        if (icon2[2]) {
          const aliases = icon2[2].filter((a$$1) => {
            return typeof a$$1 === "number";
          });
          aliases.forEach((alias) => {
            acc[alias.toString(16)] = iconName;
          });
        }
        return acc;
      });
      _byLigature = lookup((acc, icon2, iconName) => {
        acc[iconName] = iconName;
        if (icon2[2]) {
          const aliases = icon2[2].filter((a$$1) => {
            return typeof a$$1 === "string";
          });
          aliases.forEach((alias) => {
            acc[alias] = iconName;
          });
        }
        return acc;
      });
      _byAlias = lookup((acc, icon2, iconName) => {
        const aliases = icon2[2];
        acc[iconName] = iconName;
        aliases.forEach((alias) => {
          acc[alias] = iconName;
        });
        return acc;
      });
      const hasRegular = "far" in styles || config.autoFetchSvg;
      const shimLookups = reduce(shims, (acc, shim) => {
        const maybeNameMaybeUnicode = shim[0];
        let prefix = shim[1];
        const iconName = shim[2];
        if (prefix === "far" && !hasRegular) {
          prefix = "fas";
        }
        if (typeof maybeNameMaybeUnicode === "string") {
          acc.names[maybeNameMaybeUnicode] = {
            prefix,
            iconName
          };
        }
        if (typeof maybeNameMaybeUnicode === "number") {
          acc.unicodes[maybeNameMaybeUnicode.toString(16)] = {
            prefix,
            iconName
          };
        }
        return acc;
      }, {
        names: {},
        unicodes: {}
      });
      _byOldName = shimLookups.names;
      _byOldUnicode = shimLookups.unicodes;
      _defaultUsablePrefix = getCanonicalPrefix(config.styleDefault, {
        family: config.familyDefault
      });
    };
    onChange((c$$1) => {
      _defaultUsablePrefix = getCanonicalPrefix(c$$1.styleDefault, {
        family: config.familyDefault
      });
    });
    build();
    emptyCanonicalIcon = () => {
      return {
        prefix: null,
        iconName: null,
        rest: []
      };
    };
    PREFIXES_FOR_FAMILY = {
      [a$1]: Object.keys(PREFIX_TO_LONG_STYLE[a$1]),
      [r$1]: Object.keys(PREFIX_TO_LONG_STYLE[r$1]),
      [o$1]: Object.keys(PREFIX_TO_LONG_STYLE[o$1])
    };
    Library = class {
      constructor() {
        this.definitions = {};
      }
      add() {
        for (var _len = arguments.length, definitions = new Array(_len), _key = 0; _key < _len; _key++) {
          definitions[_key] = arguments[_key];
        }
        const additions = definitions.reduce(this._pullDefinitions, {});
        Object.keys(additions).forEach((key2) => {
          this.definitions[key2] = {
            ...this.definitions[key2] || {},
            ...additions[key2]
          };
          defineIcons(key2, additions[key2]);
          const longPrefix = PREFIX_TO_LONG_STYLE[a$1][key2];
          if (longPrefix) defineIcons(longPrefix, additions[key2]);
          build();
        });
      }
      reset() {
        this.definitions = {};
      }
      _pullDefinitions(additions, definition) {
        const normalized = definition.prefix && definition.iconName && definition.icon ? {
          0: definition
        } : definition;
        Object.keys(normalized).map((key2) => {
          const {
            prefix,
            iconName,
            icon: icon2
          } = normalized[key2];
          const aliases = icon2[2];
          if (!additions[prefix]) additions[prefix] = {};
          if (aliases.length > 0) {
            aliases.forEach((alias) => {
              if (typeof alias === "string") {
                additions[prefix][alias] = icon2;
              }
            });
          }
          additions[prefix][iconName] = icon2;
        });
        return additions;
      }
    };
    _plugins = [];
    _hooks = {};
    providers = {};
    defaultProviderKeys = Object.keys(providers);
    library = new Library();
    noAuto = () => {
      config.autoReplaceSvg = false;
      config.observeMutations = false;
      callHooks("noAuto");
    };
    dom = {
      i2svg: function() {
        let params = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        if (IS_DOM) {
          callHooks("beforeI2svg", params);
          callProvided("pseudoElements2svg", params);
          return callProvided("i2svg", params);
        } else {
          return Promise.reject(new Error("Operation requires a DOM of some kind."));
        }
      },
      watch: function() {
        let params = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        const {
          autoReplaceSvgRoot
        } = params;
        if (config.autoReplaceSvg === false) {
          config.autoReplaceSvg = true;
        }
        config.observeMutations = true;
        domready(() => {
          autoReplace({
            autoReplaceSvgRoot
          });
          callHooks("watch", params);
        });
      }
    };
    parse2 = {
      icon: (icon2) => {
        if (icon2 === null) {
          return null;
        }
        if (typeof icon2 === "object" && icon2.prefix && icon2.iconName) {
          return {
            prefix: icon2.prefix,
            iconName: byAlias(icon2.prefix, icon2.iconName) || icon2.iconName
          };
        }
        if (Array.isArray(icon2) && icon2.length === 2) {
          const iconName = icon2[1].indexOf("fa-") === 0 ? icon2[1].slice(3) : icon2[1];
          const prefix = getCanonicalPrefix(icon2[0]);
          return {
            prefix,
            iconName: byAlias(prefix, iconName) || iconName
          };
        }
        if (typeof icon2 === "string" && (icon2.indexOf("".concat(config.cssPrefix, "-")) > -1 || icon2.match(ICON_SELECTION_SYNTAX_PATTERN))) {
          const canonicalIcon = getCanonicalIcon(icon2.split(" "), {
            skipLookups: true
          });
          return {
            prefix: canonicalIcon.prefix || getDefaultUsablePrefix(),
            iconName: byAlias(canonicalIcon.prefix, canonicalIcon.iconName) || canonicalIcon.iconName
          };
        }
        if (typeof icon2 === "string") {
          const prefix = getDefaultUsablePrefix();
          return {
            prefix,
            iconName: byAlias(prefix, icon2) || icon2
          };
        }
      }
    };
    api = {
      noAuto,
      config,
      dom,
      parse: parse2,
      library,
      findIconDefinition,
      toHtml
    };
    autoReplace = function() {
      let params = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      const {
        autoReplaceSvgRoot = DOCUMENT
      } = params;
      if ((Object.keys(namespace.styles).length > 0 || config.autoFetchSvg) && IS_DOM && config.autoReplaceSvg) api.dom.i2svg({
        node: autoReplaceSvgRoot
      });
    };
    ({
      styles: styles$1
    } = namespace);
    missingIconResolutionMixin = {
      found: false,
      width: 512,
      height: 512
    };
    noop$1 = () => {
    };
    p$2 = config.measurePerformance && PERFORMANCE && PERFORMANCE.mark && PERFORMANCE.measure ? PERFORMANCE : {
      mark: noop$1,
      measure: noop$1
    };
    preamble = 'FA "6.6.0"';
    begin = (name2) => {
      p$2.mark("".concat(preamble, " ").concat(name2, " begins"));
      return () => end(name2);
    };
    end = (name2) => {
      p$2.mark("".concat(preamble, " ").concat(name2, " ends"));
      p$2.measure("".concat(preamble, " ").concat(name2), "".concat(preamble, " ").concat(name2, " begins"), "".concat(preamble, " ").concat(name2, " ends"));
    };
    perf = {
      begin,
      end
    };
    noop$2 = () => {
    };
    mutators = {
      replace: function(mutation) {
        const node = mutation[0];
        if (node.parentNode) {
          mutation[1].forEach((abstract) => {
            node.parentNode.insertBefore(convertSVG(abstract), node);
          });
          if (node.getAttribute(DATA_FA_I2SVG) === null && config.keepOriginalSource) {
            let comment = DOCUMENT.createComment(nodeAsComment(node));
            node.parentNode.replaceChild(comment, node);
          } else {
            node.remove();
          }
        }
      },
      nest: function(mutation) {
        const node = mutation[0];
        const abstract = mutation[1];
        if (~classArray(node).indexOf(config.replacementClass)) {
          return mutators.replace(mutation);
        }
        const forSvg = new RegExp("".concat(config.cssPrefix, "-.*"));
        delete abstract[0].attributes.id;
        if (abstract[0].attributes.class) {
          const splitClasses = abstract[0].attributes.class.split(" ").reduce((acc, cls) => {
            if (cls === config.replacementClass || cls.match(forSvg)) {
              acc.toSvg.push(cls);
            } else {
              acc.toNode.push(cls);
            }
            return acc;
          }, {
            toNode: [],
            toSvg: []
          });
          abstract[0].attributes.class = splitClasses.toSvg.join(" ");
          if (splitClasses.toNode.length === 0) {
            node.removeAttribute("class");
          } else {
            node.setAttribute("class", splitClasses.toNode.join(" "));
          }
        }
        const newInnerHTML = abstract.map((a2) => toHtml(a2)).join("\n");
        node.setAttribute(DATA_FA_I2SVG, "");
        node.innerHTML = newInnerHTML;
      }
    };
    disabled = false;
    mo$1 = null;
    ({
      styles: styles$2
    } = namespace);
    knownPrefixes = /* @__PURE__ */ new Set();
    FAMILIES.map((family) => {
      knownPrefixes.add("fa-".concat(family));
    });
    Object.keys(PREFIX_TO_STYLE[a$1]).map(knownPrefixes.add.bind(knownPrefixes));
    Object.keys(PREFIX_TO_STYLE[r$1]).map(knownPrefixes.add.bind(knownPrefixes));
    Object.keys(PREFIX_TO_STYLE[o$1]).map(knownPrefixes.add.bind(knownPrefixes));
    knownPrefixes = [...knownPrefixes];
    render = function(iconDefinition) {
      let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      const {
        transform = meaninglessTransform,
        symbol = false,
        mask = null,
        maskId = null,
        title = null,
        titleId = null,
        classes = [],
        attributes = {},
        styles: styles2 = {}
      } = params;
      if (!iconDefinition) return;
      const {
        prefix,
        iconName,
        icon: icon2
      } = iconDefinition;
      return domVariants({
        type: "icon",
        ...iconDefinition
      }, () => {
        callHooks("beforeDOMElementCreation", {
          iconDefinition,
          params
        });
        if (config.autoA11y) {
          if (title) {
            attributes["aria-labelledby"] = "".concat(config.replacementClass, "-title-").concat(titleId || nextUniqueId());
          } else {
            attributes["aria-hidden"] = "true";
            attributes["focusable"] = "false";
          }
        }
        return makeInlineSvgAbstract({
          icons: {
            main: asFoundIcon(icon2),
            mask: mask ? asFoundIcon(mask.icon) : {
              found: false,
              width: null,
              height: null,
              icon: {}
            }
          },
          prefix,
          iconName,
          transform: {
            ...meaninglessTransform,
            ...transform
          },
          symbol,
          title,
          maskId,
          titleId,
          extra: {
            attributes,
            styles: styles2,
            classes
          }
        });
      });
    };
    ReplaceElements = {
      mixout() {
        return {
          icon: resolveIcons(render)
        };
      },
      hooks() {
        return {
          mutationObserverCallbacks(accumulator) {
            accumulator.treeCallback = onTree;
            accumulator.nodeCallback = onNode;
            return accumulator;
          }
        };
      },
      provides(providers$$1) {
        providers$$1.i2svg = function(params) {
          const {
            node = DOCUMENT,
            callback = () => {
            }
          } = params;
          return onTree(node, callback);
        };
        providers$$1.generateSvgReplacementMutation = function(node, nodeMeta) {
          const {
            iconName,
            title,
            titleId,
            prefix,
            transform,
            symbol,
            mask,
            maskId,
            extra
          } = nodeMeta;
          return new Promise((resolve2, reject) => {
            Promise.all([findIcon(iconName, prefix), mask.iconName ? findIcon(mask.iconName, mask.prefix) : Promise.resolve({
              found: false,
              width: 512,
              height: 512,
              icon: {}
            })]).then((_ref) => {
              let [main, mask2] = _ref;
              resolve2([node, makeInlineSvgAbstract({
                icons: {
                  main,
                  mask: mask2
                },
                prefix,
                iconName,
                transform,
                symbol,
                maskId,
                title,
                titleId,
                extra,
                watchable: true
              })]);
            }).catch(reject);
          });
        };
        providers$$1.generateAbstractIcon = function(_ref2) {
          let {
            children,
            attributes,
            main,
            transform,
            styles: styles2
          } = _ref2;
          const styleString = joinStyles(styles2);
          if (styleString.length > 0) {
            attributes["style"] = styleString;
          }
          let nextChild;
          if (transformIsMeaningful(transform)) {
            nextChild = callProvided("generateAbstractTransformGrouping", {
              main,
              transform,
              containerWidth: main.width,
              iconWidth: main.width
            });
          }
          children.push(nextChild || main.icon);
          return {
            children,
            attributes
          };
        };
      }
    };
    Layers = {
      mixout() {
        return {
          layer(assembler) {
            let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
            const {
              classes = []
            } = params;
            return domVariants({
              type: "layer"
            }, () => {
              callHooks("beforeDOMElementCreation", {
                assembler,
                params
              });
              let children = [];
              assembler((args) => {
                Array.isArray(args) ? args.map((a2) => {
                  children = children.concat(a2.abstract);
                }) : children = children.concat(args.abstract);
              });
              return [{
                tag: "span",
                attributes: {
                  class: ["".concat(config.cssPrefix, "-layers"), ...classes].join(" ")
                },
                children
              }];
            });
          }
        };
      }
    };
    LayersCounter = {
      mixout() {
        return {
          counter(content) {
            let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
            const {
              title = null,
              classes = [],
              attributes = {},
              styles: styles2 = {}
            } = params;
            return domVariants({
              type: "counter",
              content
            }, () => {
              callHooks("beforeDOMElementCreation", {
                content,
                params
              });
              return makeLayersCounterAbstract({
                content: content.toString(),
                title,
                extra: {
                  attributes,
                  styles: styles2,
                  classes: ["".concat(config.cssPrefix, "-layers-counter"), ...classes]
                }
              });
            });
          }
        };
      }
    };
    LayersText = {
      mixout() {
        return {
          text(content) {
            let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
            const {
              transform = meaninglessTransform,
              title = null,
              classes = [],
              attributes = {},
              styles: styles2 = {}
            } = params;
            return domVariants({
              type: "text",
              content
            }, () => {
              callHooks("beforeDOMElementCreation", {
                content,
                params
              });
              return makeLayersTextAbstract({
                content,
                transform: {
                  ...meaninglessTransform,
                  ...transform
                },
                title,
                extra: {
                  attributes,
                  styles: styles2,
                  classes: ["".concat(config.cssPrefix, "-layers-text"), ...classes]
                }
              });
            });
          }
        };
      },
      provides(providers$$1) {
        providers$$1.generateLayersText = function(node, nodeMeta) {
          const {
            title,
            transform,
            extra
          } = nodeMeta;
          let width = null;
          let height = null;
          if (IS_IE) {
            const computedFontSize = parseInt(getComputedStyle(node).fontSize, 10);
            const boundingClientRect = node.getBoundingClientRect();
            width = boundingClientRect.width / computedFontSize;
            height = boundingClientRect.height / computedFontSize;
          }
          if (config.autoA11y && !title) {
            extra.attributes["aria-hidden"] = "true";
          }
          return Promise.resolve([node, makeLayersTextAbstract({
            content: node.innerHTML,
            width,
            height,
            transform,
            title,
            extra,
            watchable: true
          })]);
        };
      }
    };
    CLEAN_CONTENT_PATTERN = new RegExp('"', "ug");
    SECONDARY_UNICODE_RANGE = [1105920, 1112319];
    _FONT_FAMILY_WEIGHT_TO_PREFIX = {
      ...{
        FontAwesome: {
          normal: "fas",
          400: "fas"
        }
      },
      ...eo,
      ...ao,
      ...mo
    };
    FONT_FAMILY_WEIGHT_TO_PREFIX = Object.keys(_FONT_FAMILY_WEIGHT_TO_PREFIX).reduce((acc, key2) => {
      acc[key2.toLowerCase()] = _FONT_FAMILY_WEIGHT_TO_PREFIX[key2];
      return acc;
    }, {});
    FONT_FAMILY_WEIGHT_FALLBACK = Object.keys(FONT_FAMILY_WEIGHT_TO_PREFIX).reduce((acc, fontFamily) => {
      const weights = FONT_FAMILY_WEIGHT_TO_PREFIX[fontFamily];
      acc[fontFamily] = weights[900] || [...Object.entries(weights)][0][1];
      return acc;
    }, {});
    PseudoElements = {
      hooks() {
        return {
          mutationObserverCallbacks(accumulator) {
            accumulator.pseudoElementsCallback = searchPseudoElements;
            return accumulator;
          }
        };
      },
      provides(providers2) {
        providers2.pseudoElements2svg = function(params) {
          const {
            node = DOCUMENT
          } = params;
          if (config.searchPseudoElements) {
            searchPseudoElements(node);
          }
        };
      }
    };
    _unwatched = false;
    MutationObserver$1 = {
      mixout() {
        return {
          dom: {
            unwatch() {
              disableObservation();
              _unwatched = true;
            }
          }
        };
      },
      hooks() {
        return {
          bootstrap() {
            observe(chainHooks("mutationObserverCallbacks", {}));
          },
          noAuto() {
            disconnect();
          },
          watch(params) {
            const {
              observeMutationsRoot
            } = params;
            if (_unwatched) {
              enableObservation();
            } else {
              observe(chainHooks("mutationObserverCallbacks", {
                observeMutationsRoot
              }));
            }
          }
        };
      }
    };
    parseTransformString = (transformString) => {
      let transform = {
        size: 16,
        x: 0,
        y: 0,
        flipX: false,
        flipY: false,
        rotate: 0
      };
      return transformString.toLowerCase().split(" ").reduce((acc, n22) => {
        const parts = n22.toLowerCase().split("-");
        const first = parts[0];
        let rest = parts.slice(1).join("-");
        if (first && rest === "h") {
          acc.flipX = true;
          return acc;
        }
        if (first && rest === "v") {
          acc.flipY = true;
          return acc;
        }
        rest = parseFloat(rest);
        if (isNaN(rest)) {
          return acc;
        }
        switch (first) {
          case "grow":
            acc.size = acc.size + rest;
            break;
          case "shrink":
            acc.size = acc.size - rest;
            break;
          case "left":
            acc.x = acc.x - rest;
            break;
          case "right":
            acc.x = acc.x + rest;
            break;
          case "up":
            acc.y = acc.y - rest;
            break;
          case "down":
            acc.y = acc.y + rest;
            break;
          case "rotate":
            acc.rotate = acc.rotate + rest;
            break;
        }
        return acc;
      }, transform);
    };
    PowerTransforms = {
      mixout() {
        return {
          parse: {
            transform: (transformString) => {
              return parseTransformString(transformString);
            }
          }
        };
      },
      hooks() {
        return {
          parseNodeAttributes(accumulator, node) {
            const transformString = node.getAttribute("data-fa-transform");
            if (transformString) {
              accumulator.transform = parseTransformString(transformString);
            }
            return accumulator;
          }
        };
      },
      provides(providers2) {
        providers2.generateAbstractTransformGrouping = function(_ref) {
          let {
            main,
            transform,
            containerWidth,
            iconWidth
          } = _ref;
          const outer = {
            transform: "translate(".concat(containerWidth / 2, " 256)")
          };
          const innerTranslate = "translate(".concat(transform.x * 32, ", ").concat(transform.y * 32, ") ");
          const innerScale = "scale(".concat(transform.size / 16 * (transform.flipX ? -1 : 1), ", ").concat(transform.size / 16 * (transform.flipY ? -1 : 1), ") ");
          const innerRotate = "rotate(".concat(transform.rotate, " 0 0)");
          const inner = {
            transform: "".concat(innerTranslate, " ").concat(innerScale, " ").concat(innerRotate)
          };
          const path = {
            transform: "translate(".concat(iconWidth / 2 * -1, " -256)")
          };
          const operations = {
            outer,
            inner,
            path
          };
          return {
            tag: "g",
            attributes: {
              ...operations.outer
            },
            children: [{
              tag: "g",
              attributes: {
                ...operations.inner
              },
              children: [{
                tag: main.icon.tag,
                children: main.icon.children,
                attributes: {
                  ...main.icon.attributes,
                  ...operations.path
                }
              }]
            }]
          };
        };
      }
    };
    ALL_SPACE = {
      x: 0,
      y: 0,
      width: "100%",
      height: "100%"
    };
    Masks = {
      hooks() {
        return {
          parseNodeAttributes(accumulator, node) {
            const maskData = node.getAttribute("data-fa-mask");
            const mask = !maskData ? emptyCanonicalIcon() : getCanonicalIcon(maskData.split(" ").map((i2) => i2.trim()));
            if (!mask.prefix) {
              mask.prefix = getDefaultUsablePrefix();
            }
            accumulator.mask = mask;
            accumulator.maskId = node.getAttribute("data-fa-mask-id");
            return accumulator;
          }
        };
      },
      provides(providers2) {
        providers2.generateAbstractMask = function(_ref) {
          let {
            children,
            attributes,
            main,
            mask,
            maskId: explicitMaskId,
            transform
          } = _ref;
          const {
            width: mainWidth,
            icon: mainPath
          } = main;
          const {
            width: maskWidth,
            icon: maskPath
          } = mask;
          const trans = transformForSvg({
            transform,
            containerWidth: maskWidth,
            iconWidth: mainWidth
          });
          const maskRect = {
            tag: "rect",
            attributes: {
              ...ALL_SPACE,
              fill: "white"
            }
          };
          const maskInnerGroupChildrenMixin = mainPath.children ? {
            children: mainPath.children.map(fillBlack)
          } : {};
          const maskInnerGroup = {
            tag: "g",
            attributes: {
              ...trans.inner
            },
            children: [fillBlack({
              tag: mainPath.tag,
              attributes: {
                ...mainPath.attributes,
                ...trans.path
              },
              ...maskInnerGroupChildrenMixin
            })]
          };
          const maskOuterGroup = {
            tag: "g",
            attributes: {
              ...trans.outer
            },
            children: [maskInnerGroup]
          };
          const maskId = "mask-".concat(explicitMaskId || nextUniqueId());
          const clipId = "clip-".concat(explicitMaskId || nextUniqueId());
          const maskTag = {
            tag: "mask",
            attributes: {
              ...ALL_SPACE,
              id: maskId,
              maskUnits: "userSpaceOnUse",
              maskContentUnits: "userSpaceOnUse"
            },
            children: [maskRect, maskOuterGroup]
          };
          const defs = {
            tag: "defs",
            children: [{
              tag: "clipPath",
              attributes: {
                id: clipId
              },
              children: deGroup(maskPath)
            }, maskTag]
          };
          children.push(defs, {
            tag: "rect",
            attributes: {
              fill: "currentColor",
              "clip-path": "url(#".concat(clipId, ")"),
              mask: "url(#".concat(maskId, ")"),
              ...ALL_SPACE
            }
          });
          return {
            children,
            attributes
          };
        };
      }
    };
    MissingIconIndicator = {
      provides(providers2) {
        let reduceMotion = false;
        if (WINDOW.matchMedia) {
          reduceMotion = WINDOW.matchMedia("(prefers-reduced-motion: reduce)").matches;
        }
        providers2.missingIconAbstract = function() {
          const gChildren = [];
          const FILL = {
            fill: "currentColor"
          };
          const ANIMATION_BASE = {
            attributeType: "XML",
            repeatCount: "indefinite",
            dur: "2s"
          };
          gChildren.push({
            tag: "path",
            attributes: {
              ...FILL,
              d: "M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z"
            }
          });
          const OPACITY_ANIMATE = {
            ...ANIMATION_BASE,
            attributeName: "opacity"
          };
          const dot = {
            tag: "circle",
            attributes: {
              ...FILL,
              cx: "256",
              cy: "364",
              r: "28"
            },
            children: []
          };
          if (!reduceMotion) {
            dot.children.push({
              tag: "animate",
              attributes: {
                ...ANIMATION_BASE,
                attributeName: "r",
                values: "28;14;28;28;14;28;"
              }
            }, {
              tag: "animate",
              attributes: {
                ...OPACITY_ANIMATE,
                values: "1;0;1;1;0;1;"
              }
            });
          }
          gChildren.push(dot);
          gChildren.push({
            tag: "path",
            attributes: {
              ...FILL,
              opacity: "1",
              d: "M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z"
            },
            children: reduceMotion ? [] : [{
              tag: "animate",
              attributes: {
                ...OPACITY_ANIMATE,
                values: "1;0;0;0;0;1;"
              }
            }]
          });
          if (!reduceMotion) {
            gChildren.push({
              tag: "path",
              attributes: {
                ...FILL,
                opacity: "0",
                d: "M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z"
              },
              children: [{
                tag: "animate",
                attributes: {
                  ...OPACITY_ANIMATE,
                  values: "0;0;1;1;0;0;"
                }
              }]
            });
          }
          return {
            tag: "g",
            attributes: {
              "class": "missing"
            },
            children: gChildren
          };
        };
      }
    };
    SvgSymbols = {
      hooks() {
        return {
          parseNodeAttributes(accumulator, node) {
            const symbolData = node.getAttribute("data-fa-symbol");
            const symbol = symbolData === null ? false : symbolData === "" ? true : symbolData;
            accumulator["symbol"] = symbol;
            return accumulator;
          }
        };
      }
    };
    plugins = [InjectCSS, ReplaceElements, Layers, LayersCounter, LayersText, PseudoElements, MutationObserver$1, PowerTransforms, Masks, MissingIconIndicator, SvgSymbols];
    registerPlugins(plugins, {
      mixoutsTo: api
    });
    api.noAuto;
    api.config;
    api.library;
    api.dom;
    parse$12 = api.parse;
    api.findIconDefinition;
    api.toHtml;
    icon = api.icon;
    api.layer;
    api.text;
    api.counter;
    PRODUCTION = false;
    try {
      PRODUCTION = false;
    } catch (e23) {
    }
    SvgElement = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { tag } = $$props;
      let { props } = $$props;
      let { children } = $$props;
      let { style = null } = $$props;
      let { ref = null } = $$props;
      if (tag !== "svg") {
        throw new Error('SvgElement requires a tag of "svg"');
      }
      function processChildren(children2) {
        return children2?.reduce(
          (acc, child) => {
            return acc + (child.tag ? generateMarkup(child) : child);
          },
          ""
        ) || "";
      }
      function generateMarkup({ tag: tag2, props: props2, children: children2 }) {
        const attributes = Object.keys(props2).map((key2) => `${key2}="${props2[key2]}"`).join(" ");
        return `<${tag2} ${attributes}>${processChildren(children2)}</${tag2}>`;
      }
      const markup = processChildren(children);
      const elementStyle = props?.style ? `${props.style}${style || ""}` : style;
      const elementProps = { ...props, style: elementStyle };
      if ($$props.tag === void 0 && $$bindings.tag && tag !== void 0) $$bindings.tag(tag);
      if ($$props.props === void 0 && $$bindings.props && props !== void 0) $$bindings.props(props);
      if ($$props.children === void 0 && $$bindings.children && children !== void 0) $$bindings.children(children);
      if ($$props.style === void 0 && $$bindings.style && style !== void 0) $$bindings.style(style);
      if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0) $$bindings.ref(ref);
      return `<svg${spread([escape_object(elementProps)], {})}${add_attribute("this", ref, 0)}><!-- HTML_TAG_START -->${markup}<!-- HTML_TAG_END --></svg>`;
    });
    FontAwesomeIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, [
        "border",
        "mask",
        "maskId",
        "fixedWidth",
        "inverse",
        "flip",
        "icon",
        "listItem",
        "pull",
        "pulse",
        "rotation",
        "size",
        "spin",
        "spinPulse",
        "spinReverse",
        "beat",
        "fade",
        "beatFade",
        "bounce",
        "shake",
        "symbol",
        "title",
        "titleId",
        "transform",
        "swapOpacity",
        "ref",
        "style"
      ]);
      let { border = false } = $$props;
      let { mask = null } = $$props;
      let { maskId = null } = $$props;
      let { fixedWidth = false } = $$props;
      let { inverse = false } = $$props;
      let { flip = false } = $$props;
      let { icon: icon$1 = null } = $$props;
      let { listItem = false } = $$props;
      let { pull = null } = $$props;
      let { pulse = false } = $$props;
      let { rotation = null } = $$props;
      let { size = null } = $$props;
      let { spin = false } = $$props;
      let { spinPulse = false } = $$props;
      let { spinReverse = false } = $$props;
      let { beat = false } = $$props;
      let { fade = false } = $$props;
      let { beatFade = false } = $$props;
      let { bounce = false } = $$props;
      let { shake = false } = $$props;
      let { symbol = false } = $$props;
      let { title = "" } = $$props;
      let { titleId = null } = $$props;
      let { transform = null } = $$props;
      let { swapOpacity = false } = $$props;
      let { ref = null } = $$props;
      let { style = null } = $$props;
      const iconLookup = normalizeIconArgs(icon$1);
      const classes = objectWithKey("classes", [...classList($$props), ...($$props.class || "").split(" ")]);
      const transformObj = objectWithKey("transform", typeof transform === "string" ? parse$12.transform(transform) : transform);
      const maskObj = objectWithKey("mask", normalizeIconArgs(mask));
      const renderedIcon = icon(iconLookup, {
        ...classes,
        ...transformObj,
        ...maskObj,
        symbol,
        title,
        titleId,
        maskId
      });
      let result = null;
      if (!renderedIcon) {
        log("Could not find icon", iconLookup);
      } else {
        const { abstract } = renderedIcon;
        result = convert(
          (tag, props, children) => {
            return { tag, props, children };
          },
          abstract[0],
          $$restProps
        );
      }
      if ($$props.border === void 0 && $$bindings.border && border !== void 0) $$bindings.border(border);
      if ($$props.mask === void 0 && $$bindings.mask && mask !== void 0) $$bindings.mask(mask);
      if ($$props.maskId === void 0 && $$bindings.maskId && maskId !== void 0) $$bindings.maskId(maskId);
      if ($$props.fixedWidth === void 0 && $$bindings.fixedWidth && fixedWidth !== void 0) $$bindings.fixedWidth(fixedWidth);
      if ($$props.inverse === void 0 && $$bindings.inverse && inverse !== void 0) $$bindings.inverse(inverse);
      if ($$props.flip === void 0 && $$bindings.flip && flip !== void 0) $$bindings.flip(flip);
      if ($$props.icon === void 0 && $$bindings.icon && icon$1 !== void 0) $$bindings.icon(icon$1);
      if ($$props.listItem === void 0 && $$bindings.listItem && listItem !== void 0) $$bindings.listItem(listItem);
      if ($$props.pull === void 0 && $$bindings.pull && pull !== void 0) $$bindings.pull(pull);
      if ($$props.pulse === void 0 && $$bindings.pulse && pulse !== void 0) $$bindings.pulse(pulse);
      if ($$props.rotation === void 0 && $$bindings.rotation && rotation !== void 0) $$bindings.rotation(rotation);
      if ($$props.size === void 0 && $$bindings.size && size !== void 0) $$bindings.size(size);
      if ($$props.spin === void 0 && $$bindings.spin && spin !== void 0) $$bindings.spin(spin);
      if ($$props.spinPulse === void 0 && $$bindings.spinPulse && spinPulse !== void 0) $$bindings.spinPulse(spinPulse);
      if ($$props.spinReverse === void 0 && $$bindings.spinReverse && spinReverse !== void 0) $$bindings.spinReverse(spinReverse);
      if ($$props.beat === void 0 && $$bindings.beat && beat !== void 0) $$bindings.beat(beat);
      if ($$props.fade === void 0 && $$bindings.fade && fade !== void 0) $$bindings.fade(fade);
      if ($$props.beatFade === void 0 && $$bindings.beatFade && beatFade !== void 0) $$bindings.beatFade(beatFade);
      if ($$props.bounce === void 0 && $$bindings.bounce && bounce !== void 0) $$bindings.bounce(bounce);
      if ($$props.shake === void 0 && $$bindings.shake && shake !== void 0) $$bindings.shake(shake);
      if ($$props.symbol === void 0 && $$bindings.symbol && symbol !== void 0) $$bindings.symbol(symbol);
      if ($$props.title === void 0 && $$bindings.title && title !== void 0) $$bindings.title(title);
      if ($$props.titleId === void 0 && $$bindings.titleId && titleId !== void 0) $$bindings.titleId(titleId);
      if ($$props.transform === void 0 && $$bindings.transform && transform !== void 0) $$bindings.transform(transform);
      if ($$props.swapOpacity === void 0 && $$bindings.swapOpacity && swapOpacity !== void 0) $$bindings.swapOpacity(swapOpacity);
      if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0) $$bindings.ref(ref);
      if ($$props.style === void 0 && $$bindings.style && style !== void 0) $$bindings.style(style);
      let $$settled;
      let $$rendered;
      let previous_head = $$result.head;
      do {
        $$settled = true;
        $$result.head = previous_head;
        $$rendered = `${result ? `${validate_component(SvgElement, "SvgElement").$$render(
          $$result,
          Object.assign({}, result, { style }, { ref }),
          {
            ref: ($$value) => {
              ref = $$value;
              $$settled = false;
            }
          },
          {}
        )}` : ``}`;
      } while (!$$settled);
      return $$rendered;
    });
    r = { grad: 0.9, turn: 360, rad: 360 / (2 * Math.PI) };
    t = function(r23) {
      return "string" == typeof r23 ? r23.length > 0 : "number" == typeof r23;
    };
    n = function(r23, t22, n22) {
      return void 0 === t22 && (t22 = 0), void 0 === n22 && (n22 = Math.pow(10, t22)), Math.round(n22 * r23) / n22 + 0;
    };
    e = function(r23, t22, n22) {
      return void 0 === t22 && (t22 = 0), void 0 === n22 && (n22 = 1), r23 > n22 ? n22 : r23 > t22 ? r23 : t22;
    };
    u = function(r23) {
      return (r23 = isFinite(r23) ? r23 % 360 : 0) > 0 ? r23 : r23 + 360;
    };
    a = function(r23) {
      return { r: e(r23.r, 0, 255), g: e(r23.g, 0, 255), b: e(r23.b, 0, 255), a: e(r23.a) };
    };
    o = function(r23) {
      return { r: n(r23.r), g: n(r23.g), b: n(r23.b), a: n(r23.a, 3) };
    };
    i = /^#([0-9a-f]{3,8})$/i;
    s2 = function(r23) {
      var t22 = r23.toString(16);
      return t22.length < 2 ? "0" + t22 : t22;
    };
    h = function(r23) {
      var t22 = r23.r, n22 = r23.g, e23 = r23.b, u2 = r23.a, a2 = Math.max(t22, n22, e23), o22 = a2 - Math.min(t22, n22, e23), i2 = o22 ? a2 === t22 ? (n22 - e23) / o22 : a2 === n22 ? 2 + (e23 - t22) / o22 : 4 + (t22 - n22) / o22 : 0;
      return { h: 60 * (i2 < 0 ? i2 + 6 : i2), s: a2 ? o22 / a2 * 100 : 0, v: a2 / 255 * 100, a: u2 };
    };
    b = function(r23) {
      var t22 = r23.h, n22 = r23.s, e23 = r23.v, u2 = r23.a;
      t22 = t22 / 360 * 6, n22 /= 100, e23 /= 100;
      var a2 = Math.floor(t22), o22 = e23 * (1 - n22), i2 = e23 * (1 - (t22 - a2) * n22), s22 = e23 * (1 - (1 - t22 + a2) * n22), h2 = a2 % 6;
      return { r: 255 * [e23, i2, o22, o22, s22, e23][h2], g: 255 * [s22, e23, e23, i2, o22, o22][h2], b: 255 * [o22, o22, s22, e23, e23, i2][h2], a: u2 };
    };
    g = function(r23) {
      return { h: u(r23.h), s: e(r23.s, 0, 100), l: e(r23.l, 0, 100), a: e(r23.a) };
    };
    d = function(r23) {
      return { h: n(r23.h), s: n(r23.s), l: n(r23.l), a: n(r23.a, 3) };
    };
    f = function(r23) {
      return b((n22 = (t22 = r23).s, { h: t22.h, s: (n22 *= ((e23 = t22.l) < 50 ? e23 : 100 - e23) / 100) > 0 ? 2 * n22 / (e23 + n22) * 100 : 0, v: e23 + n22, a: t22.a }));
      var t22, n22, e23;
    };
    c = function(r23) {
      return { h: (t22 = h(r23)).h, s: (u2 = (200 - (n22 = t22.s)) * (e23 = t22.v) / 100) > 0 && u2 < 200 ? n22 * e23 / 100 / (u2 <= 100 ? u2 : 200 - u2) * 100 : 0, l: u2 / 2, a: t22.a };
      var t22, n22, e23, u2;
    };
    l = /^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s*,\s*([+-]?\d*\.?\d+)%\s*,\s*([+-]?\d*\.?\d+)%\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i;
    p = /^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s+([+-]?\d*\.?\d+)%\s+([+-]?\d*\.?\d+)%\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i;
    v = /^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i;
    m = /^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i;
    y = { string: [[function(r23) {
      var t22 = i.exec(r23);
      return t22 ? (r23 = t22[1]).length <= 4 ? { r: parseInt(r23[0] + r23[0], 16), g: parseInt(r23[1] + r23[1], 16), b: parseInt(r23[2] + r23[2], 16), a: 4 === r23.length ? n(parseInt(r23[3] + r23[3], 16) / 255, 2) : 1 } : 6 === r23.length || 8 === r23.length ? { r: parseInt(r23.substr(0, 2), 16), g: parseInt(r23.substr(2, 2), 16), b: parseInt(r23.substr(4, 2), 16), a: 8 === r23.length ? n(parseInt(r23.substr(6, 2), 16) / 255, 2) : 1 } : null : null;
    }, "hex"], [function(r23) {
      var t22 = v.exec(r23) || m.exec(r23);
      return t22 ? t22[2] !== t22[4] || t22[4] !== t22[6] ? null : a({ r: Number(t22[1]) / (t22[2] ? 100 / 255 : 1), g: Number(t22[3]) / (t22[4] ? 100 / 255 : 1), b: Number(t22[5]) / (t22[6] ? 100 / 255 : 1), a: void 0 === t22[7] ? 1 : Number(t22[7]) / (t22[8] ? 100 : 1) }) : null;
    }, "rgb"], [function(t22) {
      var n22 = l.exec(t22) || p.exec(t22);
      if (!n22) return null;
      var e23, u2, a2 = g({ h: (e23 = n22[1], u2 = n22[2], void 0 === u2 && (u2 = "deg"), Number(e23) * (r[u2] || 1)), s: Number(n22[3]), l: Number(n22[4]), a: void 0 === n22[5] ? 1 : Number(n22[5]) / (n22[6] ? 100 : 1) });
      return f(a2);
    }, "hsl"]], object: [[function(r23) {
      var n22 = r23.r, e23 = r23.g, u2 = r23.b, o22 = r23.a, i2 = void 0 === o22 ? 1 : o22;
      return t(n22) && t(e23) && t(u2) ? a({ r: Number(n22), g: Number(e23), b: Number(u2), a: Number(i2) }) : null;
    }, "rgb"], [function(r23) {
      var n22 = r23.h, e23 = r23.s, u2 = r23.l, a2 = r23.a, o22 = void 0 === a2 ? 1 : a2;
      if (!t(n22) || !t(e23) || !t(u2)) return null;
      var i2 = g({ h: Number(n22), s: Number(e23), l: Number(u2), a: Number(o22) });
      return f(i2);
    }, "hsl"], [function(r23) {
      var n22 = r23.h, a2 = r23.s, o22 = r23.v, i2 = r23.a, s22 = void 0 === i2 ? 1 : i2;
      if (!t(n22) || !t(a2) || !t(o22)) return null;
      var h2 = function(r3) {
        return { h: u(r3.h), s: e(r3.s, 0, 100), v: e(r3.v, 0, 100), a: e(r3.a) };
      }({ h: Number(n22), s: Number(a2), v: Number(o22), a: Number(s22) });
      return b(h2);
    }, "hsv"]] };
    N = function(r23, t22) {
      for (var n22 = 0; n22 < t22.length; n22++) {
        var e23 = t22[n22][0](r23);
        if (e23) return [e23, t22[n22][1]];
      }
      return [null, void 0];
    };
    x = function(r23) {
      return "string" == typeof r23 ? N(r23.trim(), y.string) : "object" == typeof r23 && null !== r23 ? N(r23, y.object) : [null, void 0];
    };
    M = function(r23, t22) {
      var n22 = c(r23);
      return { h: n22.h, s: e(n22.s + 100 * t22, 0, 100), l: n22.l, a: n22.a };
    };
    H = function(r23) {
      return (299 * r23.r + 587 * r23.g + 114 * r23.b) / 1e3 / 255;
    };
    $ = function(r23, t22) {
      var n22 = c(r23);
      return { h: n22.h, s: n22.s, l: e(n22.l + 100 * t22, 0, 100), a: n22.a };
    };
    j = function() {
      function r23(r3) {
        this.parsed = x(r3)[0], this.rgba = this.parsed || { r: 0, g: 0, b: 0, a: 1 };
      }
      return r23.prototype.isValid = function() {
        return null !== this.parsed;
      }, r23.prototype.brightness = function() {
        return n(H(this.rgba), 2);
      }, r23.prototype.isDark = function() {
        return H(this.rgba) < 0.5;
      }, r23.prototype.isLight = function() {
        return H(this.rgba) >= 0.5;
      }, r23.prototype.toHex = function() {
        return r3 = o(this.rgba), t22 = r3.r, e23 = r3.g, u2 = r3.b, i2 = (a2 = r3.a) < 1 ? s2(n(255 * a2)) : "", "#" + s2(t22) + s2(e23) + s2(u2) + i2;
        var r3, t22, e23, u2, a2, i2;
      }, r23.prototype.toRgb = function() {
        return o(this.rgba);
      }, r23.prototype.toRgbString = function() {
        return r3 = o(this.rgba), t22 = r3.r, n22 = r3.g, e23 = r3.b, (u2 = r3.a) < 1 ? "rgba(" + t22 + ", " + n22 + ", " + e23 + ", " + u2 + ")" : "rgb(" + t22 + ", " + n22 + ", " + e23 + ")";
        var r3, t22, n22, e23, u2;
      }, r23.prototype.toHsl = function() {
        return d(c(this.rgba));
      }, r23.prototype.toHslString = function() {
        return r3 = d(c(this.rgba)), t22 = r3.h, n22 = r3.s, e23 = r3.l, (u2 = r3.a) < 1 ? "hsla(" + t22 + ", " + n22 + "%, " + e23 + "%, " + u2 + ")" : "hsl(" + t22 + ", " + n22 + "%, " + e23 + "%)";
        var r3, t22, n22, e23, u2;
      }, r23.prototype.toHsv = function() {
        return r3 = h(this.rgba), { h: n(r3.h), s: n(r3.s), v: n(r3.v), a: n(r3.a, 3) };
        var r3;
      }, r23.prototype.invert = function() {
        return w({ r: 255 - (r3 = this.rgba).r, g: 255 - r3.g, b: 255 - r3.b, a: r3.a });
        var r3;
      }, r23.prototype.saturate = function(r3) {
        return void 0 === r3 && (r3 = 0.1), w(M(this.rgba, r3));
      }, r23.prototype.desaturate = function(r3) {
        return void 0 === r3 && (r3 = 0.1), w(M(this.rgba, -r3));
      }, r23.prototype.grayscale = function() {
        return w(M(this.rgba, -1));
      }, r23.prototype.lighten = function(r3) {
        return void 0 === r3 && (r3 = 0.1), w($(this.rgba, r3));
      }, r23.prototype.darken = function(r3) {
        return void 0 === r3 && (r3 = 0.1), w($(this.rgba, -r3));
      }, r23.prototype.rotate = function(r3) {
        return void 0 === r3 && (r3 = 15), this.hue(this.hue() + r3);
      }, r23.prototype.alpha = function(r3) {
        return "number" == typeof r3 ? w({ r: (t22 = this.rgba).r, g: t22.g, b: t22.b, a: r3 }) : n(this.rgba.a, 3);
        var t22;
      }, r23.prototype.hue = function(r3) {
        var t22 = c(this.rgba);
        return "number" == typeof r3 ? w({ h: r3, s: t22.s, l: t22.l, a: t22.a }) : n(t22.h);
      }, r23.prototype.isEqual = function(r3) {
        return this.toHex() === w(r3).toHex();
      }, r23;
    }();
    w = function(r23) {
      return r23 instanceof j ? r23 : new j(r23);
    };
    css$9 = {
      code: ".slider.svelte-w4j1dz.svelte-w4j1dz{---track-width:var(--track-width, unset);---track-height:var(--track-height, 6px);---track-background:var(--track-background, #949494);---track-border:var(--track-border, none);---thumb-size:var(--thumb-size, 16px);---thumb-background:var(--thumb-background, #2d2d2d);---thumb-border:var(--thumb-border, none);---position:var(--position, 0px);---margin-inline-thumb-bigger:max(var(---thumb-size) - var(---track-height), 0px);---margin-inline-thumb-smaller:max(var(---track-height) - var(---thumb-size), 0px);position:relative;margin:auto;user-select:none;-webkit-user-select:none;background-color:transparent}.slider.svelte-w4j1dz.svelte-w4j1dz::before{background-color:transparent}[aria-orientation='horizontal'].svelte-w4j1dz.svelte-w4j1dz{width:var(---track-width);max-width:calc(100% - 2 * var(---margin-inline-thumb-bigger));height:calc(max(var(---track-height), var(---thumb-size)) + 4px);height:max(var(---track-height), var(---thumb-size));margin-inline:var(---margin-inline-thumb-bigger);margin-block:var(--margin-block, 8px)}[aria-orientation='vertical'].svelte-w4j1dz.svelte-w4j1dz{width:calc(max(var(---track-height), var(---thumb-size)) + 4px);width:max(var(---track-height), var(---thumb-size));height:var(---track-width);max-height:calc(100% - 2 * var(---margin-inline-thumb-bigger));margin-block:var(---margin-inline-thumb-bigger);margin-inline:var(--margin-block, 8px)}.track.svelte-w4j1dz.svelte-w4j1dz{position:absolute;pointer-events:none;background:var(---track-background);border:var(---track-border);border-radius:calc(var(---track-height) / 2);box-sizing:border-box}[aria-orientation='horizontal'].svelte-w4j1dz .track.svelte-w4j1dz{height:var(---track-height);top:50%;transform:translateY(-50%);left:0;right:0}[aria-orientation='vertical'].svelte-w4j1dz .track.svelte-w4j1dz{width:var(---track-height);left:50%;transform:translateX(-50%);top:0;bottom:0}.thumb.svelte-w4j1dz.svelte-w4j1dz{pointer-events:none;position:absolute;height:var(---thumb-size);width:var(---thumb-size);border-radius:calc(var(---thumb-size) / 2);background:var(---thumb-background);border:var(---thumb-border);box-sizing:border-box;transform:translate(-50%, -50%);--margin-left:(\n				2 * var(---track-height) - var(---thumb-size) - var(---margin-inline-thumb-smaller)\n			) / 2;--left:calc(var(---position) * (100% - 2 * var(--margin-left)) + var(--margin-left))}[aria-orientation='horizontal'].svelte-w4j1dz:not(.reverse) .thumb.svelte-w4j1dz{top:50%;left:var(--left)}[aria-orientation='vertical'].svelte-w4j1dz:not(.reverse) .thumb.svelte-w4j1dz{left:50%;bottom:calc(var(--left) - var(---thumb-size))}[aria-orientation='horizontal'].reverse.svelte-w4j1dz .thumb.svelte-w4j1dz{top:50%;right:calc(var(--left) - var(---thumb-size))}[aria-orientation='vertical'].reverse.svelte-w4j1dz .thumb.svelte-w4j1dz{left:50%;top:calc(var(--left))}.slider.svelte-w4j1dz.svelte-w4j1dz:focus-visible{outline:none}.slider.svelte-w4j1dz:focus-visible .track.svelte-w4j1dz{outline:2px solid var(--focus-color, red);outline-offset:2px}",
      map: `{"version":3,"file":"Slider.svelte","sources":["Slider.svelte"],"sourcesContent":["<script>import { createEventDispatcher } from 'svelte';\\n/** min value of the slider */\\nexport let min = 0;\\n$: _min = typeof min === 'string' ? parseFloat(min) : min;\\n/** max value of the slider */\\nexport let max = 100;\\n$: _max = typeof max === 'string' ? parseFloat(max) : max;\\n/** step value of the slider */\\nexport let step = 1;\\n$: _step = typeof step === 'string' ? parseFloat(step) : step;\\n/** value of the slider */\\nexport let value = 50;\\n/**\\n * method to convert the current value to a string representation of the value for the \`aria-valuetext\` attribute.\\n * For example, a battery meter value might be conveyed as aria-valuetext=\\"8% (34 minutes) remaining\\".\\n * See [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-valuetext)\\n */\\nexport let ariaValueText = (current) => current.toString();\\n/** input name of the slider */\\nexport let name = undefined;\\n/** direction of the slider */\\nexport let direction = 'horizontal';\\n/** if true, the min and max values will be reversed */\\nexport let reverse = false;\\n/** disables mouse events */\\nexport let keyboardOnly = false;\\n/** div element representing the slider */\\nexport let slider = undefined;\\n/** aria-label props */\\nexport let ariaLabel = undefined;\\n/** aria-labelledby props */\\nexport let ariaLabelledBy = undefined;\\n/** aria-controls props */\\nexport let ariaControls = undefined;\\n/** indicate if the slider is being dragged */\\nexport let isDragging = false;\\nconst dispatch = createEventDispatcher();\\nfunction bound(value) {\\n    const ratio = 1 / _step;\\n    const rounded = Math.round(value * ratio) / ratio;\\n    return Math.max(_min, Math.min(_max, rounded));\\n}\\nfunction keyHandler(e) {\\n    const inc = e.shiftKey ? _step * 10 : _step;\\n    if (e.key === 'ArrowUp' || e.key === 'ArrowRight') {\\n        value += inc;\\n        e.preventDefault();\\n    }\\n    else if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') {\\n        value -= inc;\\n        e.preventDefault();\\n    }\\n    else if (e.key === 'Home') {\\n        value = _min;\\n        e.preventDefault();\\n    }\\n    else if (e.key === 'End') {\\n        value = _max;\\n        e.preventDefault();\\n    }\\n    else if (e.key === 'PageUp') {\\n        value += _step * 10;\\n        e.preventDefault();\\n    }\\n    else if (e.key === 'PageDown') {\\n        value -= _step * 10;\\n        e.preventDefault();\\n    }\\n    value = bound(value);\\n    dispatch('input', value);\\n}\\nconst config = {\\n    horizontal: {\\n        clientSize: 'clientWidth',\\n        offset: 'left',\\n        client: 'clientX'\\n    },\\n    vertical: {\\n        clientSize: 'clientHeight',\\n        offset: 'top',\\n        client: 'clientY'\\n    }\\n};\\nfunction updateValue(e) {\\n    const clientWidth = slider?.[config[direction].clientSize] || 120;\\n    const sliderOffsetX = slider?.getBoundingClientRect()[config[direction].offset] || 0;\\n    let offsetX = e[config[direction].client] - sliderOffsetX;\\n    if (direction === 'vertical')\\n        offsetX = -1 * offsetX + clientWidth;\\n    if (reverse) {\\n        value = _max - (offsetX / clientWidth) * (_max - _min);\\n    }\\n    else {\\n        value = (offsetX / clientWidth) * (_max - _min) + _min;\\n    }\\n    value = bound(value);\\n    dispatch('input', value);\\n}\\nfunction jump(e) {\\n    updateValue(e);\\n    isDragging = true;\\n}\\nfunction drag(e) {\\n    if (isDragging)\\n        updateValue(e);\\n}\\nfunction endDrag() {\\n    isDragging = false;\\n}\\nfunction touch(e) {\\n    updateValue({\\n        clientX: e.changedTouches[0].clientX,\\n        clientY: e.changedTouches[0].clientY\\n    });\\n}\\n$: position = (((value - _min) / (_max - _min)) * 1).toFixed(4);\\n<\/script>\\n\\n<svelte:window on:mousemove={drag} on:mouseup={endDrag} />\\n\\n<div\\n\\tclass=\\"slider\\"\\n\\tclass:reverse\\n\\trole=\\"slider\\"\\n\\taria-orientation={direction}\\n\\taria-valuemax={_max}\\n\\taria-valuemin={_min}\\n\\taria-valuenow={value}\\n\\taria-valuetext={ariaValueText(value)}\\n\\taria-label={ariaLabel}\\n\\taria-labelledby={ariaLabelledBy}\\n\\taria-controls={ariaControls}\\n\\ttabindex=\\"0\\"\\n\\tbind:this={slider}\\n\\tstyle:--position={position}\\n\\ton:keydown={keyHandler}\\n\\ton:mousedown|self={keyboardOnly ? undefined : jump}\\n\\ton:touchstart|nonpassive|preventDefault={keyboardOnly ? undefined : touch}\\n\\ton:touchmove|nonpassive|preventDefault={keyboardOnly ? undefined : touch}\\n\\ton:touchend|nonpassive|preventDefault={keyboardOnly ? undefined : touch}\\n>\\n\\t<div class=\\"track\\" />\\n\\t<div class=\\"thumb\\" />\\n</div>\\n\\n{#if name}\\n\\t<input type=\\"hidden\\" {name} {value} />\\n{/if}\\n\\n<!-- @component\\n\\n**Props**\\n@prop min: string | number = 0 \u2014 min value of the slider\\n@prop max: string | number = 100 \u2014 max value of the slider\\n@prop step: string | number = 1 \u2014 step value of the slider\\n@prop value: number = 50 \u2014 value of the slider\\n@prop ariaValueText: (current: number) =&gt; string = (current) => current.toString() \u2014 method to convert the current value to a string representation of the value for the \`aria-valuetext\` attribute. For example, a battery meter value might be conveyed as aria-valuetext=\\"8% (34 minutes) remaining\\". See [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-valuetext)\\n@prop name: string | undefined = undefined \u2014 input name of the slider\\n@prop direction: 'horizontal' | 'vertical' = 'horizontal' \u2014 direction of the slider\\n@prop reverse: boolean = false \u2014 if true, the min and max values will be reversed\\n@prop keyboardOnly: boolean = false \u2014 disables mouse events\\n@prop slider: HTMLDivElement | undefined = undefined \u2014 div element representing the slider\\n@prop ariaLabel: string | undefined = undefined \u2014 aria-label props\\n@prop ariaLabelledBy: string | undefined = undefined \u2014 aria-labelledby props\\n@prop isDragging: boolean = false \u2014 indicate if the slider is being dragged\\n-->\\n\\n<style>\\n\\t.slider {\\n\\t\\t---track-width: var(--track-width, unset);\\n\\t\\t---track-height: var(--track-height, 6px);\\n\\t\\t---track-background: var(--track-background, #949494);\\n\\t\\t---track-border: var(--track-border, none);\\n\\t\\t---thumb-size: var(--thumb-size, 16px);\\n\\t\\t---thumb-background: var(--thumb-background, #2d2d2d);\\n\\t\\t---thumb-border: var(--thumb-border, none);\\n\\t\\t---position: var(--position, 0px);\\n\\n\\t\\t---margin-inline-thumb-bigger: max(var(---thumb-size) - var(---track-height), 0px);\\n\\t\\t---margin-inline-thumb-smaller: max(var(---track-height) - var(---thumb-size), 0px);\\n\\n\\t\\tposition: relative;\\n\\t\\tmargin: auto;\\n\\t\\tuser-select: none;\\n\\t\\t-webkit-user-select: none;\\n\\t\\tbackground-color: transparent;\\n\\t}\\n\\n\\t.slider::before {\\n\\t\\tbackground-color: transparent;\\n\\t}\\n\\n\\t[aria-orientation='horizontal'] {\\n\\t\\twidth: var(---track-width);\\n\\t\\tmax-width: calc(100% - 2 * var(---margin-inline-thumb-bigger));\\n\\t\\theight: calc(max(var(---track-height), var(---thumb-size)) + 4px);\\n\\t\\theight: max(var(---track-height), var(---thumb-size));\\n\\t\\tmargin-inline: var(---margin-inline-thumb-bigger);\\n\\t\\tmargin-block: var(--margin-block, 8px);\\n\\t}\\n\\n\\t[aria-orientation='vertical'] {\\n\\t\\twidth: calc(max(var(---track-height), var(---thumb-size)) + 4px);\\n\\t\\twidth: max(var(---track-height), var(---thumb-size));\\n\\t\\theight: var(---track-width);\\n\\t\\tmax-height: calc(100% - 2 * var(---margin-inline-thumb-bigger));\\n\\t\\tmargin-block: var(---margin-inline-thumb-bigger);\\n\\t\\tmargin-inline: var(--margin-block, 8px);\\n\\t}\\n\\n\\t.track {\\n\\t\\tposition: absolute;\\n\\t\\tpointer-events: none;\\n\\t\\tbackground: var(---track-background);\\n\\t\\tborder: var(---track-border);\\n\\t\\tborder-radius: calc(var(---track-height) / 2);\\n\\t\\tbox-sizing: border-box;\\n\\t}\\n\\n\\t[aria-orientation='horizontal'] .track {\\n\\t\\theight: var(---track-height);\\n\\t\\ttop: 50%;\\n\\t\\ttransform: translateY(-50%);\\n\\t\\tleft: 0;\\n\\t\\tright: 0;\\n\\t}\\n\\n\\t[aria-orientation='vertical'] .track {\\n\\t\\twidth: var(---track-height);\\n\\t\\tleft: 50%;\\n\\t\\ttransform: translateX(-50%);\\n\\t\\ttop: 0;\\n\\t\\tbottom: 0;\\n\\t}\\n\\n\\t.thumb {\\n\\t\\tpointer-events: none;\\n\\t\\tposition: absolute;\\n\\t\\theight: var(---thumb-size);\\n\\t\\twidth: var(---thumb-size);\\n\\t\\tborder-radius: calc(var(---thumb-size) / 2);\\n\\t\\tbackground: var(---thumb-background);\\n\\t\\tborder: var(---thumb-border);\\n\\t\\tbox-sizing: border-box;\\n\\n\\t\\ttransform: translate(-50%, -50%);\\n\\t\\t--margin-left: (\\n\\t\\t\\t\\t2 * var(---track-height) - var(---thumb-size) - var(---margin-inline-thumb-smaller)\\n\\t\\t\\t) / 2;\\n\\t\\t--left: calc(var(---position) * (100% - 2 * var(--margin-left)) + var(--margin-left));\\n\\t}\\n\\n\\t[aria-orientation='horizontal']:not(.reverse) .thumb {\\n\\t\\ttop: 50%;\\n\\t\\tleft: var(--left);\\n\\t}\\n\\n\\t[aria-orientation='vertical']:not(.reverse) .thumb {\\n\\t\\tleft: 50%;\\n\\t\\tbottom: calc(var(--left) - var(---thumb-size));\\n\\t}\\n\\n\\t[aria-orientation='horizontal'].reverse .thumb {\\n\\t\\ttop: 50%;\\n\\t\\tright: calc(var(--left) - var(---thumb-size));\\n\\t}\\n\\n\\t[aria-orientation='vertical'].reverse .thumb {\\n\\t\\tleft: 50%;\\n\\t\\ttop: calc(var(--left));\\n\\t}\\n\\n\\t.slider:focus-visible {\\n\\t\\toutline: none;\\n\\t}\\n\\n\\t.slider:focus-visible .track {\\n\\t\\toutline: 2px solid var(--focus-color, red);\\n\\t\\toutline-offset: 2px;\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AAwKC,mCAAQ,CACP,cAAc,CAAE,yBAAyB,CACzC,eAAe,CAAE,wBAAwB,CACzC,mBAAmB,CAAE,gCAAgC,CACrD,eAAe,CAAE,yBAAyB,CAC1C,aAAa,CAAE,uBAAuB,CACtC,mBAAmB,CAAE,gCAAgC,CACrD,eAAe,CAAE,yBAAyB,CAC1C,WAAW,CAAE,oBAAoB,CAEjC,6BAA6B,CAAE,mDAAmD,CAClF,8BAA8B,CAAE,mDAAmD,CAEnF,QAAQ,CAAE,QAAQ,CAClB,MAAM,CAAE,IAAI,CACZ,WAAW,CAAE,IAAI,CACjB,mBAAmB,CAAE,IAAI,CACzB,gBAAgB,CAAE,WACnB,CAEA,mCAAO,QAAS,CACf,gBAAgB,CAAE,WACnB,CAEA,CAAC,gBAAgB,CAAC,YAAY,6BAAE,CAC/B,KAAK,CAAE,IAAI,cAAc,CAAC,CAC1B,SAAS,CAAE,KAAK,IAAI,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,6BAA6B,CAAC,CAAC,CAC9D,MAAM,CAAE,KAAK,IAAI,IAAI,eAAe,CAAC,CAAC,CAAC,IAAI,aAAa,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CACjE,MAAM,CAAE,IAAI,IAAI,eAAe,CAAC,CAAC,CAAC,IAAI,aAAa,CAAC,CAAC,CACrD,aAAa,CAAE,IAAI,6BAA6B,CAAC,CACjD,YAAY,CAAE,IAAI,cAAc,CAAC,IAAI,CACtC,CAEA,CAAC,gBAAgB,CAAC,UAAU,6BAAE,CAC7B,KAAK,CAAE,KAAK,IAAI,IAAI,eAAe,CAAC,CAAC,CAAC,IAAI,aAAa,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAChE,KAAK,CAAE,IAAI,IAAI,eAAe,CAAC,CAAC,CAAC,IAAI,aAAa,CAAC,CAAC,CACpD,MAAM,CAAE,IAAI,cAAc,CAAC,CAC3B,UAAU,CAAE,KAAK,IAAI,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,6BAA6B,CAAC,CAAC,CAC/D,YAAY,CAAE,IAAI,6BAA6B,CAAC,CAChD,aAAa,CAAE,IAAI,cAAc,CAAC,IAAI,CACvC,CAEA,kCAAO,CACN,QAAQ,CAAE,QAAQ,CAClB,cAAc,CAAE,IAAI,CACpB,UAAU,CAAE,IAAI,mBAAmB,CAAC,CACpC,MAAM,CAAE,IAAI,eAAe,CAAC,CAC5B,aAAa,CAAE,KAAK,IAAI,eAAe,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAC7C,UAAU,CAAE,UACb,CAEA,CAAC,gBAAgB,CAAC,YAAY,eAAC,CAAC,oBAAO,CACtC,MAAM,CAAE,IAAI,eAAe,CAAC,CAC5B,GAAG,CAAE,GAAG,CACR,SAAS,CAAE,WAAW,IAAI,CAAC,CAC3B,IAAI,CAAE,CAAC,CACP,KAAK,CAAE,CACR,CAEA,CAAC,gBAAgB,CAAC,UAAU,eAAC,CAAC,oBAAO,CACpC,KAAK,CAAE,IAAI,eAAe,CAAC,CAC3B,IAAI,CAAE,GAAG,CACT,SAAS,CAAE,WAAW,IAAI,CAAC,CAC3B,GAAG,CAAE,CAAC,CACN,MAAM,CAAE,CACT,CAEA,kCAAO,CACN,cAAc,CAAE,IAAI,CACpB,QAAQ,CAAE,QAAQ,CAClB,MAAM,CAAE,IAAI,aAAa,CAAC,CAC1B,KAAK,CAAE,IAAI,aAAa,CAAC,CACzB,aAAa,CAAE,KAAK,IAAI,aAAa,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAC3C,UAAU,CAAE,IAAI,mBAAmB,CAAC,CACpC,MAAM,CAAE,IAAI,eAAe,CAAC,CAC5B,UAAU,CAAE,UAAU,CAEtB,SAAS,CAAE,UAAU,IAAI,CAAC,CAAC,IAAI,CAAC,CAChC,aAAa,CAAE;AACjB;AACA,QAAQ,CACN,MAAM,CAAE,6EACT,CAEA,CAAC,gBAAgB,CAAC,YAAY,eAAC,KAAK,QAAQ,CAAC,CAAC,oBAAO,CACpD,GAAG,CAAE,GAAG,CACR,IAAI,CAAE,IAAI,MAAM,CACjB,CAEA,CAAC,gBAAgB,CAAC,UAAU,eAAC,KAAK,QAAQ,CAAC,CAAC,oBAAO,CAClD,IAAI,CAAE,GAAG,CACT,MAAM,CAAE,KAAK,IAAI,MAAM,CAAC,CAAC,CAAC,CAAC,IAAI,aAAa,CAAC,CAC9C,CAEA,CAAC,gBAAgB,CAAC,YAAY,CAAC,sBAAQ,CAAC,oBAAO,CAC9C,GAAG,CAAE,GAAG,CACR,KAAK,CAAE,KAAK,IAAI,MAAM,CAAC,CAAC,CAAC,CAAC,IAAI,aAAa,CAAC,CAC7C,CAEA,CAAC,gBAAgB,CAAC,UAAU,CAAC,sBAAQ,CAAC,oBAAO,CAC5C,IAAI,CAAE,GAAG,CACT,GAAG,CAAE,KAAK,IAAI,MAAM,CAAC,CACtB,CAEA,mCAAO,cAAe,CACrB,OAAO,CAAE,IACV,CAEA,qBAAO,cAAc,CAAC,oBAAO,CAC5B,OAAO,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,aAAa,CAAC,IAAI,CAAC,CAC1C,cAAc,CAAE,GACjB"}`
    };
    Slider = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let _min;
      let _max;
      let position;
      let { min = 0 } = $$props;
      let { max = 100 } = $$props;
      let { step = 1 } = $$props;
      let { value = 50 } = $$props;
      let { ariaValueText = (current) => current.toString() } = $$props;
      let { name: name2 = void 0 } = $$props;
      let { direction = "horizontal" } = $$props;
      let { reverse = false } = $$props;
      let { keyboardOnly = false } = $$props;
      let { slider = void 0 } = $$props;
      let { ariaLabel = void 0 } = $$props;
      let { ariaLabelledBy = void 0 } = $$props;
      let { ariaControls = void 0 } = $$props;
      let { isDragging = false } = $$props;
      createEventDispatcher();
      if ($$props.min === void 0 && $$bindings.min && min !== void 0) $$bindings.min(min);
      if ($$props.max === void 0 && $$bindings.max && max !== void 0) $$bindings.max(max);
      if ($$props.step === void 0 && $$bindings.step && step !== void 0) $$bindings.step(step);
      if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
      if ($$props.ariaValueText === void 0 && $$bindings.ariaValueText && ariaValueText !== void 0) $$bindings.ariaValueText(ariaValueText);
      if ($$props.name === void 0 && $$bindings.name && name2 !== void 0) $$bindings.name(name2);
      if ($$props.direction === void 0 && $$bindings.direction && direction !== void 0) $$bindings.direction(direction);
      if ($$props.reverse === void 0 && $$bindings.reverse && reverse !== void 0) $$bindings.reverse(reverse);
      if ($$props.keyboardOnly === void 0 && $$bindings.keyboardOnly && keyboardOnly !== void 0) $$bindings.keyboardOnly(keyboardOnly);
      if ($$props.slider === void 0 && $$bindings.slider && slider !== void 0) $$bindings.slider(slider);
      if ($$props.ariaLabel === void 0 && $$bindings.ariaLabel && ariaLabel !== void 0) $$bindings.ariaLabel(ariaLabel);
      if ($$props.ariaLabelledBy === void 0 && $$bindings.ariaLabelledBy && ariaLabelledBy !== void 0) $$bindings.ariaLabelledBy(ariaLabelledBy);
      if ($$props.ariaControls === void 0 && $$bindings.ariaControls && ariaControls !== void 0) $$bindings.ariaControls(ariaControls);
      if ($$props.isDragging === void 0 && $$bindings.isDragging && isDragging !== void 0) $$bindings.isDragging(isDragging);
      $$result.css.add(css$9);
      _min = typeof min === "string" ? parseFloat(min) : min;
      _max = typeof max === "string" ? parseFloat(max) : max;
      position = ((value - _min) / (_max - _min) * 1).toFixed(4);
      return ` <div class="${["slider svelte-w4j1dz", reverse ? "reverse" : ""].join(" ").trim()}" role="slider"${add_attribute("aria-orientation", direction, 0)}${add_attribute("aria-valuemax", _max, 0)}${add_attribute("aria-valuemin", _min, 0)}${add_attribute("aria-valuenow", value, 0)}${add_attribute("aria-valuetext", ariaValueText(value), 0)}${add_attribute("aria-label", ariaLabel, 0)}${add_attribute("aria-labelledby", ariaLabelledBy, 0)}${add_attribute("aria-controls", ariaControls, 0)} tabindex="0"${add_styles({ "--position": position })}${add_attribute("this", slider, 0)}><div class="track svelte-w4j1dz"></div> <div class="thumb svelte-w4j1dz"></div></div> ${name2 ? `<input type="hidden"${add_attribute("name", name2, 0)}${add_attribute("value", value, 0)}>` : ``} `;
    });
    css$8 = {
      code: ".picker.svelte-1x9tz9y{position:relative;display:inline-block;width:var(--picker-width, 200px);height:var(--picker-height, 200px);background:linear-gradient(#ffffff00, #000000ff), linear-gradient(0.25turn, #ffffffff, #00000000),\n			var(--picker-color-bg);border-radius:var(--picker-radius, 8px);outline:none;user-select:none}.s.svelte-1x9tz9y,.v.svelte-1x9tz9y{position:absolute;--track-background:none;--track-border:none;--thumb-background:none;--thumb-border:none;--thumb-size:2px;--margin-block:0;--track-height:var(--picker-indicator-size, 10px);user-select:none;-webkit-user-select:none}.s.svelte-1x9tz9y{top:calc(var(--pos-y) * (var(--picker-height, 200px) - var(--picker-indicator-size, 10px) - 4px) / 100 + 2px);left:2px;--track-width:calc(var(--picker-width, 200px) - 4px)}.v.svelte-1x9tz9y{top:2px;left:calc(var(--pos-x) * (var(--picker-width, 200px) - var(--picker-indicator-size, 10px) - 4px) / 100 + 2px);--track-width:calc(var(--picker-height, 200px) - 4px)}",
      map: `{"version":3,"file":"Picker.svelte","sources":["Picker.svelte"],"sourcesContent":["<script>import { colord } from 'colord';\\nimport { Slider } from 'svelte-awesome-slider';\\nimport { createEventDispatcher } from 'svelte';\\nconst dispatch = createEventDispatcher();\\n/** customize the ColorPicker component parts. Can be used to display a Chrome variant or an Accessibility Notice */\\nexport let components;\\n/** hue value */\\nexport let h;\\n/** saturation value */\\nexport let s;\\n/** vibrance value */\\nexport let v;\\n/** indicator whether the selected color is light or dark */\\nexport let isDark;\\n/** all translation tokens used in the library; can be partially overridden; see [full object type](https://github.com/Ennoriel/svelte-awesome-color-picker/blob/master/src/lib/utils/texts.ts) */\\nexport let texts;\\nlet picker;\\nlet isMouseDown = false;\\nlet focused = false;\\nlet pickerColorBg;\\nlet pos = { x: 100, y: 0 };\\n$: if (typeof h === 'number')\\n    pickerColorBg = colord({ h, s: 100, v: 100, a: 1 }).toHex();\\nfunction clamp(value, min, max) {\\n    return Math.min(Math.max(min, value), max);\\n}\\nfunction onClick(e) {\\n    const { width, left, height, top } = picker.getBoundingClientRect();\\n    const mouse = {\\n        x: clamp(e.clientX - left, 0, width),\\n        y: clamp(e.clientY - top, 0, height)\\n    };\\n    s = clamp(mouse.x / width, 0, 1) * 100;\\n    v = clamp((height - mouse.y) / height, 0, 1) * 100;\\n}\\nfunction pickerMousedown(e) {\\n    if (e.button === 0) {\\n        isMouseDown = true;\\n        onClick(e);\\n    }\\n}\\nfunction mouseUp() {\\n    isMouseDown = false;\\n}\\nfunction mouseMove(e) {\\n    if (isMouseDown)\\n        onClick(e);\\n}\\nfunction mouseDown(e) {\\n    if (!e.target.isSameNode(picker))\\n        focused = false;\\n}\\nfunction touch(e) {\\n    e.preventDefault();\\n    onClick(e.changedTouches[0]);\\n}\\n$: if (typeof s === 'number' && typeof v === 'number' && picker)\\n    pos = {\\n        x: s,\\n        y: 100 - v\\n    };\\n$: dispatch('input', { s, v });\\n<\/script>\\n\\n<svelte:window on:mouseup={mouseUp} on:mousedown={mouseDown} on:mousemove={mouseMove} />\\n\\n<!-- svelte-ignore a11y-no-static-element-interactions -->\\n<div\\n\\tclass=\\"picker\\"\\n\\tbind:this={picker}\\n\\ton:mousedown|preventDefault={pickerMousedown}\\n\\ton:touchstart|nonpassive={touch}\\n\\ton:touchmove|nonpassive|preventDefault={touch}\\n\\ton:touchend|nonpassive={touch}\\n\\tstyle:--picker-color-bg={pickerColorBg}\\n>\\n\\t<svelte:component this={components.pickerIndicator} {pos} {isDark} />\\n\\t<div class=\\"s\\" style:--pos-y={pos.y}>\\n\\t\\t<Slider bind:value={s} keyboardOnly ariaValueText={(value) => \`\${value}%\`} ariaLabel={texts.label.s} />\\n\\t</div>\\n\\t<div class=\\"v\\" style:--pos-x={pos.x}>\\n\\t\\t<Slider\\n\\t\\t\\tbind:value={v}\\n\\t\\t\\tkeyboardOnly\\n\\t\\t\\tariaValueText={(value) => \`\${value}%\`}\\n\\t\\t\\tdirection=\\"vertical\\"\\n\\t\\t\\tariaLabel={texts.label.v}\\n\\t\\t/>\\n\\t</div>\\n</div>\\n\\n<!-- \\n@component Picker wrapper containing the mouse and keyboard logic to select the color. _internal component_ \\n\\n**Import**\\nN.A.\\n\\n**Use**\\nN.A.\\n\\n**Props**\\n@prop components: Components \u2014 customize the ColorPicker component parts. Can be used to display a Chrome variant or an Accessibility Notice\\n@prop h: number \u2014 hue value\\n@prop s: number \u2014 saturation value\\n@prop v: number \u2014 vibrance value\\n@prop isDark: boolean \u2014 indicator whether the selected color is light or dark\\n@prop texts: Texts \u2014 all translation tokens used in the library; can be partially overridden; see [full object type](https://github.com/Ennoriel/svelte-awesome-color-picker/blob/master/src/lib/utils/texts.ts)\\n-->\\n<style>\\n\\t.picker {\\n\\t\\tposition: relative;\\n\\t\\tdisplay: inline-block;\\n\\t\\twidth: var(--picker-width, 200px);\\n\\t\\theight: var(--picker-height, 200px);\\n\\t\\tbackground: linear-gradient(#ffffff00, #000000ff), linear-gradient(0.25turn, #ffffffff, #00000000),\\n\\t\\t\\tvar(--picker-color-bg);\\n\\t\\tborder-radius: var(--picker-radius, 8px);\\n\\t\\toutline: none;\\n\\t\\tuser-select: none;\\n\\t}\\n\\n\\t.s,\\n\\t.v {\\n\\t\\tposition: absolute;\\n\\t\\t--track-background: none;\\n\\t\\t--track-border: none;\\n\\t\\t--thumb-background: none;\\n\\t\\t--thumb-border: none;\\n\\t\\t--thumb-size: 2px;\\n\\t\\t--margin-block: 0;\\n\\t\\t--track-height: var(--picker-indicator-size, 10px);\\n\\t\\tuser-select: none;\\n\\t\\t-webkit-user-select: none;\\n\\t}\\n\\n\\t.s {\\n\\t\\ttop: calc(var(--pos-y) * (var(--picker-height, 200px) - var(--picker-indicator-size, 10px) - 4px) / 100 + 2px);\\n\\t\\tleft: 2px;\\n\\t\\t--track-width: calc(var(--picker-width, 200px) - 4px);\\n\\t}\\n\\n\\t.v {\\n\\t\\ttop: 2px;\\n\\t\\tleft: calc(var(--pos-x) * (var(--picker-width, 200px) - var(--picker-indicator-size, 10px) - 4px) / 100 + 2px);\\n\\t\\t--track-width: calc(var(--picker-height, 200px) - 4px);\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AA6GC,sBAAQ,CACP,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,YAAY,CACrB,KAAK,CAAE,IAAI,cAAc,CAAC,MAAM,CAAC,CACjC,MAAM,CAAE,IAAI,eAAe,CAAC,MAAM,CAAC,CACnC,UAAU,CAAE,gBAAgB,SAAS,CAAC,CAAC,SAAS,CAAC,CAAC,CAAC,gBAAgB,QAAQ,CAAC,CAAC,SAAS,CAAC,CAAC,SAAS,CAAC,CAAC;AACrG,GAAG,IAAI,iBAAiB,CAAC,CACvB,aAAa,CAAE,IAAI,eAAe,CAAC,IAAI,CAAC,CACxC,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,IACd,CAEA,iBAAE,CACF,iBAAG,CACF,QAAQ,CAAE,QAAQ,CAClB,kBAAkB,CAAE,IAAI,CACxB,cAAc,CAAE,IAAI,CACpB,kBAAkB,CAAE,IAAI,CACxB,cAAc,CAAE,IAAI,CACpB,YAAY,CAAE,GAAG,CACjB,cAAc,CAAE,CAAC,CACjB,cAAc,CAAE,kCAAkC,CAClD,WAAW,CAAE,IAAI,CACjB,mBAAmB,CAAE,IACtB,CAEA,iBAAG,CACF,GAAG,CAAE,KAAK,IAAI,OAAO,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,eAAe,CAAC,MAAM,CAAC,CAAC,CAAC,CAAC,IAAI,uBAAuB,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,GAAG,CAAC,CAC9G,IAAI,CAAE,GAAG,CACT,aAAa,CAAE,sCAChB,CAEA,iBAAG,CACF,GAAG,CAAE,GAAG,CACR,IAAI,CAAE,KAAK,IAAI,OAAO,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,cAAc,CAAC,MAAM,CAAC,CAAC,CAAC,CAAC,IAAI,uBAAuB,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,GAAG,CAAC,CAC9G,aAAa,CAAE,uCAChB"}`
    };
    Picker = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      const dispatch = createEventDispatcher();
      let { components } = $$props;
      let { h: h2 } = $$props;
      let { s: s22 } = $$props;
      let { v: v2 } = $$props;
      let { isDark } = $$props;
      let { texts } = $$props;
      let picker;
      let pickerColorBg;
      let pos = { x: 100, y: 0 };
      if ($$props.components === void 0 && $$bindings.components && components !== void 0) $$bindings.components(components);
      if ($$props.h === void 0 && $$bindings.h && h2 !== void 0) $$bindings.h(h2);
      if ($$props.s === void 0 && $$bindings.s && s22 !== void 0) $$bindings.s(s22);
      if ($$props.v === void 0 && $$bindings.v && v2 !== void 0) $$bindings.v(v2);
      if ($$props.isDark === void 0 && $$bindings.isDark && isDark !== void 0) $$bindings.isDark(isDark);
      if ($$props.texts === void 0 && $$bindings.texts && texts !== void 0) $$bindings.texts(texts);
      $$result.css.add(css$8);
      let $$settled;
      let $$rendered;
      let previous_head = $$result.head;
      do {
        $$settled = true;
        $$result.head = previous_head;
        {
          if (typeof h2 === "number") pickerColorBg = w({ h: h2, s: 100, v: 100, a: 1 }).toHex();
        }
        {
          if (typeof s22 === "number" && typeof v2 === "number" && picker) pos = { x: s22, y: 100 - v2 };
        }
        {
          dispatch("input", { s: s22, v: v2 });
        }
        $$rendered = `  <div class="picker svelte-1x9tz9y"${add_styles({ "--picker-color-bg": pickerColorBg })}${add_attribute("this", picker, 0)}>${validate_component(components.pickerIndicator || missing_component, "svelte:component").$$render($$result, { pos, isDark }, {}, {})} <div class="s svelte-1x9tz9y"${add_styles({ "--pos-y": pos.y })}>${validate_component(Slider, "Slider").$$render(
          $$result,
          {
            keyboardOnly: true,
            ariaValueText: (value) => `${value}%`,
            ariaLabel: texts.label.s,
            value: s22
          },
          {
            value: ($$value) => {
              s22 = $$value;
              $$settled = false;
            }
          },
          {}
        )}</div> <div class="v svelte-1x9tz9y"${add_styles({ "--pos-x": pos.x })}>${validate_component(Slider, "Slider").$$render(
          $$result,
          {
            keyboardOnly: true,
            ariaValueText: (value) => `${value}%`,
            direction: "vertical",
            ariaLabel: texts.label.v,
            value: v2
          },
          {
            value: ($$value) => {
              v2 = $$value;
              $$settled = false;
            }
          },
          {}
        )}</div></div> `;
      } while (!$$settled);
      return $$rendered;
    });
    css$7 = {
      code: "div.svelte-i5mg2p{position:absolute;left:calc(var(--pos-x) * (var(--picker-width, 200px) - var(--picker-indicator-size, 10px) - 4px) / 100 + 2px);top:calc(var(--pos-y) * (var(--picker-height, 200px) - var(--picker-indicator-size, 10px) - 4px) / 100 + 2px);width:var(--picker-indicator-size, 10px);height:var(--picker-indicator-size, 10px);background-color:white;box-shadow:0 0 4px black;border-radius:50%;pointer-events:none;z-index:1;transition:box-shadow 0.2s}.is-dark.svelte-i5mg2p{box-shadow:0 0 4px white}",
      map: '{"version":3,"file":"PickerIndicator.svelte","sources":["PickerIndicator.svelte"],"sourcesContent":["<script>/** indicator position in % */\\nexport let pos;\\n/** indicator whether the selected color is light or dark */\\nexport let isDark;\\n<\/script>\\n\\n<div class=\\"picker-indicator\\" class:is-dark={isDark} style:--pos-x={pos.x} style:--pos-y={pos.y} />\\n\\n<style>\\n\\tdiv {\\n\\t\\tposition: absolute;\\n\\t\\tleft: calc(var(--pos-x) * (var(--picker-width, 200px) - var(--picker-indicator-size, 10px) - 4px) / 100 + 2px);\\n\\t\\ttop: calc(var(--pos-y) * (var(--picker-height, 200px) - var(--picker-indicator-size, 10px) - 4px) / 100 + 2px);\\n\\n\\t\\twidth: var(--picker-indicator-size, 10px);\\n\\t\\theight: var(--picker-indicator-size, 10px);\\n\\t\\tbackground-color: white;\\n\\t\\tbox-shadow: 0 0 4px black;\\n\\t\\tborder-radius: 50%;\\n\\n\\t\\tpointer-events: none;\\n\\t\\tz-index: 1;\\n\\t\\ttransition: box-shadow 0.2s;\\n\\t}\\n\\t.is-dark {\\n\\t\\tbox-shadow: 0 0 4px white;\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AASC,iBAAI,CACH,QAAQ,CAAE,QAAQ,CAClB,IAAI,CAAE,KAAK,IAAI,OAAO,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,cAAc,CAAC,MAAM,CAAC,CAAC,CAAC,CAAC,IAAI,uBAAuB,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,GAAG,CAAC,CAC9G,GAAG,CAAE,KAAK,IAAI,OAAO,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,eAAe,CAAC,MAAM,CAAC,CAAC,CAAC,CAAC,IAAI,uBAAuB,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,GAAG,CAAC,CAE9G,KAAK,CAAE,IAAI,uBAAuB,CAAC,KAAK,CAAC,CACzC,MAAM,CAAE,IAAI,uBAAuB,CAAC,KAAK,CAAC,CAC1C,gBAAgB,CAAE,KAAK,CACvB,UAAU,CAAE,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,KAAK,CACzB,aAAa,CAAE,GAAG,CAElB,cAAc,CAAE,IAAI,CACpB,OAAO,CAAE,CAAC,CACV,UAAU,CAAE,UAAU,CAAC,IACxB,CACA,sBAAS,CACR,UAAU,CAAE,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,KACrB"}'
    };
    PickerIndicator = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { pos } = $$props;
      let { isDark } = $$props;
      if ($$props.pos === void 0 && $$bindings.pos && pos !== void 0) $$bindings.pos(pos);
      if ($$props.isDark === void 0 && $$bindings.isDark && isDark !== void 0) $$bindings.isDark(isDark);
      $$result.css.add(css$7);
      return `<div class="${["picker-indicator svelte-i5mg2p", isDark ? "is-dark" : ""].join(" ").trim()}"${add_styles({ "--pos-x": pos.x, "--pos-y": pos.y })}></div>`;
    });
    css$6 = {
      code: ".text-input.svelte-qtukzs.svelte-qtukzs{margin:var(--text-input-margin, 5px 0 0)}.input-container.svelte-qtukzs.svelte-qtukzs{display:flex;flex:1;gap:10px}input.svelte-qtukzs.svelte-qtukzs,button.svelte-qtukzs.svelte-qtukzs,.button-like.svelte-qtukzs.svelte-qtukzs{flex:1;border:none;background-color:var(--cp-input-color, #eee);color:var(--cp-text-color, var(--cp-border-color));padding:0;border-radius:5px;height:30px;line-height:30px;text-align:center}input.svelte-qtukzs.svelte-qtukzs{width:5px;font-family:inherit}button.svelte-qtukzs.svelte-qtukzs,.button-like.svelte-qtukzs.svelte-qtukzs{position:relative;flex:1;margin:8px 0 0;height:30px;width:100%;transition:background-color 0.2s;cursor:pointer;font-family:inherit}.button-like.svelte-qtukzs.svelte-qtukzs{cursor:default}.appear.svelte-qtukzs.svelte-qtukzs,.disappear.svelte-qtukzs.svelte-qtukzs{position:absolute;left:50%;top:50%;transform:translate(-50%, -50%);width:100%;transition:all 0.5s}button.svelte-qtukzs:hover .disappear.svelte-qtukzs,.appear.svelte-qtukzs.svelte-qtukzs{opacity:0}.disappear.svelte-qtukzs.svelte-qtukzs,button.svelte-qtukzs:hover .appear.svelte-qtukzs{opacity:1}button.svelte-qtukzs.svelte-qtukzs:hover{background-color:var(--cp-button-hover-color, #ccc)}input.svelte-qtukzs.svelte-qtukzs:focus,button.svelte-qtukzs.svelte-qtukzs:focus{outline:none}input.svelte-qtukzs.svelte-qtukzs:focus-visible,button.svelte-qtukzs.svelte-qtukzs:focus-visible{outline:2px solid var(--focus-color, red);outline-offset:2px}",
      map: `{"version":3,"file":"TextInput.svelte","sources":["TextInput.svelte"],"sourcesContent":["<script>import { createEventDispatcher } from 'svelte';\\nconst dispatch = createEventDispatcher();\\n/** if set to false, disables the alpha channel */\\nexport let isAlpha;\\n/** rgb color */\\nexport let rgb;\\n/** hsv color */\\nexport let hsv;\\n/** hex color */\\nexport let hex;\\n/** configure which hex, rgb and hsv inputs will be visible and in which order. If overridden, it is necessary to provide at least one value */\\nexport let textInputModes;\\n/** all translation tokens used in the library; can be partially overridden; see [full object type](https://github.com/Ennoriel/svelte-awesome-color-picker/blob/master/src/lib/utils/texts.ts) */\\nexport let texts;\\nconst HEX_COLOR_REGEX = /^#?([A-F0-9]{6}|[A-F0-9]{8})$/i;\\nlet mode = textInputModes[0] || 'hex';\\n$: nextMode = textInputModes[(textInputModes.indexOf(mode) + 1) % textInputModes.length];\\n$: h = Math.round(hsv.h);\\n$: s = Math.round(hsv.s);\\n$: v = Math.round(hsv.v);\\n$: a = hsv.a === undefined ? 1 : Math.round(hsv.a * 100) / 100;\\nfunction updateHex(e) {\\n    const target = e.target;\\n    if (HEX_COLOR_REGEX.test(target.value)) {\\n        hex = target.value;\\n        dispatch('input', { hex });\\n    }\\n}\\nfunction updateRgb(property) {\\n    return function (e) {\\n        rgb = { ...rgb, [property]: parseFloat(e.target.value) };\\n        dispatch('input', { rgb });\\n    };\\n}\\nfunction updateHsv(property) {\\n    return function (e) {\\n        hsv = { ...hsv, [property]: parseFloat(e.target.value) };\\n        dispatch('input', { hsv });\\n    };\\n}\\n<\/script>\\n\\n<div class=\\"text-input\\">\\n\\t<div class=\\"input-container\\">\\n\\t\\t{#if mode === 'hex'}\\n\\t\\t\\t<input aria-label={texts.label.hex} value={hex} on:input={updateHex} style:flex={3} />\\n\\t\\t{:else if mode === 'rgb'}\\n\\t\\t\\t<input aria-label={texts.label.r} value={rgb.r} type=\\"number\\" min=\\"0\\" max=\\"255\\" on:input={updateRgb('r')} />\\n\\t\\t\\t<input aria-label={texts.label.g} value={rgb.g} type=\\"number\\" min=\\"0\\" max=\\"255\\" on:input={updateRgb('g')} />\\n\\t\\t\\t<input aria-label={texts.label.b} value={rgb.b} type=\\"number\\" min=\\"0\\" max=\\"255\\" on:input={updateRgb('b')} />\\n\\t\\t{:else}\\n\\t\\t\\t<input aria-label={texts.label.h} value={h} type=\\"number\\" min=\\"0\\" max=\\"360\\" on:input={updateHsv('h')} />\\n\\t\\t\\t<input aria-label={texts.label.s} value={s} type=\\"number\\" min=\\"0\\" max=\\"100\\" on:input={updateHsv('s')} />\\n\\t\\t\\t<input aria-label={texts.label.v} value={v} type=\\"number\\" min=\\"0\\" max=\\"100\\" on:input={updateHsv('v')} />\\n\\t\\t{/if}\\n\\t\\t{#if isAlpha}\\n\\t\\t\\t<input\\n\\t\\t\\t\\taria-label={texts.label.a}\\n\\t\\t\\t\\tvalue={a}\\n\\t\\t\\t\\ttype=\\"number\\"\\n\\t\\t\\t\\tmin=\\"0\\"\\n\\t\\t\\t\\tmax=\\"1\\"\\n\\t\\t\\t\\tstep=\\"0.01\\"\\n\\t\\t\\t\\ton:input={mode === 'hsv' ? updateHsv('a') : updateRgb('a')}\\n\\t\\t\\t/>\\n\\t\\t{/if}\\n\\t</div>\\n\\n\\t{#if textInputModes.length > 1}\\n\\t\\t<button type=\\"button\\" on:click={() => (mode = nextMode)}>\\n\\t\\t\\t<span class=\\"disappear\\" aria-hidden=\\"true\\">{texts.color[mode]}</span>\\n\\t\\t\\t<span class=\\"appear\\">{texts.changeTo} {nextMode}</span>\\n\\t\\t</button>\\n\\t{:else}\\n\\t\\t<div class=\\"button-like\\">{texts.color[mode]}</div>\\n\\t{/if}\\n</div>\\n\\n<!-- \\n@component text inputs for the hex, rgb and hsv colors. This component cannot be imported\\ndirectly but can be overridden.\\n\\n**Import**\\n_N.A._\\n\\n**Use**\\n_N.A._\\n\\n**Props**\\n@prop isAlpha: boolean \u2014 if set to false, disables the alpha channel\\n@prop rgb: RgbaColor \u2014 rgb color\\n@prop hsv: HsvaColor \u2014 hsv color\\n@prop hex: string \u2014 hex color\\n@prop textInputModes: Array&lt;'hex' | 'rgb' | 'hsv'&gt; \u2014 configure which hex, rgb and hsv inputs will be visible and in which order. If overridden, it is necessary to provide at least one value\\n@prop texts: Texts \u2014 all translation tokens used in the library; can be partially overridden; see [full object type](https://github.com/Ennoriel/svelte-awesome-color-picker/blob/master/src/lib/utils/texts.ts)\\n-->\\n<style>\\n\\t.text-input {\\n\\t\\tmargin: var(--text-input-margin, 5px 0 0);\\n\\t}\\n\\t.input-container {\\n\\t\\tdisplay: flex;\\n\\t\\tflex: 1;\\n\\t\\tgap: 10px;\\n\\t}\\n\\tinput,\\n\\tbutton,\\n\\t.button-like {\\n\\t\\tflex: 1;\\n\\t\\tborder: none;\\n\\t\\tbackground-color: var(--cp-input-color, #eee);\\n\\t\\tcolor: var(--cp-text-color, var(--cp-border-color));\\n\\t\\tpadding: 0;\\n\\t\\tborder-radius: 5px;\\n\\t\\theight: 30px;\\n\\t\\tline-height: 30px;\\n\\t\\ttext-align: center;\\n\\t}\\n\\tinput {\\n\\t\\twidth: 5px;\\n\\t\\tfont-family: inherit;\\n\\t}\\n\\n\\tbutton,\\n\\t.button-like {\\n\\t\\tposition: relative;\\n\\t\\tflex: 1;\\n\\t\\tmargin: 8px 0 0;\\n\\t\\theight: 30px;\\n\\t\\twidth: 100%;\\n\\t\\ttransition: background-color 0.2s;\\n\\t\\tcursor: pointer;\\n\\t\\tfont-family: inherit;\\n\\t}\\n\\n\\t.button-like {\\n\\t\\tcursor: default;\\n\\t}\\n\\n\\t.appear,\\n\\t.disappear {\\n\\t\\tposition: absolute;\\n\\t\\tleft: 50%;\\n\\t\\ttop: 50%;\\n\\t\\ttransform: translate(-50%, -50%);\\n\\t\\twidth: 100%;\\n\\t\\ttransition: all 0.5s;\\n\\t}\\n\\tbutton:hover .disappear,\\n\\t.appear {\\n\\t\\topacity: 0;\\n\\t}\\n\\n\\t.disappear,\\n\\tbutton:hover .appear {\\n\\t\\topacity: 1;\\n\\t}\\n\\n\\tbutton:hover {\\n\\t\\tbackground-color: var(--cp-button-hover-color, #ccc);\\n\\t}\\n\\n\\tinput:focus,\\n\\tbutton:focus {\\n\\t\\toutline: none;\\n\\t}\\n\\n\\tinput:focus-visible,\\n\\tbutton:focus-visible {\\n\\t\\toutline: 2px solid var(--focus-color, red);\\n\\t\\toutline-offset: 2px;\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AAiGC,uCAAY,CACX,MAAM,CAAE,IAAI,mBAAmB,CAAC,QAAQ,CACzC,CACA,4CAAiB,CAChB,OAAO,CAAE,IAAI,CACb,IAAI,CAAE,CAAC,CACP,GAAG,CAAE,IACN,CACA,iCAAK,CACL,kCAAM,CACN,wCAAa,CACZ,IAAI,CAAE,CAAC,CACP,MAAM,CAAE,IAAI,CACZ,gBAAgB,CAAE,IAAI,gBAAgB,CAAC,KAAK,CAAC,CAC7C,KAAK,CAAE,IAAI,eAAe,CAAC,uBAAuB,CAAC,CACnD,OAAO,CAAE,CAAC,CACV,aAAa,CAAE,GAAG,CAClB,MAAM,CAAE,IAAI,CACZ,WAAW,CAAE,IAAI,CACjB,UAAU,CAAE,MACb,CACA,iCAAM,CACL,KAAK,CAAE,GAAG,CACV,WAAW,CAAE,OACd,CAEA,kCAAM,CACN,wCAAa,CACZ,QAAQ,CAAE,QAAQ,CAClB,IAAI,CAAE,CAAC,CACP,MAAM,CAAE,GAAG,CAAC,CAAC,CAAC,CAAC,CACf,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,IAAI,CACX,UAAU,CAAE,gBAAgB,CAAC,IAAI,CACjC,MAAM,CAAE,OAAO,CACf,WAAW,CAAE,OACd,CAEA,wCAAa,CACZ,MAAM,CAAE,OACT,CAEA,mCAAO,CACP,sCAAW,CACV,QAAQ,CAAE,QAAQ,CAClB,IAAI,CAAE,GAAG,CACT,GAAG,CAAE,GAAG,CACR,SAAS,CAAE,UAAU,IAAI,CAAC,CAAC,IAAI,CAAC,CAChC,KAAK,CAAE,IAAI,CACX,UAAU,CAAE,GAAG,CAAC,IACjB,CACA,oBAAM,MAAM,CAAC,wBAAU,CACvB,mCAAQ,CACP,OAAO,CAAE,CACV,CAEA,sCAAU,CACV,oBAAM,MAAM,CAAC,qBAAQ,CACpB,OAAO,CAAE,CACV,CAEA,kCAAM,MAAO,CACZ,gBAAgB,CAAE,IAAI,uBAAuB,CAAC,KAAK,CACpD,CAEA,iCAAK,MAAM,CACX,kCAAM,MAAO,CACZ,OAAO,CAAE,IACV,CAEA,iCAAK,cAAc,CACnB,kCAAM,cAAe,CACpB,OAAO,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,aAAa,CAAC,IAAI,CAAC,CAC1C,cAAc,CAAE,GACjB"}`
    };
    TextInput = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let nextMode;
      let h2;
      let s22;
      let v2;
      let a2;
      createEventDispatcher();
      let { isAlpha } = $$props;
      let { rgb } = $$props;
      let { hsv } = $$props;
      let { hex } = $$props;
      let { textInputModes } = $$props;
      let { texts } = $$props;
      let mode = textInputModes[0] || "hex";
      if ($$props.isAlpha === void 0 && $$bindings.isAlpha && isAlpha !== void 0) $$bindings.isAlpha(isAlpha);
      if ($$props.rgb === void 0 && $$bindings.rgb && rgb !== void 0) $$bindings.rgb(rgb);
      if ($$props.hsv === void 0 && $$bindings.hsv && hsv !== void 0) $$bindings.hsv(hsv);
      if ($$props.hex === void 0 && $$bindings.hex && hex !== void 0) $$bindings.hex(hex);
      if ($$props.textInputModes === void 0 && $$bindings.textInputModes && textInputModes !== void 0) $$bindings.textInputModes(textInputModes);
      if ($$props.texts === void 0 && $$bindings.texts && texts !== void 0) $$bindings.texts(texts);
      $$result.css.add(css$6);
      nextMode = textInputModes[(textInputModes.indexOf(mode) + 1) % textInputModes.length];
      h2 = Math.round(hsv.h);
      s22 = Math.round(hsv.s);
      v2 = Math.round(hsv.v);
      a2 = hsv.a === void 0 ? 1 : Math.round(hsv.a * 100) / 100;
      return `<div class="text-input svelte-qtukzs"><div class="input-container svelte-qtukzs">${mode === "hex" ? `<input${add_attribute("aria-label", texts.label.hex, 0)}${add_attribute("value", hex, 0)} class="svelte-qtukzs"${add_styles({ "flex": 3 })}>` : `${mode === "rgb" ? `<input${add_attribute("aria-label", texts.label.r, 0)}${add_attribute("value", rgb.r, 0)} type="number" min="0" max="255" class="svelte-qtukzs"> <input${add_attribute("aria-label", texts.label.g, 0)}${add_attribute("value", rgb.g, 0)} type="number" min="0" max="255" class="svelte-qtukzs"> <input${add_attribute("aria-label", texts.label.b, 0)}${add_attribute("value", rgb.b, 0)} type="number" min="0" max="255" class="svelte-qtukzs">` : `<input${add_attribute("aria-label", texts.label.h, 0)}${add_attribute("value", h2, 0)} type="number" min="0" max="360" class="svelte-qtukzs"> <input${add_attribute("aria-label", texts.label.s, 0)}${add_attribute("value", s22, 0)} type="number" min="0" max="100" class="svelte-qtukzs"> <input${add_attribute("aria-label", texts.label.v, 0)}${add_attribute("value", v2, 0)} type="number" min="0" max="100" class="svelte-qtukzs">`}`} ${isAlpha ? `<input${add_attribute("aria-label", texts.label.a, 0)}${add_attribute("value", a2, 0)} type="number" min="0" max="1" step="0.01" class="svelte-qtukzs">` : ``}</div> ${textInputModes.length > 1 ? `<button type="button" class="svelte-qtukzs"><span class="disappear svelte-qtukzs" aria-hidden="true">${escape(texts.color[mode])}</span> <span class="appear svelte-qtukzs">${escape(texts.changeTo)} ${escape(nextMode)}</span></button>` : `<div class="button-like svelte-qtukzs">${escape(texts.color[mode])}</div>`}</div> `;
    });
    css$5 = {
      code: "label.svelte-lemcb1.svelte-lemcb1{display:inline-flex;align-items:center;gap:8px;cursor:pointer;border-radius:3px;margin:4px;height:var(--input-size, 25px);user-select:none}.container.svelte-lemcb1.svelte-lemcb1{position:relative;display:block;display:flex;align-items:center;justify-content:center;width:var(--input-size, 25px)}input.svelte-lemcb1.svelte-lemcb1{margin:0;padding:0;border:none;width:1px;height:1px;flex-shrink:0;opacity:0}.alpha.svelte-lemcb1.svelte-lemcb1{clip-path:circle(50%);background:var(--alpha-grid-bg)}.alpha.svelte-lemcb1.svelte-lemcb1,.color.svelte-lemcb1.svelte-lemcb1{position:absolute;width:var(--input-size, 25px);height:var(--input-size, 25px);border-radius:50%;user-select:none}input.svelte-lemcb1:focus-visible~.color.svelte-lemcb1{outline:2px solid var(--focus-color, red);outline-offset:2px}",
      map: '{"version":3,"file":"Input.svelte","sources":["Input.svelte"],"sourcesContent":["<script>/** DOM element of the label wrapper */\\nexport let labelElement;\\n/** hex color */\\nexport let hex;\\n/** input label */\\nexport let label;\\n/** input name, useful in a native form */\\nexport let name = undefined;\\n/* svelte-ignore unused-export-let /** indicator of the popup state */\\nexport let isOpen;\\nfunction noop() {\\n    /* prevent browser color picker from opening unless javascript is broken */\\n}\\n<\/script>\\n\\n<!-- svelte-ignore a11y-no-noninteractive-element-interactions a11y-click-events-have-key-events -->\\n<label bind:this={labelElement} on:click|preventDefault={noop} on:mousedown|preventDefault={noop}>\\n\\t<div class=\\"container\\">\\n\\t\\t<input\\n\\t\\t\\ttype=\\"color\\"\\n\\t\\t\\t{name}\\n\\t\\t\\tvalue={hex}\\n\\t\\t\\ton:click|preventDefault={noop}\\n\\t\\t\\ton:mousedown|preventDefault={noop}\\n\\t\\t\\taria-haspopup=\\"dialog\\"\\n\\t\\t/>\\n\\t\\t<div class=\\"alpha\\" />\\n\\t\\t<div class=\\"color\\" style:background={hex} />\\n\\t</div>\\n\\t{label}\\n</label>\\n\\n<!-- \\n@component button to open the color picker. Also provides a hidden input with the hex value selected by the user\\nto fallback to color picker to the default browser one if a problem happens. This component cannot be imported\\ndirectly but can be overridden.\\n\\n**Import**\\n_N.A._\\n\\n**Use**\\n_N.A._\\n\\n**Props**\\n@prop labelElement: HTMLLabelElement \u2014 DOM element of the label wrapper\\n@prop hex: string | undefined \u2014 hex color\\n@prop label: string \u2014 input label\\n@prop name: string | undefined = undefined \u2014 input name, useful in a native form\\n@prop isOpen: boolean \u2014 indicator of the popup state\\n-->\\n<style>\\n\\tlabel {\\n\\t\\tdisplay: inline-flex;\\n\\t\\talign-items: center;\\n\\t\\tgap: 8px;\\n\\t\\tcursor: pointer;\\n\\t\\tborder-radius: 3px;\\n\\t\\tmargin: 4px;\\n\\t\\theight: var(--input-size, 25px);\\n\\t\\tuser-select: none;\\n\\t}\\n\\n\\t.container {\\n\\t\\tposition: relative;\\n\\t\\tdisplay: block;\\n\\t\\tdisplay: flex;\\n\\t\\talign-items: center;\\n\\t\\tjustify-content: center;\\n\\t\\twidth: var(--input-size, 25px);\\n\\t}\\n\\n\\tinput {\\n\\t\\tmargin: 0;\\n\\t\\tpadding: 0;\\n\\t\\tborder: none;\\n\\t\\twidth: 1px;\\n\\t\\theight: 1px;\\n\\t\\tflex-shrink: 0;\\n\\t\\topacity: 0;\\n\\t}\\n\\n\\t.alpha {\\n\\t\\tclip-path: circle(50%);\\n\\t\\tbackground: var(--alpha-grid-bg);\\n\\t}\\n\\n\\t.alpha,\\n\\t.color {\\n\\t\\tposition: absolute;\\n\\t\\twidth: var(--input-size, 25px);\\n\\t\\theight: var(--input-size, 25px);\\n\\t\\tborder-radius: 50%;\\n\\t\\tuser-select: none;\\n\\t}\\n\\n\\tinput:focus-visible ~ .color {\\n\\t\\toutline: 2px solid var(--focus-color, red);\\n\\t\\toutline-offset: 2px;\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AAmDC,iCAAM,CACL,OAAO,CAAE,WAAW,CACpB,WAAW,CAAE,MAAM,CACnB,GAAG,CAAE,GAAG,CACR,MAAM,CAAE,OAAO,CACf,aAAa,CAAE,GAAG,CAClB,MAAM,CAAE,GAAG,CACX,MAAM,CAAE,IAAI,YAAY,CAAC,KAAK,CAAC,CAC/B,WAAW,CAAE,IACd,CAEA,sCAAW,CACV,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,KAAK,CACd,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,eAAe,CAAE,MAAM,CACvB,KAAK,CAAE,IAAI,YAAY,CAAC,KAAK,CAC9B,CAEA,iCAAM,CACL,MAAM,CAAE,CAAC,CACT,OAAO,CAAE,CAAC,CACV,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,GAAG,CACV,MAAM,CAAE,GAAG,CACX,WAAW,CAAE,CAAC,CACd,OAAO,CAAE,CACV,CAEA,kCAAO,CACN,SAAS,CAAE,OAAO,GAAG,CAAC,CACtB,UAAU,CAAE,IAAI,eAAe,CAChC,CAEA,kCAAM,CACN,kCAAO,CACN,QAAQ,CAAE,QAAQ,CAClB,KAAK,CAAE,IAAI,YAAY,CAAC,KAAK,CAAC,CAC9B,MAAM,CAAE,IAAI,YAAY,CAAC,KAAK,CAAC,CAC/B,aAAa,CAAE,GAAG,CAClB,WAAW,CAAE,IACd,CAEA,mBAAK,cAAc,CAAG,oBAAO,CAC5B,OAAO,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,aAAa,CAAC,IAAI,CAAC,CAC1C,cAAc,CAAE,GACjB"}'
    };
    Input = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { labelElement } = $$props;
      let { hex } = $$props;
      let { label } = $$props;
      let { name: name2 = void 0 } = $$props;
      let { isOpen } = $$props;
      if ($$props.labelElement === void 0 && $$bindings.labelElement && labelElement !== void 0) $$bindings.labelElement(labelElement);
      if ($$props.hex === void 0 && $$bindings.hex && hex !== void 0) $$bindings.hex(hex);
      if ($$props.label === void 0 && $$bindings.label && label !== void 0) $$bindings.label(label);
      if ($$props.name === void 0 && $$bindings.name && name2 !== void 0) $$bindings.name(name2);
      if ($$props.isOpen === void 0 && $$bindings.isOpen && isOpen !== void 0) $$bindings.isOpen(isOpen);
      $$result.css.add(css$5);
      return ` <label class="svelte-lemcb1"${add_attribute("this", labelElement, 0)}><div class="container svelte-lemcb1"><input type="color"${add_attribute("name", name2, 0)}${add_attribute("value", hex, 0)} aria-haspopup="dialog" class="svelte-lemcb1"> <div class="alpha svelte-lemcb1"></div> <div class="color svelte-lemcb1"${add_styles({ "background": hex })}></div></div> ${escape(label)}</label> `;
    });
    css$4 = {
      code: "div.svelte-h9ar9{padding:8px;background-color:var(--cp-bg-color, white);margin:0 10px 10px;border:1px solid var(--cp-border-color, black);border-radius:12px;display:none;width:max-content}.is-open.svelte-h9ar9{display:inline-block}[role='dialog'].svelte-h9ar9{position:absolute;top:calc(var(--input-size, 25px) + 12px);left:0;z-index:var(--picker-z-index, 2)}",
      map: `{"version":3,"file":"Wrapper.svelte","sources":["Wrapper.svelte"],"sourcesContent":["<script>/** DOM element of the wrapper element */\\nexport let wrapper;\\n/** indicator of the popup state */\\nexport let isOpen;\\n/** if set to true, the wrapper should have a dialog role and be absolute. It should be relative otherwise */\\nexport let isDialog;\\n<\/script>\\n\\n<div\\n\\tbind:this={wrapper}\\n\\tclass=\\"wrapper\\"\\n\\tclass:is-open={isOpen}\\n\\trole={isDialog ? 'dialog' : undefined}\\n\\taria-label=\\"color picker\\"\\n>\\n\\t<slot />\\n</div>\\n\\n<!-- \\n@component Default variant wrapper\\n\\n**Import**\\nthis component is the default variant and cannot be imported\\n\\n**Use**\\nN.A.\\n\\n**Props**\\n@prop wrapper: HTMLElement \u2014 DOM element of the wrapper element\\n@prop isOpen: boolean \u2014 indicator of the popup state\\n@prop isDialog: boolean \u2014 if set to true, the wrapper should have a dialog role and be absolute. It should be relative otherwise\\n-->\\n<style>\\n\\tdiv {\\n\\t\\tpadding: 8px;\\n\\t\\tbackground-color: var(--cp-bg-color, white);\\n\\t\\tmargin: 0 10px 10px;\\n\\t\\tborder: 1px solid var(--cp-border-color, black);\\n\\t\\tborder-radius: 12px;\\n\\t\\tdisplay: none;\\n\\t\\twidth: max-content;\\n\\t}\\n\\t.is-open {\\n\\t\\tdisplay: inline-block;\\n\\t}\\n\\t[role='dialog'] {\\n\\t\\tposition: absolute;\\n\\t\\ttop: calc(var(--input-size, 25px) + 12px);\\n\\t\\tleft: 0;\\n\\t\\tz-index: var(--picker-z-index, 2);\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AAiCC,gBAAI,CACH,OAAO,CAAE,GAAG,CACZ,gBAAgB,CAAE,IAAI,aAAa,CAAC,MAAM,CAAC,CAC3C,MAAM,CAAE,CAAC,CAAC,IAAI,CAAC,IAAI,CACnB,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,iBAAiB,CAAC,MAAM,CAAC,CAC/C,aAAa,CAAE,IAAI,CACnB,OAAO,CAAE,IAAI,CACb,KAAK,CAAE,WACR,CACA,qBAAS,CACR,OAAO,CAAE,YACV,CACA,CAAC,IAAI,CAAC,QAAQ,cAAE,CACf,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,KAAK,IAAI,YAAY,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,CACzC,IAAI,CAAE,CAAC,CACP,OAAO,CAAE,IAAI,gBAAgB,CAAC,EAAE,CACjC"}`
    };
    Wrapper = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { wrapper } = $$props;
      let { isOpen } = $$props;
      let { isDialog } = $$props;
      if ($$props.wrapper === void 0 && $$bindings.wrapper && wrapper !== void 0) $$bindings.wrapper(wrapper);
      if ($$props.isOpen === void 0 && $$bindings.isOpen && isOpen !== void 0) $$bindings.isOpen(isOpen);
      if ($$props.isDialog === void 0 && $$bindings.isDialog && isDialog !== void 0) $$bindings.isDialog(isDialog);
      $$result.css.add(css$4);
      return `<div class="${["wrapper svelte-h9ar9", isOpen ? "is-open" : ""].join(" ").trim()}"${add_attribute("role", isDialog ? "dialog" : void 0, 0)} aria-label="color picker"${add_attribute("this", wrapper, 0)}>${slots.default ? slots.default({}) : ``}</div> `;
    });
    defaultTexts = {
      label: {
        h: "hue channel",
        s: "saturation channel",
        v: "brightness channel",
        r: "red channel",
        g: "green channel",
        b: "blue channel",
        a: "alpha channel",
        hex: "hex color",
        withoutColor: "without color"
      },
      color: {
        rgb: "rgb",
        hsv: "hsv",
        hex: "hex"
      },
      changeTo: "change to "
    };
    css$3 = {
      code: "label.svelte-oskb5b.svelte-oskb5b{display:flex;justify-content:center;margin-bottom:4px;grid-area:nullable;user-select:none}input.svelte-oskb5b.svelte-oskb5b{margin:0}input.svelte-oskb5b.svelte-oskb5b:focus-visible{outline:none}input.svelte-oskb5b:focus-visible+span.svelte-oskb5b{width:14px;height:14px;border-radius:2px;outline:2px solid var(--focus-color, red);outline-offset:2px}div.svelte-oskb5b.svelte-oskb5b{width:32px;aspect-ratio:2;position:relative}div.svelte-oskb5b .svelte-oskb5b{position:absolute;top:50%;left:50%;transform:translate(-50%, -50%)}",
      map: '{"version":3,"file":"NullabilityCheckbox.svelte","sources":["NullabilityCheckbox.svelte"],"sourcesContent":["<script>/** whether the color picker is undefined */\\nexport let isUndefined;\\n/** all translation tokens used in the library; can be partially overridden; see [full object type](https://github.com/Ennoriel/svelte-awesome-color-picker/blob/master/src/lib/utils/texts.ts) */\\nexport let texts;\\n<\/script>\\n\\n<label class=\\"nullability-checkbox\\">\\n\\t<div>\\n\\t\\t<input type=\\"checkbox\\" bind:checked={isUndefined} />\\n\\t\\t<span />\\n\\t</div>\\n\\t{texts.label.withoutColor}\\n</label>\\n\\n<style>\\n\\tlabel {\\n\\t\\tdisplay: flex;\\n\\t\\tjustify-content: center;\\n\\t\\tmargin-bottom: 4px;\\n\\t\\tgrid-area: nullable;\\n\\t\\tuser-select: none;\\n\\t}\\n\\tinput {\\n\\t\\tmargin: 0;\\n\\t}\\n\\tinput:focus-visible {\\n\\t\\toutline: none;\\n\\t}\\n\\tinput:focus-visible + span {\\n\\t\\twidth: 14px;\\n\\t\\theight: 14px;\\n\\t\\tborder-radius: 2px;\\n\\t\\toutline: 2px solid var(--focus-color, red);\\n\\t\\toutline-offset: 2px;\\n\\t}\\n\\n\\tdiv {\\n\\t\\twidth: 32px;\\n\\t\\taspect-ratio: 2;\\n\\t\\tposition: relative;\\n\\t}\\n\\tdiv * {\\n\\t\\tposition: absolute;\\n\\t\\ttop: 50%;\\n\\t\\tleft: 50%;\\n\\t\\ttransform: translate(-50%, -50%);\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AAeC,iCAAM,CACL,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,MAAM,CACvB,aAAa,CAAE,GAAG,CAClB,SAAS,CAAE,QAAQ,CACnB,WAAW,CAAE,IACd,CACA,iCAAM,CACL,MAAM,CAAE,CACT,CACA,iCAAK,cAAe,CACnB,OAAO,CAAE,IACV,CACA,mBAAK,cAAc,CAAG,kBAAK,CAC1B,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,aAAa,CAAE,GAAG,CAClB,OAAO,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,aAAa,CAAC,IAAI,CAAC,CAC1C,cAAc,CAAE,GACjB,CAEA,+BAAI,CACH,KAAK,CAAE,IAAI,CACX,YAAY,CAAE,CAAC,CACf,QAAQ,CAAE,QACX,CACA,iBAAG,CAAC,cAAE,CACL,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,GAAG,CACR,IAAI,CAAE,GAAG,CACT,SAAS,CAAE,UAAU,IAAI,CAAC,CAAC,IAAI,CAChC"}'
    };
    NullabilityCheckbox = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { isUndefined } = $$props;
      let { texts } = $$props;
      if ($$props.isUndefined === void 0 && $$bindings.isUndefined && isUndefined !== void 0) $$bindings.isUndefined(isUndefined);
      if ($$props.texts === void 0 && $$bindings.texts && texts !== void 0) $$bindings.texts(texts);
      $$result.css.add(css$3);
      return `<label class="nullability-checkbox svelte-oskb5b"><div class="svelte-oskb5b"><input type="checkbox" class="svelte-oskb5b"${add_attribute("checked", isUndefined, 1)}> <span class="svelte-oskb5b"></span></div> ${escape(texts.label.withoutColor)} </label>`;
    });
    css$2 = {
      code: "span.svelte-tsvobk.svelte-tsvobk{position:relative;color:var(--cp-text-color, var(--cp-border-color));--alpha-grid-bg:linear-gradient(45deg, #eee 25%, #0000 25%, #0000 75%, #eee 75%) 0 0 / 10px 10px,\n			linear-gradient(45deg, #eee 25%, #0000 25%, #0000 75%, #eee 75%) 5px 5px / 10px 10px}.h.svelte-tsvobk.svelte-tsvobk,.a.svelte-tsvobk.svelte-tsvobk{display:inline-flex;justify-content:center;--track-height:var(--slider-width, 10px);--track-width:var(--picker-height, 200px);--track-border:none;--thumb-size:calc(var(--slider-width, 10px) - 3px);--thumb-background:white;--thumb-border:1px solid black;--margin-block:0;--gradient-direction:0.5turn}.horizontal.svelte-tsvobk .h.svelte-tsvobk,.horizontal.svelte-tsvobk .a.svelte-tsvobk{--track-width:calc(var(--picker-width, 200px) - 12px);--gradient-direction:0.25turn;margin:4px 6px}.horizontal.svelte-tsvobk .h.svelte-tsvobk{margin-top:8px}.vertical.svelte-tsvobk .h.svelte-tsvobk,.vertical.svelte-tsvobk .a.svelte-tsvobk{margin-left:3px}.h.svelte-tsvobk.svelte-tsvobk{grid-area:hue;--gradient-hue:#ff1500fb, #ffff00 17.2%, #ffff00 18.2%, #00ff00 33.3%, #00ffff 49.5%, #00ffff 51.5%, #0000ff 67.7%,\n			#ff00ff 83.3%, #ff0000;--track-background:linear-gradient(var(--gradient-direction), var(--gradient-hue))}.a.svelte-tsvobk.svelte-tsvobk{grid-area:alpha;margin-top:2px;--track-background:linear-gradient(var(--gradient-direction), rgba(0, 0, 0, 0), var(--alphaless-color)),\n			var(--alpha-grid-bg)}span.svelte-tsvobk .sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);white-space:nowrap;border-width:0}",
      map: `{"version":3,"file":"ColorPicker.svelte","sources":["ColorPicker.svelte"],"sourcesContent":["<script>import { createEventDispatcher, tick } from 'svelte';\\nimport { colord } from 'colord';\\nimport Picker from './Picker.svelte';\\nimport { Slider } from 'svelte-awesome-slider';\\nimport PickerIndicator from './variant/default/PickerIndicator.svelte';\\nimport TextInput from './variant/default/TextInput.svelte';\\nimport Input from './variant/default/Input.svelte';\\nimport Wrapper from './variant/default/Wrapper.svelte';\\nimport { defaultTexts } from '../utils/texts';\\nimport { trapFocus } from '../utils/trapFocus';\\nimport NullabilityCheckbox from './variant/default/NullabilityCheckbox.svelte';\\nconst dispatch = createEventDispatcher();\\n/** customize the ColorPicker component parts. Can be used to display a Chrome variant or an Accessibility Notice */\\nexport let components = {};\\n/** input label, hidden when the ColorPicker is always shown (prop \`isDialog={false}\`) */\\nexport let label = 'Choose a color';\\n/** input name, useful in a native form */\\nexport let name = undefined;\\n/** if set to true, the color picker becomes nullable (rgb, hsv and hex set to undefined) */\\nexport let nullable = false;\\n/** rgb color */\\nexport let rgb = nullable ? undefined : { r: 255, g: 0, b: 0, a: 1 };\\n/** hsv color */\\nexport let hsv = nullable ? undefined : { h: 0, s: 100, v: 100, a: 1 };\\n/** hex color */\\nexport let hex = nullable ? undefined : '#ff0000';\\n/** Colord color */\\nexport let color = undefined;\\n/** indicator whether the selected color is light or dark */\\nexport let isDark = false;\\n/** if set to false, disables the alpha channel */\\nexport let isAlpha = true;\\n/** if set to false, the input and the label will not be displayed and the ColorPicker will always be visible */\\nexport let isDialog = true;\\n/** indicator of the popup state */\\nexport let isOpen = !isDialog;\\n/** if set to \\"responsive\\", the popup will adjust its x and y position depending on the available window space, \\"responsive-x\\" and \\"responsive-y\\" limit the behavior to either the x or y axis. The value 'responsive' will become the default in the next major release */\\nexport let position = 'fixed';\\n/** if set to false, hide the hex, rgb and hsv text inputs */\\nexport let isTextInput = true;\\n/** configure which hex, rgb and hsv inputs will be visible and in which order. If overridden, it is necessary to provide at least one value */\\nexport let textInputModes = ['hex', 'rgb', 'hsv'];\\n/** If set to \\"horizontal\\", the hue and alpha sliders will be displayed horizontally. It is necessary to set this props to \\"horizontal\\" for the ChromeVariant */\\nexport let sliderDirection = 'vertical';\\n/** If set to true, it will not be possible to close the color picker by clicking outside */\\nexport let disableCloseClickOutside = false;\\n/** used with the A11yVariant. Define the accessibility examples in the color picker */\\nexport let a11yColors = [{ bgHex: '#ffffff' }];\\n/** required WCAG contrast level */\\nexport let a11yLevel = 'AA';\\n/** all translation tokens used in the library; can be partially overridden; see [full object type](https://github.com/Ennoriel/svelte-awesome-color-picker/blob/master/src/lib/utils/texts.ts) */\\nexport let texts = undefined;\\n/** all a11y translation tokens used in the library; override with translations if necessary; see [full object type](https://github.com/Ennoriel/svelte-awesome-color-picker/blob/master/src/lib/utils/texts.ts) */\\nexport let a11yTexts = undefined;\\n/**\\n * Internal old values to trigger color conversion\\n */\\nlet _rgb = { r: 255, g: 0, b: 0, a: 1 };\\nlet _hsv = { h: 0, s: 100, v: 100, a: 1 };\\nlet _hex = '#ff0000';\\nlet isUndefined = false;\\nlet _isUndefined = isUndefined;\\nlet spanElement;\\nlet labelElement;\\nlet wrapper;\\nlet trap = undefined;\\nlet innerWidth;\\nlet innerHeight;\\nconst wrapperPadding = 12;\\nconst default_components = {\\n    pickerIndicator: PickerIndicator,\\n    textInput: TextInput,\\n    input: Input,\\n    nullabilityCheckbox: NullabilityCheckbox,\\n    wrapper: Wrapper\\n};\\nfunction getComponents() {\\n    return {\\n        ...default_components,\\n        ...components\\n    };\\n}\\nfunction getTexts() {\\n    return {\\n        label: {\\n            ...defaultTexts.label,\\n            ...texts?.label\\n        },\\n        color: {\\n            ...defaultTexts.color,\\n            ...texts?.color\\n        },\\n        changeTo: texts?.changeTo ?? defaultTexts.changeTo\\n    };\\n}\\nfunction mousedown({ target }) {\\n    if (isDialog) {\\n        if (labelElement.contains(target) || labelElement.isSameNode(target)) {\\n            isOpen = !isOpen;\\n        }\\n        else if (isOpen && !wrapper.contains(target) && !disableCloseClickOutside) {\\n            isOpen = false;\\n        }\\n    }\\n}\\nfunction keyup({ key, target }) {\\n    if (!isDialog) {\\n        return;\\n    }\\n    else if (key === 'Enter' && labelElement.contains(target)) {\\n        isOpen = !isOpen;\\n        setTimeout(() => {\\n            trap = trapFocus(wrapper);\\n        });\\n    }\\n    else if (key === 'Escape' && isOpen) {\\n        isOpen = false;\\n        if (spanElement.contains(target)) {\\n            labelElement?.focus();\\n            trap?.destroy();\\n        }\\n    }\\n}\\n/**\\n * using a function seems to trigger the exported value change only once when all of them has been updated\\n * and not just after the hsv change\\n */\\nfunction updateColor() {\\n    if (isUndefined && !_isUndefined) {\\n        _isUndefined = true;\\n        hsv = rgb = hex = undefined;\\n        dispatch('input', { color, hsv, rgb, hex });\\n        return;\\n    }\\n    else if (_isUndefined && !isUndefined) {\\n        _isUndefined = false;\\n        hsv = _hsv;\\n        rgb = _rgb;\\n        hex = _hex;\\n        dispatch('input', { color, hsv, rgb, hex });\\n        return;\\n    }\\n    if (!hsv && !rgb && !hex) {\\n        isUndefined = true;\\n        _isUndefined = true;\\n        dispatch('input', { color: undefined, hsv, rgb, hex });\\n        return;\\n    }\\n    if (hsv &&\\n        rgb &&\\n        hsv.h === _hsv.h &&\\n        hsv.s === _hsv.s &&\\n        hsv.v === _hsv.v &&\\n        hsv.a === _hsv.a &&\\n        rgb.r === _rgb.r &&\\n        rgb.g === _rgb.g &&\\n        rgb.b === _rgb.b &&\\n        rgb.a === _rgb.a &&\\n        hex === _hex) {\\n        return;\\n    }\\n    isUndefined = false;\\n    // reinitialize empty alpha values\\n    if (hsv && hsv.a === undefined)\\n        hsv.a = 1;\\n    if (_hsv.a === undefined)\\n        _hsv.a = 1;\\n    if (rgb && rgb.a === undefined)\\n        rgb.a = 1;\\n    if (_rgb.a === undefined)\\n        _rgb.a = 1;\\n    if (hex?.substring(7) === 'ff')\\n        hex = hex.substring(0, 7);\\n    if (hex?.substring(7) === 'ff')\\n        hex = hex.substring(0, 7);\\n    // triggers color computation from the color that changed or if it is the only color defined\\n    if (hsv && (hsv.h !== _hsv.h || hsv.s !== _hsv.s || hsv.v !== _hsv.v || hsv.a !== _hsv.a || (!rgb && !hex))) {\\n        color = colord(hsv);\\n        rgb = color.toRgb();\\n        hex = color.toHex();\\n    }\\n    else if (rgb &&\\n        (rgb.r !== _rgb.r || rgb.g !== _rgb.g || rgb.b !== _rgb.b || rgb.a !== _rgb.a || (!hsv && !hex))) {\\n        color = colord(rgb);\\n        hex = color.toHex();\\n        hsv = color.toHsv();\\n    }\\n    else if (hex && (hex !== _hex || (!hsv && !rgb))) {\\n        color = colord(hex);\\n        rgb = color.toRgb();\\n        hsv = color.toHsv();\\n    }\\n    if (color) {\\n        isDark = color.isDark();\\n    }\\n    if (!hex)\\n        return;\\n    // update old colors\\n    _hsv = Object.assign({}, hsv);\\n    _rgb = Object.assign({}, rgb);\\n    _hex = hex;\\n    _isUndefined = isUndefined;\\n    dispatch('input', { color, hsv, rgb, hex });\\n}\\n$: if (hsv || rgb || hex) {\\n    updateColor();\\n}\\n$: isUndefined, updateColor();\\nfunction updateLetter(letter) {\\n    return (e) => {\\n        if (!hsv)\\n            hsv = { ..._hsv };\\n        hsv[letter] = e.detail;\\n    };\\n}\\nfunction updateLetters(letters) {\\n    return (e) => {\\n        if (!hsv)\\n            hsv = { ..._hsv };\\n        letters.forEach((letter) => {\\n            if (hsv)\\n                hsv[letter] = e.detail[letter];\\n        });\\n    };\\n}\\nasync function wrapperBoundaryCheck() {\\n    await tick();\\n    if (position !== 'fixed' && isOpen && isDialog && labelElement && wrapper) {\\n        const rect = wrapper.getBoundingClientRect();\\n        const labelRect = labelElement.getBoundingClientRect();\\n        if (position === 'responsive' || position === 'responsive-y') {\\n            if (labelRect.top + rect.height + wrapperPadding > innerHeight) {\\n                wrapper.style.top = \`-\${rect.height + wrapperPadding}px\`;\\n            }\\n            else {\\n                wrapper.style.top = \`\${labelRect.height + wrapperPadding}px\`;\\n            }\\n        }\\n        if (position === 'responsive' || position === 'responsive-x') {\\n            if (labelRect.left + rect.width + wrapperPadding > innerWidth) {\\n                wrapper.style.left = \`-\${rect.width - labelRect.width + wrapperPadding}px\`;\\n            }\\n            else {\\n                wrapper.style.left = \`\${wrapperPadding}px\`;\\n            }\\n        }\\n    }\\n}\\n$: innerWidth, innerHeight, isOpen, wrapperBoundaryCheck();\\n<\/script>\\n\\n<svelte:window\\n\\ton:mousedown={mousedown}\\n\\ton:keyup={keyup}\\n\\ton:scroll={wrapperBoundaryCheck}\\n\\tbind:innerWidth\\n\\tbind:innerHeight\\n/>\\n\\n<span bind:this={spanElement} class=\\"color-picker {sliderDirection}\\">\\n\\t{#if isDialog}\\n\\t\\t<svelte:component this={getComponents().input} bind:labelElement isOpen {hex} {label} {name} />\\n\\t{:else if name}\\n\\t\\t<input type=\\"hidden\\" value={hex} {name} />\\n\\t{/if}\\n\\t<svelte:component this={getComponents().wrapper} bind:wrapper {isOpen} {isDialog}>\\n\\t\\t{#if nullable}\\n\\t\\t\\t<svelte:component this={getComponents().nullabilityCheckbox} bind:isUndefined texts={getTexts()} />\\n\\t\\t{/if}\\n\\t\\t<Picker\\n\\t\\t\\tcomponents={getComponents()}\\n\\t\\t\\th={hsv?.h ?? _hsv.h}\\n\\t\\t\\ts={hsv?.s ?? _hsv.s}\\n\\t\\t\\tv={hsv?.v ?? _hsv.v}\\n\\t\\t\\ton:input={updateLetters(['s', 'v'])}\\n\\t\\t\\t{isDark}\\n\\t\\t\\ttexts={getTexts()}\\n\\t\\t/>\\n\\t\\t<div class=\\"h\\">\\n\\t\\t\\t<Slider\\n\\t\\t\\t\\tmin={0}\\n\\t\\t\\t\\tmax={360}\\n\\t\\t\\t\\tstep={1}\\n\\t\\t\\t\\tvalue={hsv?.h ?? _hsv.h}\\n\\t\\t\\t\\ton:input={updateLetter('h')}\\n\\t\\t\\t\\tdirection={sliderDirection}\\n\\t\\t\\t\\treverse={sliderDirection === 'vertical'}\\n\\t\\t\\t\\tariaLabel={getTexts().label.h}\\n\\t\\t\\t/>\\n\\t\\t</div>\\n\\t\\t{#if isAlpha}\\n\\t\\t\\t<div class=\\"a\\" style:--alphaless-color={(hex ? hex : _hex).substring(0, 7)}>\\n\\t\\t\\t\\t<Slider\\n\\t\\t\\t\\t\\tmin={0}\\n\\t\\t\\t\\t\\tmax={1}\\n\\t\\t\\t\\t\\tstep={0.01}\\n\\t\\t\\t\\t\\tvalue={hsv?.a ?? _hsv.a}\\n\\t\\t\\t\\t\\ton:input={updateLetter('a')}\\n\\t\\t\\t\\t\\tdirection={sliderDirection}\\n\\t\\t\\t\\t\\treverse={sliderDirection === 'vertical'}\\n\\t\\t\\t\\t\\tariaLabel={getTexts().label.a}\\n\\t\\t\\t\\t/>\\n\\t\\t\\t</div>\\n\\t\\t{/if}\\n\\t\\t{#if isTextInput}\\n\\t\\t\\t<svelte:component\\n\\t\\t\\t\\tthis={getComponents().textInput}\\n\\t\\t\\t\\thex={hex ?? _hex}\\n\\t\\t\\t\\trgb={rgb ?? _rgb}\\n\\t\\t\\t\\thsv={hsv ?? _hsv}\\n\\t\\t\\t\\ton:input={({ detail }) => {\\n\\t\\t\\t\\t\\tif (detail.hsv) {\\n\\t\\t\\t\\t\\t\\thsv = detail.hsv;\\n\\t\\t\\t\\t\\t} else if (detail.rgb) {\\n\\t\\t\\t\\t\\t\\trgb = detail.rgb;\\n\\t\\t\\t\\t\\t} else if (detail.hex) {\\n\\t\\t\\t\\t\\t\\thex = detail.hex;\\n\\t\\t\\t\\t\\t}\\n\\t\\t\\t\\t}}\\n\\t\\t\\t\\t{isAlpha}\\n\\t\\t\\t\\t{textInputModes}\\n\\t\\t\\t\\ttexts={getTexts()}\\n\\t\\t\\t/>\\n\\t\\t{/if}\\n\\t\\t{#if getComponents().a11yNotice}\\n\\t\\t\\t<svelte:component\\n\\t\\t\\t\\tthis={getComponents().a11yNotice}\\n\\t\\t\\t\\tcomponents={getComponents()}\\n\\t\\t\\t\\t{a11yColors}\\n\\t\\t\\t\\thex={hex || '#00000000'}\\n\\t\\t\\t\\t{a11yTexts}\\n\\t\\t\\t\\t{a11yLevel}\\n\\t\\t\\t/>\\n\\t\\t{/if}\\n\\t</svelte:component>\\n</span>\\n\\n<!-- \\n@component Color Picker Component \u2014 default export of the library\\n\\n**Import**\\n\`\`\`js\\nimport ColorPicker from 'svelte-awesome-color-picker';\\n\`\`\`\\n\\n**Use**\\n\`\`\`svelte\\n<ColorPicker bind:hex />\\n\`\`\`\\n\\n**Props**\\n@prop components: Partial&lt;Components&gt; = {} \u2014 customize the ColorPicker component parts. Can be used to display a Chrome variant or an Accessibility Notice\\n@prop label: string = 'Choose a color' \u2014 input label, hidden when the ColorPicker is always shown (prop \`isDialog={false}\`)\\n@prop name: string | undefined = undefined \u2014 input name, useful in a native form\\n@prop nullable: boolean = false \u2014 if set to true, the color picker becomes nullable (rgb, hsv and hex set to undefined)\\n@prop rgb: RgbaColor | undefined = nullable ? undefined : { r: 255, g: 0, b: 0, a: 1 } \u2014 rgb color\\n@prop hsv: HsvaColor | undefined = nullable ? undefined : { h: 0, s: 100, v: 100, a: 1 } \u2014 hsv color\\n@prop hex: string | undefined = nullable ? undefined : '#ff0000' \u2014 hex color\\n@prop color: Colord | undefined = undefined \u2014 Colord color\\n@prop isDark: boolean = false \u2014 indicator whether the selected color is light or dark\\n@prop isAlpha: boolean = true \u2014 if set to false, disables the alpha channel\\n@prop isDialog: boolean = true \u2014 if set to false, the input and the label will not be displayed and the ColorPicker will always be visible\\n@prop isOpen: boolean = !isDialog \u2014 indicator of the popup state\\n@prop position: 'fixed' | 'responsive' | 'responsive-x' | 'responsive-y' = 'fixed' \u2014 if set to \\"responsive\\", the popup will adjust its x and y position depending on the available window space, \\"responsive-x\\" and \\"responsive-y\\" limit the behavior to either the x or y axis. The value 'responsive' will become the default in the next major release\\n@prop isTextInput: boolean = true \u2014 if set to false, hide the hex, rgb and hsv text inputs\\n@prop textInputModes: Array&lt;'hex' | 'rgb' | 'hsv'&gt; = ['hex', 'rgb', 'hsv'] \u2014 configure which hex, rgb and hsv inputs will be visible and in which order. If overridden, it is necessary to provide at least one value\\n@prop sliderDirection: 'horizontal' | 'vertical' = 'vertical' \u2014 If set to \\"horizontal\\", the hue and alpha sliders will be displayed horizontally. It is necessary to set this props to \\"horizontal\\" for the ChromeVariant\\n@prop disableCloseClickOutside: boolean = false \u2014 If set to true, it will not be possible to close the color picker by clicking outside\\n@prop a11yColors: Array&lt;A11yColor&gt; = [{ bgHex: '#ffffff' }] \u2014 used with the A11yVariant. Define the accessibility examples in the color picker\\n@prop a11yLevel: 'AA' | 'AAA' = 'AA' \u2014 required WCAG contrast level\\n@prop texts: TextsPartial | undefined = undefined \u2014 all translation tokens used in the library; can be partially overridden; see [full object type](https://github.com/Ennoriel/svelte-awesome-color-picker/blob/master/src/lib/utils/texts.ts)\\n@prop a11yTexts: A11yTextsPartial | undefined = undefined \u2014 all a11y translation tokens used in the library; override with translations if necessary; see [full object type](https://github.com/Ennoriel/svelte-awesome-color-picker/blob/master/src/lib/utils/texts.ts)\\n-->\\n<style>\\n\\tspan {\\n\\t\\tposition: relative;\\n\\t\\tcolor: var(--cp-text-color, var(--cp-border-color));\\n\\n\\t\\t--alpha-grid-bg: linear-gradient(45deg, #eee 25%, #0000 25%, #0000 75%, #eee 75%) 0 0 / 10px 10px,\\n\\t\\t\\tlinear-gradient(45deg, #eee 25%, #0000 25%, #0000 75%, #eee 75%) 5px 5px / 10px 10px;\\n\\t}\\n\\n\\t.h,\\n\\t.a {\\n\\t\\tdisplay: inline-flex;\\n\\t\\tjustify-content: center;\\n\\t\\t--track-height: var(--slider-width, 10px);\\n\\t\\t--track-width: var(--picker-height, 200px);\\n\\t\\t--track-border: none;\\n\\t\\t--thumb-size: calc(var(--slider-width, 10px) - 3px);\\n\\t\\t--thumb-background: white;\\n\\t\\t--thumb-border: 1px solid black;\\n\\t\\t--margin-block: 0;\\n\\n\\t\\t--gradient-direction: 0.5turn;\\n\\t}\\n\\t.horizontal .h,\\n\\t.horizontal .a {\\n\\t\\t--track-width: calc(var(--picker-width, 200px) - 12px);\\n\\n\\t\\t--gradient-direction: 0.25turn;\\n\\t\\tmargin: 4px 6px;\\n\\t}\\n\\t.horizontal .h {\\n\\t\\tmargin-top: 8px;\\n\\t}\\n\\t.vertical .h,\\n\\t.vertical .a {\\n\\t\\tmargin-left: 3px;\\n\\t}\\n\\n\\t.h {\\n\\t\\tgrid-area: hue;\\n\\n\\t\\t--gradient-hue: #ff1500fb, #ffff00 17.2%, #ffff00 18.2%, #00ff00 33.3%, #00ffff 49.5%, #00ffff 51.5%, #0000ff 67.7%,\\n\\t\\t\\t#ff00ff 83.3%, #ff0000;\\n\\t\\t--track-background: linear-gradient(var(--gradient-direction), var(--gradient-hue));\\n\\t}\\n\\n\\t.a {\\n\\t\\tgrid-area: alpha;\\n\\t\\tmargin-top: 2px;\\n\\n\\t\\t--track-background: linear-gradient(var(--gradient-direction), rgba(0, 0, 0, 0), var(--alphaless-color)),\\n\\t\\t\\tvar(--alpha-grid-bg);\\n\\t}\\n\\n\\tspan :global(.sr-only) {\\n\\t\\tposition: absolute;\\n\\t\\twidth: 1px;\\n\\t\\theight: 1px;\\n\\t\\tpadding: 0;\\n\\t\\tmargin: -1px;\\n\\t\\toverflow: hidden;\\n\\t\\tclip: rect(0, 0, 0, 0);\\n\\t\\twhite-space: nowrap;\\n\\t\\tborder-width: 0;\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AAsXC,gCAAK,CACJ,QAAQ,CAAE,QAAQ,CAClB,KAAK,CAAE,IAAI,eAAe,CAAC,uBAAuB,CAAC,CAEnD,eAAe,CAAE;AACnB,uFACC,CAEA,8BAAE,CACF,8BAAG,CACF,OAAO,CAAE,WAAW,CACpB,eAAe,CAAE,MAAM,CACvB,cAAc,CAAE,yBAAyB,CACzC,aAAa,CAAE,2BAA2B,CAC1C,cAAc,CAAE,IAAI,CACpB,YAAY,CAAE,qCAAqC,CACnD,kBAAkB,CAAE,KAAK,CACzB,cAAc,CAAE,eAAe,CAC/B,cAAc,CAAE,CAAC,CAEjB,oBAAoB,CAAE,OACvB,CACA,yBAAW,CAAC,gBAAE,CACd,yBAAW,CAAC,gBAAG,CACd,aAAa,CAAE,uCAAuC,CAEtD,oBAAoB,CAAE,QAAQ,CAC9B,MAAM,CAAE,GAAG,CAAC,GACb,CACA,yBAAW,CAAC,gBAAG,CACd,UAAU,CAAE,GACb,CACA,uBAAS,CAAC,gBAAE,CACZ,uBAAS,CAAC,gBAAG,CACZ,WAAW,CAAE,GACd,CAEA,8BAAG,CACF,SAAS,CAAE,GAAG,CAEd,cAAc,CAAE;AAClB,yBAAyB,CACvB,kBAAkB,CAAE,+DACrB,CAEA,8BAAG,CACF,SAAS,CAAE,KAAK,CAChB,UAAU,CAAE,GAAG,CAEf,kBAAkB,CAAE;AACtB,uBACC,CAEA,kBAAI,CAAS,QAAU,CACtB,QAAQ,CAAE,QAAQ,CAClB,KAAK,CAAE,GAAG,CACV,MAAM,CAAE,GAAG,CACX,OAAO,CAAE,CAAC,CACV,MAAM,CAAE,IAAI,CACZ,QAAQ,CAAE,MAAM,CAChB,IAAI,CAAE,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CACtB,WAAW,CAAE,MAAM,CACnB,YAAY,CAAE,CACf"}`
    };
    wrapperPadding = 12;
    ColorPicker = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      const dispatch = createEventDispatcher();
      let { components = {} } = $$props;
      let { label = "Choose a color" } = $$props;
      let { name: name2 = void 0 } = $$props;
      let { nullable = false } = $$props;
      let { rgb = nullable ? void 0 : { r: 255, g: 0, b: 0, a: 1 } } = $$props;
      let { hsv = nullable ? void 0 : { h: 0, s: 100, v: 100, a: 1 } } = $$props;
      let { hex = nullable ? void 0 : "#ff0000" } = $$props;
      let { color = void 0 } = $$props;
      let { isDark = false } = $$props;
      let { isAlpha = true } = $$props;
      let { isDialog = true } = $$props;
      let { isOpen = !isDialog } = $$props;
      let { position = "fixed" } = $$props;
      let { isTextInput = true } = $$props;
      let { textInputModes = ["hex", "rgb", "hsv"] } = $$props;
      let { sliderDirection = "vertical" } = $$props;
      let { disableCloseClickOutside = false } = $$props;
      let { a11yColors = [{ bgHex: "#ffffff" }] } = $$props;
      let { a11yLevel = "AA" } = $$props;
      let { texts = void 0 } = $$props;
      let { a11yTexts = void 0 } = $$props;
      let _rgb = { r: 255, g: 0, b: 0, a: 1 };
      let _hsv = { h: 0, s: 100, v: 100, a: 1 };
      let _hex = "#ff0000";
      let isUndefined = false;
      let _isUndefined = isUndefined;
      let spanElement;
      let labelElement;
      let wrapper;
      let innerWidth;
      let innerHeight;
      const default_components = {
        pickerIndicator: PickerIndicator,
        textInput: TextInput,
        input: Input,
        nullabilityCheckbox: NullabilityCheckbox,
        wrapper: Wrapper
      };
      function getComponents() {
        return { ...default_components, ...components };
      }
      function getTexts() {
        return {
          label: { ...defaultTexts.label, ...texts?.label },
          color: { ...defaultTexts.color, ...texts?.color },
          changeTo: texts?.changeTo ?? defaultTexts.changeTo
        };
      }
      function updateColor() {
        if (isUndefined && !_isUndefined) {
          _isUndefined = true;
          hsv = rgb = hex = void 0;
          dispatch("input", { color, hsv, rgb, hex });
          return;
        } else if (_isUndefined && !isUndefined) {
          _isUndefined = false;
          hsv = _hsv;
          rgb = _rgb;
          hex = _hex;
          dispatch("input", { color, hsv, rgb, hex });
          return;
        }
        if (!hsv && !rgb && !hex) {
          isUndefined = true;
          _isUndefined = true;
          dispatch("input", { color: void 0, hsv, rgb, hex });
          return;
        }
        if (hsv && rgb && hsv.h === _hsv.h && hsv.s === _hsv.s && hsv.v === _hsv.v && hsv.a === _hsv.a && rgb.r === _rgb.r && rgb.g === _rgb.g && rgb.b === _rgb.b && rgb.a === _rgb.a && hex === _hex) {
          return;
        }
        isUndefined = false;
        if (hsv && hsv.a === void 0) hsv.a = 1;
        if (_hsv.a === void 0) _hsv.a = 1;
        if (rgb && rgb.a === void 0) rgb.a = 1;
        if (_rgb.a === void 0) _rgb.a = 1;
        if (hex?.substring(7) === "ff") hex = hex.substring(0, 7);
        if (hex?.substring(7) === "ff") hex = hex.substring(0, 7);
        if (hsv && (hsv.h !== _hsv.h || hsv.s !== _hsv.s || hsv.v !== _hsv.v || hsv.a !== _hsv.a || !rgb && !hex)) {
          color = w(hsv);
          rgb = color.toRgb();
          hex = color.toHex();
        } else if (rgb && (rgb.r !== _rgb.r || rgb.g !== _rgb.g || rgb.b !== _rgb.b || rgb.a !== _rgb.a || !hsv && !hex)) {
          color = w(rgb);
          hex = color.toHex();
          hsv = color.toHsv();
        } else if (hex && (hex !== _hex || !hsv && !rgb)) {
          color = w(hex);
          rgb = color.toRgb();
          hsv = color.toHsv();
        }
        if (color) {
          isDark = color.isDark();
        }
        if (!hex) return;
        _hsv = Object.assign({}, hsv);
        _rgb = Object.assign({}, rgb);
        _hex = hex;
        _isUndefined = isUndefined;
        dispatch("input", { color, hsv, rgb, hex });
      }
      async function wrapperBoundaryCheck() {
        await tick();
        if (position !== "fixed" && isOpen && isDialog && labelElement && wrapper) {
          const rect = wrapper.getBoundingClientRect();
          const labelRect = labelElement.getBoundingClientRect();
          if (position === "responsive" || position === "responsive-y") {
            if (labelRect.top + rect.height + wrapperPadding > innerHeight) {
              wrapper.style.top = `-${rect.height + wrapperPadding}px`;
            } else {
              wrapper.style.top = `${labelRect.height + wrapperPadding}px`;
            }
          }
          if (position === "responsive" || position === "responsive-x") {
            if (labelRect.left + rect.width + wrapperPadding > innerWidth) {
              wrapper.style.left = `-${rect.width - labelRect.width + wrapperPadding}px`;
            } else {
              wrapper.style.left = `${wrapperPadding}px`;
            }
          }
        }
      }
      if ($$props.components === void 0 && $$bindings.components && components !== void 0) $$bindings.components(components);
      if ($$props.label === void 0 && $$bindings.label && label !== void 0) $$bindings.label(label);
      if ($$props.name === void 0 && $$bindings.name && name2 !== void 0) $$bindings.name(name2);
      if ($$props.nullable === void 0 && $$bindings.nullable && nullable !== void 0) $$bindings.nullable(nullable);
      if ($$props.rgb === void 0 && $$bindings.rgb && rgb !== void 0) $$bindings.rgb(rgb);
      if ($$props.hsv === void 0 && $$bindings.hsv && hsv !== void 0) $$bindings.hsv(hsv);
      if ($$props.hex === void 0 && $$bindings.hex && hex !== void 0) $$bindings.hex(hex);
      if ($$props.color === void 0 && $$bindings.color && color !== void 0) $$bindings.color(color);
      if ($$props.isDark === void 0 && $$bindings.isDark && isDark !== void 0) $$bindings.isDark(isDark);
      if ($$props.isAlpha === void 0 && $$bindings.isAlpha && isAlpha !== void 0) $$bindings.isAlpha(isAlpha);
      if ($$props.isDialog === void 0 && $$bindings.isDialog && isDialog !== void 0) $$bindings.isDialog(isDialog);
      if ($$props.isOpen === void 0 && $$bindings.isOpen && isOpen !== void 0) $$bindings.isOpen(isOpen);
      if ($$props.position === void 0 && $$bindings.position && position !== void 0) $$bindings.position(position);
      if ($$props.isTextInput === void 0 && $$bindings.isTextInput && isTextInput !== void 0) $$bindings.isTextInput(isTextInput);
      if ($$props.textInputModes === void 0 && $$bindings.textInputModes && textInputModes !== void 0) $$bindings.textInputModes(textInputModes);
      if ($$props.sliderDirection === void 0 && $$bindings.sliderDirection && sliderDirection !== void 0) $$bindings.sliderDirection(sliderDirection);
      if ($$props.disableCloseClickOutside === void 0 && $$bindings.disableCloseClickOutside && disableCloseClickOutside !== void 0) $$bindings.disableCloseClickOutside(disableCloseClickOutside);
      if ($$props.a11yColors === void 0 && $$bindings.a11yColors && a11yColors !== void 0) $$bindings.a11yColors(a11yColors);
      if ($$props.a11yLevel === void 0 && $$bindings.a11yLevel && a11yLevel !== void 0) $$bindings.a11yLevel(a11yLevel);
      if ($$props.texts === void 0 && $$bindings.texts && texts !== void 0) $$bindings.texts(texts);
      if ($$props.a11yTexts === void 0 && $$bindings.a11yTexts && a11yTexts !== void 0) $$bindings.a11yTexts(a11yTexts);
      $$result.css.add(css$2);
      let $$settled;
      let $$rendered;
      let previous_head = $$result.head;
      do {
        $$settled = true;
        $$result.head = previous_head;
        {
          if (hsv || rgb || hex) {
            updateColor();
          }
        }
        {
          updateColor();
        }
        {
          wrapperBoundaryCheck();
        }
        $$rendered = ` <span class="${"color-picker " + escape(sliderDirection, true) + " svelte-tsvobk"}"${add_attribute("this", spanElement, 0)}>${isDialog ? `${validate_component(getComponents().input || missing_component, "svelte:component").$$render(
          $$result,
          {
            isOpen: true,
            hex,
            label,
            name: name2,
            labelElement
          },
          {
            labelElement: ($$value) => {
              labelElement = $$value;
              $$settled = false;
            }
          },
          {}
        )}` : `${name2 ? `<input type="hidden"${add_attribute("value", hex, 0)}${add_attribute("name", name2, 0)}>` : ``}`} ${validate_component(getComponents().wrapper || missing_component, "svelte:component").$$render(
          $$result,
          { isOpen, isDialog, wrapper },
          {
            wrapper: ($$value) => {
              wrapper = $$value;
              $$settled = false;
            }
          },
          {
            default: () => {
              return `${nullable ? `${validate_component(getComponents().nullabilityCheckbox || missing_component, "svelte:component").$$render(
                $$result,
                { texts: getTexts(), isUndefined },
                {
                  isUndefined: ($$value) => {
                    isUndefined = $$value;
                    $$settled = false;
                  }
                },
                {}
              )}` : ``} ${validate_component(Picker, "Picker").$$render(
                $$result,
                {
                  components: getComponents(),
                  h: hsv?.h ?? _hsv.h,
                  s: hsv?.s ?? _hsv.s,
                  v: hsv?.v ?? _hsv.v,
                  isDark,
                  texts: getTexts()
                },
                {},
                {}
              )} <div class="h svelte-tsvobk">${validate_component(Slider, "Slider").$$render(
                $$result,
                {
                  min: 0,
                  max: 360,
                  step: 1,
                  value: hsv?.h ?? _hsv.h,
                  direction: sliderDirection,
                  reverse: sliderDirection === "vertical",
                  ariaLabel: getTexts().label.h
                },
                {},
                {}
              )}</div> ${isAlpha ? `<div class="a svelte-tsvobk"${add_styles({
                "--alphaless-color": (hex ? hex : _hex).substring(0, 7)
              })}>${validate_component(Slider, "Slider").$$render(
                $$result,
                {
                  min: 0,
                  max: 1,
                  step: 0.01,
                  value: hsv?.a ?? _hsv.a,
                  direction: sliderDirection,
                  reverse: sliderDirection === "vertical",
                  ariaLabel: getTexts().label.a
                },
                {},
                {}
              )}</div>` : ``} ${isTextInput ? `${validate_component(getComponents().textInput || missing_component, "svelte:component").$$render(
                $$result,
                {
                  hex: hex ?? _hex,
                  rgb: rgb ?? _rgb,
                  hsv: hsv ?? _hsv,
                  isAlpha,
                  textInputModes,
                  texts: getTexts()
                },
                {},
                {}
              )}` : ``} ${getComponents().a11yNotice ? `${validate_component(getComponents().a11yNotice || missing_component, "svelte:component").$$render(
                $$result,
                {
                  components: getComponents(),
                  a11yColors,
                  hex: hex || "#00000000",
                  a11yTexts,
                  a11yLevel
                },
                {},
                {}
              )}` : ``}`;
            }
          }
        )}</span> `;
      } while (!$$settled);
      return $$rendered;
    });
    name = "Custom Theme";
    description = "Made with themer.jenku.xyz";
    authors = [
      {
        name: "None inputted",
        id: "None inputted"
      }
    ];
    semanticColors = {
      SECONDARY_FOCUSED_BACKGROUND: [
        "#000000"
      ],
      PRIMARY_FOCUSED_BACKGROUND: [
        "#000000"
      ],
      SELECTION_PICKER_BG: [
        "#000000"
      ],
      EXPRESSION_PICKER_BG: [
        "#1c1d22"
      ],
      TEXT_NORMAL: [
        "#e4e5e9"
      ],
      TEXT_PRIMARY: [
        "#c7c8cd"
      ],
      TEXT_MUTED: [
        "#7c7e8a"
      ],
      INTERACTIVE_ACTIVE: [
        "#f3f3f3"
      ],
      INTERACTIVE_NORMAL: [
        "#787b82"
      ],
      BACKGROUND_PRIMARY: [
        "#1c1d22"
      ],
      BACKGROUND_SECONDARY: [
        "#272731"
      ],
      BACKGROUND_SECONDARY_ALT: [
        "#141318"
      ],
      BACKGROUND_TERTIARY: [
        "#141318"
      ],
      BG_BASE_PRIMARY: [
        "#1c1d22"
      ],
      BACKGROUND_MODIFIER_ACTIVE: [
        "#b99c59"
      ],
      BACKGROUND_MODIFIER_ACCENT: [
        "#26262e"
      ],
      BACKGROUND_FLOATING: [
        "#2d2d35"
      ],
      TEXT_SECONDARY: [
        "#7c7e8a"
      ],
      CARD_PRIMARY_BG: [
        "#27272f"
      ],
      CARD_SECONDARY_BG: [
        "#27272f"
      ],
      CHANNEL_ICON: [
        "#818592"
      ],
      "BG-BRAND": [
        "#5865f2"
      ],
      REDESIGN_BUTTON_SECONDARY_BACKGROUND: [
        "#373a43"
      ],
      REDESIGN_BUTTON_SECONDARY_BORDER: [
        "#3d3d47"
      ],
      PANEL_BG: [
        "#1c1d22"
      ],
      REDESIGN_CHANNEL_CATEGORY_NAME_TEXT: [
        "#9597a3"
      ],
      REDESIGN_CHANNEL_NAME_TEXT: [
        "#e4e5e7"
      ],
      REDESIGN_CHAT_INPUT_BACKGROUND: [
        "#26262e"
      ],
      EMBED_BACKGROUND: [
        "#27272f"
      ]
    };
    rawColors = {
      PLUM_20: "#1c1d22"
    };
    spec = 2;
    defaultTheme = {
      name,
      description,
      authors,
      semanticColors,
      rawColors,
      spec
    };
    css$1 = {
      code: ".color-picker-container.svelte-43fcae.svelte-43fcae{display:flex;flex-direction:column;background-color:color-mix(in srgb, var(--BACKGROUND_PRIMARY), var(--BACKGROUND_SECONDARY) 50%);overflow-y:scroll;font-family:gg sans;font-size:small;z-index:1000;color:var(--TEXT_PRIMARY);position:relative}.color-picker.svelte-43fcae.svelte-43fcae{margin-bottom:1em;margin-right:auto;position:relative}.color-picker.svelte-43fcae label.svelte-43fcae{margin-right:0.5em}@media(max-width: 900px){.color-picker-container.svelte-43fcae.svelte-43fcae{display:none}}",
      map: `{"version":3,"file":"colorPicker.svelte","sources":["colorPicker.svelte"],"sourcesContent":["<script>\\r\\n  import { onMount } from 'svelte';\\r\\n  import { makeItGlow, stopGlow } from './makeItGlow.js';\\r\\n  import \\"./app.css\\";\\r\\n  import ColorPicker from 'svelte-awesome-color-picker';\\r\\n  import defaultTheme from './assets/defaultTheme.json';\\r\\n\\r\\n\\r\\n  const localStorageKey = \\"savedColors\\"; \\r\\n  \\r\\n  let defaultColors = {}; \\r\\n  let colors = {}; \\r\\n  let transparency = {\\r\\n    '--fa-idk': 0.8\\r\\n  };\\r\\n\\r\\n  function getCssVariables() {\\r\\n    const style = getComputedStyle(document.documentElement);\\r\\n    const variables = {};\\r\\n    \\r\\n    for (let i = 0; i < style.length; i++) {\\r\\n      const key = style[i];\\r\\n      if (key.startsWith('--') && !key.startsWith('--fa-')) {\\r\\n        let value = style.getPropertyValue(key).trim();\\r\\n        variables[key] = value;\\r\\n      }\\r\\n    }\\r\\n    \\r\\n    return variables;\\r\\n  }\\r\\n\\r\\n  function applyColor(variable, color) {\\r\\n    const alpha = transparency[variable] !== undefined ? transparency[variable] : 1;\\r\\n    document.documentElement.style.setProperty(variable, \`rgba(\${parseInt(color.slice(1, 3), 16)}, \${parseInt(color.slice(3, 5), 16)}, \${parseInt(color.slice(5, 7), 16)}, \${alpha})\`);\\r\\n  }\\r\\n\\r\\n  function saveColorsToLocalStorage() {\\r\\n    localStorage.setItem(localStorageKey, JSON.stringify(colors));\\r\\n  }\\r\\n\\r\\n  function getSavedColors() {\\r\\n    const savedColors = localStorage.getItem(localStorageKey);\\r\\n    return savedColors ? JSON.parse(savedColors) : null;\\r\\n  }\\r\\n\\r\\n  function updColour(variable, color) {\\r\\n    colors[variable] = color;  \\r\\n    applyColor(variable, color); \\r\\n    saveColorsToLocalStorage();\\r\\n  }\\r\\n\\r\\n\\r\\n  export function restoreDefaults() {\\r\\n        const json = defaultTheme;\\r\\n        if (json.semanticColors) {\\r\\n            for (const [key, value] of Object.entries(json.semanticColors)) {\\r\\n                applyColor(\`--\${key}\`, value.toString());\\r\\n                colors[\`--\${key}\`] = value.toString();\\r\\n            }\\r\\n            saveColorsToLocalStorage();\\r\\n          }\\r\\n  }\\r\\n\\r\\n  function handleMouseOver(variable, color) {\\r\\n    makeItGlow(variable, color);\\r\\n  }\\r\\n\\r\\n  function handleMouseOut(variable, color) {\\r\\n    stopGlow(variable, color);\\r\\n  }\\r\\n  export async function importTheme() {\\r\\n  const input = document.createElement('input');\\r\\n  input.type = 'file';\\r\\n  input.accept = '.json';\\r\\n  input.onchange = async (event) => {\\r\\n      const file = event.target.files[0];\\r\\n      if (file) {\\r\\n          const reader = new FileReader();\\r\\n          reader.onload = (e) => {\\r\\n              const json = JSON.parse(e.target.result);\\r\\n              if (json.semanticColors) {\\r\\n                  for (const [key, value] of Object.entries(json.semanticColors)) {\\r\\n                    applyColor(\`--\${key}\`, value.toString());\\r\\n                    colors[\`--\${key}\`] = value.toString();\\r\\n                  }\\r\\n                  saveColorsToLocalStorage();\\r\\n              }\\r\\n          };\\r\\n          reader.readAsText(file);\\r\\n      }\\r\\n  };\\r\\n  input.click();\\r\\n}\\r\\n\\r\\nonMount(async () => {\\r\\n  defaultColors = getCssVariables();\\r\\n  colors = { ...defaultColors };\\r\\n\\r\\n  const savedColors = getSavedColors();\\r\\n  if (savedColors) {\\r\\n    colors = { ...colors, ...savedColors };\\r\\n  }\\r\\n\\r\\n  Object.keys(colors).forEach(variable => applyColor(variable, colors[variable]));\\r\\n\\r\\n  await tick();\\r\\n  console.log('Colors applied:', colors); \\r\\n});\\r\\n\\r\\n\\r\\n<\/script>\\r\\n\\r\\n<style>\\r\\n  .color-picker-container {\\r\\n    display: flex;\\r\\n    flex-direction: column;\\r\\n    background-color: color-mix(in srgb, var(--BACKGROUND_PRIMARY), var(--BACKGROUND_SECONDARY) 50%);\\r\\n    overflow-y: scroll;\\r\\n    font-family: gg sans;\\r\\n    font-size: small;\\r\\n    z-index: 1000;\\r\\n    color: var(--TEXT_PRIMARY);\\r\\n    position: relative;\\r\\n  }\\r\\n\\r\\n  .color-picker {\\r\\n    margin-bottom: 1em;\\r\\n    margin-right: auto;\\r\\n    position: relative;\\r\\n  }\\r\\n\\r\\n  .color-picker label {\\r\\n    margin-right: 0.5em;\\r\\n  }\\r\\n  @media (max-width: 900px) {\\r\\n    \\r\\n    .color-picker-container {\\r\\n      display: none;\\r\\n    }\\r\\n    \\r\\n\\r\\n    }\\r\\n</style>\\r\\n\\r\\n\\r\\n<div class=\\"color-picker-container\\">\\r\\n  {#each Object.entries(colors) as [variable, color]}\\r\\n  <div class=\\"color-picker\\">\\r\\n    <ColorPicker id={variable} bind:hex={colors[variable]} label=\\"\\" \\r\\n    --picker-z-index=\\"10\\" --picker-overflow=\\"show\\" position=\\"responsive\\" \\r\\n    on:input={() => updColour(variable, colors[variable]) }\\r\\n    on:mouseenter={() => handleMouseOver(variable, colors[variable])}\\r\\n    on:mouseleave={() => handleMouseOut(variable, colors[variable])}/>\\r\\n    <label for={variable}>{variable}:</label>\\r\\n  </div>\\r\\n  {/each}\\r\\n</div>\\r\\n"],"names":[],"mappings":"AAiHE,mDAAwB,CACtB,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,gBAAgB,CAAE,UAAU,EAAE,CAAC,IAAI,CAAC,CAAC,IAAI,oBAAoB,CAAC,CAAC,CAAC,IAAI,sBAAsB,CAAC,CAAC,GAAG,CAAC,CAChG,UAAU,CAAE,MAAM,CAClB,WAAW,CAAE,EAAE,CAAC,IAAI,CACpB,SAAS,CAAE,KAAK,CAChB,OAAO,CAAE,IAAI,CACb,KAAK,CAAE,IAAI,cAAc,CAAC,CAC1B,QAAQ,CAAE,QACZ,CAEA,yCAAc,CACZ,aAAa,CAAE,GAAG,CAClB,YAAY,CAAE,IAAI,CAClB,QAAQ,CAAE,QACZ,CAEA,2BAAa,CAAC,mBAAM,CAClB,YAAY,CAAE,KAChB,CACA,MAAO,YAAY,KAAK,CAAE,CAExB,mDAAwB,CACtB,OAAO,CAAE,IACX,CAGA"}`
    };
    localStorageKey = "savedColors";
    ColorPicker_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let colors = {};
      let transparency = { "--fa-idk": 0.8 };
      function applyColor(variable, color) {
        const alpha = transparency[variable] !== void 0 ? transparency[variable] : 1;
        document.documentElement.style.setProperty(variable, `rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(color.slice(5, 7), 16)}, ${alpha})`);
      }
      function saveColorsToLocalStorage() {
        localStorage.setItem(localStorageKey, JSON.stringify(colors));
      }
      function restoreDefaults() {
        const json2 = defaultTheme;
        if (json2.semanticColors) {
          for (const [key2, value] of Object.entries(json2.semanticColors)) {
            applyColor(`--${key2}`, value.toString());
            colors[`--${key2}`] = value.toString();
          }
          saveColorsToLocalStorage();
        }
      }
      async function importTheme() {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = ".json";
        input.onchange = async (event) => {
          const file = event.target.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = (e23) => {
              const json2 = JSON.parse(e23.target.result);
              if (json2.semanticColors) {
                for (const [key2, value] of Object.entries(json2.semanticColors)) {
                  applyColor(`--${key2}`, value.toString());
                  colors[`--${key2}`] = value.toString();
                }
                saveColorsToLocalStorage();
              }
            };
            reader.readAsText(file);
          }
        };
        input.click();
      }
      if ($$props.restoreDefaults === void 0 && $$bindings.restoreDefaults && restoreDefaults !== void 0) $$bindings.restoreDefaults(restoreDefaults);
      if ($$props.importTheme === void 0 && $$bindings.importTheme && importTheme !== void 0) $$bindings.importTheme(importTheme);
      $$result.css.add(css$1);
      let $$settled;
      let $$rendered;
      let previous_head = $$result.head;
      do {
        $$settled = true;
        $$result.head = previous_head;
        $$rendered = `<div class="color-picker-container svelte-43fcae">${each(Object.entries(colors), ([variable, color]) => {
          return `<div class="color-picker svelte-43fcae"><div style="display: contents; --picker-z-index:10; --picker-overflow:show;">${validate_component(ColorPicker, "ColorPicker").$$render(
            $$result,
            {
              id: variable,
              label: "",
              position: "responsive",
              hex: colors[variable]
            },
            {
              hex: ($$value) => {
                colors[variable] = $$value;
                $$settled = false;
              }
            },
            {}
          )}</div> <label${add_attribute("for", variable, 0)} class="svelte-43fcae">${escape(variable)}:</label> </div>`;
        })}</div>`;
      } while (!$$settled);
      return $$rendered;
    });
    css = {
      code: ".color-picker-container.svelte-13v3azd{filter:drop-shadow(0 0 1rem color-mix(in srgb, rgba(0, 0, 0, 0.5), color-mix(in srgb, var(--BACKGROUND_PRIMARY), var(--BACKGROUND_SECONDARY) 50%)));border-radius:15px;width:100%;border:4px solid rgb(19, 20, 20);margin-top:5%;display:none;grid-template-rows:50% 50%;grid-auto-flow:column;grid-auto-columns:40%;background-color:color-mix(in srgb, var(--BACKGROUND_PRIMARY), var(--BACKGROUND_SECONDARY) 50%);overflow-y:visible;overflow-x:scroll;font-family:gg sans;font-size:12px;z-index:1000;color:var(--TEXT_PRIMARY);position:relative}.color-picker.svelte-13v3azd{margin-left:-50%;display:flex;padding-top:10%;padding-bottom:15%;flex-direction:column;align-items:center;margin-bottom:1em}@media(max-width: 900px){.color-picker-container.svelte-13v3azd{display:grid}}",
      map: `{"version":3,"file":"colorGrid.svelte","sources":["colorGrid.svelte"],"sourcesContent":["<script>\\r\\n    import { onMount, createEventDispatcher } from 'svelte';\\r\\n    import { makeItGlow, stopGlow } from './makeItGlow.js';\\r\\n    import \\"./app.css\\";\\r\\n    \\r\\n    const localStorageKey = \\"savedColors\\"; \\r\\n    \\r\\n    let defaultColors = {}; \\r\\n    let colors = {}; \\r\\n    let transparency = {\\r\\n      '--fa-idk': 0.8\\r\\n    };\\r\\n    const dispatch = createEventDispatcher();\\r\\n  \\r\\n    function getCssVariables() {\\r\\n      const style = getComputedStyle(document.documentElement);\\r\\n      const variables = {};\\r\\n      \\r\\n      for (let i = 0; i < style.length; i++) {\\r\\n        const key = style[i];\\r\\n        if (key.startsWith('--') && !key.startsWith('--fa-')) {\\r\\n          let value = style.getPropertyValue(key).trim();\\r\\n          variables[key] = value;\\r\\n        }\\r\\n      }\\r\\n      \\r\\n      return variables;\\r\\n    }\\r\\n  \\r\\n    function applyColor(variable, color) {\\r\\n      const alpha = transparency[variable] !== undefined ? transparency[variable] : 1;\\r\\n      document.documentElement.style.setProperty(variable, \`rgba(\${parseInt(color.slice(1, 3), 16)}, \${parseInt(color.slice(3, 5), 16)}, \${parseInt(color.slice(5, 7), 16)}, \${alpha})\`);\\r\\n    }\\r\\n  \\r\\n    function saveColorsToLocalStorage() {\\r\\n      localStorage.setItem(localStorageKey, JSON.stringify(colors));\\r\\n    }\\r\\n  \\r\\n    function getSavedColors() {\\r\\n      const savedColors = localStorage.getItem(localStorageKey);\\r\\n      return savedColors ? JSON.parse(savedColors) : null;\\r\\n    }\\r\\n  \\r\\n    function updColour(variable, color) {\\r\\n      colors[variable] = color;  \\r\\n      applyColor(variable, color); \\r\\n      saveColorsToLocalStorage();\\r\\n    }\\r\\n  \\r\\n    function restoreDefaults() {\\r\\n      colors = { ...defaultColors };\\r\\n      Object.keys(colors).forEach(variable => applyColor(variable, colors[variable]));\\r\\n      saveColorsToLocalStorage();\\r\\n      dispatch('restore');\\r\\n    }\\r\\n  \\r\\n    function handleMouseOver(variable, color) {\\r\\n      makeItGlow(variable, color);\\r\\n    }\\r\\n  \\r\\n    function handleMouseOut(variable, color) {\\r\\n      stopGlow(variable, color);\\r\\n    }\\r\\n  \\r\\n    onMount(() => {\\r\\n      defaultColors = getCssVariables();\\r\\n      colors = { ...defaultColors };\\r\\n  \\r\\n      const savedColors = getSavedColors();\\r\\n      if (savedColors) {\\r\\n        colors = { ...colors, ...savedColors };\\r\\n      }\\r\\n  \\r\\n      Object.keys(colors).forEach(variable => applyColor(variable, colors[variable]));\\r\\n    });\\r\\n  <\/script>\\r\\n  \\r\\n  \\r\\n  <style>\\r\\n    .color-picker-container {\\r\\n      filter: drop-shadow(0 0 1rem color-mix(in srgb, rgba(0, 0, 0, 0.5), color-mix(in srgb, var(--BACKGROUND_PRIMARY), var(--BACKGROUND_SECONDARY) 50%)));\\r\\n      border-radius: 15px;\\r\\n      width: 100%;\\r\\n      border: 4px solid rgb(19, 20, 20);\\r\\n      margin-top: 5%;\\r\\n      display: none;\\r\\n      grid-template-rows: 50% 50%;\\r\\n      grid-auto-flow: column;\\r\\n      grid-auto-columns: 40%;\\r\\n      background-color: color-mix(in srgb, var(--BACKGROUND_PRIMARY), var(--BACKGROUND_SECONDARY) 50%);\\r\\n      overflow-y:visible;\\r\\n      overflow-x: scroll;\\r\\n      font-family: gg sans;\\r\\n      font-size: 12px;\\r\\n      z-index: 1000;\\r\\n      color: var(--TEXT_PRIMARY);\\r\\n      position: relative;\\r\\n    }\\r\\n  \\r\\n    .color-picker {\\r\\n      margin-left: -50%;\\r\\n      display: flex;\\r\\n      padding-top: 10%;\\r\\n      padding-bottom: 15%;\\r\\n      flex-direction: column;\\r\\n      align-items: center;\\r\\n      margin-bottom: 1em;\\r\\n    }\\r\\n  \\r\\n    @media (max-width: 900px) {\\r\\n      .color-picker-container {\\r\\n        display: grid;\\r\\n      }\\r\\n    }\\r\\n  </style>\\r\\n  \\r\\n  <div class=\\"color-picker-container\\" id=\\"portal\\">\\r\\n    {#each Object.entries(colors) as [variable, color]}\\r\\n    <div class=\\"color-picker\\">\\r\\n      <input\\r\\n        id={variable}\\r\\n        type=\\"color\\"\\r\\n        bind:value={colors[variable]}\\r\\n        on:input={() => updColour(variable, colors[variable])}\\r\\n        on:mouseenter={() => handleMouseOver(variable, colors[variable])}\\r\\n        on:mouseleave={() => handleMouseOut(variable, colors[variable])}\\r\\n        style=\\"width: 80px; height: 40px; border-radius: 10px; border: none;\\" />\\r\\n      <label for={variable}>{variable}:</label>\\r\\n    </div>\\r\\n    {/each}\\r\\n  </div>\\r\\n  "],"names":[],"mappings":"AA+EI,sCAAwB,CACtB,MAAM,CAAE,YAAY,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,UAAU,EAAE,CAAC,IAAI,CAAC,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,UAAU,EAAE,CAAC,IAAI,CAAC,CAAC,IAAI,oBAAoB,CAAC,CAAC,CAAC,IAAI,sBAAsB,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,CACpJ,aAAa,CAAE,IAAI,CACnB,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CACjC,UAAU,CAAE,EAAE,CACd,OAAO,CAAE,IAAI,CACb,kBAAkB,CAAE,GAAG,CAAC,GAAG,CAC3B,cAAc,CAAE,MAAM,CACtB,iBAAiB,CAAE,GAAG,CACtB,gBAAgB,CAAE,UAAU,EAAE,CAAC,IAAI,CAAC,CAAC,IAAI,oBAAoB,CAAC,CAAC,CAAC,IAAI,sBAAsB,CAAC,CAAC,GAAG,CAAC,CAChG,WAAW,OAAO,CAClB,UAAU,CAAE,MAAM,CAClB,WAAW,CAAE,EAAE,CAAC,IAAI,CACpB,SAAS,CAAE,IAAI,CACf,OAAO,CAAE,IAAI,CACb,KAAK,CAAE,IAAI,cAAc,CAAC,CAC1B,QAAQ,CAAE,QACZ,CAEA,4BAAc,CACZ,WAAW,CAAE,IAAI,CACjB,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,GAAG,CAChB,cAAc,CAAE,GAAG,CACnB,cAAc,CAAE,MAAM,CACtB,WAAW,CAAE,MAAM,CACnB,aAAa,CAAE,GACjB,CAEA,MAAO,YAAY,KAAK,CAAE,CACxB,sCAAwB,CACtB,OAAO,CAAE,IACX,CACF"}`
    };
    ColorGrid = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let colors = {};
      createEventDispatcher();
      $$result.css.add(css);
      return `<div class="color-picker-container svelte-13v3azd" id="portal">${each(Object.entries(colors), ([variable, color]) => {
        return `<div class="color-picker svelte-13v3azd"><input${add_attribute("id", variable, 0)} type="color" style="width: 80px; height: 40px; border-radius: 10px; border: none;"${add_attribute("value", colors[variable], 0)}> <label${add_attribute("for", variable, 0)}>${escape(variable)}:</label> </div>`;
      })}</div>`;
    });
    Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let circles = [1, 2, 3, 4, 5, 6, 7];
      let colorPickerRef;
      if ($$props.exportVars === void 0 && $$bindings.exportVars && exportVars !== void 0) $$bindings.exportVars(exportVars);
      let $$settled;
      let $$rendered;
      let previous_head = $$result.head;
      do {
        $$settled = true;
        $$result.head = previous_head;
        $$rendered = `<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no"> <div class="grid"><div class="${["child serverlist", "active"].join(" ").trim()}"><div class="serverListFooter"><div class="icons"><div class="home"><span class="fa-layers fa-fw fa-2x"><div style="background-color: var(--INTERACTIVE_ACTIVE); mask: url(./icons/ServerIcon.svg) no-repeat center; position:absolute; transform: translate(-27.5%, -37%) scale(0.5); width: 100px; height: 100px;" data-svelte-h="svelte-9xtynt"></div> ${validate_component(FontAwesomeIcon, "FontAwesomeIcon").$$render(
          $$result,
          {
            icon: faCircle,
            class: "icon",
            style: " height:40%; margin-left: 65%; margin-bottom:0%; color: var(--BG-BRAND); border: solid var(--BACKGROUND_FLOATING); border-radius:100% 100%; "
          },
          {},
          {}
        )}</span> <div class="name" data-svelte-h="svelte-54x4g7">Home</div></div> <div class="notifications" data-svelte-h="svelte-14ecgn4"><span class="fa-layers fa-fw fa-2x"><div style="background-color: var(--INTERACTIVE_NORMAL); mask: url(./icons/BellIcon.svg) no-repeat center; position:absolute; transform: translate(-27.5%, -37%) scale(0.5); width: 100px; height: 100px;"></div></span> <div class="name">Notifications</div></div> <div class="you"><span class="fa-layers fa-fw fa-2x">${validate_component(FontAwesomeIcon, "FontAwesomeIcon").$$render(
          $$result,
          {
            icon: faUser,
            transform: "shrink-2",
            style: "color: var(--INTERACTIVE_NORMAL); transform: translate(0%, -12%);"
          },
          {},
          {}
        )}</span> <div class="name" data-svelte-h="svelte-ivxxsb">You</div></div></div></div> <div class="otherServers"><span class="fa-layers fa-fw fa-2x DMS">${validate_component(FontAwesomeIcon, "FontAwesomeIcon").$$render(
          $$result,
          {
            icon: faCircle,
            class: "icon",
            transform: "grow-8",
            style: "color: var(--CARD_SECONDARY_BG);"
          },
          {},
          {}
        )} <div style="background-color: var(--TEXT_MUTED); mask: url(./icons/ChatIcon.svg) no-repeat center; position:absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) scale(0.4); width: 100px; height: 100px;" data-svelte-h="svelte-rqwk11"></div></span> ${each(circles, (_) => {
          return `${validate_component(FontAwesomeIcon, "FontAwesomeIcon").$$render(
            $$result,
            {
              icon: faCircle,
              class: "icon",
              transform: "grow-30",
              style: "color: var(--BACKGROUND_SECONDARY);"
            },
            {},
            {}
          )}`;
        })} ${validate_component(FontAwesomeIcon, "FontAwesomeIcon").$$render(
          $$result,
          {
            icon: faSquare,
            class: "icon",
            transform: "grow-30",
            style: "color: var(--BACKGROUND_SECONDARY);"
          },
          {},
          {}
        )} <span class="folder"><span class="fa-layers">${validate_component(FontAwesomeIcon, "FontAwesomeIcon").$$render(
          $$result,
          {
            icon: faCircle,
            class: "icon",
            transform: "grow-30",
            style: "color: var(--BACKGROUND_SECONDARY);"
          },
          {},
          {}
        )} ${validate_component(FontAwesomeIcon, "FontAwesomeIcon").$$render(
          $$result,
          {
            icon: faFolder,
            transform: "grow-10",
            style: "color: var(--INTERACTIVE_ACTIVE);"
          },
          {},
          {}
        )}</span> ${validate_component(FontAwesomeIcon, "FontAwesomeIcon").$$render(
          $$result,
          {
            icon: faCircle,
            class: "icon",
            transform: "grow-30",
            style: "color: var(--BACKGROUND_SECONDARY);"
          },
          {},
          {}
        )} ${validate_component(FontAwesomeIcon, "FontAwesomeIcon").$$render(
          $$result,
          {
            icon: faCircle,
            class: "icon",
            transform: "grow-30",
            style: "color: var(--BACKGROUND_SECONDARY);"
          },
          {},
          {}
        )}</span></div> <div class="activeServer"><div class="serverName">This Server ${validate_component(FontAwesomeIcon, "FontAwesomeIcon").$$render(
          $$result,
          {
            icon: faChevronRight,
            style: "color: var(--TEXT_MUTED)",
            transform: "shrink-8"
          },
          {},
          {}
        )} <div class="info">192,354 members
                ${validate_component(FontAwesomeIcon, "FontAwesomeIcon").$$render(
          $$result,
          {
            icon: faCircle,
            class: "icon",
            transform: "shrink-10"
          },
          {},
          {}
        )} 
              Community</div></div> <div class="searchInviteWrapper"><div class="type"><div class="search"><div class="centerSearchStuff">${validate_component(FontAwesomeIcon, "FontAwesomeIcon").$$render(
          $$result,
          {
            icon: faMagnifyingGlass,
            class: "icon",
            transform: "grow-4",
            style: "padding:10%"
          },
          {},
          {}
        )}  Search</div></div></div> <span class="fa-layers fa-fw fa-2x inviteButton">${validate_component(FontAwesomeIcon, "FontAwesomeIcon").$$render(
          $$result,
          {
            icon: faCircle,
            style: "color: var(--REDESIGN_BUTTON_SECONDARY_BACKGROUND); \n                border: 1px solid var(--REDESIGN_BUTTON_SECONDARY_BORDER); border-radius: 100% 100%"
          },
          {},
          {}
        )} <div style="background-color: var(--INTERACTIVE_NORMAL); mask: url(./icons/UserPlusIcon.svg) no-repeat center; position:absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) scale(0.3); width: 100px; /* Set the width and height as needed */ height: 100px;" data-svelte-h="svelte-1cojzhk"></div></span></div> <div class="channelList"><div class="channelsAndRoles" style="margin-left: 4%;" data-svelte-h="svelte-cq5b7s"><div style="background-color: var(--TEXT_MUTED); mask: url(./icons/ChannelListMagnifyingGlassIcon.svg) no-repeat center; position:absolute; transform: translate(-70%, -40%) scale(0.3); width: 100px; height: 100px;"></div>
                Channels &amp; Roles</div> <div class="category">${validate_component(FontAwesomeIcon, "FontAwesomeIcon").$$render(
          $$result,
          {
            icon: faChevronDown,
            style: "padding-right:2.5%",
            class: "icon"
          },
          {},
          {}
        )}Text Channels</div> <div class="channel active unread">${validate_component(FontAwesomeIcon, "FontAwesomeIcon").$$render(
          $$result,
          {
            icon: faHashtag,
            style: "padding-right:2.5%",
            class: "icon"
          },
          {},
          {}
        )}general</div> <div class="channel">${validate_component(FontAwesomeIcon, "FontAwesomeIcon").$$render(
          $$result,
          {
            icon: faHashtag,
            style: "padding-right:2.5%",
            class: "icon"
          },
          {},
          {}
        )}Idek</div> <div class="channel">${validate_component(FontAwesomeIcon, "FontAwesomeIcon").$$render(
          $$result,
          {
            icon: faHashtag,
            style: "padding-right:2.5%",
            class: "icon"
          },
          {},
          {}
        )}thetoastedpotato-art</div> <div class="channel">${validate_component(FontAwesomeIcon, "FontAwesomeIcon").$$render(
          $$result,
          {
            icon: faHashtag,
            style: "padding-right:2.5%",
            class: "icon"
          },
          {},
          {}
        )}explode</div> <div class="channel unread">${validate_component(FontAwesomeIcon, "FontAwesomeIcon").$$render(
          $$result,
          {
            icon: faHashtag,
            style: "padding-right:2.5%",
            class: "icon"
          },
          {},
          {}
        )}bots</div></div></div></div> <div class="${["child swipeFixer", ""].join(" ").trim()}"><div class="messages"><div class="channelHeader"><div class="back">${validate_component(FontAwesomeIcon, "FontAwesomeIcon").$$render($$result, { icon: faArrowLeft }, {}, {})}</div> <div class="channelName">${validate_component(FontAwesomeIcon, "FontAwesomeIcon").$$render($$result, { icon: faHashtag, id: "hash" }, {}, {})} general &gt;</div> <div class="search"><span class="fa-layers fa-fw fa-2x">${validate_component(FontAwesomeIcon, "FontAwesomeIcon").$$render($$result, { icon: faCircle, transform: "shrink-2" }, {}, {})} ${validate_component(FontAwesomeIcon, "FontAwesomeIcon").$$render(
          $$result,
          {
            icon: faMagnifyingGlass,
            transform: "shrink-8",
            style: "color: var(--INTERACTIVE_NORMAL);"
          },
          {},
          {}
        )}</span></div></div> <div class="messages" data-svelte-h="svelte-1xp6n99"><div class="messageswrapper2tofixwhateverifuckedup"><div class="message"><div class="pfp"></div> <div class="username">name</div> <div class="timestamp">Today at 15:48</div> <div class="theMessage">this is a message with no ping</div></div> <div class="message ping"><div class="pfp"></div> <div class="username">name</div> <div class="timestamp">Today at 15:48</div> <div class="theMessage">this is a message with a <span class="atping">@ping</span></div></div> <div class="message"><div class="pfp"></div> <div class="username">name</div> <div class="timestamp">Today at 15:48</div> <div class="theMessage">this is a message with a <span class="link">link</span></div></div> <div class="embed"><div class="sitename">wsg</div> <div class="title link">title</div> <div class="description">description</div></div> <div class="unread">NEW MESSAGES</div></div></div> <div class="channelFooter"><div class="attachment"><span class="fa-layers fa-fw fa-2x">${validate_component(FontAwesomeIcon, "FontAwesomeIcon").$$render(
          $$result,
          {
            icon: faCircle,
            transform: "grow-4",
            style: "color: var(--BACKGROUND_SECONDARY);"
          },
          {},
          {}
        )} ${validate_component(FontAwesomeIcon, "FontAwesomeIcon").$$render($$result, { icon: faPlus, transform: "shrink-4" }, {}, {})}</span></div> <div class="gift"><span class="fa-layers fa-fw fa-2x">${validate_component(FontAwesomeIcon, "FontAwesomeIcon").$$render(
          $$result,
          {
            icon: faCircle,
            transform: "grow-4",
            style: "color: var(--BACKGROUND_SECONDARY);"
          },
          {},
          {}
        )} ${validate_component(FontAwesomeIcon, "FontAwesomeIcon").$$render($$result, { icon: faGift, transform: "shrink-5" }, {}, {})}</span></div> <div class="type" data-svelte-h="svelte-1afp8lk"><div class="chatplaceholder">Message #general</div> <div class="emojifella"><div style="background-color: var(--TEXT_MUTED); mask: url(./icons/ReactionIcon.svg) no-repeat center; position:absolute; transform: translate(-60%, -50%) scale(0.4); width: 100px; height: 100px;"></div></div></div> <div class="voice"><span class="fa-layers fa-fw fa-2x">${validate_component(FontAwesomeIcon, "FontAwesomeIcon").$$render(
          $$result,
          {
            icon: faCircle,
            transform: "grow-4",
            class: "chatplaceholder",
            style: "color: var(--BACKGROUND_SECONDARY);"
          },
          {},
          {}
        )} <div style="background-color: var(--TEXT_NORMAL); mask: url(./icons/MicrophoneIcon.svg) no-repeat center; position:absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) scale(0.35); width: 100px; height: 100px;" data-svelte-h="svelte-1ogr4nh"></div></span></div></div></div></div> <div class="${["child memberlist", ""].join(" ").trim()}"><div class="channelName">${validate_component(FontAwesomeIcon, "FontAwesomeIcon").$$render($$result, { icon: faHashtag, id: "hash" }, {}, {})} general &gt;</div> <div class="channelDesc" data-svelte-h="svelte-6y8e8v">this rah rah</div> <div class="buttonsss"><span class="fa-layers fa-fw fa-3x">${validate_component(FontAwesomeIcon, "FontAwesomeIcon").$$render(
          $$result,
          {
            icon: faCircle,
            transform: "shrink-2",
            style: "color: var(--REDESIGN_BUTTON_SECONDARY_BACKGROUND);"
          },
          {},
          {}
        )} ${validate_component(FontAwesomeIcon, "FontAwesomeIcon").$$render(
          $$result,
          {
            icon: faMagnifyingGlass,
            transform: "shrink-10",
            style: "color: var(--TEXT_NORMAL);"
          },
          {},
          {}
        )}</span> <span class="fa-layers fa-fw fa-3x">${validate_component(FontAwesomeIcon, "FontAwesomeIcon").$$render(
          $$result,
          {
            icon: faCircle,
            transform: "shrink-2",
            style: "color: var(--REDESIGN_BUTTON_SECONDARY_BACKGROUND);"
          },
          {},
          {}
        )} <div style="background-color: var(--TEXT_NORMAL); mask: url(./icons/ThreadIcon.svg) no-repeat center; position:absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) scale(0.3); width: 100px; height: 100px;" data-svelte-h="svelte-1htohxw"></div></span> <span class="fa-layers fa-fw fa-3x">${validate_component(FontAwesomeIcon, "FontAwesomeIcon").$$render(
          $$result,
          {
            icon: faCircle,
            transform: "shrink-2",
            style: "color: var(--REDESIGN_BUTTON_SECONDARY_BACKGROUND);"
          },
          {},
          {}
        )} ${validate_component(FontAwesomeIcon, "FontAwesomeIcon").$$render(
          $$result,
          {
            icon: faBell,
            transform: "shrink-10",
            style: "color: var(--TEXT_NORMAL);"
          },
          {},
          {}
        )}</span> <span class="fa-layers fa-fw fa-3x">${validate_component(FontAwesomeIcon, "FontAwesomeIcon").$$render(
          $$result,
          {
            icon: faCircle,
            transform: "shrink-2",
            style: "color: var(--REDESIGN_BUTTON_SECONDARY_BACKGROUND);"
          },
          {},
          {}
        )} ${validate_component(FontAwesomeIcon, "FontAwesomeIcon").$$render(
          $$result,
          {
            icon: faGear,
            transform: "shrink-10",
            style: "color: var(--TEXT_NORMAL);"
          },
          {},
          {}
        )}</span></div> <div class="buttonNames" data-svelte-h="svelte-1yed1si"><div>Search</div> <div>Threads</div> <div>Mute</div> <div>Settings</div></div> <div class="tabs" data-svelte-h="svelte-hj4wpo"><div class="active">Members</div> <div>Media</div> <div>Pins</div> <div>Links</div> <div>Files</div></div> <div class="invButton"><span class="fa-layers fa-fw fa-2x theFriend">${validate_component(FontAwesomeIcon, "FontAwesomeIcon").$$render(
          $$result,
          {
            icon: faCircle,
            style: "color: #5865f2; float: left;"
          },
          {},
          {}
        )} <div style="background-color: var(--TEXT_NORMAL); mask: url(./icons/UserPlusIcon.svg) no-repeat center; position:absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) scale(0.3); width: 100px; height: 100px;" data-svelte-h="svelte-xbrjbf"></div></span>
        Invite Members
        <div class="arrow">${validate_component(FontAwesomeIcon, "FontAwesomeIcon").$$render(
          $$result,
          {
            icon: faChevronRight,
            style: "color: var(--REDESIGN_BUTTON_SECONDARY_BACKGROUND);"
          },
          {},
          {}
        )}</div></div> <input type="text" id="themename" placeholder="Theme name"> <input type="text" id="username" placeholder="username"> <input type="text" id="userid" placeholder="userid"> <button data-svelte-h="svelte-v6ua23">Export</button> <button class="reset-button" data-svelte-h="svelte-1d4z2tu">Restore Default Colors</button> <button class="reset-button" data-svelte-h="svelte-17qh2g0">Import Theme</button></div> ${validate_component(ColorPicker_1, "ColorPicker").$$render(
          $$result,
          { this: colorPickerRef },
          {
            this: ($$value) => {
              colorPickerRef = $$value;
              $$settled = false;
            }
          },
          {}
        )}</div> ${validate_component(ColorGrid, "ColorGrid").$$render($$result, {}, {}, {})}`;
      } while (!$$settled);
      return $$rendered;
    });
  }
});

// .svelte-kit/output/server/nodes/2.js
var __exports3 = {};
__export(__exports3, {
  component: () => component3,
  fonts: () => fonts3,
  imports: () => imports3,
  index: () => index3,
  stylesheets: () => stylesheets3
});
var index3, component_cache3, component3, imports3, stylesheets3, fonts3;
var init__3 = __esm({
  ".svelte-kit/output/server/nodes/2.js"() {
    index3 = 2;
    component3 = async () => component_cache3 ??= (await Promise.resolve().then(() => (init_page_svelte(), page_svelte_exports))).default;
    imports3 = ["_app/immutable/nodes/2.Dc15S841.js", "_app/immutable/chunks/scheduler.DExV6eFp.js", "_app/immutable/chunks/index.Bd35QqEY.js"];
    stylesheets3 = ["_app/immutable/assets/2.OHlVOPOp.css"];
    fonts3 = ["_app/immutable/assets/fa-brands-400.O7nZalfM.woff2", "_app/immutable/assets/fa-brands-400.Dur5g48u.ttf", "_app/immutable/assets/fa-regular-400.DgEfZSYE.woff2", "_app/immutable/assets/fa-regular-400.Bf3rG5Nx.ttf", "_app/immutable/assets/fa-solid-900.DOQJEhcS.woff2", "_app/immutable/assets/fa-solid-900.BV3CbEM2.ttf", "_app/immutable/assets/fa-v4compatibility.BX8XWJtE.woff2", "_app/immutable/assets/fa-v4compatibility.B9MWI-E6.ttf", "_app/immutable/assets/gg sans Regular.C8z-rE61.ttf", "_app/immutable/assets/gg sans Bold.CmWKweXO.ttf", "_app/immutable/assets/gg sans Semibold.T09dQCH-.ttf", "_app/immutable/assets/gg sans Medium.ClUzdfFR.ttf"];
  }
});

// .svelte-kit/output/server/chunks/internal.js
init_ssr();
var base = "";
var assets = base;
var initial = { base, assets };
function override(paths) {
  base = paths.base;
  assets = paths.assets;
}
function reset() {
  base = initial.base;
  assets = initial.assets;
}
var public_env = {};
var safe_public_env = {};
function set_private_env(environment) {
}
function set_public_env(environment) {
  public_env = environment;
}
function set_safe_public_env(environment) {
  safe_public_env = environment;
}
function afterUpdate() {
}
var prerendering = false;
var Root = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { stores } = $$props;
  let { page: page2 } = $$props;
  let { constructors } = $$props;
  let { components = [] } = $$props;
  let { form } = $$props;
  let { data_0 = null } = $$props;
  let { data_1 = null } = $$props;
  {
    setContext("__svelte__", stores);
  }
  afterUpdate(stores.page.notify);
  if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0) $$bindings.stores(stores);
  if ($$props.page === void 0 && $$bindings.page && page2 !== void 0) $$bindings.page(page2);
  if ($$props.constructors === void 0 && $$bindings.constructors && constructors !== void 0) $$bindings.constructors(constructors);
  if ($$props.components === void 0 && $$bindings.components && components !== void 0) $$bindings.components(components);
  if ($$props.form === void 0 && $$bindings.form && form !== void 0) $$bindings.form(form);
  if ($$props.data_0 === void 0 && $$bindings.data_0 && data_0 !== void 0) $$bindings.data_0(data_0);
  if ($$props.data_1 === void 0 && $$bindings.data_1 && data_1 !== void 0) $$bindings.data_1(data_1);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      stores.page.set(page2);
    }
    $$rendered = `  ${constructors[1] ? `${validate_component(constructors[0] || missing_component, "svelte:component").$$render(
      $$result,
      { data: data_0, this: components[0] },
      {
        this: ($$value) => {
          components[0] = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${validate_component(constructors[1] || missing_component, "svelte:component").$$render(
            $$result,
            { data: data_1, form, this: components[1] },
            {
              this: ($$value) => {
                components[1] = $$value;
                $$settled = false;
              }
            },
            {}
          )}`;
        }
      }
    )}` : `${validate_component(constructors[0] || missing_component, "svelte:component").$$render(
      $$result,
      { data: data_0, form, this: components[0] },
      {
        this: ($$value) => {
          components[0] = $$value;
          $$settled = false;
        }
      },
      {}
    )}`} ${``}`;
  } while (!$$settled);
  return $$rendered;
});
var options = {
  app_dir: "_app",
  app_template_contains_nonce: false,
  csp: { "mode": "auto", "directives": { "upgrade-insecure-requests": false, "block-all-mixed-content": false }, "reportOnly": { "upgrade-insecure-requests": false, "block-all-mixed-content": false } },
  csrf_check_origin: true,
  embedded: false,
  env_public_prefix: "PUBLIC_",
  env_private_prefix: "",
  hooks: null,
  // added lazily, via `get_hooks`
  preload_strategy: "modulepreload",
  root: Root,
  service_worker: false,
  templates: {
    app: ({ head, body: body2, assets: assets2, nonce, env }) => '<!doctype html>\n<html lang="en">\n	<head>\n		<meta charset="utf-8" />\n		<link rel="icon" href="' + assets2 + '/favicon.png" />\n		<meta name="viewport" content="width=device-width, initial-scale=1" />\n		' + head + '\n	</head>\n	<body data-sveltekit-preload-data="hover">\n		<div style="display: contents">' + body2 + "</div>\n	</body>\n</html>\n",
    error: ({ status, message }) => '<!doctype html>\n<html lang="en">\n	<head>\n		<meta charset="utf-8" />\n		<title>' + message + `</title>

		<style>
			body {
				--bg: white;
				--fg: #222;
				--divider: #ccc;
				background: var(--bg);
				color: var(--fg);
				font-family:
					system-ui,
					-apple-system,
					BlinkMacSystemFont,
					'Segoe UI',
					Roboto,
					Oxygen,
					Ubuntu,
					Cantarell,
					'Open Sans',
					'Helvetica Neue',
					sans-serif;
				display: flex;
				align-items: center;
				justify-content: center;
				height: 100vh;
				margin: 0;
			}

			.error {
				display: flex;
				align-items: center;
				max-width: 32rem;
				margin: 0 1rem;
			}

			.status {
				font-weight: 200;
				font-size: 3rem;
				line-height: 1;
				position: relative;
				top: -0.05rem;
			}

			.message {
				border-left: 1px solid var(--divider);
				padding: 0 0 0 1rem;
				margin: 0 0 0 1rem;
				min-height: 2.5rem;
				display: flex;
				align-items: center;
			}

			.message h1 {
				font-weight: 400;
				font-size: 1em;
				margin: 0;
			}

			@media (prefers-color-scheme: dark) {
				body {
					--bg: #222;
					--fg: #ddd;
					--divider: #666;
				}
			}
		</style>
	</head>
	<body>
		<div class="error">
			<span class="status">` + status + '</span>\n			<div class="message">\n				<h1>' + message + "</h1>\n			</div>\n		</div>\n	</body>\n</html>\n"
  },
  version_hash: "2dma72"
};
async function get_hooks() {
  return {};
}

// .svelte-kit/output/server/index.js
init_exports();
init_ssr();
var import_cookie = __toESM(require_cookie(), 1);
var DEV = false;
var SVELTE_KIT_ASSETS = "/_svelte_kit_assets";
var ENDPOINT_METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD"];
var PAGE_METHODS = ["GET", "POST", "HEAD"];
function negotiate(accept, types) {
  const parts = [];
  accept.split(",").forEach((str, i2) => {
    const match = /([^/ \t]+)\/([^; \t]+)[ \t]*(?:;[ \t]*q=([0-9.]+))?/.exec(str);
    if (match) {
      const [, type, subtype, q = "1"] = match;
      parts.push({ type, subtype, q: +q, i: i2 });
    }
  });
  parts.sort((a2, b2) => {
    if (a2.q !== b2.q) {
      return b2.q - a2.q;
    }
    if (a2.subtype === "*" !== (b2.subtype === "*")) {
      return a2.subtype === "*" ? 1 : -1;
    }
    if (a2.type === "*" !== (b2.type === "*")) {
      return a2.type === "*" ? 1 : -1;
    }
    return a2.i - b2.i;
  });
  let accepted;
  let min_priority = Infinity;
  for (const mimetype of types) {
    const [type, subtype] = mimetype.split("/");
    const priority = parts.findIndex(
      (part) => (part.type === type || part.type === "*") && (part.subtype === subtype || part.subtype === "*")
    );
    if (priority !== -1 && priority < min_priority) {
      accepted = mimetype;
      min_priority = priority;
    }
  }
  return accepted;
}
function is_content_type(request, ...types) {
  const type = request.headers.get("content-type")?.split(";", 1)[0].trim() ?? "";
  return types.includes(type.toLowerCase());
}
function is_form_content_type(request) {
  return is_content_type(
    request,
    "application/x-www-form-urlencoded",
    "multipart/form-data",
    "text/plain"
  );
}
var HttpError = class {
  /**
   * @param {number} status
   * @param {{message: string} extends App.Error ? (App.Error | string | undefined) : App.Error} body
   */
  constructor(status, body2) {
    this.status = status;
    if (typeof body2 === "string") {
      this.body = { message: body2 };
    } else if (body2) {
      this.body = body2;
    } else {
      this.body = { message: `Error: ${status}` };
    }
  }
  toString() {
    return JSON.stringify(this.body);
  }
};
var Redirect = class {
  /**
   * @param {300 | 301 | 302 | 303 | 304 | 305 | 306 | 307 | 308} status
   * @param {string} location
   */
  constructor(status, location) {
    this.status = status;
    this.location = location;
  }
};
var SvelteKitError = class extends Error {
  /**
   * @param {number} status
   * @param {string} text
   * @param {string} message
   */
  constructor(status, text2, message) {
    super(message);
    this.status = status;
    this.text = text2;
  }
};
var ActionFailure = class {
  /**
   * @param {number} status
   * @param {T} data
   */
  constructor(status, data) {
    this.status = status;
    this.data = data;
  }
};
function json(data, init2) {
  const body2 = JSON.stringify(data);
  const headers2 = new Headers(init2?.headers);
  if (!headers2.has("content-length")) {
    headers2.set("content-length", encoder$3.encode(body2).byteLength.toString());
  }
  if (!headers2.has("content-type")) {
    headers2.set("content-type", "application/json");
  }
  return new Response(body2, {
    ...init2,
    headers: headers2
  });
}
var encoder$3 = new TextEncoder();
function text(body2, init2) {
  const headers2 = new Headers(init2?.headers);
  if (!headers2.has("content-length")) {
    const encoded = encoder$3.encode(body2);
    headers2.set("content-length", encoded.byteLength.toString());
    return new Response(encoded, {
      ...init2,
      headers: headers2
    });
  }
  return new Response(body2, {
    ...init2,
    headers: headers2
  });
}
function coalesce_to_error(err) {
  return err instanceof Error || err && /** @type {any} */
  err.name && /** @type {any} */
  err.message ? (
    /** @type {Error} */
    err
  ) : new Error(JSON.stringify(err));
}
function normalize_error(error) {
  return (
    /** @type {import('../runtime/control.js').Redirect | HttpError | SvelteKitError | Error} */
    error
  );
}
function get_status(error) {
  return error instanceof HttpError || error instanceof SvelteKitError ? error.status : 500;
}
function get_message(error) {
  return error instanceof SvelteKitError ? error.text : "Internal Error";
}
function method_not_allowed(mod, method) {
  return text(`${method} method not allowed`, {
    status: 405,
    headers: {
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
      // "The server must generate an Allow header field in a 405 status code response"
      allow: allowed_methods(mod).join(", ")
    }
  });
}
function allowed_methods(mod) {
  const allowed = ENDPOINT_METHODS.filter((method) => method in mod);
  if ("GET" in mod || "HEAD" in mod) allowed.push("HEAD");
  return allowed;
}
function static_error_page(options2, status, message) {
  let page2 = options2.templates.error({ status, message });
  return text(page2, {
    headers: { "content-type": "text/html; charset=utf-8" },
    status
  });
}
async function handle_fatal_error(event, options2, error) {
  error = error instanceof HttpError ? error : coalesce_to_error(error);
  const status = get_status(error);
  const body2 = await handle_error_and_jsonify(event, options2, error);
  const type = negotiate(event.request.headers.get("accept") || "text/html", [
    "application/json",
    "text/html"
  ]);
  if (event.isDataRequest || type === "application/json") {
    return json(body2, {
      status
    });
  }
  return static_error_page(options2, status, body2.message);
}
async function handle_error_and_jsonify(event, options2, error) {
  if (error instanceof HttpError) {
    return error.body;
  }
  const status = get_status(error);
  const message = get_message(error);
  return await options2.hooks.handleError({ error, event, status, message }) ?? { message };
}
function redirect_response(status, location) {
  const response = new Response(void 0, {
    status,
    headers: { location }
  });
  return response;
}
function clarify_devalue_error(event, error) {
  if (error.path) {
    return `Data returned from \`load\` while rendering ${event.route.id} is not serializable: ${error.message} (data${error.path})`;
  }
  if (error.path === "") {
    return `Data returned from \`load\` while rendering ${event.route.id} is not a plain object`;
  }
  return error.message;
}
function stringify_uses(node) {
  const uses = [];
  if (node.uses && node.uses.dependencies.size > 0) {
    uses.push(`"dependencies":${JSON.stringify(Array.from(node.uses.dependencies))}`);
  }
  if (node.uses && node.uses.search_params.size > 0) {
    uses.push(`"search_params":${JSON.stringify(Array.from(node.uses.search_params))}`);
  }
  if (node.uses && node.uses.params.size > 0) {
    uses.push(`"params":${JSON.stringify(Array.from(node.uses.params))}`);
  }
  if (node.uses?.parent) uses.push('"parent":1');
  if (node.uses?.route) uses.push('"route":1');
  if (node.uses?.url) uses.push('"url":1');
  return `"uses":{${uses.join(",")}}`;
}
async function render_endpoint(event, mod, state) {
  const method = (
    /** @type {import('types').HttpMethod} */
    event.request.method
  );
  let handler = mod[method] || mod.fallback;
  if (method === "HEAD" && mod.GET && !mod.HEAD) {
    handler = mod.GET;
  }
  if (!handler) {
    return method_not_allowed(mod, method);
  }
  const prerender = mod.prerender ?? state.prerender_default;
  if (prerender && (mod.POST || mod.PATCH || mod.PUT || mod.DELETE)) {
    throw new Error("Cannot prerender endpoints that have mutative methods");
  }
  if (state.prerendering && !prerender) {
    if (state.depth > 0) {
      throw new Error(`${event.route.id} is not prerenderable`);
    } else {
      return new Response(void 0, { status: 204 });
    }
  }
  try {
    let response = await handler(
      /** @type {import('@sveltejs/kit').RequestEvent<Record<string, any>>} */
      event
    );
    if (!(response instanceof Response)) {
      throw new Error(
        `Invalid response from route ${event.url.pathname}: handler should return a Response object`
      );
    }
    if (state.prerendering) {
      response = new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: new Headers(response.headers)
      });
      response.headers.set("x-sveltekit-prerender", String(prerender));
    }
    return response;
  } catch (e3) {
    if (e3 instanceof Redirect) {
      return new Response(void 0, {
        status: e3.status,
        headers: { location: e3.location }
      });
    }
    throw e3;
  }
}
function is_endpoint_request(event) {
  const { method, headers: headers2 } = event.request;
  if (ENDPOINT_METHODS.includes(method) && !PAGE_METHODS.includes(method)) {
    return true;
  }
  if (method === "POST" && headers2.get("x-sveltekit-action") === "true") return false;
  const accept = event.request.headers.get("accept") ?? "*/*";
  return negotiate(accept, ["*", "text/html"]) !== "text/html";
}
function compact(arr) {
  return arr.filter(
    /** @returns {val is NonNullable<T>} */
    (val) => val != null
  );
}
var escaped = {
  "<": "\\u003C",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var DevalueError = class extends Error {
  /**
   * @param {string} message
   * @param {string[]} keys
   */
  constructor(message, keys) {
    super(message);
    this.name = "DevalueError";
    this.path = keys.join("");
  }
};
function is_primitive(thing) {
  return Object(thing) !== thing;
}
var object_proto_names = /* @__PURE__ */ Object.getOwnPropertyNames(
  Object.prototype
).sort().join("\0");
function is_plain_object(thing) {
  const proto = Object.getPrototypeOf(thing);
  return proto === Object.prototype || proto === null || Object.getOwnPropertyNames(proto).sort().join("\0") === object_proto_names;
}
function get_type(thing) {
  return Object.prototype.toString.call(thing).slice(8, -1);
}
function get_escaped_char(char) {
  switch (char) {
    case '"':
      return '\\"';
    case "<":
      return "\\u003C";
    case "\\":
      return "\\\\";
    case "\n":
      return "\\n";
    case "\r":
      return "\\r";
    case "	":
      return "\\t";
    case "\b":
      return "\\b";
    case "\f":
      return "\\f";
    case "\u2028":
      return "\\u2028";
    case "\u2029":
      return "\\u2029";
    default:
      return char < " " ? `\\u${char.charCodeAt(0).toString(16).padStart(4, "0")}` : "";
  }
}
function stringify_string(str) {
  let result = "";
  let last_pos = 0;
  const len = str.length;
  for (let i2 = 0; i2 < len; i2 += 1) {
    const char = str[i2];
    const replacement = get_escaped_char(char);
    if (replacement) {
      result += str.slice(last_pos, i2) + replacement;
      last_pos = i2 + 1;
    }
  }
  return `"${last_pos === 0 ? str : result + str.slice(last_pos)}"`;
}
function enumerable_symbols(object) {
  return Object.getOwnPropertySymbols(object).filter(
    (symbol) => Object.getOwnPropertyDescriptor(object, symbol).enumerable
  );
}
var chars$1 = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$";
var unsafe_chars = /[<\b\f\n\r\t\0\u2028\u2029]/g;
var reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
function uneval(value, replacer) {
  const counts = /* @__PURE__ */ new Map();
  const keys = [];
  const custom = /* @__PURE__ */ new Map();
  function walk(thing) {
    if (typeof thing === "function") {
      throw new DevalueError(`Cannot stringify a function`, keys);
    }
    if (!is_primitive(thing)) {
      if (counts.has(thing)) {
        counts.set(thing, counts.get(thing) + 1);
        return;
      }
      counts.set(thing, 1);
      if (replacer) {
        const str2 = replacer(thing);
        if (typeof str2 === "string") {
          custom.set(thing, str2);
          return;
        }
      }
      const type = get_type(thing);
      switch (type) {
        case "Number":
        case "BigInt":
        case "String":
        case "Boolean":
        case "Date":
        case "RegExp":
          return;
        case "Array":
          thing.forEach((value2, i2) => {
            keys.push(`[${i2}]`);
            walk(value2);
            keys.pop();
          });
          break;
        case "Set":
          Array.from(thing).forEach(walk);
          break;
        case "Map":
          for (const [key2, value2] of thing) {
            keys.push(
              `.get(${is_primitive(key2) ? stringify_primitive$1(key2) : "..."})`
            );
            walk(value2);
            keys.pop();
          }
          break;
        default:
          if (!is_plain_object(thing)) {
            throw new DevalueError(
              `Cannot stringify arbitrary non-POJOs`,
              keys
            );
          }
          if (enumerable_symbols(thing).length > 0) {
            throw new DevalueError(
              `Cannot stringify POJOs with symbolic keys`,
              keys
            );
          }
          for (const key2 in thing) {
            keys.push(`.${key2}`);
            walk(thing[key2]);
            keys.pop();
          }
      }
    }
  }
  walk(value);
  const names = /* @__PURE__ */ new Map();
  Array.from(counts).filter((entry) => entry[1] > 1).sort((a2, b2) => b2[1] - a2[1]).forEach((entry, i2) => {
    names.set(entry[0], get_name(i2));
  });
  function stringify2(thing) {
    if (names.has(thing)) {
      return names.get(thing);
    }
    if (is_primitive(thing)) {
      return stringify_primitive$1(thing);
    }
    if (custom.has(thing)) {
      return custom.get(thing);
    }
    const type = get_type(thing);
    switch (type) {
      case "Number":
      case "String":
      case "Boolean":
        return `Object(${stringify2(thing.valueOf())})`;
      case "RegExp":
        return `new RegExp(${stringify_string(thing.source)}, "${thing.flags}")`;
      case "Date":
        return `new Date(${thing.getTime()})`;
      case "Array":
        const members = (
          /** @type {any[]} */
          thing.map(
            (v2, i2) => i2 in thing ? stringify2(v2) : ""
          )
        );
        const tail = thing.length === 0 || thing.length - 1 in thing ? "" : ",";
        return `[${members.join(",")}${tail}]`;
      case "Set":
      case "Map":
        return `new ${type}([${Array.from(thing).map(stringify2).join(",")}])`;
      default:
        const obj = `{${Object.keys(thing).map((key2) => `${safe_key(key2)}:${stringify2(thing[key2])}`).join(",")}}`;
        const proto = Object.getPrototypeOf(thing);
        if (proto === null) {
          return Object.keys(thing).length > 0 ? `Object.assign(Object.create(null),${obj})` : `Object.create(null)`;
        }
        return obj;
    }
  }
  const str = stringify2(value);
  if (names.size) {
    const params = [];
    const statements = [];
    const values = [];
    names.forEach((name2, thing) => {
      params.push(name2);
      if (custom.has(thing)) {
        values.push(
          /** @type {string} */
          custom.get(thing)
        );
        return;
      }
      if (is_primitive(thing)) {
        values.push(stringify_primitive$1(thing));
        return;
      }
      const type = get_type(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          values.push(`Object(${stringify2(thing.valueOf())})`);
          break;
        case "RegExp":
          values.push(thing.toString());
          break;
        case "Date":
          values.push(`new Date(${thing.getTime()})`);
          break;
        case "Array":
          values.push(`Array(${thing.length})`);
          thing.forEach((v2, i2) => {
            statements.push(`${name2}[${i2}]=${stringify2(v2)}`);
          });
          break;
        case "Set":
          values.push(`new Set`);
          statements.push(
            `${name2}.${Array.from(thing).map((v2) => `add(${stringify2(v2)})`).join(".")}`
          );
          break;
        case "Map":
          values.push(`new Map`);
          statements.push(
            `${name2}.${Array.from(thing).map(([k, v2]) => `set(${stringify2(k)}, ${stringify2(v2)})`).join(".")}`
          );
          break;
        default:
          values.push(
            Object.getPrototypeOf(thing) === null ? "Object.create(null)" : "{}"
          );
          Object.keys(thing).forEach((key2) => {
            statements.push(
              `${name2}${safe_prop(key2)}=${stringify2(thing[key2])}`
            );
          });
      }
    });
    statements.push(`return ${str}`);
    return `(function(${params.join(",")}){${statements.join(
      ";"
    )}}(${values.join(",")}))`;
  } else {
    return str;
  }
}
function get_name(num) {
  let name2 = "";
  do {
    name2 = chars$1[num % chars$1.length] + name2;
    num = ~~(num / chars$1.length) - 1;
  } while (num >= 0);
  return reserved.test(name2) ? `${name2}0` : name2;
}
function escape_unsafe_char(c3) {
  return escaped[c3] || c3;
}
function escape_unsafe_chars(str) {
  return str.replace(unsafe_chars, escape_unsafe_char);
}
function safe_key(key2) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key2) ? key2 : escape_unsafe_chars(JSON.stringify(key2));
}
function safe_prop(key2) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key2) ? `.${key2}` : `[${escape_unsafe_chars(JSON.stringify(key2))}]`;
}
function stringify_primitive$1(thing) {
  if (typeof thing === "string") return stringify_string(thing);
  if (thing === void 0) return "void 0";
  if (thing === 0 && 1 / thing < 0) return "-0";
  const str = String(thing);
  if (typeof thing === "number") return str.replace(/^(-)?0\./, "$1.");
  if (typeof thing === "bigint") return thing + "n";
  return str;
}
var UNDEFINED = -1;
var HOLE = -2;
var NAN = -3;
var POSITIVE_INFINITY = -4;
var NEGATIVE_INFINITY = -5;
var NEGATIVE_ZERO = -6;
function stringify(value, reducers) {
  const stringified = [];
  const indexes = /* @__PURE__ */ new Map();
  const custom = [];
  for (const key2 in reducers) {
    custom.push({ key: key2, fn: reducers[key2] });
  }
  const keys = [];
  let p2 = 0;
  function flatten(thing) {
    if (typeof thing === "function") {
      throw new DevalueError(`Cannot stringify a function`, keys);
    }
    if (indexes.has(thing)) return indexes.get(thing);
    if (thing === void 0) return UNDEFINED;
    if (Number.isNaN(thing)) return NAN;
    if (thing === Infinity) return POSITIVE_INFINITY;
    if (thing === -Infinity) return NEGATIVE_INFINITY;
    if (thing === 0 && 1 / thing < 0) return NEGATIVE_ZERO;
    const index22 = p2++;
    indexes.set(thing, index22);
    for (const { key: key2, fn } of custom) {
      const value2 = fn(thing);
      if (value2) {
        stringified[index22] = `["${key2}",${flatten(value2)}]`;
        return index22;
      }
    }
    let str = "";
    if (is_primitive(thing)) {
      str = stringify_primitive(thing);
    } else {
      const type = get_type(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          str = `["Object",${stringify_primitive(thing)}]`;
          break;
        case "BigInt":
          str = `["BigInt",${thing}]`;
          break;
        case "Date":
          const valid = !isNaN(thing.getDate());
          str = `["Date","${valid ? thing.toISOString() : ""}"]`;
          break;
        case "RegExp":
          const { source, flags } = thing;
          str = flags ? `["RegExp",${stringify_string(source)},"${flags}"]` : `["RegExp",${stringify_string(source)}]`;
          break;
        case "Array":
          str = "[";
          for (let i2 = 0; i2 < thing.length; i2 += 1) {
            if (i2 > 0) str += ",";
            if (i2 in thing) {
              keys.push(`[${i2}]`);
              str += flatten(thing[i2]);
              keys.pop();
            } else {
              str += HOLE;
            }
          }
          str += "]";
          break;
        case "Set":
          str = '["Set"';
          for (const value2 of thing) {
            str += `,${flatten(value2)}`;
          }
          str += "]";
          break;
        case "Map":
          str = '["Map"';
          for (const [key2, value2] of thing) {
            keys.push(
              `.get(${is_primitive(key2) ? stringify_primitive(key2) : "..."})`
            );
            str += `,${flatten(key2)},${flatten(value2)}`;
            keys.pop();
          }
          str += "]";
          break;
        default:
          if (!is_plain_object(thing)) {
            throw new DevalueError(
              `Cannot stringify arbitrary non-POJOs`,
              keys
            );
          }
          if (enumerable_symbols(thing).length > 0) {
            throw new DevalueError(
              `Cannot stringify POJOs with symbolic keys`,
              keys
            );
          }
          if (Object.getPrototypeOf(thing) === null) {
            str = '["null"';
            for (const key2 in thing) {
              keys.push(`.${key2}`);
              str += `,${stringify_string(key2)},${flatten(thing[key2])}`;
              keys.pop();
            }
            str += "]";
          } else {
            str = "{";
            let started = false;
            for (const key2 in thing) {
              if (started) str += ",";
              started = true;
              keys.push(`.${key2}`);
              str += `${stringify_string(key2)}:${flatten(thing[key2])}`;
              keys.pop();
            }
            str += "}";
          }
      }
    }
    stringified[index22] = str;
    return index22;
  }
  const index4 = flatten(value);
  if (index4 < 0) return `${index4}`;
  return `[${stringified.join(",")}]`;
}
function stringify_primitive(thing) {
  const type = typeof thing;
  if (type === "string") return stringify_string(thing);
  if (thing instanceof String) return stringify_string(thing.toString());
  if (thing === void 0) return UNDEFINED.toString();
  if (thing === 0 && 1 / thing < 0) return NEGATIVE_ZERO.toString();
  if (type === "bigint") return `["BigInt","${thing}"]`;
  return String(thing);
}
function is_action_json_request(event) {
  const accept = negotiate(event.request.headers.get("accept") ?? "*/*", [
    "application/json",
    "text/html"
  ]);
  return accept === "application/json" && event.request.method === "POST";
}
async function handle_action_json_request(event, options2, server2) {
  const actions = server2?.actions;
  if (!actions) {
    const no_actions_error = new SvelteKitError(
      405,
      "Method Not Allowed",
      "POST method not allowed. No actions exist for this page"
    );
    return action_json(
      {
        type: "error",
        error: await handle_error_and_jsonify(event, options2, no_actions_error)
      },
      {
        status: no_actions_error.status,
        headers: {
          // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
          // "The server must generate an Allow header field in a 405 status code response"
          allow: "GET"
        }
      }
    );
  }
  check_named_default_separate(actions);
  try {
    const data = await call_action(event, actions);
    if (false) ;
    if (data instanceof ActionFailure) {
      return action_json({
        type: "failure",
        status: data.status,
        // @ts-expect-error we assign a string to what is supposed to be an object. That's ok
        // because we don't use the object outside, and this way we have better code navigation
        // through knowing where the related interface is used.
        data: stringify_action_response(
          data.data,
          /** @type {string} */
          event.route.id
        )
      });
    } else {
      return action_json({
        type: "success",
        status: data ? 200 : 204,
        // @ts-expect-error see comment above
        data: stringify_action_response(
          data,
          /** @type {string} */
          event.route.id
        )
      });
    }
  } catch (e3) {
    const err = normalize_error(e3);
    if (err instanceof Redirect) {
      return action_json_redirect(err);
    }
    return action_json(
      {
        type: "error",
        error: await handle_error_and_jsonify(event, options2, check_incorrect_fail_use(err))
      },
      {
        status: get_status(err)
      }
    );
  }
}
function check_incorrect_fail_use(error) {
  return error instanceof ActionFailure ? new Error('Cannot "throw fail()". Use "return fail()"') : error;
}
function action_json_redirect(redirect) {
  return action_json({
    type: "redirect",
    status: redirect.status,
    location: redirect.location
  });
}
function action_json(data, init2) {
  return json(data, init2);
}
function is_action_request(event) {
  return event.request.method === "POST";
}
async function handle_action_request(event, server2) {
  const actions = server2?.actions;
  if (!actions) {
    event.setHeaders({
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
      // "The server must generate an Allow header field in a 405 status code response"
      allow: "GET"
    });
    return {
      type: "error",
      error: new SvelteKitError(
        405,
        "Method Not Allowed",
        "POST method not allowed. No actions exist for this page"
      )
    };
  }
  check_named_default_separate(actions);
  try {
    const data = await call_action(event, actions);
    if (false) ;
    if (data instanceof ActionFailure) {
      return {
        type: "failure",
        status: data.status,
        data: data.data
      };
    } else {
      return {
        type: "success",
        status: 200,
        // @ts-expect-error this will be removed upon serialization, so `undefined` is the same as omission
        data
      };
    }
  } catch (e3) {
    const err = normalize_error(e3);
    if (err instanceof Redirect) {
      return {
        type: "redirect",
        status: err.status,
        location: err.location
      };
    }
    return {
      type: "error",
      error: check_incorrect_fail_use(err)
    };
  }
}
function check_named_default_separate(actions) {
  if (actions.default && Object.keys(actions).length > 1) {
    throw new Error(
      "When using named actions, the default action cannot be used. See the docs for more info: https://kit.svelte.dev/docs/form-actions#named-actions"
    );
  }
}
async function call_action(event, actions) {
  const url = new URL(event.request.url);
  let name2 = "default";
  for (const param of url.searchParams) {
    if (param[0].startsWith("/")) {
      name2 = param[0].slice(1);
      if (name2 === "default") {
        throw new Error('Cannot use reserved action name "default"');
      }
      break;
    }
  }
  const action = actions[name2];
  if (!action) {
    throw new SvelteKitError(404, "Not Found", `No action with name '${name2}' found`);
  }
  if (!is_form_content_type(event.request)) {
    throw new SvelteKitError(
      415,
      "Unsupported Media Type",
      `Form actions expect form-encoded data \u2014 received ${event.request.headers.get(
        "content-type"
      )}`
    );
  }
  return action(event);
}
function uneval_action_response(data, route_id) {
  return try_deserialize(data, uneval, route_id);
}
function stringify_action_response(data, route_id) {
  return try_deserialize(data, stringify, route_id);
}
function try_deserialize(data, fn, route_id) {
  try {
    return fn(data);
  } catch (e3) {
    const error = (
      /** @type {any} */
      e3
    );
    if ("path" in error) {
      let message = `Data returned from action inside ${route_id} is not serializable: ${error.message}`;
      if (error.path !== "") message += ` (data.${error.path})`;
      throw new Error(message);
    }
    throw error;
  }
}
var INVALIDATED_PARAM = "x-sveltekit-invalidated";
var TRAILING_SLASH_PARAM = "x-sveltekit-trailing-slash";
function b64_encode(buffer) {
  if (globalThis.Buffer) {
    return Buffer.from(buffer).toString("base64");
  }
  const little_endian = new Uint8Array(new Uint16Array([1]).buffer)[0] > 0;
  return btoa(
    new TextDecoder(little_endian ? "utf-16le" : "utf-16be").decode(
      new Uint16Array(new Uint8Array(buffer))
    )
  );
}
async function load_server_data({ event, state, node, parent }) {
  if (!node?.server) return null;
  let is_tracking = true;
  const uses = {
    dependencies: /* @__PURE__ */ new Set(),
    params: /* @__PURE__ */ new Set(),
    parent: false,
    route: false,
    url: false,
    search_params: /* @__PURE__ */ new Set()
  };
  const url = make_trackable(
    event.url,
    () => {
      if (is_tracking) {
        uses.url = true;
      }
    },
    (param) => {
      if (is_tracking) {
        uses.search_params.add(param);
      }
    }
  );
  if (state.prerendering) {
    disable_search(url);
  }
  const result = await node.server.load?.call(null, {
    ...event,
    fetch: (info, init2) => {
      new URL(info instanceof Request ? info.url : info, event.url);
      return event.fetch(info, init2);
    },
    /** @param {string[]} deps */
    depends: (...deps) => {
      for (const dep of deps) {
        const { href } = new URL(dep, event.url);
        uses.dependencies.add(href);
      }
    },
    params: new Proxy(event.params, {
      get: (target, key2) => {
        if (is_tracking) {
          uses.params.add(key2);
        }
        return target[
          /** @type {string} */
          key2
        ];
      }
    }),
    parent: async () => {
      if (is_tracking) {
        uses.parent = true;
      }
      return parent();
    },
    route: new Proxy(event.route, {
      get: (target, key2) => {
        if (is_tracking) {
          uses.route = true;
        }
        return target[
          /** @type {'id'} */
          key2
        ];
      }
    }),
    url,
    untrack(fn) {
      is_tracking = false;
      try {
        return fn();
      } finally {
        is_tracking = true;
      }
    }
  });
  return {
    type: "data",
    data: result ?? null,
    uses,
    slash: node.server.trailingSlash
  };
}
async function load_data({
  event,
  fetched,
  node,
  parent,
  server_data_promise,
  state,
  resolve_opts,
  csr
}) {
  const server_data_node = await server_data_promise;
  if (!node?.universal?.load) {
    return server_data_node?.data ?? null;
  }
  const result = await node.universal.load.call(null, {
    url: event.url,
    params: event.params,
    data: server_data_node?.data ?? null,
    route: event.route,
    fetch: create_universal_fetch(event, state, fetched, csr, resolve_opts),
    setHeaders: event.setHeaders,
    depends: () => {
    },
    parent,
    untrack: (fn) => fn()
  });
  return result ?? null;
}
function create_universal_fetch(event, state, fetched, csr, resolve_opts) {
  const universal_fetch = async (input, init2) => {
    const cloned_body = input instanceof Request && input.body ? input.clone().body : null;
    const cloned_headers = input instanceof Request && [...input.headers].length ? new Headers(input.headers) : init2?.headers;
    let response = await event.fetch(input, init2);
    const url = new URL(input instanceof Request ? input.url : input, event.url);
    const same_origin = url.origin === event.url.origin;
    let dependency;
    if (same_origin) {
      if (state.prerendering) {
        dependency = { response, body: null };
        state.prerendering.dependencies.set(url.pathname, dependency);
      }
    } else {
      const mode = input instanceof Request ? input.mode : init2?.mode ?? "cors";
      if (mode === "no-cors") {
        response = new Response("", {
          status: response.status,
          statusText: response.statusText,
          headers: response.headers
        });
      } else {
        const acao = response.headers.get("access-control-allow-origin");
        if (!acao || acao !== event.url.origin && acao !== "*") {
          throw new Error(
            `CORS error: ${acao ? "Incorrect" : "No"} 'Access-Control-Allow-Origin' header is present on the requested resource`
          );
        }
      }
    }
    const proxy = new Proxy(response, {
      get(response2, key2, _receiver) {
        async function push_fetched(body2, is_b64) {
          const status_number = Number(response2.status);
          if (isNaN(status_number)) {
            throw new Error(
              `response.status is not a number. value: "${response2.status}" type: ${typeof response2.status}`
            );
          }
          fetched.push({
            url: same_origin ? url.href.slice(event.url.origin.length) : url.href,
            method: event.request.method,
            request_body: (
              /** @type {string | ArrayBufferView | undefined} */
              input instanceof Request && cloned_body ? await stream_to_string(cloned_body) : init2?.body
            ),
            request_headers: cloned_headers,
            response_body: body2,
            response: response2,
            is_b64
          });
        }
        if (key2 === "arrayBuffer") {
          return async () => {
            const buffer = await response2.arrayBuffer();
            if (dependency) {
              dependency.body = new Uint8Array(buffer);
            }
            if (buffer instanceof ArrayBuffer) {
              await push_fetched(b64_encode(buffer), true);
            }
            return buffer;
          };
        }
        async function text2() {
          const body2 = await response2.text();
          if (!body2 || typeof body2 === "string") {
            await push_fetched(body2, false);
          }
          if (dependency) {
            dependency.body = body2;
          }
          return body2;
        }
        if (key2 === "text") {
          return text2;
        }
        if (key2 === "json") {
          return async () => {
            return JSON.parse(await text2());
          };
        }
        return Reflect.get(response2, key2, response2);
      }
    });
    if (csr) {
      const get2 = response.headers.get;
      response.headers.get = (key2) => {
        const lower = key2.toLowerCase();
        const value = get2.call(response.headers, lower);
        if (value && !lower.startsWith("x-sveltekit-")) {
          const included = resolve_opts.filterSerializedResponseHeaders(lower, value);
          if (!included) {
            throw new Error(
              `Failed to get response header "${lower}" \u2014 it must be included by the \`filterSerializedResponseHeaders\` option: https://kit.svelte.dev/docs/hooks#server-hooks-handle (at ${event.route.id})`
            );
          }
        }
        return value;
      };
    }
    return proxy;
  };
  return (input, init2) => {
    const response = universal_fetch(input, init2);
    response.catch(() => {
    });
    return response;
  };
}
async function stream_to_string(stream) {
  let result = "";
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    result += decoder.decode(value);
  }
  return result;
}
var subscriber_queue = [];
function readable(value, start) {
  return {
    subscribe: writable(value, start).subscribe
  };
}
function writable(value, start = noop) {
  let stop;
  const subscribers = /* @__PURE__ */ new Set();
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i2 = 0; i2 < subscriber_queue.length; i2 += 2) {
            subscriber_queue[i2][0](subscriber_queue[i2 + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update2(fn) {
    set(fn(value));
  }
  function subscribe2(run2, invalidate = noop) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set, update2) || noop;
    }
    run2(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0 && stop) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update: update2, subscribe: subscribe2 };
}
function hash(...values) {
  let hash2 = 5381;
  for (const value of values) {
    if (typeof value === "string") {
      let i2 = value.length;
      while (i2) hash2 = hash2 * 33 ^ value.charCodeAt(--i2);
    } else if (ArrayBuffer.isView(value)) {
      const buffer = new Uint8Array(value.buffer, value.byteOffset, value.byteLength);
      let i2 = buffer.length;
      while (i2) hash2 = hash2 * 33 ^ buffer[--i2];
    } else {
      throw new TypeError("value must be a string or TypedArray");
    }
  }
  return (hash2 >>> 0).toString(36);
}
var escape_html_attr_dict = {
  "&": "&amp;",
  '"': "&quot;"
};
var escape_html_attr_regex = new RegExp(
  // special characters
  `[${Object.keys(escape_html_attr_dict).join("")}]|[\\ud800-\\udbff](?![\\udc00-\\udfff])|[\\ud800-\\udbff][\\udc00-\\udfff]|[\\udc00-\\udfff]`,
  "g"
);
function escape_html_attr(str) {
  const escaped_str = str.replace(escape_html_attr_regex, (match) => {
    if (match.length === 2) {
      return match;
    }
    return escape_html_attr_dict[match] ?? `&#${match.charCodeAt(0)};`;
  });
  return `"${escaped_str}"`;
}
var replacements = {
  "<": "\\u003C",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var pattern = new RegExp(`[${Object.keys(replacements).join("")}]`, "g");
function serialize_data(fetched, filter, prerendering2 = false) {
  const headers2 = {};
  let cache_control = null;
  let age = null;
  let varyAny = false;
  for (const [key2, value] of fetched.response.headers) {
    if (filter(key2, value)) {
      headers2[key2] = value;
    }
    if (key2 === "cache-control") cache_control = value;
    else if (key2 === "age") age = value;
    else if (key2 === "vary" && value.trim() === "*") varyAny = true;
  }
  const payload = {
    status: fetched.response.status,
    statusText: fetched.response.statusText,
    headers: headers2,
    body: fetched.response_body
  };
  const safe_payload = JSON.stringify(payload).replace(pattern, (match) => replacements[match]);
  const attrs = [
    'type="application/json"',
    "data-sveltekit-fetched",
    `data-url=${escape_html_attr(fetched.url)}`
  ];
  if (fetched.is_b64) {
    attrs.push("data-b64");
  }
  if (fetched.request_headers || fetched.request_body) {
    const values = [];
    if (fetched.request_headers) {
      values.push([...new Headers(fetched.request_headers)].join(","));
    }
    if (fetched.request_body) {
      values.push(fetched.request_body);
    }
    attrs.push(`data-hash="${hash(...values)}"`);
  }
  if (!prerendering2 && fetched.method === "GET" && cache_control && !varyAny) {
    const match = /s-maxage=(\d+)/g.exec(cache_control) ?? /max-age=(\d+)/g.exec(cache_control);
    if (match) {
      const ttl = +match[1] - +(age ?? "0");
      attrs.push(`data-ttl="${ttl}"`);
    }
  }
  return `<script ${attrs.join(" ")}>${safe_payload}<\/script>`;
}
var s = JSON.stringify;
var encoder$2 = new TextEncoder();
function sha256(data) {
  if (!key[0]) precompute();
  const out = init.slice(0);
  const array2 = encode(data);
  for (let i2 = 0; i2 < array2.length; i2 += 16) {
    const w2 = array2.subarray(i2, i2 + 16);
    let tmp;
    let a2;
    let b2;
    let out0 = out[0];
    let out1 = out[1];
    let out2 = out[2];
    let out3 = out[3];
    let out4 = out[4];
    let out5 = out[5];
    let out6 = out[6];
    let out7 = out[7];
    for (let i22 = 0; i22 < 64; i22++) {
      if (i22 < 16) {
        tmp = w2[i22];
      } else {
        a2 = w2[i22 + 1 & 15];
        b2 = w2[i22 + 14 & 15];
        tmp = w2[i22 & 15] = (a2 >>> 7 ^ a2 >>> 18 ^ a2 >>> 3 ^ a2 << 25 ^ a2 << 14) + (b2 >>> 17 ^ b2 >>> 19 ^ b2 >>> 10 ^ b2 << 15 ^ b2 << 13) + w2[i22 & 15] + w2[i22 + 9 & 15] | 0;
      }
      tmp = tmp + out7 + (out4 >>> 6 ^ out4 >>> 11 ^ out4 >>> 25 ^ out4 << 26 ^ out4 << 21 ^ out4 << 7) + (out6 ^ out4 & (out5 ^ out6)) + key[i22];
      out7 = out6;
      out6 = out5;
      out5 = out4;
      out4 = out3 + tmp | 0;
      out3 = out2;
      out2 = out1;
      out1 = out0;
      out0 = tmp + (out1 & out2 ^ out3 & (out1 ^ out2)) + (out1 >>> 2 ^ out1 >>> 13 ^ out1 >>> 22 ^ out1 << 30 ^ out1 << 19 ^ out1 << 10) | 0;
    }
    out[0] = out[0] + out0 | 0;
    out[1] = out[1] + out1 | 0;
    out[2] = out[2] + out2 | 0;
    out[3] = out[3] + out3 | 0;
    out[4] = out[4] + out4 | 0;
    out[5] = out[5] + out5 | 0;
    out[6] = out[6] + out6 | 0;
    out[7] = out[7] + out7 | 0;
  }
  const bytes = new Uint8Array(out.buffer);
  reverse_endianness(bytes);
  return base64(bytes);
}
var init = new Uint32Array(8);
var key = new Uint32Array(64);
function precompute() {
  function frac(x2) {
    return (x2 - Math.floor(x2)) * 4294967296;
  }
  let prime = 2;
  for (let i2 = 0; i2 < 64; prime++) {
    let is_prime = true;
    for (let factor = 2; factor * factor <= prime; factor++) {
      if (prime % factor === 0) {
        is_prime = false;
        break;
      }
    }
    if (is_prime) {
      if (i2 < 8) {
        init[i2] = frac(prime ** (1 / 2));
      }
      key[i2] = frac(prime ** (1 / 3));
      i2++;
    }
  }
}
function reverse_endianness(bytes) {
  for (let i2 = 0; i2 < bytes.length; i2 += 4) {
    const a2 = bytes[i2 + 0];
    const b2 = bytes[i2 + 1];
    const c3 = bytes[i2 + 2];
    const d2 = bytes[i2 + 3];
    bytes[i2 + 0] = d2;
    bytes[i2 + 1] = c3;
    bytes[i2 + 2] = b2;
    bytes[i2 + 3] = a2;
  }
}
function encode(str) {
  const encoded = encoder$2.encode(str);
  const length = encoded.length * 8;
  const size = 512 * Math.ceil((length + 65) / 512);
  const bytes = new Uint8Array(size / 8);
  bytes.set(encoded);
  bytes[encoded.length] = 128;
  reverse_endianness(bytes);
  const words = new Uint32Array(bytes.buffer);
  words[words.length - 2] = Math.floor(length / 4294967296);
  words[words.length - 1] = length;
  return words;
}
var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
function base64(bytes) {
  const l2 = bytes.length;
  let result = "";
  let i2;
  for (i2 = 2; i2 < l2; i2 += 3) {
    result += chars[bytes[i2 - 2] >> 2];
    result += chars[(bytes[i2 - 2] & 3) << 4 | bytes[i2 - 1] >> 4];
    result += chars[(bytes[i2 - 1] & 15) << 2 | bytes[i2] >> 6];
    result += chars[bytes[i2] & 63];
  }
  if (i2 === l2 + 1) {
    result += chars[bytes[i2 - 2] >> 2];
    result += chars[(bytes[i2 - 2] & 3) << 4];
    result += "==";
  }
  if (i2 === l2) {
    result += chars[bytes[i2 - 2] >> 2];
    result += chars[(bytes[i2 - 2] & 3) << 4 | bytes[i2 - 1] >> 4];
    result += chars[(bytes[i2 - 1] & 15) << 2];
    result += "=";
  }
  return result;
}
var array = new Uint8Array(16);
function generate_nonce() {
  crypto.getRandomValues(array);
  return base64(array);
}
var quoted = /* @__PURE__ */ new Set([
  "self",
  "unsafe-eval",
  "unsafe-hashes",
  "unsafe-inline",
  "none",
  "strict-dynamic",
  "report-sample",
  "wasm-unsafe-eval",
  "script"
]);
var crypto_pattern = /^(nonce|sha\d\d\d)-/;
var BaseProvider = class {
  /** @type {boolean} */
  #use_hashes;
  /** @type {boolean} */
  #script_needs_csp;
  /** @type {boolean} */
  #style_needs_csp;
  /** @type {import('types').CspDirectives} */
  #directives;
  /** @type {import('types').Csp.Source[]} */
  #script_src;
  /** @type {import('types').Csp.Source[]} */
  #script_src_elem;
  /** @type {import('types').Csp.Source[]} */
  #style_src;
  /** @type {import('types').Csp.Source[]} */
  #style_src_attr;
  /** @type {import('types').Csp.Source[]} */
  #style_src_elem;
  /** @type {string} */
  #nonce;
  /**
   * @param {boolean} use_hashes
   * @param {import('types').CspDirectives} directives
   * @param {string} nonce
   */
  constructor(use_hashes, directives, nonce) {
    this.#use_hashes = use_hashes;
    this.#directives = directives;
    const d2 = this.#directives;
    this.#script_src = [];
    this.#script_src_elem = [];
    this.#style_src = [];
    this.#style_src_attr = [];
    this.#style_src_elem = [];
    const effective_script_src = d2["script-src"] || d2["default-src"];
    const script_src_elem = d2["script-src-elem"];
    const effective_style_src = d2["style-src"] || d2["default-src"];
    const style_src_attr = d2["style-src-attr"];
    const style_src_elem = d2["style-src-elem"];
    this.#script_needs_csp = !!effective_script_src && effective_script_src.filter((value) => value !== "unsafe-inline").length > 0 || !!script_src_elem && script_src_elem.filter((value) => value !== "unsafe-inline").length > 0;
    this.#style_needs_csp = !!effective_style_src && effective_style_src.filter((value) => value !== "unsafe-inline").length > 0 || !!style_src_attr && style_src_attr.filter((value) => value !== "unsafe-inline").length > 0 || !!style_src_elem && style_src_elem.filter((value) => value !== "unsafe-inline").length > 0;
    this.script_needs_nonce = this.#script_needs_csp && !this.#use_hashes;
    this.style_needs_nonce = this.#style_needs_csp && !this.#use_hashes;
    this.#nonce = nonce;
  }
  /** @param {string} content */
  add_script(content) {
    if (this.#script_needs_csp) {
      const d2 = this.#directives;
      if (this.#use_hashes) {
        const hash2 = sha256(content);
        this.#script_src.push(`sha256-${hash2}`);
        if (d2["script-src-elem"]?.length) {
          this.#script_src_elem.push(`sha256-${hash2}`);
        }
      } else {
        if (this.#script_src.length === 0) {
          this.#script_src.push(`nonce-${this.#nonce}`);
        }
        if (d2["script-src-elem"]?.length) {
          this.#script_src_elem.push(`nonce-${this.#nonce}`);
        }
      }
    }
  }
  /** @param {string} content */
  add_style(content) {
    if (this.#style_needs_csp) {
      const empty_comment_hash = "9OlNO0DNEeaVzHL4RZwCLsBHA8WBQ8toBp/4F5XV2nc=";
      const d2 = this.#directives;
      if (this.#use_hashes) {
        const hash2 = sha256(content);
        this.#style_src.push(`sha256-${hash2}`);
        if (d2["style-src-attr"]?.length) {
          this.#style_src_attr.push(`sha256-${hash2}`);
        }
        if (d2["style-src-elem"]?.length) {
          if (hash2 !== empty_comment_hash && !d2["style-src-elem"].includes(`sha256-${empty_comment_hash}`)) {
            this.#style_src_elem.push(`sha256-${empty_comment_hash}`);
          }
          this.#style_src_elem.push(`sha256-${hash2}`);
        }
      } else {
        if (this.#style_src.length === 0 && !d2["style-src"]?.includes("unsafe-inline")) {
          this.#style_src.push(`nonce-${this.#nonce}`);
        }
        if (d2["style-src-attr"]?.length) {
          this.#style_src_attr.push(`nonce-${this.#nonce}`);
        }
        if (d2["style-src-elem"]?.length) {
          if (!d2["style-src-elem"].includes(`sha256-${empty_comment_hash}`)) {
            this.#style_src_elem.push(`sha256-${empty_comment_hash}`);
          }
          this.#style_src_elem.push(`nonce-${this.#nonce}`);
        }
      }
    }
  }
  /**
   * @param {boolean} [is_meta]
   */
  get_header(is_meta = false) {
    const header = [];
    const directives = { ...this.#directives };
    if (this.#style_src.length > 0) {
      directives["style-src"] = [
        ...directives["style-src"] || directives["default-src"] || [],
        ...this.#style_src
      ];
    }
    if (this.#style_src_attr.length > 0) {
      directives["style-src-attr"] = [
        ...directives["style-src-attr"] || [],
        ...this.#style_src_attr
      ];
    }
    if (this.#style_src_elem.length > 0) {
      directives["style-src-elem"] = [
        ...directives["style-src-elem"] || [],
        ...this.#style_src_elem
      ];
    }
    if (this.#script_src.length > 0) {
      directives["script-src"] = [
        ...directives["script-src"] || directives["default-src"] || [],
        ...this.#script_src
      ];
    }
    if (this.#script_src_elem.length > 0) {
      directives["script-src-elem"] = [
        ...directives["script-src-elem"] || [],
        ...this.#script_src_elem
      ];
    }
    for (const key2 in directives) {
      if (is_meta && (key2 === "frame-ancestors" || key2 === "report-uri" || key2 === "sandbox")) {
        continue;
      }
      const value = (
        /** @type {string[] | true} */
        directives[key2]
      );
      if (!value) continue;
      const directive = [key2];
      if (Array.isArray(value)) {
        value.forEach((value2) => {
          if (quoted.has(value2) || crypto_pattern.test(value2)) {
            directive.push(`'${value2}'`);
          } else {
            directive.push(value2);
          }
        });
      }
      header.push(directive.join(" "));
    }
    return header.join("; ");
  }
};
var CspProvider = class extends BaseProvider {
  get_meta() {
    const content = this.get_header(true);
    if (!content) {
      return;
    }
    return `<meta http-equiv="content-security-policy" content=${escape_html_attr(content)}>`;
  }
};
var CspReportOnlyProvider = class extends BaseProvider {
  /**
   * @param {boolean} use_hashes
   * @param {import('types').CspDirectives} directives
   * @param {string} nonce
   */
  constructor(use_hashes, directives, nonce) {
    super(use_hashes, directives, nonce);
    if (Object.values(directives).filter((v2) => !!v2).length > 0) {
      const has_report_to = directives["report-to"]?.length ?? 0 > 0;
      const has_report_uri = directives["report-uri"]?.length ?? 0 > 0;
      if (!has_report_to && !has_report_uri) {
        throw Error(
          "`content-security-policy-report-only` must be specified with either the `report-to` or `report-uri` directives, or both"
        );
      }
    }
  }
};
var Csp = class {
  /** @readonly */
  nonce = generate_nonce();
  /** @type {CspProvider} */
  csp_provider;
  /** @type {CspReportOnlyProvider} */
  report_only_provider;
  /**
   * @param {import('./types.js').CspConfig} config
   * @param {import('./types.js').CspOpts} opts
   */
  constructor({ mode, directives, reportOnly }, { prerender }) {
    const use_hashes = mode === "hash" || mode === "auto" && prerender;
    this.csp_provider = new CspProvider(use_hashes, directives, this.nonce);
    this.report_only_provider = new CspReportOnlyProvider(use_hashes, reportOnly, this.nonce);
  }
  get script_needs_nonce() {
    return this.csp_provider.script_needs_nonce || this.report_only_provider.script_needs_nonce;
  }
  get style_needs_nonce() {
    return this.csp_provider.style_needs_nonce || this.report_only_provider.style_needs_nonce;
  }
  /** @param {string} content */
  add_script(content) {
    this.csp_provider.add_script(content);
    this.report_only_provider.add_script(content);
  }
  /** @param {string} content */
  add_style(content) {
    this.csp_provider.add_style(content);
    this.report_only_provider.add_style(content);
  }
};
function defer() {
  let fulfil;
  let reject;
  const promise = new Promise((f2, r3) => {
    fulfil = f2;
    reject = r3;
  });
  return { promise, fulfil, reject };
}
function create_async_iterator() {
  const deferred = [defer()];
  return {
    iterator: {
      [Symbol.asyncIterator]() {
        return {
          next: async () => {
            const next = await deferred[0].promise;
            if (!next.done) deferred.shift();
            return next;
          }
        };
      }
    },
    push: (value) => {
      deferred[deferred.length - 1].fulfil({
        value,
        done: false
      });
      deferred.push(defer());
    },
    done: () => {
      deferred[deferred.length - 1].fulfil({ done: true });
    }
  };
}
var updated = {
  ...readable(false),
  check: () => false
};
var encoder$1 = new TextEncoder();
async function render_response({
  branch,
  fetched,
  options: options2,
  manifest: manifest2,
  state,
  page_config,
  status,
  error = null,
  event,
  resolve_opts,
  action_result
}) {
  if (state.prerendering) {
    if (options2.csp.mode === "nonce") {
      throw new Error('Cannot use prerendering if config.kit.csp.mode === "nonce"');
    }
    if (options2.app_template_contains_nonce) {
      throw new Error("Cannot use prerendering if page template contains %sveltekit.nonce%");
    }
  }
  const { client } = manifest2._;
  const modulepreloads = new Set(client.imports);
  const stylesheets4 = new Set(client.stylesheets);
  const fonts4 = new Set(client.fonts);
  const link_header_preloads = /* @__PURE__ */ new Set();
  const inline_styles = /* @__PURE__ */ new Map();
  let rendered;
  const form_value = action_result?.type === "success" || action_result?.type === "failure" ? action_result.data ?? null : null;
  let base$1 = base;
  let assets$1 = assets;
  let base_expression = s(base);
  if (!state.prerendering?.fallback) {
    const segments = event.url.pathname.slice(base.length).split("/").slice(2);
    base$1 = segments.map(() => "..").join("/") || ".";
    base_expression = `new URL(${s(base$1)}, location).pathname.slice(0, -1)`;
    if (!assets || assets[0] === "/" && assets !== SVELTE_KIT_ASSETS) {
      assets$1 = base$1;
    }
  }
  if (page_config.ssr) {
    const props = {
      stores: {
        page: writable(null),
        navigating: writable(null),
        updated
      },
      constructors: await Promise.all(branch.map(({ node }) => node.component())),
      form: form_value
    };
    let data2 = {};
    for (let i2 = 0; i2 < branch.length; i2 += 1) {
      data2 = { ...data2, ...branch[i2].data };
      props[`data_${i2}`] = data2;
    }
    props.page = {
      error,
      params: (
        /** @type {Record<string, any>} */
        event.params
      ),
      route: event.route,
      status,
      url: event.url,
      data: data2,
      form: form_value,
      state: {}
    };
    override({ base: base$1, assets: assets$1 });
    {
      try {
        rendered = options2.root.render(props);
      } finally {
        reset();
      }
    }
    for (const { node } of branch) {
      for (const url of node.imports) modulepreloads.add(url);
      for (const url of node.stylesheets) stylesheets4.add(url);
      for (const url of node.fonts) fonts4.add(url);
      if (node.inline_styles) {
        Object.entries(await node.inline_styles()).forEach(([k, v2]) => inline_styles.set(k, v2));
      }
    }
  } else {
    rendered = { head: "", html: "", css: { code: "", map: null } };
  }
  let head = "";
  let body2 = rendered.html;
  const csp = new Csp(options2.csp, {
    prerender: !!state.prerendering
  });
  const prefixed = (path) => {
    if (path.startsWith("/")) {
      return base + path;
    }
    return `${assets$1}/${path}`;
  };
  if (inline_styles.size > 0) {
    const content = Array.from(inline_styles.values()).join("\n");
    const attributes = [];
    if (csp.style_needs_nonce) attributes.push(` nonce="${csp.nonce}"`);
    csp.add_style(content);
    head += `
	<style${attributes.join("")}>${content}</style>`;
  }
  for (const dep of stylesheets4) {
    const path = prefixed(dep);
    const attributes = ['rel="stylesheet"'];
    if (inline_styles.has(dep)) {
      attributes.push("disabled", 'media="(max-width: 0)"');
    } else {
      if (resolve_opts.preload({ type: "css", path })) {
        const preload_atts = ['rel="preload"', 'as="style"'];
        link_header_preloads.add(`<${encodeURI(path)}>; ${preload_atts.join(";")}; nopush`);
      }
    }
    head += `
		<link href="${path}" ${attributes.join(" ")}>`;
  }
  for (const dep of fonts4) {
    const path = prefixed(dep);
    if (resolve_opts.preload({ type: "font", path })) {
      const ext = dep.slice(dep.lastIndexOf(".") + 1);
      const attributes = [
        'rel="preload"',
        'as="font"',
        `type="font/${ext}"`,
        `href="${path}"`,
        "crossorigin"
      ];
      head += `
		<link ${attributes.join(" ")}>`;
    }
  }
  const global = `__sveltekit_${options2.version_hash}`;
  const { data, chunks } = get_data(
    event,
    options2,
    branch.map((b2) => b2.server_data),
    global
  );
  if (page_config.ssr && page_config.csr) {
    body2 += `
			${fetched.map(
      (item) => serialize_data(item, resolve_opts.filterSerializedResponseHeaders, !!state.prerendering)
    ).join("\n			")}`;
  }
  if (page_config.csr) {
    if (client.uses_env_dynamic_public && state.prerendering) {
      modulepreloads.add(`${options2.app_dir}/env.js`);
    }
    const included_modulepreloads = Array.from(modulepreloads, (dep) => prefixed(dep)).filter(
      (path) => resolve_opts.preload({ type: "js", path })
    );
    for (const path of included_modulepreloads) {
      link_header_preloads.add(`<${encodeURI(path)}>; rel="modulepreload"; nopush`);
      if (options2.preload_strategy !== "modulepreload") {
        head += `
		<link rel="preload" as="script" crossorigin="anonymous" href="${path}">`;
      } else if (state.prerendering) {
        head += `
		<link rel="modulepreload" href="${path}">`;
      }
    }
    const blocks = [];
    const load_env_eagerly = client.uses_env_dynamic_public && state.prerendering;
    const properties = [`base: ${base_expression}`];
    if (assets) {
      properties.push(`assets: ${s(assets)}`);
    }
    if (client.uses_env_dynamic_public) {
      properties.push(`env: ${load_env_eagerly ? "null" : s(public_env)}`);
    }
    if (chunks) {
      blocks.push("const deferred = new Map();");
      properties.push(`defer: (id) => new Promise((fulfil, reject) => {
							deferred.set(id, { fulfil, reject });
						})`);
      properties.push(`resolve: ({ id, data, error }) => {
							const { fulfil, reject } = deferred.get(id);
							deferred.delete(id);

							if (error) reject(error);
							else fulfil(data);
						}`);
    }
    blocks.push(`${global} = {
						${properties.join(",\n						")}
					};`);
    const args = ["app", "element"];
    blocks.push("const element = document.currentScript.parentElement;");
    if (page_config.ssr) {
      const serialized = { form: "null", error: "null" };
      blocks.push(`const data = ${data};`);
      if (form_value) {
        serialized.form = uneval_action_response(
          form_value,
          /** @type {string} */
          event.route.id
        );
      }
      if (error) {
        serialized.error = uneval(error);
      }
      const hydrate = [
        `node_ids: [${branch.map(({ node }) => node.index).join(", ")}]`,
        "data",
        `form: ${serialized.form}`,
        `error: ${serialized.error}`
      ];
      if (status !== 200) {
        hydrate.push(`status: ${status}`);
      }
      if (options2.embedded) {
        hydrate.push(`params: ${uneval(event.params)}`, `route: ${s(event.route)}`);
      }
      const indent = "	".repeat(load_env_eagerly ? 7 : 6);
      args.push(`{
${indent}	${hydrate.join(`,
${indent}	`)}
${indent}}`);
    }
    if (load_env_eagerly) {
      blocks.push(`import(${s(`${base$1}/${options2.app_dir}/env.js`)}).then(({ env }) => {
						${global}.env = env;

						Promise.all([
							import(${s(prefixed(client.start))}),
							import(${s(prefixed(client.app))})
						]).then(([kit, app]) => {
							kit.start(${args.join(", ")});
						});
					});`);
    } else {
      blocks.push(`Promise.all([
						import(${s(prefixed(client.start))}),
						import(${s(prefixed(client.app))})
					]).then(([kit, app]) => {
						kit.start(${args.join(", ")});
					});`);
    }
    if (options2.service_worker) {
      const opts = "";
      blocks.push(`if ('serviceWorker' in navigator) {
						addEventListener('load', function () {
							navigator.serviceWorker.register('${prefixed("service-worker.js")}'${opts});
						});
					}`);
    }
    const init_app = `
				{
					${blocks.join("\n\n					")}
				}
			`;
    csp.add_script(init_app);
    body2 += `
			<script${csp.script_needs_nonce ? ` nonce="${csp.nonce}"` : ""}>${init_app}<\/script>
		`;
  }
  const headers2 = new Headers({
    "x-sveltekit-page": "true",
    "content-type": "text/html"
  });
  if (state.prerendering) {
    const http_equiv = [];
    const csp_headers = csp.csp_provider.get_meta();
    if (csp_headers) {
      http_equiv.push(csp_headers);
    }
    if (state.prerendering.cache) {
      http_equiv.push(`<meta http-equiv="cache-control" content="${state.prerendering.cache}">`);
    }
    if (http_equiv.length > 0) {
      head = http_equiv.join("\n") + head;
    }
  } else {
    const csp_header = csp.csp_provider.get_header();
    if (csp_header) {
      headers2.set("content-security-policy", csp_header);
    }
    const report_only_header = csp.report_only_provider.get_header();
    if (report_only_header) {
      headers2.set("content-security-policy-report-only", report_only_header);
    }
    if (link_header_preloads.size) {
      headers2.set("link", Array.from(link_header_preloads).join(", "));
    }
  }
  head += rendered.head;
  const html = options2.templates.app({
    head,
    body: body2,
    assets: assets$1,
    nonce: (
      /** @type {string} */
      csp.nonce
    ),
    env: safe_public_env
  });
  const transformed = await resolve_opts.transformPageChunk({
    html,
    done: true
  }) || "";
  if (!chunks) {
    headers2.set("etag", `"${hash(transformed)}"`);
  }
  return !chunks ? text(transformed, {
    status,
    headers: headers2
  }) : new Response(
    new ReadableStream({
      async start(controller) {
        controller.enqueue(encoder$1.encode(transformed + "\n"));
        for await (const chunk of chunks) {
          controller.enqueue(encoder$1.encode(chunk));
        }
        controller.close();
      },
      type: "bytes"
    }),
    {
      headers: {
        "content-type": "text/html"
      }
    }
  );
}
function get_data(event, options2, nodes, global) {
  let promise_id = 1;
  let count = 0;
  const { iterator, push, done } = create_async_iterator();
  function replacer(thing) {
    if (typeof thing?.then === "function") {
      const id = promise_id++;
      count += 1;
      thing.then(
        /** @param {any} data */
        (data) => ({ data })
      ).catch(
        /** @param {any} error */
        async (error) => ({
          error: await handle_error_and_jsonify(event, options2, error)
        })
      ).then(
        /**
         * @param {{data: any; error: any}} result
         */
        async ({ data, error }) => {
          count -= 1;
          let str;
          try {
            str = uneval({ id, data, error }, replacer);
          } catch {
            error = await handle_error_and_jsonify(
              event,
              options2,
              new Error(`Failed to serialize promise while rendering ${event.route.id}`)
            );
            data = void 0;
            str = uneval({ id, data, error }, replacer);
          }
          push(`<script>${global}.resolve(${str})<\/script>
`);
          if (count === 0) done();
        }
      );
      return `${global}.defer(${id})`;
    }
  }
  try {
    const strings = nodes.map((node) => {
      if (!node) return "null";
      return `{"type":"data","data":${uneval(node.data, replacer)},${stringify_uses(node)}${node.slash ? `,"slash":${JSON.stringify(node.slash)}` : ""}}`;
    });
    return {
      data: `[${strings.join(",")}]`,
      chunks: count > 0 ? iterator : null
    };
  } catch (e3) {
    throw new Error(clarify_devalue_error(
      event,
      /** @type {any} */
      e3
    ));
  }
}
function get_option(nodes, option) {
  return nodes.reduce(
    (value, node) => {
      return (
        /** @type {Value} TypeScript's too dumb to understand this */
        node?.universal?.[option] ?? node?.server?.[option] ?? value
      );
    },
    /** @type {Value | undefined} */
    void 0
  );
}
async function respond_with_error({
  event,
  options: options2,
  manifest: manifest2,
  state,
  status,
  error,
  resolve_opts
}) {
  if (event.request.headers.get("x-sveltekit-error")) {
    return static_error_page(
      options2,
      status,
      /** @type {Error} */
      error.message
    );
  }
  const fetched = [];
  try {
    const branch = [];
    const default_layout = await manifest2._.nodes[0]();
    const ssr = get_option([default_layout], "ssr") ?? true;
    const csr = get_option([default_layout], "csr") ?? true;
    if (ssr) {
      state.error = true;
      const server_data_promise = load_server_data({
        event,
        state,
        node: default_layout,
        // eslint-disable-next-line @typescript-eslint/require-await
        parent: async () => ({})
      });
      const server_data = await server_data_promise;
      const data = await load_data({
        event,
        fetched,
        node: default_layout,
        // eslint-disable-next-line @typescript-eslint/require-await
        parent: async () => ({}),
        resolve_opts,
        server_data_promise,
        state,
        csr
      });
      branch.push(
        {
          node: default_layout,
          server_data,
          data
        },
        {
          node: await manifest2._.nodes[1](),
          // 1 is always the root error
          data: null,
          server_data: null
        }
      );
    }
    return await render_response({
      options: options2,
      manifest: manifest2,
      state,
      page_config: {
        ssr,
        csr
      },
      status,
      error: await handle_error_and_jsonify(event, options2, error),
      branch,
      fetched,
      event,
      resolve_opts
    });
  } catch (e3) {
    if (e3 instanceof Redirect) {
      return redirect_response(e3.status, e3.location);
    }
    return static_error_page(
      options2,
      get_status(e3),
      (await handle_error_and_jsonify(event, options2, e3)).message
    );
  }
}
function once(fn) {
  let done = false;
  let result;
  return () => {
    if (done) return result;
    done = true;
    return result = fn();
  };
}
var encoder = new TextEncoder();
async function render_data(event, route, options2, manifest2, state, invalidated_data_nodes, trailing_slash) {
  if (!route.page) {
    return new Response(void 0, {
      status: 404
    });
  }
  try {
    const node_ids = [...route.page.layouts, route.page.leaf];
    const invalidated = invalidated_data_nodes ?? node_ids.map(() => true);
    let aborted = false;
    const url = new URL(event.url);
    url.pathname = normalize_path(url.pathname, trailing_slash);
    const new_event = { ...event, url };
    const functions2 = node_ids.map((n3, i2) => {
      return once(async () => {
        try {
          if (aborted) {
            return (
              /** @type {import('types').ServerDataSkippedNode} */
              {
                type: "skip"
              }
            );
          }
          const node = n3 == void 0 ? n3 : await manifest2._.nodes[n3]();
          return load_server_data({
            event: new_event,
            state,
            node,
            parent: async () => {
              const data2 = {};
              for (let j2 = 0; j2 < i2; j2 += 1) {
                const parent = (
                  /** @type {import('types').ServerDataNode | null} */
                  await functions2[j2]()
                );
                if (parent) {
                  Object.assign(data2, parent.data);
                }
              }
              return data2;
            }
          });
        } catch (e3) {
          aborted = true;
          throw e3;
        }
      });
    });
    const promises = functions2.map(async (fn, i2) => {
      if (!invalidated[i2]) {
        return (
          /** @type {import('types').ServerDataSkippedNode} */
          {
            type: "skip"
          }
        );
      }
      return fn();
    });
    let length = promises.length;
    const nodes = await Promise.all(
      promises.map(
        (p2, i2) => p2.catch(async (error) => {
          if (error instanceof Redirect) {
            throw error;
          }
          length = Math.min(length, i2 + 1);
          return (
            /** @type {import('types').ServerErrorNode} */
            {
              type: "error",
              error: await handle_error_and_jsonify(event, options2, error),
              status: error instanceof HttpError || error instanceof SvelteKitError ? error.status : void 0
            }
          );
        })
      )
    );
    const { data, chunks } = get_data_json(event, options2, nodes);
    if (!chunks) {
      return json_response(data);
    }
    return new Response(
      new ReadableStream({
        async start(controller) {
          controller.enqueue(encoder.encode(data));
          for await (const chunk of chunks) {
            controller.enqueue(encoder.encode(chunk));
          }
          controller.close();
        },
        type: "bytes"
      }),
      {
        headers: {
          // we use a proprietary content type to prevent buffering.
          // the `text` prefix makes it inspectable
          "content-type": "text/sveltekit-data",
          "cache-control": "private, no-store"
        }
      }
    );
  } catch (e3) {
    const error = normalize_error(e3);
    if (error instanceof Redirect) {
      return redirect_json_response(error);
    } else {
      return json_response(await handle_error_and_jsonify(event, options2, error), 500);
    }
  }
}
function json_response(json2, status = 200) {
  return text(typeof json2 === "string" ? json2 : JSON.stringify(json2), {
    status,
    headers: {
      "content-type": "application/json",
      "cache-control": "private, no-store"
    }
  });
}
function redirect_json_response(redirect) {
  return json_response({
    type: "redirect",
    location: redirect.location
  });
}
function get_data_json(event, options2, nodes) {
  let promise_id = 1;
  let count = 0;
  const { iterator, push, done } = create_async_iterator();
  const reducers = {
    /** @param {any} thing */
    Promise: (thing) => {
      if (typeof thing?.then === "function") {
        const id = promise_id++;
        count += 1;
        let key2 = "data";
        thing.catch(
          /** @param {any} e */
          async (e3) => {
            key2 = "error";
            return handle_error_and_jsonify(
              event,
              options2,
              /** @type {any} */
              e3
            );
          }
        ).then(
          /** @param {any} value */
          async (value) => {
            let str;
            try {
              str = stringify(value, reducers);
            } catch {
              const error = await handle_error_and_jsonify(
                event,
                options2,
                new Error(`Failed to serialize promise while rendering ${event.route.id}`)
              );
              key2 = "error";
              str = stringify(error, reducers);
            }
            count -= 1;
            push(`{"type":"chunk","id":${id},"${key2}":${str}}
`);
            if (count === 0) done();
          }
        );
        return id;
      }
    }
  };
  try {
    const strings = nodes.map((node) => {
      if (!node) return "null";
      if (node.type === "error" || node.type === "skip") {
        return JSON.stringify(node);
      }
      return `{"type":"data","data":${stringify(node.data, reducers)},${stringify_uses(
        node
      )}${node.slash ? `,"slash":${JSON.stringify(node.slash)}` : ""}}`;
    });
    return {
      data: `{"type":"data","nodes":[${strings.join(",")}]}
`,
      chunks: count > 0 ? iterator : null
    };
  } catch (e3) {
    throw new Error(clarify_devalue_error(
      event,
      /** @type {any} */
      e3
    ));
  }
}
function load_page_nodes(page2, manifest2) {
  return Promise.all([
    // we use == here rather than === because [undefined] serializes as "[null]"
    ...page2.layouts.map((n3) => n3 == void 0 ? n3 : manifest2._.nodes[n3]()),
    manifest2._.nodes[page2.leaf]()
  ]);
}
var MAX_DEPTH = 10;
async function render_page(event, page2, options2, manifest2, state, resolve_opts) {
  if (state.depth > MAX_DEPTH) {
    return text(`Not found: ${event.url.pathname}`, {
      status: 404
      // TODO in some cases this should be 500. not sure how to differentiate
    });
  }
  if (is_action_json_request(event)) {
    const node = await manifest2._.nodes[page2.leaf]();
    return handle_action_json_request(event, options2, node?.server);
  }
  try {
    const nodes = await load_page_nodes(page2, manifest2);
    const leaf_node = (
      /** @type {import('types').SSRNode} */
      nodes.at(-1)
    );
    let status = 200;
    let action_result = void 0;
    if (is_action_request(event)) {
      action_result = await handle_action_request(event, leaf_node.server);
      if (action_result?.type === "redirect") {
        return redirect_response(action_result.status, action_result.location);
      }
      if (action_result?.type === "error") {
        status = get_status(action_result.error);
      }
      if (action_result?.type === "failure") {
        status = action_result.status;
      }
    }
    const should_prerender_data = nodes.some((node) => node?.server?.load);
    const data_pathname = add_data_suffix(event.url.pathname);
    const should_prerender = get_option(nodes, "prerender") ?? false;
    if (should_prerender) {
      const mod = leaf_node.server;
      if (mod?.actions) {
        throw new Error("Cannot prerender pages with actions");
      }
    } else if (state.prerendering) {
      return new Response(void 0, {
        status: 204
      });
    }
    state.prerender_default = should_prerender;
    const fetched = [];
    if (get_option(nodes, "ssr") === false && !(state.prerendering && should_prerender_data)) {
      return await render_response({
        branch: [],
        fetched,
        page_config: {
          ssr: false,
          csr: get_option(nodes, "csr") ?? true
        },
        status,
        error: null,
        event,
        options: options2,
        manifest: manifest2,
        state,
        resolve_opts
      });
    }
    const branch = [];
    let load_error = null;
    const server_promises = nodes.map((node, i2) => {
      if (load_error) {
        throw load_error;
      }
      return Promise.resolve().then(async () => {
        try {
          if (node === leaf_node && action_result?.type === "error") {
            throw action_result.error;
          }
          return await load_server_data({
            event,
            state,
            node,
            parent: async () => {
              const data = {};
              for (let j2 = 0; j2 < i2; j2 += 1) {
                const parent = await server_promises[j2];
                if (parent) Object.assign(data, parent.data);
              }
              return data;
            }
          });
        } catch (e3) {
          load_error = /** @type {Error} */
          e3;
          throw load_error;
        }
      });
    });
    const csr = get_option(nodes, "csr") ?? true;
    const load_promises = nodes.map((node, i2) => {
      if (load_error) throw load_error;
      return Promise.resolve().then(async () => {
        try {
          return await load_data({
            event,
            fetched,
            node,
            parent: async () => {
              const data = {};
              for (let j2 = 0; j2 < i2; j2 += 1) {
                Object.assign(data, await load_promises[j2]);
              }
              return data;
            },
            resolve_opts,
            server_data_promise: server_promises[i2],
            state,
            csr
          });
        } catch (e3) {
          load_error = /** @type {Error} */
          e3;
          throw load_error;
        }
      });
    });
    for (const p2 of server_promises) p2.catch(() => {
    });
    for (const p2 of load_promises) p2.catch(() => {
    });
    for (let i2 = 0; i2 < nodes.length; i2 += 1) {
      const node = nodes[i2];
      if (node) {
        try {
          const server_data = await server_promises[i2];
          const data = await load_promises[i2];
          branch.push({ node, server_data, data });
        } catch (e3) {
          const err = normalize_error(e3);
          if (err instanceof Redirect) {
            if (state.prerendering && should_prerender_data) {
              const body2 = JSON.stringify({
                type: "redirect",
                location: err.location
              });
              state.prerendering.dependencies.set(data_pathname, {
                response: text(body2),
                body: body2
              });
            }
            return redirect_response(err.status, err.location);
          }
          const status2 = get_status(err);
          const error = await handle_error_and_jsonify(event, options2, err);
          while (i2--) {
            if (page2.errors[i2]) {
              const index4 = (
                /** @type {number} */
                page2.errors[i2]
              );
              const node2 = await manifest2._.nodes[index4]();
              let j2 = i2;
              while (!branch[j2]) j2 -= 1;
              return await render_response({
                event,
                options: options2,
                manifest: manifest2,
                state,
                resolve_opts,
                page_config: { ssr: true, csr: true },
                status: status2,
                error,
                branch: compact(branch.slice(0, j2 + 1)).concat({
                  node: node2,
                  data: null,
                  server_data: null
                }),
                fetched
              });
            }
          }
          return static_error_page(options2, status2, error.message);
        }
      } else {
        branch.push(null);
      }
    }
    if (state.prerendering && should_prerender_data) {
      let { data, chunks } = get_data_json(
        event,
        options2,
        branch.map((node) => node?.server_data)
      );
      if (chunks) {
        for await (const chunk of chunks) {
          data += chunk;
        }
      }
      state.prerendering.dependencies.set(data_pathname, {
        response: text(data),
        body: data
      });
    }
    const ssr = get_option(nodes, "ssr") ?? true;
    return await render_response({
      event,
      options: options2,
      manifest: manifest2,
      state,
      resolve_opts,
      page_config: {
        csr: get_option(nodes, "csr") ?? true,
        ssr
      },
      status,
      error: null,
      branch: ssr === false ? [] : compact(branch),
      action_result,
      fetched
    });
  } catch (e3) {
    return await respond_with_error({
      event,
      options: options2,
      manifest: manifest2,
      state,
      status: 500,
      error: e3,
      resolve_opts
    });
  }
}
function exec(match, params, matchers) {
  const result = {};
  const values = match.slice(1);
  const values_needing_match = values.filter((value) => value !== void 0);
  let buffered = 0;
  for (let i2 = 0; i2 < params.length; i2 += 1) {
    const param = params[i2];
    let value = values[i2 - buffered];
    if (param.chained && param.rest && buffered) {
      value = values.slice(i2 - buffered, i2 + 1).filter((s22) => s22).join("/");
      buffered = 0;
    }
    if (value === void 0) {
      if (param.rest) result[param.name] = "";
      continue;
    }
    if (!param.matcher || matchers[param.matcher](value)) {
      result[param.name] = value;
      const next_param = params[i2 + 1];
      const next_value = values[i2 + 1];
      if (next_param && !next_param.rest && next_param.optional && next_value && param.chained) {
        buffered = 0;
      }
      if (!next_param && !next_value && Object.keys(result).length === values_needing_match.length) {
        buffered = 0;
      }
      continue;
    }
    if (param.optional && param.chained) {
      buffered++;
      continue;
    }
    return;
  }
  if (buffered) return;
  return result;
}
function validate_options(options2) {
  if (options2?.path === void 0) {
    throw new Error("You must specify a `path` when setting, deleting or serializing cookies");
  }
}
function get_cookies(request, url, trailing_slash) {
  const header = request.headers.get("cookie") ?? "";
  const initial_cookies = (0, import_cookie.parse)(header, { decode: (value) => value });
  const normalized_url = normalize_path(url.pathname, trailing_slash);
  const new_cookies = {};
  const defaults = {
    httpOnly: true,
    sameSite: "lax",
    secure: url.hostname === "localhost" && url.protocol === "http:" ? false : true
  };
  const cookies = {
    // The JSDoc param annotations appearing below for get, set and delete
    // are necessary to expose the `cookie` library types to
    // typescript users. `@type {import('@sveltejs/kit').Cookies}` above is not
    // sufficient to do so.
    /**
     * @param {string} name
     * @param {import('cookie').CookieParseOptions} opts
     */
    get(name2, opts) {
      const c3 = new_cookies[name2];
      if (c3 && domain_matches(url.hostname, c3.options.domain) && path_matches(url.pathname, c3.options.path)) {
        return c3.value;
      }
      const decoder = opts?.decode || decodeURIComponent;
      const req_cookies = (0, import_cookie.parse)(header, { decode: decoder });
      const cookie = req_cookies[name2];
      return cookie;
    },
    /**
     * @param {import('cookie').CookieParseOptions} opts
     */
    getAll(opts) {
      const decoder = opts?.decode || decodeURIComponent;
      const cookies2 = (0, import_cookie.parse)(header, { decode: decoder });
      for (const c3 of Object.values(new_cookies)) {
        if (domain_matches(url.hostname, c3.options.domain) && path_matches(url.pathname, c3.options.path)) {
          cookies2[c3.name] = c3.value;
        }
      }
      return Object.entries(cookies2).map(([name2, value]) => ({ name: name2, value }));
    },
    /**
     * @param {string} name
     * @param {string} value
     * @param {import('./page/types.js').Cookie['options']} options
     */
    set(name2, value, options2) {
      validate_options(options2);
      set_internal(name2, value, { ...defaults, ...options2 });
    },
    /**
     * @param {string} name
     *  @param {import('./page/types.js').Cookie['options']} options
     */
    delete(name2, options2) {
      validate_options(options2);
      cookies.set(name2, "", { ...options2, maxAge: 0 });
    },
    /**
     * @param {string} name
     * @param {string} value
     *  @param {import('./page/types.js').Cookie['options']} options
     */
    serialize(name2, value, options2) {
      validate_options(options2);
      let path = options2.path;
      if (!options2.domain || options2.domain === url.hostname) {
        path = resolve(normalized_url, path);
      }
      return (0, import_cookie.serialize)(name2, value, { ...defaults, ...options2, path });
    }
  };
  function get_cookie_header(destination, header2) {
    const combined_cookies = {
      // cookies sent by the user agent have lowest precedence
      ...initial_cookies
    };
    for (const key2 in new_cookies) {
      const cookie = new_cookies[key2];
      if (!domain_matches(destination.hostname, cookie.options.domain)) continue;
      if (!path_matches(destination.pathname, cookie.options.path)) continue;
      const encoder2 = cookie.options.encode || encodeURIComponent;
      combined_cookies[cookie.name] = encoder2(cookie.value);
    }
    if (header2) {
      const parsed = (0, import_cookie.parse)(header2, { decode: (value) => value });
      for (const name2 in parsed) {
        combined_cookies[name2] = parsed[name2];
      }
    }
    return Object.entries(combined_cookies).map(([name2, value]) => `${name2}=${value}`).join("; ");
  }
  function set_internal(name2, value, options2) {
    let path = options2.path;
    if (!options2.domain || options2.domain === url.hostname) {
      path = resolve(normalized_url, path);
    }
    new_cookies[name2] = { name: name2, value, options: { ...options2, path } };
  }
  return { cookies, new_cookies, get_cookie_header, set_internal };
}
function domain_matches(hostname, constraint) {
  if (!constraint) return true;
  const normalized = constraint[0] === "." ? constraint.slice(1) : constraint;
  if (hostname === normalized) return true;
  return hostname.endsWith("." + normalized);
}
function path_matches(path, constraint) {
  if (!constraint) return true;
  const normalized = constraint.endsWith("/") ? constraint.slice(0, -1) : constraint;
  if (path === normalized) return true;
  return path.startsWith(normalized + "/");
}
function add_cookies_to_headers(headers2, cookies) {
  for (const new_cookie of cookies) {
    const { name: name2, value, options: options2 } = new_cookie;
    headers2.append("set-cookie", (0, import_cookie.serialize)(name2, value, options2));
    if (options2.path.endsWith(".html")) {
      const path = add_data_suffix(options2.path);
      headers2.append("set-cookie", (0, import_cookie.serialize)(name2, value, { ...options2, path }));
    }
  }
}
var setCookie = { exports: {} };
var defaultParseOptions = {
  decodeValues: true,
  map: false,
  silent: false
};
function isNonEmptyString(str) {
  return typeof str === "string" && !!str.trim();
}
function parseString(setCookieValue, options2) {
  var parts = setCookieValue.split(";").filter(isNonEmptyString);
  var nameValuePairStr = parts.shift();
  var parsed = parseNameValuePair(nameValuePairStr);
  var name2 = parsed.name;
  var value = parsed.value;
  options2 = options2 ? Object.assign({}, defaultParseOptions, options2) : defaultParseOptions;
  try {
    value = options2.decodeValues ? decodeURIComponent(value) : value;
  } catch (e3) {
    console.error(
      "set-cookie-parser encountered an error while decoding a cookie with value '" + value + "'. Set options.decodeValues to false to disable this feature.",
      e3
    );
  }
  var cookie = {
    name: name2,
    value
  };
  parts.forEach(function(part) {
    var sides = part.split("=");
    var key2 = sides.shift().trimLeft().toLowerCase();
    var value2 = sides.join("=");
    if (key2 === "expires") {
      cookie.expires = new Date(value2);
    } else if (key2 === "max-age") {
      cookie.maxAge = parseInt(value2, 10);
    } else if (key2 === "secure") {
      cookie.secure = true;
    } else if (key2 === "httponly") {
      cookie.httpOnly = true;
    } else if (key2 === "samesite") {
      cookie.sameSite = value2;
    } else if (key2 === "partitioned") {
      cookie.partitioned = true;
    } else {
      cookie[key2] = value2;
    }
  });
  return cookie;
}
function parseNameValuePair(nameValuePairStr) {
  var name2 = "";
  var value = "";
  var nameValueArr = nameValuePairStr.split("=");
  if (nameValueArr.length > 1) {
    name2 = nameValueArr.shift();
    value = nameValueArr.join("=");
  } else {
    value = nameValuePairStr;
  }
  return { name: name2, value };
}
function parse(input, options2) {
  options2 = options2 ? Object.assign({}, defaultParseOptions, options2) : defaultParseOptions;
  if (!input) {
    if (!options2.map) {
      return [];
    } else {
      return {};
    }
  }
  if (input.headers) {
    if (typeof input.headers.getSetCookie === "function") {
      input = input.headers.getSetCookie();
    } else if (input.headers["set-cookie"]) {
      input = input.headers["set-cookie"];
    } else {
      var sch = input.headers[Object.keys(input.headers).find(function(key2) {
        return key2.toLowerCase() === "set-cookie";
      })];
      if (!sch && input.headers.cookie && !options2.silent) {
        console.warn(
          "Warning: set-cookie-parser appears to have been called on a request object. It is designed to parse Set-Cookie headers from responses, not Cookie headers from requests. Set the option {silent: true} to suppress this warning."
        );
      }
      input = sch;
    }
  }
  if (!Array.isArray(input)) {
    input = [input];
  }
  options2 = options2 ? Object.assign({}, defaultParseOptions, options2) : defaultParseOptions;
  if (!options2.map) {
    return input.filter(isNonEmptyString).map(function(str) {
      return parseString(str, options2);
    });
  } else {
    var cookies = {};
    return input.filter(isNonEmptyString).reduce(function(cookies2, str) {
      var cookie = parseString(str, options2);
      cookies2[cookie.name] = cookie;
      return cookies2;
    }, cookies);
  }
}
function splitCookiesString(cookiesString) {
  if (Array.isArray(cookiesString)) {
    return cookiesString;
  }
  if (typeof cookiesString !== "string") {
    return [];
  }
  var cookiesStrings = [];
  var pos = 0;
  var start;
  var ch;
  var lastComma;
  var nextStart;
  var cookiesSeparatorFound;
  function skipWhitespace() {
    while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
      pos += 1;
    }
    return pos < cookiesString.length;
  }
  function notSpecialChar() {
    ch = cookiesString.charAt(pos);
    return ch !== "=" && ch !== ";" && ch !== ",";
  }
  while (pos < cookiesString.length) {
    start = pos;
    cookiesSeparatorFound = false;
    while (skipWhitespace()) {
      ch = cookiesString.charAt(pos);
      if (ch === ",") {
        lastComma = pos;
        pos += 1;
        skipWhitespace();
        nextStart = pos;
        while (pos < cookiesString.length && notSpecialChar()) {
          pos += 1;
        }
        if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
          cookiesSeparatorFound = true;
          pos = nextStart;
          cookiesStrings.push(cookiesString.substring(start, lastComma));
          start = pos;
        } else {
          pos = lastComma + 1;
        }
      } else {
        pos += 1;
      }
    }
    if (!cookiesSeparatorFound || pos >= cookiesString.length) {
      cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
    }
  }
  return cookiesStrings;
}
setCookie.exports = parse;
setCookie.exports.parse = parse;
var parseString_1 = setCookie.exports.parseString = parseString;
var splitCookiesString_1 = setCookie.exports.splitCookiesString = splitCookiesString;
function create_fetch({ event, options: options2, manifest: manifest2, state, get_cookie_header, set_internal }) {
  const server_fetch = async (info, init2) => {
    const original_request = normalize_fetch_input(info, init2, event.url);
    let mode = (info instanceof Request ? info.mode : init2?.mode) ?? "cors";
    let credentials = (info instanceof Request ? info.credentials : init2?.credentials) ?? "same-origin";
    return options2.hooks.handleFetch({
      event,
      request: original_request,
      fetch: async (info2, init3) => {
        const request = normalize_fetch_input(info2, init3, event.url);
        const url = new URL(request.url);
        if (!request.headers.has("origin")) {
          request.headers.set("origin", event.url.origin);
        }
        if (info2 !== original_request) {
          mode = (info2 instanceof Request ? info2.mode : init3?.mode) ?? "cors";
          credentials = (info2 instanceof Request ? info2.credentials : init3?.credentials) ?? "same-origin";
        }
        if ((request.method === "GET" || request.method === "HEAD") && (mode === "no-cors" && url.origin !== event.url.origin || url.origin === event.url.origin)) {
          request.headers.delete("origin");
        }
        if (url.origin !== event.url.origin) {
          if (`.${url.hostname}`.endsWith(`.${event.url.hostname}`) && credentials !== "omit") {
            const cookie = get_cookie_header(url, request.headers.get("cookie"));
            if (cookie) request.headers.set("cookie", cookie);
          }
          return fetch(request);
        }
        const prefix = assets || base;
        const decoded = decodeURIComponent(url.pathname);
        const filename = (decoded.startsWith(prefix) ? decoded.slice(prefix.length) : decoded).slice(1);
        const filename_html = `${filename}/index.html`;
        const is_asset = manifest2.assets.has(filename);
        const is_asset_html = manifest2.assets.has(filename_html);
        if (is_asset || is_asset_html) {
          const file = is_asset ? filename : filename_html;
          if (state.read) {
            const type = is_asset ? manifest2.mimeTypes[filename.slice(filename.lastIndexOf("."))] : "text/html";
            return new Response(state.read(file), {
              headers: type ? { "content-type": type } : {}
            });
          }
          return await fetch(request);
        }
        if (credentials !== "omit") {
          const cookie = get_cookie_header(url, request.headers.get("cookie"));
          if (cookie) {
            request.headers.set("cookie", cookie);
          }
          const authorization = event.request.headers.get("authorization");
          if (authorization && !request.headers.has("authorization")) {
            request.headers.set("authorization", authorization);
          }
        }
        if (!request.headers.has("accept")) {
          request.headers.set("accept", "*/*");
        }
        if (!request.headers.has("accept-language")) {
          request.headers.set(
            "accept-language",
            /** @type {string} */
            event.request.headers.get("accept-language")
          );
        }
        const response = await respond(request, options2, manifest2, {
          ...state,
          depth: state.depth + 1
        });
        const set_cookie = response.headers.get("set-cookie");
        if (set_cookie) {
          for (const str of splitCookiesString_1(set_cookie)) {
            const { name: name2, value, ...options3 } = parseString_1(str, {
              decodeValues: false
            });
            const path = options3.path ?? (url.pathname.split("/").slice(0, -1).join("/") || "/");
            set_internal(name2, value, {
              path,
              encode: (value2) => value2,
              .../** @type {import('cookie').CookieSerializeOptions} */
              options3
            });
          }
        }
        return response;
      }
    });
  };
  return (input, init2) => {
    const response = server_fetch(input, init2);
    response.catch(() => {
    });
    return response;
  };
}
function normalize_fetch_input(info, init2, url) {
  if (info instanceof Request) {
    return info;
  }
  return new Request(typeof info === "string" ? new URL(info, url) : info, init2);
}
var body;
var etag;
var headers;
function get_public_env(request) {
  body ??= `export const env=${JSON.stringify(public_env)}`;
  etag ??= `W/${Date.now()}`;
  headers ??= new Headers({
    "content-type": "application/javascript; charset=utf-8",
    etag
  });
  if (request.headers.get("if-none-match") === etag) {
    return new Response(void 0, { status: 304, headers });
  }
  return new Response(body, { headers });
}
function get_page_config(nodes) {
  let current = {};
  for (const node of nodes) {
    if (!node?.universal?.config && !node?.server?.config) continue;
    current = {
      ...current,
      ...node?.universal?.config,
      ...node?.server?.config
    };
  }
  return Object.keys(current).length ? current : void 0;
}
var default_transform = ({ html }) => html;
var default_filter = () => false;
var default_preload = ({ type }) => type === "js" || type === "css";
var page_methods = /* @__PURE__ */ new Set(["GET", "HEAD", "POST"]);
var allowed_page_methods = /* @__PURE__ */ new Set(["GET", "HEAD", "OPTIONS"]);
async function respond(request, options2, manifest2, state) {
  const url = new URL(request.url);
  if (options2.csrf_check_origin) {
    const forbidden = is_form_content_type(request) && (request.method === "POST" || request.method === "PUT" || request.method === "PATCH" || request.method === "DELETE") && request.headers.get("origin") !== url.origin;
    if (forbidden) {
      const csrf_error = new HttpError(
        403,
        `Cross-site ${request.method} form submissions are forbidden`
      );
      if (request.headers.get("accept") === "application/json") {
        return json(csrf_error.body, { status: csrf_error.status });
      }
      return text(csrf_error.body.message, { status: csrf_error.status });
    }
  }
  let rerouted_path;
  try {
    rerouted_path = options2.hooks.reroute({ url: new URL(url) }) ?? url.pathname;
  } catch {
    return text("Internal Server Error", {
      status: 500
    });
  }
  let decoded;
  try {
    decoded = decode_pathname(rerouted_path);
  } catch {
    return text("Malformed URI", { status: 400 });
  }
  let route = null;
  let params = {};
  if (base && !state.prerendering?.fallback) {
    if (!decoded.startsWith(base)) {
      return text("Not found", { status: 404 });
    }
    decoded = decoded.slice(base.length) || "/";
  }
  if (decoded === `/${options2.app_dir}/env.js`) {
    return get_public_env(request);
  }
  if (decoded.startsWith(`/${options2.app_dir}`)) {
    const headers22 = new Headers();
    headers22.set("cache-control", "public, max-age=0, must-revalidate");
    return text("Not found", { status: 404, headers: headers22 });
  }
  const is_data_request = has_data_suffix(decoded);
  let invalidated_data_nodes;
  if (is_data_request) {
    decoded = strip_data_suffix(decoded) || "/";
    url.pathname = strip_data_suffix(url.pathname) + (url.searchParams.get(TRAILING_SLASH_PARAM) === "1" ? "/" : "") || "/";
    url.searchParams.delete(TRAILING_SLASH_PARAM);
    invalidated_data_nodes = url.searchParams.get(INVALIDATED_PARAM)?.split("").map((node) => node === "1");
    url.searchParams.delete(INVALIDATED_PARAM);
  }
  if (!state.prerendering?.fallback) {
    const matchers = await manifest2._.matchers();
    for (const candidate of manifest2._.routes) {
      const match = candidate.pattern.exec(decoded);
      if (!match) continue;
      const matched = exec(match, candidate.params, matchers);
      if (matched) {
        route = candidate;
        params = decode_params(matched);
        break;
      }
    }
  }
  let trailing_slash = void 0;
  const headers2 = {};
  let cookies_to_add = {};
  const event = {
    // @ts-expect-error `cookies` and `fetch` need to be created after the `event` itself
    cookies: null,
    // @ts-expect-error
    fetch: null,
    getClientAddress: state.getClientAddress || (() => {
      throw new Error(
        `${"@sveltejs/adapter-cloudflare"} does not specify getClientAddress. Please raise an issue`
      );
    }),
    locals: {},
    params,
    platform: state.platform,
    request,
    route: { id: route?.id ?? null },
    setHeaders: (new_headers) => {
      for (const key2 in new_headers) {
        const lower = key2.toLowerCase();
        const value = new_headers[key2];
        if (lower === "set-cookie") {
          throw new Error(
            "Use `event.cookies.set(name, value, options)` instead of `event.setHeaders` to set cookies"
          );
        } else if (lower in headers2) {
          throw new Error(`"${key2}" header is already set`);
        } else {
          headers2[lower] = value;
          if (state.prerendering && lower === "cache-control") {
            state.prerendering.cache = /** @type {string} */
            value;
          }
        }
      }
    },
    url,
    isDataRequest: is_data_request,
    isSubRequest: state.depth > 0
  };
  let resolve_opts = {
    transformPageChunk: default_transform,
    filterSerializedResponseHeaders: default_filter,
    preload: default_preload
  };
  try {
    if (route) {
      if (url.pathname === base || url.pathname === base + "/") {
        trailing_slash = "always";
      } else if (route.page) {
        const nodes = await load_page_nodes(route.page, manifest2);
        if (DEV) ;
        trailing_slash = get_option(nodes, "trailingSlash");
      } else if (route.endpoint) {
        const node = await route.endpoint();
        trailing_slash = node.trailingSlash;
        if (DEV) ;
      }
      if (!is_data_request) {
        const normalized = normalize_path(url.pathname, trailing_slash ?? "never");
        if (normalized !== url.pathname && !state.prerendering?.fallback) {
          return new Response(void 0, {
            status: 308,
            headers: {
              "x-sveltekit-normalize": "1",
              location: (
                // ensure paths starting with '//' are not treated as protocol-relative
                (normalized.startsWith("//") ? url.origin + normalized : normalized) + (url.search === "?" ? "" : url.search)
              )
            }
          });
        }
      }
      if (state.before_handle || state.emulator?.platform) {
        let config2 = {};
        let prerender = false;
        if (route.endpoint) {
          const node = await route.endpoint();
          config2 = node.config ?? config2;
          prerender = node.prerender ?? prerender;
        } else if (route.page) {
          const nodes = await load_page_nodes(route.page, manifest2);
          config2 = get_page_config(nodes) ?? config2;
          prerender = get_option(nodes, "prerender") ?? false;
        }
        if (state.before_handle) {
          state.before_handle(event, config2, prerender);
        }
        if (state.emulator?.platform) {
          event.platform = await state.emulator.platform({ config: config2, prerender });
        }
      }
    } else if (state.emulator?.platform) {
      event.platform = await state.emulator.platform({
        config: {},
        prerender: !!state.prerendering?.fallback
      });
    }
    const { cookies, new_cookies, get_cookie_header, set_internal } = get_cookies(
      request,
      url,
      trailing_slash ?? "never"
    );
    cookies_to_add = new_cookies;
    event.cookies = cookies;
    event.fetch = create_fetch({
      event,
      options: options2,
      manifest: manifest2,
      state,
      get_cookie_header,
      set_internal
    });
    if (state.prerendering && !state.prerendering.fallback) disable_search(url);
    const response = await options2.hooks.handle({
      event,
      resolve: (event2, opts) => resolve2(event2, opts).then((response2) => {
        for (const key2 in headers2) {
          const value = headers2[key2];
          response2.headers.set(
            key2,
            /** @type {string} */
            value
          );
        }
        add_cookies_to_headers(response2.headers, Object.values(cookies_to_add));
        if (state.prerendering && event2.route.id !== null) {
          response2.headers.set("x-sveltekit-routeid", encodeURI(event2.route.id));
        }
        return response2;
      })
    });
    if (response.status === 200 && response.headers.has("etag")) {
      let if_none_match_value = request.headers.get("if-none-match");
      if (if_none_match_value?.startsWith('W/"')) {
        if_none_match_value = if_none_match_value.substring(2);
      }
      const etag2 = (
        /** @type {string} */
        response.headers.get("etag")
      );
      if (if_none_match_value === etag2) {
        const headers22 = new Headers({ etag: etag2 });
        for (const key2 of [
          "cache-control",
          "content-location",
          "date",
          "expires",
          "vary",
          "set-cookie"
        ]) {
          const value = response.headers.get(key2);
          if (value) headers22.set(key2, value);
        }
        return new Response(void 0, {
          status: 304,
          headers: headers22
        });
      }
    }
    if (is_data_request && response.status >= 300 && response.status <= 308) {
      const location = response.headers.get("location");
      if (location) {
        return redirect_json_response(new Redirect(
          /** @type {any} */
          response.status,
          location
        ));
      }
    }
    return response;
  } catch (e3) {
    if (e3 instanceof Redirect) {
      const response = is_data_request ? redirect_json_response(e3) : route?.page && is_action_json_request(event) ? action_json_redirect(e3) : redirect_response(e3.status, e3.location);
      add_cookies_to_headers(response.headers, Object.values(cookies_to_add));
      return response;
    }
    return await handle_fatal_error(event, options2, e3);
  }
  async function resolve2(event2, opts) {
    try {
      if (opts) {
        resolve_opts = {
          transformPageChunk: opts.transformPageChunk || default_transform,
          filterSerializedResponseHeaders: opts.filterSerializedResponseHeaders || default_filter,
          preload: opts.preload || default_preload
        };
      }
      if (state.prerendering?.fallback) {
        return await render_response({
          event: event2,
          options: options2,
          manifest: manifest2,
          state,
          page_config: { ssr: false, csr: true },
          status: 200,
          error: null,
          branch: [],
          fetched: [],
          resolve_opts
        });
      }
      if (route) {
        const method = (
          /** @type {import('types').HttpMethod} */
          event2.request.method
        );
        let response;
        if (is_data_request) {
          response = await render_data(
            event2,
            route,
            options2,
            manifest2,
            state,
            invalidated_data_nodes,
            trailing_slash ?? "never"
          );
        } else if (route.endpoint && (!route.page || is_endpoint_request(event2))) {
          response = await render_endpoint(event2, await route.endpoint(), state);
        } else if (route.page) {
          if (page_methods.has(method)) {
            response = await render_page(event2, route.page, options2, manifest2, state, resolve_opts);
          } else {
            const allowed_methods2 = new Set(allowed_page_methods);
            const node = await manifest2._.nodes[route.page.leaf]();
            if (node?.server?.actions) {
              allowed_methods2.add("POST");
            }
            if (method === "OPTIONS") {
              response = new Response(null, {
                status: 204,
                headers: {
                  allow: Array.from(allowed_methods2.values()).join(", ")
                }
              });
            } else {
              const mod = [...allowed_methods2].reduce(
                (acc, curr) => {
                  acc[curr] = true;
                  return acc;
                },
                /** @type {Record<string, any>} */
                {}
              );
              response = method_not_allowed(mod, method);
            }
          }
        } else {
          throw new Error("This should never happen");
        }
        if (request.method === "GET" && route.page && route.endpoint) {
          const vary = response.headers.get("vary")?.split(",")?.map((v2) => v2.trim().toLowerCase());
          if (!(vary?.includes("accept") || vary?.includes("*"))) {
            response = new Response(response.body, {
              status: response.status,
              statusText: response.statusText,
              headers: new Headers(response.headers)
            });
            response.headers.append("Vary", "Accept");
          }
        }
        return response;
      }
      if (state.error && event2.isSubRequest) {
        return await fetch(request, {
          headers: {
            "x-sveltekit-error": "true"
          }
        });
      }
      if (state.error) {
        return text("Internal Server Error", {
          status: 500
        });
      }
      if (state.depth === 0) {
        return await respond_with_error({
          event: event2,
          options: options2,
          manifest: manifest2,
          state,
          status: 404,
          error: new SvelteKitError(404, "Not Found", `Not found: ${event2.url.pathname}`),
          resolve_opts
        });
      }
      if (state.prerendering) {
        return text("not found", { status: 404 });
      }
      return await fetch(request);
    } catch (e3) {
      return await handle_fatal_error(event2, options2, e3);
    } finally {
      event2.cookies.set = () => {
        throw new Error("Cannot use `cookies.set(...)` after the response has been generated");
      };
      event2.setHeaders = () => {
        throw new Error("Cannot use `setHeaders(...)` after the response has been generated");
      };
    }
  }
}
function filter_private_env(env, { public_prefix, private_prefix }) {
  return Object.fromEntries(
    Object.entries(env).filter(
      ([k]) => k.startsWith(private_prefix) && (public_prefix === "" || !k.startsWith(public_prefix))
    )
  );
}
function filter_public_env(env, { public_prefix, private_prefix }) {
  return Object.fromEntries(
    Object.entries(env).filter(
      ([k]) => k.startsWith(public_prefix) && (private_prefix === "" || !k.startsWith(private_prefix))
    )
  );
}
var prerender_env_handler = {
  get({ type }, prop) {
    throw new Error(
      `Cannot read values from $env/dynamic/${type} while prerendering (attempted to read env.${prop.toString()}). Use $env/static/${type} instead`
    );
  }
};
var Server = class {
  /** @type {import('types').SSROptions} */
  #options;
  /** @type {import('@sveltejs/kit').SSRManifest} */
  #manifest;
  /** @param {import('@sveltejs/kit').SSRManifest} manifest */
  constructor(manifest2) {
    this.#options = options;
    this.#manifest = manifest2;
  }
  /**
   * @param {{
   *   env: Record<string, string>;
   *   read?: (file: string) => ReadableStream;
   * }} opts
   */
  async init({ env, read }) {
    const prefixes2 = {
      public_prefix: this.#options.env_public_prefix,
      private_prefix: this.#options.env_private_prefix
    };
    const private_env = filter_private_env(env, prefixes2);
    const public_env2 = filter_public_env(env, prefixes2);
    set_private_env(
      prerendering ? new Proxy({ type: "private" }, prerender_env_handler) : private_env
    );
    set_public_env(
      prerendering ? new Proxy({ type: "public" }, prerender_env_handler) : public_env2
    );
    set_safe_public_env(public_env2);
    if (!this.#options.hooks) {
      try {
        const module = await get_hooks();
        this.#options.hooks = {
          handle: module.handle || (({ event, resolve: resolve2 }) => resolve2(event)),
          handleError: module.handleError || (({ error }) => console.error(error)),
          handleFetch: module.handleFetch || (({ request, fetch: fetch2 }) => fetch2(request)),
          reroute: module.reroute || (() => {
          })
        };
      } catch (error) {
        {
          throw error;
        }
      }
    }
  }
  /**
   * @param {Request} request
   * @param {import('types').RequestOptions} options
   */
  async respond(request, options2) {
    return respond(request, this.#options, this.#manifest, {
      ...options2,
      error: false,
      depth: 0
    });
  }
};

// .svelte-kit/cloudflare-tmp/manifest.js
var manifest = (() => {
  function __memo(fn) {
    let value;
    return () => value ??= value = fn();
  }
  return {
    appDir: "_app",
    appPath: "_app",
    assets: /* @__PURE__ */ new Set(["favicon.png", "icons/.vscode/c_cpp_properties.json", "icons/avatarPlaceholder.png", "icons/avatarPlaceholder.svg", "icons/BellIcon.svg", "icons/ChannelListMagnifyingGlassIcon.svg", "icons/ChatIcon.svg", "icons/MicrophoneIcon.svg", "icons/ReactionIcon.svg", "icons/ServerIcon.svg", "icons/ThreadIcon.svg", "icons/UserPlusIcon.svg"]),
    mimeTypes: { ".png": "image/png", ".json": "application/json", ".svg": "image/svg+xml" },
    _: {
      client: { "start": "_app/immutable/entry/start.aKLjVR_b.js", "app": "_app/immutable/entry/app.YcJUHUo8.js", "imports": ["_app/immutable/entry/start.aKLjVR_b.js", "_app/immutable/chunks/entry.Br0ynyO8.js", "_app/immutable/chunks/scheduler.DExV6eFp.js", "_app/immutable/entry/app.YcJUHUo8.js", "_app/immutable/chunks/scheduler.DExV6eFp.js", "_app/immutable/chunks/index.Bd35QqEY.js"], "stylesheets": [], "fonts": [], "uses_env_dynamic_public": false },
      nodes: [
        __memo(() => Promise.resolve().then(() => (init__(), __exports))),
        __memo(() => Promise.resolve().then(() => (init__2(), __exports2))),
        __memo(() => Promise.resolve().then(() => (init__3(), __exports3)))
      ],
      routes: [
        {
          id: "/",
          pattern: /^\/$/,
          params: [],
          page: { layouts: [0], errors: [1], leaf: 2 },
          endpoint: null
        }
      ],
      matchers: async () => {
        return {};
      },
      server_assets: {}
    }
  };
})();
var prerendered = /* @__PURE__ */ new Set([]);
var base_path = "";

// .svelte-kit/cloudflare-tmp/_worker.js
async function e2(e3, t22) {
  let n22 = "string" != typeof t22 && "HEAD" === t22.method;
  n22 && (t22 = new Request(t22, { method: "GET" }));
  let r3 = await e3.match(t22);
  return n22 && r3 && (r3 = new Response(null, r3)), r3;
}
function t2(e3, t22, n22, o22) {
  return ("string" == typeof t22 || "GET" === t22.method) && r2(n22) && (n22.headers.has("Set-Cookie") && (n22 = new Response(n22.body, n22)).headers.append("Cache-Control", "private=Set-Cookie"), o22.waitUntil(e3.put(t22, n22.clone()))), n22;
}
var n2 = /* @__PURE__ */ new Set([200, 203, 204, 300, 301, 404, 405, 410, 414, 501]);
function r2(e3) {
  if (!n2.has(e3.status)) return false;
  if (~(e3.headers.get("Vary") || "").indexOf("*")) return false;
  let t22 = e3.headers.get("Cache-Control") || "";
  return !/(private|no-cache|no-store)/i.test(t22);
}
function o2(n22) {
  return async function(r3, o22) {
    let a2 = await e2(n22, r3);
    if (a2) return a2;
    o22.defer((e3) => {
      t2(n22, r3, e3, o22);
    });
  };
}
var s3 = caches.default;
var c2 = t2.bind(0, s3);
var r22 = e2.bind(0, s3);
var e22 = o2.bind(0, s3);
var server = new Server(manifest);
var app_path = `/${manifest.appPath}`;
var immutable = `${app_path}/immutable/`;
var version_file = `${app_path}/version.json`;
var worker = {
  async fetch(req, env, context) {
    await server.init({ env });
    let pragma = req.headers.get("cache-control") || "";
    let res = !pragma.includes("no-cache") && await r22(req);
    if (res) return res;
    let { pathname, search } = new URL(req.url);
    try {
      pathname = decodeURIComponent(pathname);
    } catch {
    }
    const stripped_pathname = pathname.replace(/\/$/, "");
    let is_static_asset = false;
    const filename = stripped_pathname.slice(base_path.length + 1);
    if (filename) {
      is_static_asset = manifest.assets.has(filename) || manifest.assets.has(filename + "/index.html") || filename in manifest._.server_assets || filename + "/index.html" in manifest._.server_assets;
    }
    let location = pathname.at(-1) === "/" ? stripped_pathname : pathname + "/";
    if (is_static_asset || prerendered.has(pathname) || pathname === version_file || pathname.startsWith(immutable)) {
      res = await env.ASSETS.fetch(req);
    } else if (location && prerendered.has(location)) {
      if (search) location += search;
      res = new Response("", {
        status: 308,
        headers: {
          location
        }
      });
    } else {
      res = await server.respond(req, {
        // @ts-ignore
        platform: { env, context, caches, cf: req.cf },
        getClientAddress() {
          return req.headers.get("cf-connecting-ip");
        }
      });
    }
    pragma = res.headers.get("cache-control") || "";
    return pragma && res.status < 400 ? c2(req, res, context) : res;
  }
};
var worker_default = worker;
export {
  worker_default as default
};
/*! Bundled license information:

cookie/index.js:
  (*!
   * cookie
   * Copyright(c) 2012-2014 Roman Shtylman
   * Copyright(c) 2015 Douglas Christopher Wilson
   * MIT Licensed
   *)
*/
//# sourceMappingURL=_worker.js.map
