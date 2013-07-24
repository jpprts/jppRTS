#pragma strict

var ButtonNumber : int;
private var OriginalColor : Color;
private var IsOn : boolean;

function Start () {
	OriginalColor = renderer.material.color;
	if (ButtonNumber == 0) {
		ButtonPress();
	}
}

function OnMouseDown () {
	ButtonPress();
}

// Mouseover tint
function OnMouseEnter () {
	renderer.material.color = Color.Lerp(OriginalColor, Color.white, 0.3);
}
function OnMouseExit () {
	if (!IsOn) {
		renderer.material.color = OriginalColor;
	}
}

function ButtonPress () {
	if (ButtonNumber == 1) {
		for (var dude in GameObject.FindGameObjectsWithTag("Dude")) {
			if (dude.GetComponent(DudeScript).IsSelected) {
				dude.GetComponent(DudeScript).Stop();
			}
		}
	}
	else if (ButtonNumber == 0) {
		GameObject.FindWithTag("Commands").GetComponent(CommandsScript).ActiveCommand = 0; //Move
		for (var button in GameObject.FindGameObjectsWithTag("UIButton")) {
			button.GetComponent(UIButtonScript).IsOn = false;
			button.renderer.material.color = button.GetComponent(UIButtonScript).OriginalColor;
		}
		IsOn = true;
		renderer.material.color = Color.Lerp(OriginalColor, Color.white, 0.6);
	}
	else if (ButtonNumber == 2) {
		GameObject.FindWithTag("Commands").GetComponent(CommandsScript).ActiveCommand = 1; //AttackMove
		for (var button in GameObject.FindGameObjectsWithTag("UIButton")) {
			button.GetComponent(UIButtonScript).IsOn = false;
			button.renderer.material.color = button.GetComponent(UIButtonScript).OriginalColor;
		}
		IsOn = true;
		renderer.material.color = Color.Lerp(OriginalColor, Color.white, 0.6);
	}
}