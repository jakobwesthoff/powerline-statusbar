import crayon from "crayon-terminal";
crayon.enabled = true;

import ansiRegex from "ansi-regex";
import stripAnsi from "strip-ansi";

import BaseSegment from "../../Library/Segment/Base";

import MockedSegment from "../Mock/Segment";
import SimpleBaseSegment from "../Mock/BaseSegment";

describe("BaseSegment", function() {
    it("should provide default options", function() {
        var segment = new BaseSegment();
        expect(segment.options).toBeDefined();
        expect(segment.options.background).toBeDefined();
        expect(segment.options.foreground).toBeDefined();
        expect(segment.options.fill).toBeDefined();
        expect(segment.options.separator).toBeDefined();
    });

    it("should merge default options with provided options", function() {
        var segment = new BaseSegment({
            foreground: "myOwnForeground",
            separator: "myOwnSeparator"
        });
        expect(segment.options).toBeDefined();
        expect(segment.options.background).toBeDefined();
        expect(segment.options.foreground).toEqual("myOwnForeground");
        expect(segment.options.fill).toBeDefined();
        expect(segment.options.separator).toEqual("myOwnSeparator");
    });

    it("should allow access to foreground and background", function() {
        var segment = new BaseSegment({
            foreground: "myOwnForeground",
            background: "myOwnBackground"
        });

        expect(segment.foreground).toEqual("myOwnForeground");
        expect(segment.background).toEqual("myOwnBackground");
    });

    it("should have abstract provideContent method", function() {
        var segment = new BaseSegment();
        expect(segment.provideContent).toThrow();
    });

    it("should utilize provideContent for render", function() {
        var segment = new SimpleBaseSegment("Some content");

        segment.render(null);
        expect(segment._mock.provideContent.length).toEqual(1);
    });

    describe("Colorization", function() {
        [
            {fg: "cyan", bg: "blue"},
            {fg: "#ffff00", bg: "#beef00"},
            {fg: 111, bg: 222},
            {fg: 23, bg: 42}
        ].forEach(data => {
            it(`should render output with given background and foreground color (${JSON.stringify(data)})`, function() {
                var segment = new SimpleBaseSegment("Some content", {foreground: data.fg, background: data.bg});
                var output = segment.render(null);
                var expected = crayon.foreground(data.fg).background(data.bg)("");
                expect(output.match(ansiRegex())).toEqual(expected.match(ansiRegex()));
            });
        });
    });

    it("Should append a space at the start and the end of the content", function() {
        var segment = new SimpleBaseSegment("Some content");
        var output = segment.render(null);
        expect(stripAnsi(output).indexOf(" Some content ")).toEqual(0);
    });

    describe("Separator", function() {
        [
            {name: "normal", separator: "\ue0b0", bg: "green", fg: "blue"},
            {name: "thin", separator: "\ue0b1", bg: "blue", fg: "cyan"},
            {name: "reverse", separator: "\ue0b2", bg: "blue", fg: "green"},
            {name: "reverse-thin", separator: "\ue0b3", bg: "blue", fg: "cyan"}
        ].forEach(data => {
            it(`should append a separator at the end of the segment (${JSON.stringify(data)})`, function() {
                var segment = new SimpleBaseSegment("Some content", {separator: data.name});
                var nextSegment = new MockedSegment("Some other content", "red", "green");
                var output = segment.render(nextSegment);
                expect(stripAnsi(output).substr(-1)).toEqual(data.separator);
            });

            it(`should use correct colors for seperator creation (${JSON.stringify(data)})`, function() {
                var segment = new SimpleBaseSegment("Some content", {foreground: "cyan", background: "blue", separator: data.name});
                var nextSegment = new MockedSegment("Some other content", "red", "green");
                var output = segment.render(nextSegment);
                var formatter = crayon.foreground(data.fg).background(data.bg);
                expect(output.substr(-31, 20).match(ansiRegex())).toEqual(formatter("").substr(0, 20).match(ansiRegex()));
            });

            it(`should not render a separator for the last segment (${JSON.stringify(data)})`, function() {
                var segment = new SimpleBaseSegment("Some content", {separator: data.name});
                var output = segment.render(null);
                expect(stripAnsi(output)).toEqual(" Some content ");
            });
        });

        it("should not append a separator if it is specifically disabled", function() {
            var segment = new SimpleBaseSegment("Some content", {separator: "none"});
            var nextSegment = new MockedSegment("Some other content", "red", "green");
            var output = segment.render(nextSegment);
            expect(stripAnsi(output)).toEqual(" Some content ");
        });
    });

    it("should fillup screen width if fill option is true and is last segment", function() {
        var segment = new SimpleBaseSegment("Some content", {fill: "true"});
        var output = segment.render(null, 100);
        expect(stripAnsi(output).length).toEqual(100);
    });

    it("should fillup screen width if fill option is true", function() {
        var segment = new SimpleBaseSegment("Some content", {fill: "true"});
        var nextSegment = new MockedSegment("Some other content", "red", "green");
        var output = segment.render(nextSegment, 100);
        expect(stripAnsi(output).length).toEqual(100);
    });
});
