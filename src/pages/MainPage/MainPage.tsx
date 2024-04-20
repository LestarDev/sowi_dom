import { useEffect } from "react";
import useProfile from "../../hooks/useProfile"

const MainPage = () => {

    const profile = useProfile();

    // profile.setNewAppName("Testq1");

    profile.setNewProfile({
        nick: "testq2",
        Cialo: 0,
        HP: 0,
        idUzytkownika: 0,
        Intuicja: 0,
        lvl: 0,
        Niezlomnosc: 0,
        Szczescie: 0,
        Umysl: 0,
        Urok: 0,
        Zrecznosc: 0,
    })

    useEffect(()=>{
        fetch("https://mlp-rpg.zsti.me/phpData/getUzytkownik.php?nick="+profile.nick).then((response)=>response.text()).then((data)=>{
            console.log(data);
        })
    },[])

    return (<div>
        {profile.nick}
    </div>)
}

export default MainPage