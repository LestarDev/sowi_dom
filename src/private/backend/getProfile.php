<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Origin: https://sowidom-p21v--5173--7dbe22a9.local-credentialless.webcontainer.io");
header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Accept, Authorization, X-Requested-With, X-Auth-Token, Origin, Application");

$login = $_GET["login"];

$password = $_GET["password"];

$con = mysqli_connect('localhost','lestardev','OptimusPrime9001!','lestardev_sowka');

 if(!$con){
    mysqli_close($con);
        // header("Location: ".$url);
    exit();
 }else{
    $query_uzytkownik = "SELECT id from `uzytkownicy` WHERE login='$login' AND password='$password';";
    $res_uzytkownik = mysqli_query($con, $query_uzytkownik);
    $row_uzytkownik = mysqli_fetch_row($res_uzytkownik);
    
    if($row_uzytkownik==null){
    	echo "Error login";
    }else{
    	echo $row_uzytkownik[0];
    }
    
 }

// echo $login.' '.$password;

?>