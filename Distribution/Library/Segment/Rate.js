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

var RateSegment = (function (_BaseSegment) {
    function RateSegment(startValues, options) {
        _classCallCheck(this, RateSegment);

        options = _import2["default"].merge({}, defaultOptions, options);
        _get(Object.getPrototypeOf(RateSegment.prototype), "constructor", this).call(this, options);

        this.startValues = startValues;
        this.counterValues = {};

        this.resetCounter();
    }

    _inherits(RateSegment, _BaseSegment);

    _createClass(RateSegment, [{
        key: "resetCounter",
        value: function resetCounter() {
            var _this = this;

            for (var _len = arguments.length, counterIds = Array(_len), _key = 0; _key < _len; _key++) {
                counterIds[_key] = arguments[_key];
            }

            if (counterIds.length === 0) {
                counterIds = Object.keys(this.startValues);
            }

            counterIds.forEach(function (id) {
                return _this.counterValues[id] = _this.startValues[id];
            });
        }
    }, {
        key: "step",
        value: function step(id) {
            var size = arguments[1] === undefined ? 1 : arguments[1];

            this.counterValues[id] += size;
        }
    }, {
        key: "provideContent",
        value: function provideContent() {
            var _this2 = this;

            var values = Object.keys(this.startValues).map(function (id) {
                return _this2.startValues[id];
            });
            var rate = Math.round(value[0] / value[1] * 10) / 10;
            return "" + this.options.prefix + "" + rate + "" + this.options.postfix;
        }
    }]);

    return RateSegment;
})(_BaseSegment3["default"]);

exports["default"] = RateSegment;
module.exports = exports["default"];