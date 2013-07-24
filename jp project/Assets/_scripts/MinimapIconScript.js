#pragma strict

var Parent : GameObject;

function Start () {
	Parent = transform.parent.gameObject;
	if (Parent.GetComponent(DudeScript).Team != 0) {
		renderer.material.color = Color.red;
	}
}

function Update () {

}