import { useEffect, useState } from "react";
import useProfile from "../../hooks/useProfile"
import mainLink, { getNickScript, getProfileScript } from "../../private/apiData";
import getMainLink from "../../private/apiData";

const MainPage = () => {

    const profile = useProfile();

    // profile.setNewAppName("Testq1");

    const [uuid, setUUID] = useState(false);

    

    // profile.setNewIdUzytkownika(uuid);

    useEffect(()=>{
            fetch(getMainLink(true)+getNickScript+"id="+profile.idUzytkownika).then((response)=>response.text()).then((data: unknown)=>{
                profile.setNewNick(data as string);
            })
    },[])

    return (<div aria-label="Main Page">
        {profile.nick}
    </div>)
}

export default MainPage