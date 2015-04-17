import BaseSegment from "./Base";
import moment from "moment";

export default class StartTimeSegment extends BaseSegment {
    constructor(prefix, options) {
        super(options);

        this.prefix = prefix;

        this.resetStartTime();
    }

    resetStartTime() {
        this.startTime = new Date();
    }

    provideContent() {
        return `${this.prefix}${moment(this.startTime).fromNow()}`;
    }
}