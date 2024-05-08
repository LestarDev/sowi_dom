<?php

header("Access-Control-Allow-Origin: https://lestardev.github.io");
header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Accept, Authorization, X-Requested-With, X-Auth-Token, Origin, Application");

$idUzytkownika = $_GET["idUz"];
$id1 = $_GET["id1"];
$id2 = $_GET["id2"];
$id3 = $_GET["id3"];
$sowiStatus = $_GET["sowieMonety"];

$con = mysqli_connect('localhost','lestardev','OptimusPrime9001!','lestardev_sowka');

 if(!$con){
    mysqli_close($con);
        // header("Location: ".$url);
    exit();
 }else{
    $query_update = "UPDATE `umiejetnosci`, `uzytkownicy`
    SET `lvlUmiejki` = `lvlUmiejki`+1 
    WHERE umiejetnosci.id_uzytkownika=uzytkownicy.id AND uzytkownicy.sowieMonety='$sowiStatus' AND uzytkownicy.id='$idUzytkownika' AND 
    (umiejetnosci.id='$id1' OR umiejetnosci.id='$id2' OR umiejetnosci.id='$id3');";
    mysqli_query($con, $query_uzytkownik);
    return "pomyslnieDodano";
 }

?>