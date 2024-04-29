import { useEffect, useRef, useState } from "react";
import useProfile from "../../../hooks/useProfile"
import getMainLink, { getEkwipunek } from "../../../private/apiData";
import { isStackBlitz } from "../../../shared/config/isStackBlitz";
import './Ekwipunek.css'

const EkwipunekSection = () => {

    const profile = useProfile();

    const refDiv = useRef<HTMLDivElement>(null);
    const refDivOpenWindow = useRef<HTMLDivElement>(null);

    type ekwipunekType = {
        nazwa: string,
        ilosc: string,
        czyBron: boolean
    }

    const emptyItem: ekwipunekType = {nazwa:'', ilosc:'', czyBron: false}

    const [obecnyEkwipunek, setObecnyEkwipunek] = useState(emptyItem);

    useEffect(()=>{
        fetch(getMainLink(isStackBlitz)+getEkwipunek+"id="+profile.idUzytkownika).then(response=>response.json()).then((data: any)=>{
            console.log(data);

            if(refDiv.current){
                refDiv.current.innerHTML="";
            }

            for(let i=1; i<(data[0]+2); i+=3){
                const preItem: ekwipunekType = {nazwa: data[i], ilosc: data[i+1],czyBron: (data[i+2]==1)};

                //console.log(i,data[i],data[i+1],data[i+2]);
                if(refDiv.current){
                    //const divEl = createElement("div",{className: "singleUmiejka"},createElement("span",preUmiejka.name));
                    const divEl = document.createElement("div");
                    const firstSpan = document.createElement("span");
                    const secondSpan = document.createElement("span");
                    const buttonOpen = document.createElement("button");
                    divEl.className="singleUmiejka";
                    firstSpan.innerHTML=preItem.nazwa;
                    secondSpan.innerHTML= "("+preItem.ilosc as string+")";
                    buttonOpen.innerHTML="Info";
                    buttonOpen.onclick= function(){
                        // openWindow(preUmiejka);
                        setObecnyEkwipunek(preItem);
                    }
                    divEl.appendChild(firstSpan);
                    divEl.appendChild(secondSpan);
                    divEl.appendChild(buttonOpen);
                    refDiv.current.appendChild(divEl);
                    
                    //refDiv.current.innerHTML+=preUmiejka.name+' : '+preUmiejka.value+'<br> ';
                }
            }

        })
    },[])

    const closeWindow = () => {
        setObecnyEkwipunek(emptyItem);
    }

    return <div className="EkwipunekSection">
        <div ref={refDiv}></div>
        <div ref={refDivOpenWindow} className={obecnyEkwipunek.nazwa=='' ? 'window' : 'windowShowed'}>
            <div className="eqBox">
                <h2>{obecnyEkwipunek.nazwa}</h2>
                <div className="dataEQ">
                    <span>{obecnyEkwipunek.ilosc}</span>
                    <span>{obecnyEkwipunek.czyBron ? 'Bron' : ''}</span>
                </div>
                <button onClick={closeWindow}>x</button>
            </div>
        </div>
    </div>
}

export default EkwipunekSection