export default class MockedSegment {
    constructor(content, foreground = null, background = null) {
        this._content = content;
        this._foreground = foreground;
        this._background = background;

        this._mock = {
            calculateNeededScreenspace: [],
            render: [],
            foreground: [],
            background: []
        };
    }

    get foreground() {
        this._mock.foreground.push(this._foreground);
        return this._foreground;
    }

    get background() {
        this._mock.background.push(this._background);
        return this._background;
    }

    calculateNeededScreenspace(nextSegment) {
        this._mock.calculateNeededScreenspace.push(arguments);
        return this._content.length;
    }

    render() {
        this._mock.render.push(arguments);
        return this._content;
    }
}
