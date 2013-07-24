#pragma strict

var MaxHealth : int;
private var CurrentHealth : int;
var Armor : int;
var MovementSpeed : float;
var WeaponRange : float;
var WeaponDamage : int;
var WeaponBullet : GameObject;
var WeaponCooldown1 : float;
private var cd1 : float;
var WeaponCooldown2 : float;
var WeaponBulletsFired : int;
var AlertRange : float;

var Team : int;
var Targeter : GameObject;

var CombatTarget : GameObject;
var DistanceFromTarget : float;
var IsSelected : boolean = true;
var AttackMoveOn : boolean;
private var OriginalColor : Color;
var OriginalTarget : GameObject;

function Start () {
	OriginalColor = renderer.material.color;
	CurrentHealth = MaxHealth;
	OriginalTarget = this.gameObject;
}

function Update () {
	// Engage target if there is one
	if (CombatTarget!=null) {
		SeekTarget();
		GetComponent(AIPath).endReachedDistance = WeaponRange;
	}
	// Continue moving if no target
	if (AttackMoveOn && CombatTarget == null) {
		AttackMove(OriginalTarget);
	}
	// Stop chasing (doesn't work?)
	if (CombatTarget != null && DistanceFromTarget >= 1.2 * WeaponRange) {
		CombatTarget = null;
	}
	// Weapon cooldown
	if (cd1 > 0.0) {
		cd1 -= Time.deltaTime;
	}
}

function MoveTo ( target : GameObject ) {
	AttackMoveOn = false;
	GetComponent(AIPath).target = target.transform;
	GetComponent(AIPath).canSearch = true;
	GetComponent(AIPath).canMove = true;
	if (CombatTarget!=null) {
		GetComponent(AIPath).endReachedDistance = WeaponRange;
	} else GetComponent(AIPath).endReachedDistance = 1.0;
	GetComponent(AIPath).repathRate = Random.Range(0.1,0.5);
}

function MoveTo ( target : GameObject , clearCombatTarget : boolean ) {
	AttackMoveOn = false;
	GetComponent(AIPath).target = target.transform;
	GetComponent(AIPath).canSearch = true;
	GetComponent(AIPath).canMove = true;
	if (CombatTarget!=null) {
		GetComponent(AIPath).endReachedDistance = WeaponRange;
	} else GetComponent(AIPath).endReachedDistance = 1.0;
	GetComponent(AIPath).repathRate = Random.Range(0.1,0.5);
	if (clearCombatTarget) {
		CombatTarget = null;
	}
}

function AttackMove ( target : GameObject ) {
	AttackMoveOn = true;
	GetComponent(AIPath).target = target.transform;
	GetComponent(AIPath).canSearch = true;
	GetComponent(AIPath).canMove = true;
	if (CombatTarget!=null) {
		GetComponent(AIPath).endReachedDistance = WeaponRange;
	} else GetComponent(AIPath).endReachedDistance = 1.0;
	GetComponent(AIPath).repathRate = Random.Range(0.1,0.5);
	OriginalTarget = target;
}

function Stop () {
	AttackMoveOn = false;
	GetComponent(AIPath).target = null;
	GetComponent(AIPath).canSearch = false;
	GetComponent(AIPath).canMove = false;	
}

function Stop ( keepTarget : boolean ) {
	GetComponent(AIPath).target = null;
	GetComponent(AIPath).canSearch = false;
	GetComponent(AIPath).canMove = false;	
}

function AttackTarget ( target : GameObject ) { // unused
	CombatTarget = target;
	MoveTo(target);
	GetComponent(AIPath).endReachedDistance = WeaponRange;	
}

// Fire weapon
function Fire () {
	if (cd1 <= 0.0) {
		cd1 = WeaponCooldown1;
		var targeter = Instantiate(Targeter, CombatTarget.transform.position, CombatTarget.transform.rotation);
		for (var i:int;i<WeaponBulletsFired;i++) {
			var bullet = Instantiate(WeaponBullet,transform.position,transform.rotation);
			bullet.transform.LookAt(targeter.transform);
			bullet.GetComponent(BulletScript).Damage = WeaponDamage;
			bullet.GetComponent(BulletScript).Team = Team;
			yield WaitForSeconds(WeaponCooldown2);
		}
		Destroy(targeter);
	}
}

// Move to and engage a target if there is one
function SeekTarget () {
	if (CheckDistanceFromTarget() < WeaponRange) {
		if (AttackMoveOn) {
			Stop(true);
			Fire();
		} else {
			Fire();
		}
	} else {	
		if (AttackMoveOn) {
			MoveTo(CombatTarget);
		}
	}
	
}

// Engage passively spotted enemy
function SpottedTarget ( target : GameObject ) {
	if (CombatTarget == null) {
		CombatTarget = target;
	}
}

function CheckDistanceFromTarget () {
	DistanceFromTarget = Vector3.Distance(transform.position, CombatTarget.transform.position);
	return DistanceFromTarget;
}

// Check line of sight and distance to combat target
function CanFire () : boolean { // not working very well, unused
	return true;
	var hit : RaycastHit;
	if (Physics.Raycast(transform.position, CombatTarget.transform.position, hit, WeaponRange+5)) {
		if (hit.collider.gameObject == CombatTarget) {
			return true;
		}
		else {
			return false;
		}
	}
}

function BulletHit ( damage : int ) {
	CurrentHealth -= damage;
	if (CurrentHealth <= 0) {
		Die();
	}
}

function Die () {
	// particles and stuff
	Destroy(this.gameObject);
}

function Alert () { // unused
	WaitABit();
	for (var dude in GameObject.FindGameObjectsWithTag("Dude")) {
		if (dude.GetComponent(DudeScript).Team == Team && dude.GetComponent(DudeScript).CombatTarget == null &&
		Vector3.Distance(transform.position, dude.transform.position) <= AlertRange) {			
			dude.GetComponent(DudeScript).CombatTarget = CombatTarget;
			dude.GetComponent(DudeScript).Alert();
		}
	}
}
function WaitABit () {
	yield WaitForSeconds(0.25);
}

function Select () {
	IsSelected = true;
	renderer.material.color = Color.Lerp(Color.green, OriginalColor, 0.4);
}

function Deselect () {
	IsSelected = false;
	renderer.material.color = OriginalColor;
	if (CombatTarget==null) {
		GetComponent(AIPath).canSearch = false;
	}
}

function OnTargetReached () {

}