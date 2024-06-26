import { useEffect, useRef } from "react";
import useProfile from "../../hooks/useProfile"
import { getNickScript } from "../../private/apiData";
import getMainLink from "../../private/apiData";
import NavBar from "../../components/NavBar/NavBar";
import StatsSection from "../../components/Stack/StatsSection/StatsSection";
import SectionFromBar from "../../components/SectionFromBar/SectionFromBar";
import { isStackBlitz } from "../../shared/config/isStackBlitz";
import './MainPage.css'

type mainPageType = {
    setLoginPage: React.Dispatch<React.SetStateAction<number>>
}

const MainPage = ({setLoginPage}: mainPageType) => {

    const profile = useProfile();

    // profile.setNewAppName("Testq1");

    const errorRef = useRef<HTMLDivElement>(null);

    // profile.setNewIdUzytkownika(uuid);

    useEffect(()=>{
            fetch(getMainLink(isStackBlitz)+getNickScript+"id="+profile.idUzytkownika).then((response)=>response.json()).then((data: string[])=>{
                // console.log("Data:",data);
                // console.log("Main Page Cialo", typeof data[3]);
                profile.setNewNick(data[0]);
                profile.setNewLvl(Number(data[1]));
                profile.setNewAddHP(Number(data[2]));
                profile.setNewCialo(data[3]);
                profile.setNewUmysl(data[4]);
                profile.setNewUrok(data[5]);
                profile.setNewZrecznosc(data[6]);
                profile.setNewNiezlomnosc(data[7]);
                profile.setNewIntuicja(data[8]);
                profile.setNewSzczescie(Number(data[9]));
                profile.setNewSlimaki(Number(data[10]));
                //profile.setNewNick('test1');
                // console.log(data)
            }).catch((error)=>{
                if(errorRef.current){
                    errorRef.current.innerHTML=error;
                    console.log(error);
                }
            })
    },[profile.refreshPage])

    // refresh => useProfile [add refresh: boolean] => rerender aria

    return (<div aria-label="Main Page">
        <NavBar setLoginPage={setLoginPage}></NavBar>
        <StatsSection></StatsSection>
        <SectionFromBar setLoginPage={setLoginPage}></SectionFromBar>
        <div ref={errorRef}></div>
    </div>)
}

export default MainPage