import BaseSegment from "./Base";
import _ from "lodash";

var defaultOptions = {
    prefix: "",
    postfix: ""
};

export default class CounterSegment extends BaseSegment {
    constructor(startValue, options) {
        options  = _.merge({}, defaultOptions, options);
        super(options);

        this.startValue = startValue;

        this.resetCounter();
    }

    resetCounter(startValue = this.startValue) {
        this.counterValue = startValue;
    }

    step(size = 1) {
        this.counterValue += size;
    }

    provideContent() {
        return `${this.options.prefix}${this.counterValue}${this.options.postfix}`;
    }
}