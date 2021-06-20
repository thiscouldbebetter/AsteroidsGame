"use strict";
function main() {
    var displaySize = Coords.fromXY(200, 200);
    var display = Display2D.fromSize(displaySize);
    var world = World2.random(displaySize);
    Globals.Instance().initialize(200, // ticksPerSecond - Something's up, this is wrong.
    display, world);
}
