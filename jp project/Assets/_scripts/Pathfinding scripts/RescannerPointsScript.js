#pragma strict

function Start () {
/*
	GetComponent(GraphUpdateScene).points[0] = GetColliderVertexPositions(this.gameObject)[4];
	GetComponent(GraphUpdateScene).points[1] = GetColliderVertexPositions(this.gameObject)[5];
	GetComponent(GraphUpdateScene).points[2] = GetColliderVertexPositions(this.gameObject)[6];
	GetComponent(GraphUpdateScene).points[3] = GetColliderVertexPositions(this.gameObject)[7];
	GetComponent(GraphUpdateScene).Apply (); 
*/
	var index : int;
	for (var child : Transform in transform) {
		var pos = child.position;
		GetComponent(GraphUpdateScene).points[index] = pos;
		index += 1;
	}
	GetComponent(GraphUpdateScene).Apply();
}

function Update () {

}

function GetColliderVertexPositions (object : GameObject) : Vector3[] {
        var vertices = new Vector3[8];
        var thisMatrix = object.transform.localToWorldMatrix;
        var storedRotation = object.transform.rotation;
        object.transform.rotation = Quaternion.identity;
       
        var extents = object.collider.bounds.extents;
        vertices[0] = thisMatrix.MultiplyPoint3x4(extents);
        vertices[1] = thisMatrix.MultiplyPoint3x4(Vector3(-extents.x, extents.y, extents.z));
        vertices[2] = thisMatrix.MultiplyPoint3x4(Vector3(extents.x, extents.y, -extents.z));
        vertices[3] = thisMatrix.MultiplyPoint3x4(Vector3(-extents.x, extents.y, -extents.z));
        vertices[4] = thisMatrix.MultiplyPoint3x4(Vector3(extents.x, -extents.y, extents.z));
        vertices[5] = thisMatrix.MultiplyPoint3x4(Vector3(-extents.x, -extents.y, extents.z));
        vertices[6] = thisMatrix.MultiplyPoint3x4(Vector3(extents.x, -extents.y, -extents.z));
        vertices[7] = thisMatrix.MultiplyPoint3x4(-extents);
       
        object.transform.rotation = storedRotation;
        return vertices;
}