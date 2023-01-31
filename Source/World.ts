
class World2
{
	size: Coords;
	actors: Actor2[];
	obstacles: Obstacle[];

	projectiles: Projectile[];

	constructor(size: Coords, actor: Actor2, obstacles: Obstacle[])
	{
		this.size = size;
		this.actors = [ actor ];
		this.obstacles = obstacles;

		this.projectiles = [];
	}

	static random(size: Coords): World2
	{
		var actorPos = size.clone().multiplyScalar(.5);

		var actor = new Actor2
		(
			actorPos,
			Activity2.Instances().UserInputAccept
		);

		var numberOfObstacles = 2;
		var obstacleMass = 8;
		var obstacleRadius = 16;

		var obstacles = [];
		var obstacleSpeedMax = .2;
		for (var i = 0; i < numberOfObstacles; i++)
		{
			var pos = Coords.fromXY
			(
				Math.random(), Math.random()
			).multiply
			(
				size
			);
			var vel = new Polar
			(
				Math.random(), // azimuthInTurns
				Math.random() * obstacleSpeedMax, // radius
				0
			).toCoords(Coords.create());

			var obstacle = new Obstacle
			(
				obstacleMass, obstacleRadius, pos, vel
			);

			obstacles.push(obstacle);
		}

		var returnValue = new World2
		(
			size,
			actor,
			obstacles
		);

		return returnValue;
	}

	// instance methods

	updateForTimerTick(): void
	{
		for (var i = 0; i < this.actors.length; i++)
		{
			var actor = this.actors[i];
			actor.updateForTimerTick(this);
		}

		for (var i = 0; i < this.obstacles.length; i++)
		{
			var obstacle = this.obstacles[i];
			obstacle.updateForTimerTick(this);
		}

		for (var i = 0; i < this.projectiles.length; i++)
		{
			var projectile = this.projectiles[i];
			projectile.updateForTimerTick(this);
		}
	}

	// drawable

	drawToDisplay(display: Display2D): void
	{
		display.clear();
		display.drawBackground(Color.byName("Black"), Color.byName("Gray"));

		for (var i = 0; i < this.obstacles.length; i++)
		{
			var obstacle = this.obstacles[i];
			obstacle.drawToDisplay(display);
		}

		for (var i = 0; i < this.actors.length; i++)
		{
			var actor = this.actors[i];
			actor.drawToDisplay(display);
		}

		for (var i = 0; i < this.projectiles.length; i++)
		{
			var projectile = this.projectiles[i];
			projectile.drawToDisplay(display);
		}
	}
}
