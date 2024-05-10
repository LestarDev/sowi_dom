import { useEffect, useRef, useState } from "react";
import getMainLink, { getUmiejkiLike } from "../../private/apiData";
import { isStackBlitz } from "../../shared/config/isStackBlitz";
import useProfile from "../../hooks/useProfile";
import umiejetnoscType from "../../shared/config/umiejetnosciType";

const SearchUmiejetnosci = ({props}: any) => {
    const wyszukaj: string = props.wyszukaj;

    const profile = useProfile();

    const refDiv = useRef<HTMLDivElement>(null);
    const refDivOpenWindow = useRef<HTMLDivElement>(null);

    const [windowUmiejkaData, setWindowUmiejkaData] = useState({value: 0, cecha: 0,nazwa:''});

    useEffect(()=>{
        fetch(getMainLink(isStackBlitz)+getUmiejkiLike+"id="+profile.idUzytkownika+"&like="+wyszukaj).then(response=>response.json()).then((data: any)=>{
            if(refDiv.current){
                refDiv.current.innerHTML="";
                if(data[0]==0){
                    refDiv.current.innerHTML="Brak takiej umiejetnosci";
                    return;
                }
            }
            
            for(let i=1; i<(data[0]+4); i+=4){

                const preUmiejka: umiejetnoscType = {name: data[i], value: Number(data[i+1]),type: data[i+2], id: data[i+3]};

                //console.log(i,data[i],data[i+1],data[i+2]);
                if(refDiv.current){
                    //const divEl = createElement("div",{className: "singleUmiejka"},createElement("span",preUmiejka.name));
                    const divEl = document.createElement("div");
                    const firstSpan = document.createElement("span");
                    const secondSpan = document.createElement("span");
                    const buttonOpen = document.createElement("button");
                    divEl.className="singleUmiejka";
                    firstSpan.innerHTML=preUmiejka.name;
                    secondSpan.innerHTML=profile.przelicznik(preUmiejka.value) as string;
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
        })
    },[props])

    const openWindow = (danaUmiejka: umiejetnoscType) => {
        setWindowUmiejkaData({value: danaUmiejka.value, cecha: danaUmiejka.type, nazwa: danaUmiejka.name});
    }

    const closeWindow = () => {
        setWindowUmiejkaData({value:0, cecha: 0, nazwa:''});
    }

    return <>
        <div ref={refDiv}></div>
            <div ref={refDivOpenWindow} className={windowUmiejkaData.cecha==0 ? "window" : "windowShowed"}>
                <div>
                    <h2>{windowUmiejkaData.nazwa}</h2>
                    <span>Umiejetnosc: {profile.przelicznik(windowUmiejkaData.value)}</span>
                    <span>Cecha: {profile.przelicznik(profile.getCeche(windowUmiejkaData.cecha))}</span>
                    <span>{profile.zlaczoneKostki(windowUmiejkaData.value, profile.getCeche(windowUmiejkaData.cecha))}</span>
                    <button onClick={closeWindow}>x</button>
                </div>
                
            </div>
        </>
}

export default SearchUmiejetnosci