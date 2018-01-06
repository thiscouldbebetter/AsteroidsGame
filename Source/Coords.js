
function Coords(x, y)
{
	this.x = x;
	this.y = y;
}

{
	Coords.Instances = new Coords_Instances();

	function Coords_Instances()
	{
		this.Zeroes = new Coords(0, 0);
	}

	Coords.prototype.add = function(other)
	{
		this.x += other.x;
		this.y += other.y;
		return this;
	}

	Coords.prototype.clear = function()
	{
		this.x = 0;
		this.y = 0;
	}

	Coords.prototype.clone = function()
	{
		return new Coords(this.x, this.y);
	}

	Coords.prototype.divideScalar = function(scalar)
	{
		this.x /= scalar;
		this.y /= scalar;	
		return this;
	}

	Coords.prototype.dotProduct = function(other)
	{
		return this.x * other.x + this.y * other.y;
	}

	Coords.prototype.magnitude = function()
	{
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}

	Coords.prototype.multiply = function(other)
	{
		this.x *= other.x;
		this.y *= other.y;
		return this;
	}

	Coords.prototype.multiplyScalar = function(scalar)
	{
		this.x *= scalar;
		this.y *= scalar;	
		return this;
	}

	Coords.prototype.normalize = function()
	{
		return this.divideScalar(this.magnitude());
	}

	Coords.prototype.overwriteWith = function(other)
	{
		this.x = other.x;
		this.y = other.y;
		return this;
	}

	Coords.prototype.random = function()
	{
		this.x = Math.random();
		this.y = Math.random();
		return this;
	}

	Coords.prototype.right = function()
	{
		var temp = this.x;
		this.x = 0 - this.y;
		this.y = temp;
		return this;
	}

	Coords.prototype.subtract = function(other)
	{
		this.x -= other.x;
		this.y -= other.y;
		return this;
	}

	Coords.prototype.wrapToRangeMax = function(max)
	{
		while (this.x < 0)
		{
			this.x += max.x;
		}
		while (this.x >= max.x)
		{
			this.x -= max.x;
		}

		while (this.y < 0)
		{
			this.y += max.y;
		}
		while (this.y >= max.y)
		{
			this.y -= max.y;
		}

		return this;
	}
}
