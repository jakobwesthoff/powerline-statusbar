import chalk from "chalk";
import _ from "lodash";

import {upperCaseFirst} from "./Utillities.js";

var separator = {
    compatible: {
        normal: '',
        thin: '\u276f'
    },
    patched: {
        normal: '\u2B80',
        thin: '\u2B81'
    }
};

var defaultOptions = {
    background: "yellow",
    foreground: "black",
    fill: false,
    separator: "normal",
    fontUsage: "compatible"
};

export default class StaticSegment {
    constructor(content, options) {
        this.content = content;
        this.options = _.merge({}, defaultOptions, options);
    }

    get background() {
        return this.options.background;
    }

    get foreground() {
        return this.options.foreground;
    }

    calculateNeededScreenspace(nextSegment) {
        return chalk.stripColor(
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
        return chalk[foreground.toLowerCase()]["bg" + upperCaseFirst(background)];
    }

    createContentFormatter() {
        return this.createFormatter(this.options.foreground, this.options.background);
    }

    createSeparatorFormatter(nextSegment) {
        if (this.options.separator === "thin") {
            return this.createFormatter(this.options.foreground, this.options.background);
        } else {
            return this.createFormatter(this.options.background, nextSegment.background);
        }
    }

    getSeparatorCharacter() {
        switch(this.options.separator.toLowerCase()) {
            case "none":
                return "";
            case "normal":
                return separator[this.options.fontUsage].normal;
            case "thin":
                return separator[this.options.fontUsage].thin;
            default:
                throw new Error("Unknown separator style: " + this.options.separator);
        }
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
        return this.content;
    }
}