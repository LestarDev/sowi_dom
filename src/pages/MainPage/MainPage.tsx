import { useEffect } from "react";
import useProfile from "../../hooks/useProfile"
import Box from "../../components/Box";

const MainPage = () => {

    const profile = useProfile();

    const changeColor = () => {
      profile.updateCialo(1);
  }
  
  

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
        // fetch("https://mlp-rpg.zsti.me/phpData/getUzytkownik.php?nick="+profile.nick).then((response)=>response.text()).then((data)=>{
        //     console.log(data);
        // })

        let timer1 = setTimeout(() => changeColor(), 2 * 1000);
    return () => {
      clearTimeout(timer1);
    };
    },[])

    return (<div>
        <Box />
    </div>)
}

export default MainPage