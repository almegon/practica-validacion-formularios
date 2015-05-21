<?php
header('content-type: application/json; charset=utf-8');
header("access-control-allow-origin: *");

$request = trim(strtolower($_REQUEST['nombre']));
//sleep(2);
usleep(150000);
$users = array('asdf', 'Peter', 'Peter2', 'George');
$valid = 'true';
foreach($users as $user) {
	if( strtolower($user) == $request )
		$valid = 'false';
}
echo $valid;
?>
