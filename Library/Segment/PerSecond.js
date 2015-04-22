import BaseSegment from "./Base";
import _ from "lodash";
import moment from "moment";

var defaultOptions = {
    prefix: "",
    postfix: ""
};

export default class PerSecondSegment extends BaseSegment {
    constructor(startValue, options) {
        options  = _.merge({}, defaultOptions, options);
        super(options);

        this.startValue = startValue;
        this.resetCounter();
    }

    resetCounter(startValue = this.startValue) {
        this.counterValue = startValue;
        this.startTime = new Date();
    }

    step(size = 1) {
        this.counterValue += size;
    }

    provideContent() {
        var timeDifferenceInSeconds = moment().diff(this.startTime, "seconds");
        var rate = Math.round((this.counterValue/timeDifferenceInSeconds)*10)/10;
        return `${this.options.prefix}${rate}${this.options.postfix}`;
    }
}
