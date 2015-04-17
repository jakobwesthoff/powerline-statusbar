import BaseSegment from "./Base";
import _ from "lodash";

var defaultOptions = {
    prefix: "",
    postfix: ""
};

export default class RateSegment extends BaseSegment {
    constructor(startValues, options) {
        options  = _.merge({}, defaultOptions, options);
        super(options);

        this.startValues = startValues;
        this.counterValues = {};

        this.resetCounter();
    }

    resetCounter(...counterIds) {
        if (counterIds.length === 0) {
            counterIds = Object.keys(this.startValues);
        }

        counterIds.forEach(id => this.counterValues[id] = this.startValues[id]);
    }

    step(id, size = 1) {
        this.counterValues[id] += size;
    }

    provideContent() {
        var values = Object.keys(this.startValues).map(id => this.startValues[id]);
        var rate = Math.round((value[0]/value[1])*10)/10;
        return `${this.options.prefix}${rate}${this.options.postfix}`;
    }
}