"use strict";

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _crayon = require("crayon-terminal");

var _crayon2 = _interopRequireWildcard(_crayon);

var _import = require("lodash");

var _import2 = _interopRequireWildcard(_import);

var _upperCaseFirst = require("../Utillities.js");

var separator = {
    none: "",
    normal: "",
    thin: "",
    reverse: "",
    "reverse-thin": ""
};

var defaultOptions = {
    background: "yellow",
    foreground: "black",
    fill: false,
    separator: "normal"
};

var BaseSegment = (function () {
    function BaseSegment(options) {
        _classCallCheck(this, BaseSegment);

        this.options = _import2["default"].merge({}, defaultOptions, options);
    }

    _createClass(BaseSegment, [{
        key: "background",
        get: function () {
            return this.options.background;
        }
    }, {
        key: "foreground",
        get: function () {
            return this.options.foreground;
        }
    }, {
        key: "calculateNeededScreenspace",
        value: function calculateNeededScreenspace(nextSegment) {
            return _crayon2["default"].stripColor(this.render(nextSegment)).length;
        }
    }, {
        key: "render",
        value: function render(nextSegment) {
            var maxFillSpace = arguments[1] === undefined ? null : arguments[1];

            var content = " " + this.provideContent() + " ";
            var format = this.createContentFormatter();
            var output;
            if (this.options.fill && maxFillSpace !== null) {
                output = format(this.padToFill(content, maxFillSpace - (nextSegment === null ? 0 : 1))) + this.renderSeparator(nextSegment);
            } else {
                output = format(content) + this.renderSeparator(nextSegment);
            }

            return output;
        }
    }, {
        key: "padToFill",
        value: function padToFill(output, padLength) {
            if (output.length > padLength) {
                return output.substring(0, padLength - 2) + "… ";
            }

            return output + new Array(padLength - output.length + 1).join(" ");
        }
    }, {
        key: "createFormatter",
        value: function createFormatter(foreground, background) {
            var formatter = _crayon2["default"];

            switch (true) {
                case foreground.indexOf("#") === 0:
                    formatter = formatter.foreground(foreground);
                    break;
                default:
                    formatter = formatter[foreground.toLowerCase()];
                    break;
            }

            switch (true) {
                case background.indexOf("#") === 0:
                    formatter = formatter.background(background);
                    break;
                default:
                    formatter = formatter["bg" + _upperCaseFirst.upperCaseFirst(background)];
                    break;
            }

            return formatter;
        }
    }, {
        key: "createContentFormatter",
        value: function createContentFormatter() {
            return this.createFormatter(this.options.foreground, this.options.background);
        }
    }, {
        key: "createSeparatorFormatter",
        value: function createSeparatorFormatter(nextSegment) {
            switch (this.options.separator.toLowerCase()) {
                case "none":
                case "thin":
                case "reverse-thin":
                    return this.createFormatter(this.options.foreground, this.options.background);
                case "normal":
                    return this.createFormatter(this.options.background, nextSegment.background);
                case "reverse":
                    return this.createFormatter(nextSegment.background, this.options.background);
                default:
                    throw new Error("Unsupported separator style: " + this.options.separator);
            }
        }
    }, {
        key: "getSeparatorCharacter",
        value: function getSeparatorCharacter() {
            return separator[this.options.separator.toLowerCase()];
        }
    }, {
        key: "renderSeparator",
        value: function renderSeparator(nextSegment) {
            if (nextSegment === null) {
                return "";
            }

            var character = this.getSeparatorCharacter();
            var formatter = this.createSeparatorFormatter(nextSegment);
            return formatter(character);
        }
    }, {
        key: "provideContent",
        value: function provideContent() {
            throw new Error("Abstract method: provideContent");
        }
    }]);

    return BaseSegment;
})();

exports["default"] = BaseSegment;
module.exports = exports["default"];