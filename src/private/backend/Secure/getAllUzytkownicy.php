<?php

header("Access-Control-Allow-Origin: https://lestardev.github.io");
header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Accept, Authorization, X-Requested-With, X-Auth-Token, Origin, Application");

$con = mysqli_connect('localhost','lestardev','OptimusPrime9001!','lestardev_sowka');

 if(!$con){
    mysqli_close($con);
        // header("Location: ".$url);
    exit();
 }else{
    $query_uzytkownik = "SELECT uzytkownicy.id, postacie.nick, postacie.lvl, uzytkownicy.sowieMonety FROM uzytkownicy INNER JOIN postacie ON postacie.id_uzytkownika=uzytkownicy.id;";
    $res_uzytkownik = mysqli_query($con, $query_uzytkownik);
    
    $tab = [mysqli_num_rows($res_uzytkownik)];
    
    for($i=0; $i<mysqli_num_rows($res_uzytkownik); $i++){
    	
    	 $row_uzytkownik=mysqli_fetch_row($res_uzytkownik);
    	 if($row_uzytkownik==null){
	    	echo "Error id";
	    	return;
	    }else{
	    	//echo json_encode($row_uzytkownik);
	    	$tab = array_merge($tab, $row_uzytkownik);
	    }	
    }
    
    echo json_encode($tab);
    
    
    
 }

// echo $login.' '.$password;

?>