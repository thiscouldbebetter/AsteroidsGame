function main()
{
	var displaySize = new Coords(200, 200);

	var display = new Display([displaySize]);

	var world = World.random(displaySize);

	Globals.Instance.initialize
	(
		10, // ticksPerSecond
		display,
		world
	);
}
