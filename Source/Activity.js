"use strict";
class Activity2 {
    constructor(perform) {
        this.perform = perform;
    }
    static Instances() {
        if (Activity2._instances == null) {
            Activity2._instances = new Activity2_Instances();
        }
        return Activity2._instances;
    }
}
class Activity2_Instances {
    constructor() {
        this.DoNothing = new Activity2((world, actor) => { });
        this.UserInputAccept = new Activity2((world, actor) => {
            var inputHelper = Globals.Instance().inputHelper;
            var inputsActive = inputHelper.inputsActive();
            for (var i = 0; i < inputsActive.length; i++) {
                var inputActive = inputsActive[i];
                var inputActiveName = (inputActive == null ? null : inputActive.name);
                if (inputActiveName == "ArrowLeft") {
                    actor.forward.subtract(actor.right.clone().multiplyScalar(actor.turnsPerTick)).normalize();
                    actor.right.overwriteWith(actor.forward).right();
                }
                else if (inputActiveName == "ArrowRight") {
                    actor.forward.add(actor.right.clone().multiplyScalar(actor.turnsPerTick)).normalize();
                    actor.right.overwriteWith(actor.forward).right();
                }
                else if (inputActiveName == "ArrowUp") {
                    actor.vel.add(actor.forward.clone().multiplyScalar(actor.accelPerTick));
                }
                else if (inputActiveName == "Enter"
                    || inputActiveName == "_") {
                    if (world.projectiles.length > 0) {
                        return;
                    }
                    var projectilePos = actor.forward.clone().multiplyScalar(actor.lengthHalf).add(actor.pos);
                    var projectileVel = actor.forward.clone().multiplyScalar(actor.projectileSpeed);
                    var projectile = new Projectile(projectilePos, projectileVel);
                    world.projectiles.push(projectile);
                    inputHelper.inputRemove(inputActiveName);
                }
            }
        });
    }
}
