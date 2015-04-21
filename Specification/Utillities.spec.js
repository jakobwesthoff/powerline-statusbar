import {upperCaseFirst} from "../Library/Utillities";

describe("Utillities", function() {
    describe("upperCaseFirst", function() {
        it("should uppercase the first letter in a lowercase string", function() {
            var input = "a lower case string";
            expect(upperCaseFirst(input)).toEqual("A lower case string");
        });

        it("should lowercase anything, but the first letter", function() {
            var input = "AN UPPERCASE STRING";
            expect(upperCaseFirst(input)).toEqual("An uppercase string");
        });
    })
});