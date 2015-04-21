import PowerlineStatus from "../Library/PowerlineStatus";
import BaseSegment from "../Library/Segment/Base";

import cliwidth from "cli-width";

class MockedSegment {
    constructor(content) {
        this._content = content;

        this._mock = {};
        this._mock.calculateNeededScreenspace = [];
        this._mock.render = [];
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

describe("PowerlineStatus", function() {
    var statusbar;
    var segments;
    beforeEach(function() {
        segments = [];
        segments.push(new MockedSegment("Segment 1"));
        segments.push(new MockedSegment("+Segment 2+"));
        segments.push(new MockedSegment("--Segment 3--"));
        statusbar = new PowerlineStatus(...segments);
    });

    it("should concat data from all segments on render", function() {
        expect(statusbar.render()).toEqual("Segment 1+Segment 2+--Segment 3--");
    });

    it("should call calculateNeededScreenspace on each segment", function() {
        statusbar.render();
        expect(segments[0]._mock.calculateNeededScreenspace.length).toEqual(1);
        expect(segments[1]._mock.calculateNeededScreenspace.length).toEqual(1);
        expect(segments[2]._mock.calculateNeededScreenspace.length).toEqual(1);
    });

    it("should provide nextSegment to calculateNeededScreenspace", function() {
        statusbar.render();
        expect(segments[0]._mock.calculateNeededScreenspace[0][0]).toEqual(segments[1]);
        expect(segments[1]._mock.calculateNeededScreenspace[0][0]).toEqual(segments[2]);
    });

    it("should provide null to calculateNeededScreenspace for last segment", function() {
        statusbar.render();
        expect(segments[2]._mock.calculateNeededScreenspace[0][0]).toBeNull();
    });

    it("should call render on each segment", function() {
        statusbar.render();
        expect(segments[0]._mock.render.length).toEqual(1);
        expect(segments[1]._mock.render.length).toEqual(1);
        expect(segments[2]._mock.render.length).toEqual(1);
    });

    it("should provide nextSegment to render", function() {
        statusbar.render();
        expect(segments[0]._mock.render[0][0]).toEqual(segments[1]);
        expect(segments[1]._mock.render[0][0]).toEqual(segments[2]);
    });

    it("should provide null to render for last segment", function() {
        statusbar.render();
        expect(segments[2]._mock.render[0][0]).toBeNull();
    });

    it("should provide maxFillLength to each segment on render", function() {
        statusbar.render();
        expect(segments[0]._mock.render[0][1]).toEqual(cliwidth() - segments[1]._content.length - segments[2]._content.length);
        expect(segments[1]._mock.render[0][1]).toEqual(cliwidth() - segments[0]._content.length - segments[2]._content.length);
        expect(segments[2]._mock.render[0][1]).toEqual(cliwidth() - segments[0]._content.length - segments[1]._content.length);
    });

    it("should ensure cliwidths default is not 0", function() {
        expect(typeof cliwidth.defaultWidth).toEqual("number");
        expect(cliwidth.defaultWidth).toNotEqual(0);
    });
});
