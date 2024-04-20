import { useEffect, useState } from "react";
import useProfile from "../../hooks/useProfile"
import mainLink, { getNickScript, getProfileScript } from "../../private/apiData";

const MainPage = () => {

    const profile = useProfile();

    // profile.setNewAppName("Testq1");

    const [uuid, setUUID] = useState(false);

    

    // profile.setNewIdUzytkownika(uuid);

    useEffect(()=>{
            fetch(mainLink+getNickScript+"id="+profile.idUzytkownika).then((response)=>response.text()).then((data: unknown)=>{
                profile.setNewNick(data as string);
            })
    },[])

    return (<div>
        {profile.nick}
    </div>)
}

export default MainPage