#pragma strict

var ActiveCommand : int; // 0 = move, 1 = attack/move

function Start () {

}

function LateUpdate () {
	// OnClick
	if (Input.GetMouseButtonUp(1) && !Global.IsScrolling) {
		var ray : Ray = Camera.main.ScreenPointToRay (Input.mousePosition);
		var hit : RaycastHit;
		if (Physics.Raycast(ray,hit)) {
			transform.position = hit.point;
			transform.position.y = 0.0;
		}
		for (var dude in GameObject.FindGameObjectsWithTag("Dude")) {
			if (dude.GetComponent(DudeScript).IsSelected) {
				if (ActiveCommand==0) { // Move
					// if an enemy dude is clicked, issue attack command
					if (hit.collider.CompareTag("Dude") && hit.collider.GetComponent(DudeScript).Team != 0) {
						Debug.Log("Found target");
						dude.GetComponent(DudeScript).AttackTarget(hit.collider.gameObject);
					}
					else { // else just move
						dude.GetComponent(DudeScript).MoveTo(this.gameObject, true);
					}
				}
				else if (ActiveCommand==1) { // AttackMove
					if (hit.collider.CompareTag("Dude") && hit.collider.GetComponent(DudeScript).Team != 0) {
						dude.GetComponent(DudeScript).AttackTarget(hit.collider.gameObject);
					}
					else {
						dude.GetComponent(DudeScript).AttackMove(this.gameObject);
					}
				}
			}
		}
	}
}