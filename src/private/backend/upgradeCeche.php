<?php

header("Access-Control-Allow-Origin: https://lestardev.github.io");
header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Accept, Authorization, X-Requested-With, X-Auth-Token, Origin, Application");

$idUzytkownika = $_GET["idUz"];
$cecha = $_GET["cecha"];
$sowiStatus = $_GET["sowieMonety"];

$con = mysqli_connect('localhost','lestardev','OptimusPrime9001!','lestardev_sowka');

 if(!$con){
    mysqli_close($con);
        // header("Location: ".$url);
    exit();
 }else{
    $query_update = "UPDATE `postacie`, `uzytkownicy` 
    SET postacie.'$cecha' = postacie.'$cecha'+1, uzytkownicy.sowieMonety = uzytkownicy.sowieMonety-5 
    WHERE postacie.id_uzytkownika=uzytkownicy.id AND uzytkownicy.sowieMonety='$sowiStatus' AND uzytkownicy.id='$idUzytkownika'";
    mysqli_query($con, $query_update);
    echo "pomyslnieDodano";
 }

?>