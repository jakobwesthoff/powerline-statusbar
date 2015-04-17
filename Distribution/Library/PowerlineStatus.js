"use strict";

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _cliwidth = require("cli-width");

var _cliwidth2 = _interopRequireWildcard(_cliwidth);

var PowerlineStatus = (function () {
    function PowerlineStatus() {
        for (var _len = arguments.length, segments = Array(_len), _key = 0; _key < _len; _key++) {
            segments[_key] = arguments[_key];
        }

        _classCallCheck(this, PowerlineStatus);

        this.segments = segments;
    }

    _createClass(PowerlineStatus, [{
        key: "render",
        value: function render() {
            var shiftedSegments = this.segments.slice(1);
            shiftedSegments.push(null);

            var segmentLengths = this.segments.map(function (segment, index) {
                return segment.calculateNeededScreenspace(shiftedSegments[index]);
            });

            var accumulatedLength = segmentLengths.reduce(function (accumulator, value) {
                return accumulator + value;
            }, 0);

            var screenWidth = _cliwidth2["default"]();
            var maxFillLength = screenWidth - accumulatedLength;

            var renderedSegments = this.segments.map(function (segment, index) {
                return segment.render(shiftedSegments[index], maxFillLength + segmentLengths[index]);
            });

            return renderedSegments.join("");
        }
    }]);

    return PowerlineStatus;
})();

exports["default"] = PowerlineStatus;
module.exports = exports["default"];