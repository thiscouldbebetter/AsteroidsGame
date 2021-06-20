
class World
{
	constructor(size, actor, obstacles)
	{
		this.size = size;
		this.actors = [ actor ];
		this.obstacles = obstacles;

		this.projectiles = [];
	}

	static random(size)
	{
		var actorPos = size.clone().multiplyScalar(.5);

		var actor = new Actor
		(
			actorPos,
			Activity.Instances().UserInputAccept
		);

		var numberOfObstacles = 2;
		var obstacleRadius = 16;

		var obstacles = [];
		var obstacleSpeedMax = .2;
		for (var i = 0; i < numberOfObstacles; i++)
		{
			var pos = new Coords
			(
				Math.random(), Math.random()
			).multiply
			(
				size
			);
			var vel = new Polar
			(
				Math.random(), // azimuthInTurns
				Math.random() * obstacleSpeedMax // radius
			).toCoords(new Coords());

			var obstacle = new Obstacle
			(
				obstacleRadius, pos, vel
			);

			obstacles.push(obstacle);
		}

		var returnValue = new World
		(
			size,
			actor,
			obstacles
		);

		return returnValue;
	}

	// instance methods

	updateForTimerTick()
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

	drawToDisplay(display)
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
