
class Obstacle
{
	radius: number;
	pos: Coords;
	vel: Coords;

	constructor(radius: number, pos: Coords, vel: Coords)
	{
		this.radius = radius;
		this.pos = pos;
		this.vel = vel;
	}

	updateForTimerTick(world: World2): void
	{
		this.pos.add(this.vel).wrapToRangeMax(world.size);

		var collisionHelper = CollisionHelper2.Instance();
		var obstacles = world.obstacles;
		for (var i = 0; i < obstacles.length; i++)
		{
			var other = obstacles[i];
			if (other != this)
			{
				var doThisAndOtherCollide = collisionHelper.doCirclesCollide
				(
					this.pos, this.radius,
					other.pos, other.radius
				);

				if (doThisAndOtherCollide == true)
				{
					this.collideWithOther(other);
				}
			}
		}
	}

	// drawable

	drawToDisplay(display: Display2D): void
	{
		display.drawCircle
		(
			this.pos, this.radius, Color.byName("Gray"), null, null
		);
	}

	// collidable

	collideWithOther(other: Obstacle): void
	{
		var bodyPositionsAfterCollision = [Coords.create(), Coords.create()];
		var bodyVelsAfterCollision = [Coords.create(), Coords.create()];
		var displacement = Coords.create();
		var velocityRelative = Coords.create();
 
		var bodies = [ this, other ];
		var body0 = bodies[0];
		var body1 = bodies[1];
 
		var sumOfBodyRadii = 
			body0.radius + body1.radius; 
 
		velocityRelative.overwriteWith
		(
			body0.vel
		).subtract
		(
			body1.vel
		);
  
		displacement.overwriteWith
		(
			body0.pos
		).subtract
		(
			body1.pos
		);
 
		var distanceBetweenBodyCenters = displacement.magnitude();
		var overlap = sumOfBodyRadii - distanceBetweenBodyCenters;
		var overlapHalf = overlap / 2;
 
		var normalAtCollision = displacement.divideScalar
		(
			distanceBetweenBodyCenters
		);
 
		var velocityAlongNormal = normalAtCollision.multiplyScalar
		(
			velocityRelative.dotProduct
			(
				normalAtCollision
			)
		);
 
		velocityRelative.subtract
		(
			velocityAlongNormal
		).multiplyScalar
		(
			-1
		);
 
		for (var i = 0; i < bodies.length; i++)
		{
			var bodyThis = bodies[i];
			var bodyOther = bodies[1 - i];
		 
			var bodyPosAfterCollision = bodyPositionsAfterCollision[i];
			var bodyVelAfterCollision = bodyVelsAfterCollision[i];
 
			var multiplier = (i == 0 ? -1 : 1);
 
			bodyPosAfterCollision.overwriteWith
			(
				normalAtCollision
			).multiplyScalar
			(
				multiplier * overlapHalf
			).add
			(
				bodyThis.pos
			);
  
			bodyVelAfterCollision.overwriteWith
			(
				velocityRelative
			).multiplyScalar
			(
				multiplier
			).add
			(
				bodyOther.vel
			);
		}
 
		for (var i = 0; i < bodies.length; i++)
		{
			var bodyThis = bodies[i];
			var bodyPosAfterCollision = bodyPositionsAfterCollision[i];
			var bodyVelAfterCollision = bodyVelsAfterCollision[i];
 
			bodyThis.pos.overwriteWith
			(
				bodyPosAfterCollision
			);
			bodyThis.vel.overwriteWith
			(
				bodyVelAfterCollision
			);
		}
	}

}
