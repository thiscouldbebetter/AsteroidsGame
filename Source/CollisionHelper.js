"use strict";
class CollisionHelper2 {
    constructor() {
        this.displacement = Coords.create();
        this.edgeForward = Coords.create();
        this.edgeRight = Coords.create();
    }
    static Instance() {
        if (CollisionHelper2._instance == null) {
            CollisionHelper2._instance = new CollisionHelper2();
        }
        return CollisionHelper2._instance;
    }
    doCirclesCollide(circle0Center, circle0Radius, circle1Center, circle1Radius) {
        var distanceBetweenCenters = this.displacement.overwriteWith(circle1Center).subtract(circle0Center).magnitude();
        var sumOfRadii = circle0Radius + circle1Radius;
        var returnValue = (distanceBetweenCenters < sumOfRadii);
        return returnValue;
    }
}
