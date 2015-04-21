import BaseSegment from "../../Library/Segment/Base";

export default class SimpleBaseSegment extends BaseSegment {
    constructor(content, options) {
        super(options);
        this.content = content;
        this._mock = {
            provideContent: []
        };
    }

    provideContent() {
        this._mock.provideContent.push(arguments);
        return this.content;
    }
}