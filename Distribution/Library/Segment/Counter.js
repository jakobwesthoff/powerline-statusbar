"use strict";

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _BaseSegment2 = require("./Base");

var _BaseSegment3 = _interopRequireWildcard(_BaseSegment2);

var _import = require("lodash");

var _import2 = _interopRequireWildcard(_import);

var defaultOptions = {
    prefix: "",
    postfix: ""
};

var CounterSegment = (function (_BaseSegment) {
    function CounterSegment(startValue, options) {
        _classCallCheck(this, CounterSegment);

        options = _import2["default"].merge({}, defaultOptions, options);
        _get(Object.getPrototypeOf(CounterSegment.prototype), "constructor", this).call(this, options);

        this.startValue = startValue;

        this.resetCounter();
    }

    _inherits(CounterSegment, _BaseSegment);

    _createClass(CounterSegment, [{
        key: "resetCounter",
        value: function resetCounter() {
            var startValue = arguments[0] === undefined ? this.startValue : arguments[0];

            this.counterValue = startValue;
        }
    }, {
        key: "step",
        value: function step() {
            var size = arguments[0] === undefined ? 1 : arguments[0];

            this.counterValue += size;
        }
    }, {
        key: "provideContent",
        value: function provideContent() {
            return "" + this.options.prefix + "" + this.counterValue + "" + this.options.postfix;
        }
    }]);

    return CounterSegment;
})(_BaseSegment3["default"]);

exports["default"] = CounterSegment;
module.exports = exports["default"];