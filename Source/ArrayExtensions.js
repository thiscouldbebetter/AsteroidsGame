
// extensions

function ArrayExtensions()
{
	// extension class
}

{
	Array.prototype.remove = function(element)
	{
		var elementIndex = this.indexOf(element);
		if (elementIndex >= 0)
		{
			this.splice(elementIndex, 1);
		}
		return this;
	}
}
