
function Obstacle(radius, pos, vel)
{
	this.radius = radius;
	this.pos = pos;
	this.vel = vel;
}

{
	Obstacle.prototype.updateForTimerTick = function(world)
	{
		this.pos.add(this.vel).wrapToRangeMax(world.size);

		var collisionHelper = CollisionHelper.Instance;
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

	Obstacle.prototype.drawToDisplay = function(display)
	{
		display.drawCircle(this.pos, this.radius, "Gray");
	}

	// collidable

	Obstacle.prototype.collideWithOther = function(other)
	{
		var bodyPositionsAfterCollision = [new Coords(), new Coords()];
		var bodyVelsAfterCollision = [new Coords(), new Coords()];
		var displacement = new Coords();
		var velocityRelative = new Coords();
 
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
