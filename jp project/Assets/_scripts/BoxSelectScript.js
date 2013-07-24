#pragma strict

var OriginalPos : Vector3;
var FinalPos : Vector3;

var MousePos : Vector3;

private var ClickedUI : boolean;

function Start () {

}

function Update () {

	// Get selection box
	if (Input.GetMouseButtonDown(0)) {
		var ray1 : Ray = Camera.main.ScreenPointToRay (Input.mousePosition);
		var hit1 : RaycastHit;
		if (Physics.Raycast(ray1,hit1)) {
			OriginalPos = hit1.point;
		}
		if (hit1.collider.CompareTag("UIButton")) {
			ClickedUI = true;
		} else {
			ClickedUI = false;
		}
	}
	if (Input.GetMouseButton(0)) {
		if (!ClickedUI) {
			var ray2 : Ray = Camera.main.ScreenPointToRay (Input.mousePosition);
			var hit2 : RaycastHit;
			if (Physics.Raycast(ray2,hit2)) {
				FinalPos = hit2.point;
			}
			DrawLines();
		}
	}
	if (Input.GetMouseButtonUp(0)) {
		if (!ClickedUI) {
			NormalizeBox();
			Select();
		}
	}

	// Deselect
	if (Input.GetKeyDown("r")) {
		for (var dude in GameObject.FindGameObjectsWithTag("Dude")) {
			dude.GetComponent(DudeScript).Deselect();
		}
	}
}

function NormalizeBox () {
	var o = OriginalPos;
	var f = FinalPos;
	if (OriginalPos.x > FinalPos.x) {
		OriginalPos.x = f.x;
		FinalPos.x = o.x;
	}
	if (OriginalPos.z > FinalPos.z) {
		OriginalPos.z = f.z;
		FinalPos.z = o.z;
	}
}

function DrawLines () {
	GetComponent(LineRenderer).enabled = true;
	OriginalPos.y = 1.0;
	FinalPos.y = 1.0;
	var NextPoint = OriginalPos;
	GetComponent(LineRenderer).SetPosition(0, OriginalPos);
		NextPoint.z = FinalPos.z;
	GetComponent(LineRenderer).SetPosition(1, NextPoint);
		NextPoint.x = FinalPos.x;
	GetComponent(LineRenderer).SetPosition(2, NextPoint);
		NextPoint.z = OriginalPos.z;
	GetComponent(LineRenderer).SetPosition(3, NextPoint);
	GetComponent(LineRenderer).SetPosition(4, OriginalPos);
}

function Select () {
	// Select units inside the box
	for (var dude in GameObject.FindGameObjectsWithTag("Dude")) {
		// if inside the box
		if (dude.transform.position.x >= OriginalPos.x && dude.transform.position.x <= FinalPos.x &&
			dude.transform.position.z >= OriginalPos.z && dude.transform.position.z <= FinalPos.z &&
			dude.GetComponent(DudeScript).Team == 0) { 
			
				dude.GetComponent(DudeScript).Select();
		} else { // if outside
			dude.GetComponent(DudeScript).Deselect();
		}
	}	
	GetComponent(LineRenderer).enabled = false;
}