
function InputHelper()
{
	this.keysPressed = [];
}

{
	InputHelper.prototype.initialize = function()
	{
		document.body.onkeydown = this.handleEventKeyDown.bind(this);
		document.body.onkeyup = this.handleEventKeyUp.bind(this);
	}

	InputHelper.prototype.removeKey = function(key)
	{
		if (this.keysPressed[key] != null)
		{
			this.keysPressed.splice(this.keysPressed.indexOf(key), 1);
			delete this.keysPressed[key];
		}
	}

	// events 

	InputHelper.prototype.handleEventKeyDown = function(event)
	{
		var key = event.key;
		if (this.keysPressed[key] == null)
		{
			this.keysPressed.push(key);
			this.keysPressed[key] = key;
		}
	}

	InputHelper.prototype.handleEventKeyUp = function(event)
	{
		this.removeKey(event.key);
	}

}
