import { useEffect, useRef, useState } from "react";
import useProfile from "../../hooks/useProfile"
import { getNickScript } from "../../private/apiData";
import getMainLink from "../../private/apiData";
import NavBar from "../../components/NavBar/NavBar";
import StatsSection from "../../components/Stack/StatsSection/StatsSection";
import SectionFromBar from "../../components/SectionFromBar/SectionFromBar";
import { isStackBlitz } from "../../shared/config/isStackBlitz";
import './MainPage.css'

const MainPage = () => {

    const profile = useProfile();

    // profile.setNewAppName("Testq1");

    const [toRefresh, setToRefresh] = useState(false);
    const errorRef = useRef<HTMLDivElement>(null);

    // profile.setNewIdUzytkownika(uuid);

    useEffect(()=>{
            fetch(getMainLink(isStackBlitz)+getNickScript+"id="+profile.idUzytkownika).then((response)=>response.json()).then((data: any)=>{
                profile.setNewNick(data[0] as string);
                profile.setNewLvl(data[1] as number);
                profile.setNewAddHP(data[2] as number);
                profile.setNewCialo(data[3] as number);
                profile.setNewUmysl(data[4] as number);
                profile.setNewUrok(data[5] as number);
                profile.setNewZrecznosc(data[6] as number);
                profile.setNewNiezlomnosc(data[7] as number);
                profile.setNewIntuicja(data[8] as number);
                profile.setNewSzczescie(data[9] as number);
                //profile.setNewNick('test1');
                // console.log(data)
            }).catch((error)=>{
                if(errorRef.current){
                    errorRef.current.innerHTML=error;
                    console.log(error);
                }
            })
    },[toRefresh])

    const refreshMainPage = () => {
        //console.log('Odswierzanie...')
        setToRefresh(!toRefresh);
    }

    return (<div aria-label="Main Page">
        <NavBar></NavBar>
        <StatsSection></StatsSection>
        <SectionFromBar></SectionFromBar>
        <div className="refreshConteiner">
            <div ref={errorRef}></div>
            <button onClick={refreshMainPage}>Odswiez</button>
        </div>
    </div>)
}

export default MainPage