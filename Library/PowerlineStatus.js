import cliwidth from "cli-width";
cliwidth.defaultWidth = 80;

export default class PowerlineStatus {
    constructor(...segments) {
        this.segments = segments;
    }

    render() {
        var shiftedSegments = this.segments.slice(1);
        shiftedSegments.push(null);

        var segmentLengths = this.segments.map(
            (segment, index) => segment.calculateNeededScreenspace(shiftedSegments[index])
        );

        var accumulatedLength = segmentLengths.reduce(
            (accumulator, value) => accumulator + value,
        0);

        var screenWidth = cliwidth();
        var maxFillLength = screenWidth - accumulatedLength;

        var renderedSegments = this.segments.map(
            (segment, index) => segment.render(shiftedSegments[index], maxFillLength + segmentLengths[index])
        );

        return renderedSegments.join("");
    }
}
