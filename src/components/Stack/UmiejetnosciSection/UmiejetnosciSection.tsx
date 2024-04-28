import { createElement, useEffect, useRef, useState } from "react"
import getMainLink, { getUmiejetnosci } from "../../../private/apiData"
import useProfile from "../../../hooks/useProfile"
import "./UmiejetnosciSection.css"

const UmiejetnosciSection = () => {

    const profile = useProfile();

    type umiejetnoscType = {
        name: string,
        value: number,
        type: number
    }

    const [windowUmiejkaData, setWindowUmiejkaData] = useState({value: 0, cecha: 0});

    const refDiv = useRef<HTMLDivElement>(null);
    const refDivOpenWindow = useRef<HTMLDivElement>(null);

    const getCeche = (typeCecha: number) => {
        //console.log(typeof typeCecha);
        switch((typeCecha as unknown) as string){
            case '1':
                return profile.Umysl;
            case '2':
                return profile.Cialo;
            case '3':
                return profile.Zrecznosc;
            case '4':
                return profile.Niezlomnosc;
            case '5':
                return profile.Intuicja;
            case '6':
                return profile.Urok;
            default:
                return 0
        }
    }

    const openWindow = (danaUmiejka: umiejetnoscType) => {
        setWindowUmiejkaData({value: danaUmiejka.value, cecha: danaUmiejka.type});
    }

    const closeWindow = () => {
        setWindowUmiejkaData({value:0, cecha: 0});
    }

    useEffect(()=>{
        fetch(getMainLink(true)+getUmiejetnosci+'id='+profile.idUzytkownika).then(response=>response.json()).then((data: any)=>{
            

            if(refDiv.current){
                refDiv.current.innerHTML="";
            }

            for(let i=1; i<(data[0]+4); i+=3){

                const preUmiejka: umiejetnoscType = {name: data[i], value: data[i+1],type: data[i+2]};

                //console.log(i,data[i],data[i+1],data[i+2]);
                if(refDiv.current){
                    //const divEl = createElement("div",{className: "singleUmiejka"},createElement("span",preUmiejka.name));
                    const divEl = document.createElement("div");
                    const firstSpan = document.createElement("span");
                    const secondSpan = document.createElement("span");
                    const buttonOpen = document.createElement("button");
                    divEl.className="singleUmiejka";
                    firstSpan.innerHTML=preUmiejka.name;
                    secondSpan.innerHTML=profile.przelicznik(preUmiejka.value);
                    buttonOpen.innerHTML="Info";
                    buttonOpen.onclick= function(){
                        openWindow(preUmiejka);
                    }
                    divEl.appendChild(firstSpan);
                    divEl.appendChild(secondSpan);
                    divEl.appendChild(buttonOpen);
                    refDiv.current.appendChild(divEl);
                    
                    //refDiv.current.innerHTML+=preUmiejka.name+' : '+preUmiejka.value+'<br> ';
                }
            }


            
            //const thisManyUmiejetnosci = 
        })
    },[])

    return <div >
        <div ref={refDiv}></div>
        <div ref={refDivOpenWindow} className={windowUmiejkaData.cecha==0 ? "window" : "windowShowed"}>
            <div>
                <span>Umiejetnosc: {profile.przelicznik(windowUmiejkaData.value)}</span>
                <span>Cecha: {profile.przelicznik(getCeche(windowUmiejkaData.cecha))}</span>
                <span>{profile.zlaczoneKostki((windowUmiejkaData.value as unknown) as string, getCeche(windowUmiejkaData.cecha))}</span>
                <button onClick={closeWindow}>x</button>
            </div>
            
        </div>
    </div>
}

export default UmiejetnosciSection