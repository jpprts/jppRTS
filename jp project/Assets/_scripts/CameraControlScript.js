#pragma strict

var DragSens : float = 5.0;
var EdgeScrollSens : float = 100.0;
var ZoomSens : float = 5.0;
var Angle : float;

var mDelta = 10; // Pixels. The width border at the edge in which the movement work

var StartingPos : Vector3;

private var gamecamera : GameObject;

function Start () {
	gamecamera = GameObject.FindGameObjectWithTag("MainCamera");
	
}

function Update () {
	

	// Drag scroll
	if(Input.GetMouseButton(2)){
		transform.Translate(Vector3(Input.GetAxis("Mouse X") * -DragSens, 0, Input.GetAxis("Mouse Y") * -DragSens), Space.Self);
		if (transform.position != StartingPos) {
			Global.IsScrolling = true;
		}
	}
	// Rotate
	if(Input.GetKey("left shift")){
		transform.localEulerAngles.y += Input.GetAxis("Mouse X") * DragSens;
	}
	// Zoom
	if(Input.GetAxis("Mouse ScrollWheel") != null){
		gamecamera.transform.Translate(Vector3.forward * ZoomSens * 10 * Input.GetAxis("Mouse ScrollWheel"), Space.Self);
	}	
	// Edge scroll
	if ( Input.mousePosition.x >= Screen.width - mDelta ) {
		transform.Translate(Vector3.right * Time.deltaTime * EdgeScrollSens, Space.Self);
	}
	else if ( Input.mousePosition.x <= 0 + mDelta ) {
		transform.Translate(Vector3.left * Time.deltaTime * EdgeScrollSens, Space.Self);
	}
	else if ( Input.mousePosition.y >= Screen.height - mDelta ) {
		transform.Translate(Vector3.forward * Time.deltaTime * EdgeScrollSens, Space.Self);
	}
	else if ( Input.mousePosition.y <= 0 + mDelta ) {
		transform.Translate(Vector3.back * Time.deltaTime * EdgeScrollSens, Space.Self);
	}
	// IsScrolling
	StartingPos = transform.position;
	
	
}

function LateUpdate () {
	if (Input.GetMouseButtonUp(2)) {
		Global.IsScrolling = false;
	}
}