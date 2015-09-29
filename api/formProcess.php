<?php

include 'dbConfig.php';
require 'Slim/Slim.php';
\Slim\Slim::registerAutoloader();

$slim_app = new \Slim\Slim();

$slim_app->get('/showEmp','loadUsers');
$slim_app->post('/newUser','newUser');
$slim_app->delete('/deleteUser/:empid','deleteUser');
$slim_app->post('/editEmp','editEmp');
$slim_app->get('/loadEditUser/:eid','loadEditUser');

$slim_app->run();

function loadUsers() {
	$sql = "SELECT id,name,dob,dept,email,phone,address FROM employees ORDER BY id asc";
	try {
		$db = getDB();
		$stmt = $db->query($sql);  
		$users = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo json_encode($users);
		
	} catch(PDOException $e) {
	    echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function newUser() {
	$request = \Slim\Slim::getInstance()->request();
	$insert = json_decode($request->getBody());
	
	$sql = "INSERT INTO employees (id, name ,dob, dept, email, phone, address) VALUES (:id, :name, :dob, :dept, :email, :phone, :address)";
	try {
		$db = getDB();
		$stmt = $db->prepare($sql);  
        $stmt->bindParam("id", $insert->id);
		$stmt->bindParam("name", $insert->name);
        $stmt->bindParam("dob", $insert->dob);
        $stmt->bindParam("dept", $insert->dept);
		$stmt->bindParam("email", $insert->email);
		$stmt->bindParam("phone", $insert->phone);	
        $stmt->bindParam("address", $insert->address);
		$status = $stmt->execute();	
		$db = null;
		echo '{"status":'.$status.'}';
	} catch(PDOException $e) {		
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}


function deleteUser($empid) {   
	$sql = "DELETE FROM employees WHERE id=:id";
	try {
		$db = getDB();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("id", $empid);
		$stmt->execute();
		$db = null;
		//echo true;
		loadUsers();
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}	
}

function loadEditUser($eid) {
	$sql = "SELECT id,name,dob,dept,email,phone,address FROM employees WHERE id=:id";
	try {		
		$db = getDB();		
		$stmt = $db->prepare($sql);
		$stmt->bindValue(':id', $eid);		
		$stmt->execute();
		$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);		
		$db = null;
		echo json_encode($rows);
	} catch(PDOException $e) {
	    echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function editEmp() {
	$request = \Slim\Slim::getInstance()->request();
	$update = json_decode($request->getBody());
	
	$sql = "UPDATE employees SET id = :id, name = :name, dob = :dob, dept= :dept, email = :email, phone = :phone, address = :address WHERE id = :id";
	try {
		$db = getDB();
		$stmt = $db->prepare($sql);  
        $stmt->bindParam("id", $update->id);
		$stmt->bindParam("name", $update->name);
        $stmt->bindParam("dob", $update->dob);
        $stmt->bindParam("dept", $update->dept);
		$stmt->bindParam("email", $update->email);
		$stmt->bindParam("phone", $update->phone);	
        $stmt->bindParam("address", $update->address);
		$status = $stmt->execute();	
		$db = null;
		echo '{"status":'.$status.'}';
	} catch(PDOException $e) {		
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}
