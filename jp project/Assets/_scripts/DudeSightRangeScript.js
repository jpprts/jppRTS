#pragma strict

private var Dude : GameObject;
private var timer : float;
private var CanCheck : boolean;

function Start () {
	Dude = transform.parent.gameObject;
	timer = 1.0;
	CanCheck = false;
	collider.enabled = false;
}

function Update () {
	if (timer > 0.0) timer -= Time.deltaTime;
	else if (timer <= 0.0) {
		collider.enabled = true;
		timer = Random.Range(1.0,2.0);
	}
}

function OnTriggerStay ( other : Collider ) {
	if (other.CompareTag("Dude") && other.GetComponent(DudeScript).Team != Dude.GetComponent(DudeScript).Team) {
		Dude.GetComponent(DudeScript).SpottedTarget(other.gameObject);
	}
	collider.enabled = false;
}