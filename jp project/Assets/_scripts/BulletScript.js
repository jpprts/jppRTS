#pragma strict

var TravelSpeed : float;
var Damage : float;
var Team : int;
private var timer : float;

function Start () {
	transform.Translate(Vector3.forward * 5, Space.Self);
}

function Update () {
	transform.Translate(Vector3.forward * TravelSpeed * Time.deltaTime, Space.Self);
	timer += Time.deltaTime;
	if (timer > 1) Destroy(this.gameObject);
}

function OnTriggerEnter ( other : Collider ) {
	if (other.CompareTag("Dude") && other.GetComponent(DudeScript).Team != Team) {
		other.GetComponent(DudeScript).BulletHit(Damage);
		Destroy(this.gameObject);
	}
	else if (other.CompareTag("Building")) {
		Destroy(this.gameObject);
	}
	
}