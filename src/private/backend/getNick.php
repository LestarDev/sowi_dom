<?php

header("Access-Control-Allow-Origin: https://lestardev.github.io");
header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Accept, Authorization, X-Requested-With, X-Auth-Token, Origin, Application");

$id = $_GET["id"];

$con = mysqli_connect('localhost','lestardev','OptimusPrime9001!','lestardev_sowka');

 if(!$con){
    mysqli_close($con);
        // header("Location: ".$url);
    exit();
 }else{
    $query_uzytkownik = "SELECT postacie.nick, postacie.lvl, postacie.HP, postacie.Cialo, postacie.Umysl, postacie.Urok, postacie.Zrecznosc, postacie.Niezlomnosc, postacie.Intuicja, postacie.Szczescie, postacie.Slimaki FROM `postacie` WHERE postacie.id_uzytkownika='$id';";
    $res_uzytkownik = mysqli_query($con, $query_uzytkownik);
    $row_uzytkownik = mysqli_fetch_row($res_uzytkownik);
    
    if($row_uzytkownik==null){
    	echo "Error id";
    }else{
    	echo json_encode($row_uzytkownik);
    }
    
 }

// echo $login.' '.$password;

?>