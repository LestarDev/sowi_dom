import { useEffect, useState } from "react";
import useProfile from "../../hooks/useProfile"
import mainLink, { getNickScript, getProfileScript } from "../../private/apiData";
import getMainLink from "../../private/apiData";
import NavBar from "../../components/NavBar/NavBar";
import StatsSection from "../../components/Stack/StatsSection/StatsSection";
import SectionFromBar from "../../components/SectionFromBar/SectionFromBar";

const MainPage = () => {

    const profile = useProfile();

    // profile.setNewAppName("Testq1");

    const [uuid, setUUID] = useState(false);

    

    // profile.setNewIdUzytkownika(uuid);

    useEffect(()=>{
            fetch(getMainLink(true)+getNickScript+"id="+profile.idUzytkownika).then((response)=>response.json()).then((data: any)=>{
                profile.setNewNick(data[0] as string);
                profile.setNewLvl(data[1] as number);
                profile.setNewCialo(data[3] as number);
                profile.setNewUmysl(data[4] as number);
                profile.setNewUrok(data[5] as number);
                profile.setNewZrecznosc(data[6] as number);
                profile.setNewNiezlomnosc(data[7] as number);
                profile.setNewIntuicja(data[8] as number);
                profile.setNewSzczescie(data[9] as number);
                //profile.setNewNick('test1');
                console.log(data)
            })
    },[])

    return (<div aria-label="Main Page">
        <NavBar></NavBar>
        <StatsSection></StatsSection>
        <SectionFromBar></SectionFromBar>
    </div>)
}

export default MainPage