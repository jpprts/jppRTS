#pragma strict
/*
var GUIActive : boolean;
var ter : Terrain;
var StoredTerrain : float[,,];

function Start () {
	ter = Terrain.activeTerrain;
	StoredTerrain = ter.terrainData.GetAlphamaps(0,0,ter.terrainData.alphamapWidth,ter.terrainData.alphamapHeight);
}

function Update () {
	if (Input.GetKeyDown("escape")) {
		EnableMenu();
	}
}

function OnGUI() {if (GUIActive) {
	GUILayout.BeginArea(new Rect(Screen.width/2 - 200, Screen.height/2 - 200, 400,400));
	if(GUILayout.Button("New game")) {
		DisableMenu();
		NewGame();
	}
	if(GUILayout.Button("Save game")) {
		var t = System.DateTime.Now;
		LevelSerializer.SaveGame("Game");
		Radical.CommitLog();
		Debug.Log(String.Format("{0:0.000}", (System.DateTime.Now - t).TotalSeconds));
	}	
	if(LevelSerializer.CanResume) {
		if(GUILayout.Button("Resume"))	{
			DisableMenu();
			LevelSerializer.Resume();
			
		}
	}
	if(LevelSerializer.SavedGames.Count > 0) {
		GUILayout.Label("Available saved games");
		for (var g in LevelSerializer.SavedGames[LevelSerializer.PlayerName]) {
			if(GUILayout.Button(g.Caption)) {
				g.Load();
				DisableMenu();
			}			
		}
	}
	if(GUILayout.Button("Settings")) {
		DisableMenu();
	}
	if(GUILayout.Button("Exit Game")) {
		Application.Quit();
	}
	GUILayout.EndArea();
}}
function EnableMenu() {
	this.renderer.enabled = true;
	GUIActive = true;
}
function DisableMenu() {
	this.renderer.enabled = false;
	GUIActive = false;
}

function NewGame() {
	ter.terrainData.SetAlphamaps(0,0,StoredTerrain);
	Debug.Log("Starting new game.");
}
*/