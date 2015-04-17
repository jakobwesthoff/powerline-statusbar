import BaseSegment from "./Base";

export default class StaticSegment extends BaseSegment {
    constructor(content, options) {
        super(options);
        this.content = content;
    }

    provideContent() {
        return this.content;
    }
}