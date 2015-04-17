# Powerline Statusbar

`powerline-statusbar` is a [powerline]() inspired statusbar for nodejs based
commandline applications. It allows for easy rendering of powerline like bars,
containing arbitrary information.

## Usage

Using `powerline-statusbar` is quite simple:

```javascript
var Powerline = require("powerline-status");

var statusline = new Powerline.PowerlineStatus(
    new Poweline.StaticSegment("Some cool content", {foreground: "white", background: "blue"}),
    new Poweline.StaticSegment("Other content", {foreground: "white", background: "orange"})
);

console.log(statusline.render());
```

## Segments

Every bit of information is rendered into a `Segment`. There are different
kinds of Segments available inside the `Library/Segment` folder. If you need
a new segment just extend the `Library/Segment/Base` segment, overriding the
`constructor` as well as the `provideContent` method. Further options provided
by different segments can be easily seen in their corresponding code.

By default every segment supports the following options: 

```javascript
{
    // Either a console color name, or a hex value (eg. #ffff00)
    background: "yellow", 
    
    // Either a console color name, or a hex value (eg. #ffff00)
    foreground: "black", // Same as background
   
    // Fill this seperator to take all the console width after rendering all
    // segments. Only ONE segment is allowed to have this set to true.
    fill: false,

    // Seperator style to use deviding this segment from the one right of it.
    // Accepted values: none, normal, reversed, thin, thin-reversed
    separator: "normal"
}
```
