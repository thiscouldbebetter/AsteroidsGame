"use strict";
class Actor2 {
    constructor(pos, activity) {
        this.pos = pos;
        this.activity = activity;
        this.color = Color.byName("GrayLight");
        this.widthHalf = 3;
        this.lengthHalf = 4;
        this.forward = Coords.fromXY(1, 0);
        this.right = this.forward.clone().right();
        this.vel = Coords.create();
        this.accelPerTick = .0025;
        this.turnsPerTick = .02;
        this.speedMax = .25;
        this.projectileSpeed = 1;
        // Helper variables.
        this.coordsTemp = Coords.create();
        this.vertices =
            [
                Coords.create(), Coords.create(), Coords.create()
            ];
    }
    updateForTimerTick(world) {
        this.activity.perform(world, this);
        var speed = this.vel.magnitude();
        if (speed >= this.speedMax) {
            this.vel.normalize().multiplyScalar(this.speedMax);
        }
        this.pos.add(this.vel);
        this.pos.wrapToRangeMax(world.size);
        var collisionHelper = CollisionHelper2.Instance();
        var obstacles = world.obstacles;
        for (var i = 0; i < obstacles.length; i++) {
            var obstacle = obstacles[i];
            var doActorAndObstacleCollide = collisionHelper.doCirclesCollide(this.pos, this.widthHalf, // hack
            obstacle.pos, obstacle.radius);
            if (doActorAndObstacleCollide) {
                ArrayHelper.remove(world.actors, this);
            }
        }
    }
    // drawable
    drawToDisplay(display) {
        this.vertices[0].overwriteWith(this.forward).multiplyScalar(this.lengthHalf).add(this.pos);
        var back = this.coordsTemp.overwriteWith(this.forward).multiplyScalar(0 - this.lengthHalf).add(this.pos);
        this.vertices[1].overwriteWith(this.right).multiplyScalar(this.widthHalf).add(back);
        this.vertices[2].overwriteWith(this.right).multiplyScalar(0 - this.widthHalf).add(back);
        display.drawPolygon(this.vertices, this.color, null);
    }
}
