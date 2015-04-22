import * as Palette from "../Library/Palette";
import crayon from "crayon-terminal";

describe("Palette", function() {
    Object.keys(Palette).forEach(paletteName => {
        describe(paletteName, function() {
            Object.keys(Palette[paletteName]).forEach(color => {
                var code = Palette[paletteName][color];
                it(`should provide valid color for ${color} (${code}) as foreground`, function() {
                    var formatTest = function() {
                        crayon.foreground(code)("");
                    }
                    expect(formatTest).not.toThrow();
                });

                it(`should provide valid color for ${color} (${code}) as background`, function() {
                    var formatTest = function() {
                        crayon.background(code)("");
                    }
                    expect(formatTest).not.toThrow();
                });
            });
        });
    });
});
