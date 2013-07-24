#pragma strict

var Flags : GameObject[];
var Flag : GameObject;

var tuna : float;
var rng : int;


function Start () {
	if(LevelSerializer.IsDeserializing) return;	
	Flags = GameObject.FindGameObjectsWithTag("Flag");
	rng = Random.Range(5,15);
	AssignTarget();
}

function AssignTarget () {
	GetComponent(DudeScript).Stop();
	/*
		GetComponent(AIPath).target = Flag.transform;
		GetComponent(AIPath).canSearch = true;
		GetComponent(AIPath).canMove = true;
		GetComponent(AIPath).repathRate = Random.Range(4.0,8.0);
	*/
}