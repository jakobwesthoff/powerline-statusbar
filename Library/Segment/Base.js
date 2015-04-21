import crayon from "crayon-terminal";
import _ from "lodash";

import {upperCaseFirst} from "../Utillities.js";

var separator = {
    none: "",
    normal: "\ue0b0",
    thin: "\ue0b1",
    reverse: "\ue0b2",
    "reverse-thin": "\ue0b3"
};

var defaultOptions = {
    background: "yellow",
    foreground: "black",
    fill: false,
    separator: "normal"
};

export default class BaseSegment {
    constructor(options) {
        this.options = _.merge({}, defaultOptions, options);
    }

    get background() {
        return this.options.background;
    }

    get foreground() {
        return this.options.foreground;
    }

    calculateNeededScreenspace(nextSegment) {
        return crayon.stripColor(
            this.render(nextSegment)
        ).length;
    }

    render(nextSegment, maxFillSpace = null) {
        var content = ` ${this.provideContent()} `;
        var format = this.createContentFormatter();
        var output;
        if (this.options.fill && maxFillSpace !== null) {
            output = format(
                this.padToFill(content, maxFillSpace - (nextSegment === null ? 0 : 1))
            ) + this.renderSeparator(nextSegment);
        } else {
            output = format(content) + this.renderSeparator(nextSegment);
        }

        return output;
    }

    padToFill(output, padLength) {
        if (output.length > padLength) {
            return output.substring(0, padLength - 2) + "… ";
        }

        return output + (new Array(padLength - output.length + 1)).join(" ");
    }

    createFormatter(foreground, background) {
        return crayon.foreground(foreground.toLowerCase()).background(background.toLowerCase());
    }

    createContentFormatter() {
        return this.createFormatter(this.options.foreground, this.options.background);
    }

    createSeparatorFormatter(nextSegment) {
        switch(this.options.separator.toLowerCase()) {
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

    getSeparatorCharacter() {
        return separator[this.options.separator.toLowerCase()];
    }

    renderSeparator(nextSegment) {
        if (nextSegment === null) {
            return "";
        }

        var character = this.getSeparatorCharacter();
        var formatter = this.createSeparatorFormatter(nextSegment);
        return formatter(character);
    }

    provideContent() {
        throw new Error("Abstract method: provideContent");
    }
}