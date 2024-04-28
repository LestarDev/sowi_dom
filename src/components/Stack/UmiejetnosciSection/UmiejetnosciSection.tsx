import { createElement, useEffect, useRef, useState } from "react"
import getMainLink, { getUmiejetnosci } from "../../../private/apiData"
import useProfile from "../../../hooks/useProfile"

const UmiejetnosciSection = () => {

    const profile = useProfile();

    type umiejetnoscType = {
        name: string,
        value: number
    }

    const [windowUmiejkaData, setWindowUmiejkaData] = useState({value: 0, cecha: 0});

    const refDiv = useRef<HTMLDivElement>(null);
    const refDivOpenWindow = useRef<HTMLDivElement>(null);

    const openWindow = (danaUmiejka: umiejetnoscType) => {
        setWindowUmiejkaData({value: danaUmiejka.value, cecha: 0});
    }

    useEffect(()=>{
        fetch(getMainLink(true)+getUmiejetnosci+'id='+profile.idUzytkownika).then(response=>response.json()).then((data: any)=>{
            

            if(refDiv.current){
                refDiv.current.innerHTML="";
            }

            for(let i=1; i<(data[0]+3); i+=2){

                const preUmiejka: umiejetnoscType = {name: data[i], value: data[i+1]};

                console.log(i,data[i],data[i+1]);
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
        <div ref={refDivOpenWindow} className="window">
            {windowUmiejkaData.value}
        </div>
    </div>
}

export default UmiejetnosciSection