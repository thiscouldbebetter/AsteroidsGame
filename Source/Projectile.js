"use strict";
class Projectile {
    constructor(pos, vel) {
        this.pos = pos;
        this.vel = vel;
        this.radiusInFlight = 2;
        this.colorInFlight = Color.byName("Yellow");
        this.ticksSinceSpawned = 0;
        this.ticksToLive = 100;
        this.ticksSinceExplosion = null;
        this.ticksToExplode = 30;
        this.radiusExplodingMax = 20;
        this.colorExploding = Color.byName("Red");
    }
    drawToDisplay(display) {
        if (this.ticksSinceExplosion == null) {
            display.drawCircle(this.pos, this.radiusInFlight, this.colorInFlight, null, null);
            display.drawLine(this.pos, this.pos.clone().subtract(this.vel), this.colorInFlight, 1 // lineThickness
            );
        }
        else {
            var radiusCurrent = this.radiusExplodingMax
                * this.ticksSinceExplosion
                / this.ticksToExplode;
            display.drawCircle(this.pos, radiusCurrent, this.colorExploding, null, null // colorBorder, borderThickness
            );
        }
    }
    updateForTimerTick(world) {
        if (this.ticksSinceSpawned >= this.ticksToLive) {
            ArrayHelper.remove(world.projectiles, this);
        }
        else if (this.ticksSinceExplosion == null) {
            this.pos.add(this.vel).wrapToRangeMax(world.size);
            this.updateForTimerTick_Obstacles(world);
        }
        else if (this.ticksSinceExplosion < this.ticksToExplode) {
            this.ticksSinceExplosion++;
        }
        else {
            // todo
        }
        this.ticksSinceSpawned++;
    }
    updateForTimerTick_Obstacles(world) {
        var collisionHelper = CollisionHelper2.Instance();
        var obstacles = world.obstacles;
        for (var i = 0; i < obstacles.length; i++) {
            var obstacle = obstacles[i];
            var doProjectileAndObstacleCollide = collisionHelper.doCirclesCollide(this.pos, this.radiusInFlight, obstacle.pos, obstacle.radius);
            if (doProjectileAndObstacleCollide) {
                ArrayHelper.remove(world.projectiles, this);
                ArrayHelper.remove(obstacles, obstacle);
                i--;
                this.updateForTimerTick_Obstacles_Children(world, obstacle);
                break;
            }
        }
    }
    updateForTimerTick_Obstacles_Children(world, obstacle) {
        var obstacleChildRadius = obstacle.radius / 2;
        if (obstacleChildRadius >= 2) {
            for (var c = 0; c < 2; c++) {
                var lateral = obstacle.vel.clone().right().normalize().multiplyScalar((c == 0 ? -1 : 1));
                var displacement = lateral.clone().multiplyScalar(obstacleChildRadius);
                var accel = lateral.clone().multiplyScalar(.1);
                var obstacleChildVel = obstacle.vel.clone().add(accel);
                var obstacleChild = new Obstacle(obstacleChildRadius, obstacle.pos.clone().add(displacement), obstacleChildVel);
                world.obstacles.push(obstacleChild);
            }
        }
    }
}
