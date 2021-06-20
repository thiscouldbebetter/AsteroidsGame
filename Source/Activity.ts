
class Activity2
{
	perform: (w: World2, a: Actor2) => void;

	constructor(perform: (w: World2, a: Actor2) => void)
	{
		this.perform = perform;
	}

	static _instances: Activity2_Instances;
	static Instances(): Activity2_Instances
	{
		if (Activity2._instances == null)
		{
			Activity2._instances = new Activity2_Instances();
		}
		return Activity2._instances;
	}
}

class Activity2_Instances
{
	DoNothing: Activity2;
	UserInputAccept: Activity2;

	constructor()
	{
		this.DoNothing = new Activity2
		(
			(world: World2, actor: Actor2) => {}
		);

		this.UserInputAccept = new Activity2
		(
			(world: World2, actor: Actor2) =>
			{
				var inputHelper = Globals.Instance().inputHelper;
				var inputsActive = inputHelper.inputsActive();

				for (var i = 0; i < inputsActive.length; i++)
				{
					var inputActive = inputsActive[i];
					var inputActiveName =
						(inputActive == null ? null : inputActive.name);

					if (inputActiveName == "ArrowLeft")
					{
						actor.forward.subtract
						(
							actor.right.clone().multiplyScalar
							(
								actor.turnsPerTick
							)
						).normalize();
						actor.right.overwriteWith(actor.forward).right();
					}
					else if (inputActiveName == "ArrowRight")
					{
						actor.forward.add
						(
							actor.right.clone().multiplyScalar
							(
								actor.turnsPerTick
							)
						).normalize();
						actor.right.overwriteWith(actor.forward).right();
					}
					else if (inputActiveName == "ArrowUp")
					{
						actor.vel.add
						(
							actor.forward.clone().multiplyScalar
							(
								actor.accelPerTick
							)
						);
					}
					else if (inputActiveName == "Enter")
					{
						if (world.projectiles.length > 0)
						{
							return;
						}

						var projectilePos = actor.forward.clone().multiplyScalar
						(
							actor.lengthHalf
						).add
						(
							actor.pos
						);

						var projectileVel = actor.forward.clone().multiplyScalar
						(
							actor.projectileSpeed
						);

						var projectile = new Projectile
						(
							projectilePos, projectileVel
						);
						world.projectiles.push(projectile);

						inputHelper.inputRemove(inputActiveName);
					}
				}
			}
		);
	}
}
