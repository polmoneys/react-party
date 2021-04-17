'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var d3Shape = require('d3-shape');

function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () {
                        return e[k];
                    }
                });
            }
        });
    }
    n['default'] = e;
    return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/_interopNamespace(React);

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __spreadArray(to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
}

function mapPoints(el, boundary, spaceX, spaceY) {
    if (spaceX === void 0) { spaceX = 0; }
    if (spaceY === void 0) { spaceY = 0; }
    var rect;
    if ('current' in el) {
        rect = el.current.getBoundingClientRect();
    }
    else {
        rect = el.getBoundingClientRect();
    }
    var offsetWidth = Math.round(rect.width / 2);
    var offsetHeight = Math.round(rect.height / 2);
    return [Math.round(rect.left + offsetWidth - boundary.x) - spaceX, Math.round(rect.top + offsetHeight - boundary.y) - spaceY];
}
function matchRefsToPoints(refs, boundary, spaceX, spaceY) {
    var points = refs.map(function (p) { return mapPoints(p, boundary, spaceX, spaceY); });
    return new Promise(function (resolveIt) { return resolveIt(points); });
}

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = ".party-svg {\n  pointer-events: none;\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  overflow: visible;\n  z-index: 10;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0; }\n";
styleInject(css_248z);

var Party = function (props) {
    var _a = React__namespace.useState(null), pathValues = _a[0], setPathValues = _a[1];
    var boundary = props.boundary, refs = props.refs, _b = props.fill, fill = _b === void 0 ? 'currentColor' : _b, _c = props.weigth, weigth = _c === void 0 ? 4 : _c, _d = props.round, round = _d === void 0 ? true : _d, _e = props.x, x = _e === void 0 ? 0 : _e, _f = props.y, y = _f === void 0 ? 0 : _f, _g = props.variant, variant = _g === void 0 ? 'line' : _g, _h = props.transforms, transforms = _h === void 0 ? undefined : _h;
    var draw = React__namespace.useCallback(function () {
        if (boundary === null)
            return;
        matchRefsToPoints(refs, boundary, x, y)
            .then(function (points) {
            if (variant === 'line') {
                return d3Shape.line()(__spreadArray([], points));
            }
            else {
                return d3Shape.line().curve(d3Shape.curveCardinal)(__spreadArray([], points));
            }
        })
            .then(function (path) {
            var p = path;
            setPathValues(p);
        });
    }, [boundary, refs, x, y, variant]);
    React__namespace.useEffect(function () {
        draw();
    }, [boundary, draw]);
    return (React__namespace.createElement("svg", { className: "party-svg", style: {
            transform: transforms ? transforms : undefined,
        } }, pathValues && (React__namespace.createElement("path", { fill: "none", stroke: fill, strokeWidth: weigth, strokeLinecap: round ? 'round' : 'square', strokeLinejoin: round ? 'round' : 'miter', d: pathValues }))));
};

exports.Party = Party;
//# sourceMappingURL=index.js.map
