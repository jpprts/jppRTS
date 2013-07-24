#pragma strict

var GlobalTimer : float;
var Rescanner : GameObject;

function Start () {
	Global.Ter = Terrain.activeTerrain;
	Global.Rescanner = Rescanner;
	Debug.Log(GameObject.FindGameObjectsWithTag("Dude").Length.ToString() + " dudes in the scene.");
	LevelSerializer.AddPrefabPath("Buildings/Test/");
}

function Update () {

}