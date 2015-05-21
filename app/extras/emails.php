<?php
header('content-type: application/json; charset=utf-8');
header("access-control-allow-origin: *");

$request = trim(strtolower($_REQUEST['email']));
$emails = array('glen@marketo.com', 'george@bush.gov', 'me@god.com', 'aboutface@cooper.com', 'steam@valve.com', 'bill@gates.com');
$valid = 'true';
foreach($emails as $email) {
	if( strtolower($email) == $request )
		$valid = '"Este email ya existe en la BD."';
}
echo $valid;
?>
