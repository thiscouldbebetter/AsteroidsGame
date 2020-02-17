
// classes

function Activity(perform)
{
	this.perform = perform;
}

{
	Activity.Instances = new Activity_Instances()
	
	function Activity_Instances()
	{
		this.DoNothing = new Activity(function perform() {});
		this.UserInputAccept = new Activity
		(
			function perform(world, actor)
			{
				var inputHelper = Globals.Instance.inputHelper;
				var inputsActive = inputHelper.inputsActive();

				for (var i = 0; i < inputsActive.length; i++)
				{
					var inputActive = inputsActive[i];
					inputActive = (inputActive == null ? null : inputActive.name);
					if (inputActive == "ArrowLeft")
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
					else if (inputActive == "ArrowRight")
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
					else if (inputActive == "ArrowUp")
					{
						actor.vel.add
						(
							actor.forward.clone().multiplyScalar
							(
								actor.accelPerTick
							)
						);
					}
					else if (inputActive == "Enter")
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

						inputHelper.removeKey(inputActive)
					}
				}
			}
		);
	}
}
