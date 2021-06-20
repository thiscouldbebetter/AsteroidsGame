
class CollisionHelper2
{
	displacement: Coords;
	edgeForward: Coords;
	edgeRight: Coords;

	constructor()
	{
		this.displacement = Coords.create();
		this.edgeForward = Coords.create();
		this.edgeRight = Coords.create();
	}

	static _instance: CollisionHelper2;
	static Instance(): CollisionHelper2
	{
		if (CollisionHelper2._instance == null)
		{
			CollisionHelper2._instance = new CollisionHelper2();
		}
		return CollisionHelper2._instance;
	}

	doCirclesCollide
	(
		circle0Center: Coords, circle0Radius: number,
		circle1Center: Coords, circle1Radius: number
	): boolean
	{
		var distanceBetweenCenters = this.displacement.overwriteWith
		(
			circle1Center
		).subtract
		(
			circle0Center
		).magnitude();

		var sumOfRadii = circle0Radius + circle1Radius;

		var returnValue = (distanceBetweenCenters < sumOfRadii);

		return returnValue;
	}
}
