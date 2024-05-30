import { useEffect, useState } from "react"
import useProfile from "../../hooks/useProfile"
import getMainLink, { AdminGetIDsScript } from "../../private/apiData";
import { isStackBlitz } from "../../shared/config/isStackBlitz";

type uzytkownikType = {
    id: number,
    nick: string,
    lvl: number,
    sowieMonety: number
}

const Admin = () => {

    const profile = useProfile();

    const emptyUzytkownicy: uzytkownikType[] = []

    const [uzytkownicyToLogin, setUzytkownicyToLogin] = useState(emptyUzytkownicy);

    useEffect(()=>{
        fetch(getMainLink(isStackBlitz)+AdminGetIDsScript).then(response=>response.json()).then((data: any)=>{
            for(let i=1; i<(Number(data[0])*4); i+=5){
                setUzytkownicyToLogin([...uzytkownicyToLogin, {id: Number(data[i]), nick: data[i+1], lvl: Number(data[i+2]), sowieMonety: Number(data[i+3])}]);
            }

            console.log(uzytkownicyToLogin);

        })
    },[profile.refreshPage])

    return <div id="Admin">
        {/* {uzytkownicyToLogin[0].nick} */}
    </div>
}

export default Admin