import { useEffect, useRef, useState } from "react"
import getMainLink, { getZdolnosciScript } from "../../../private/apiData"
import useProfile from "../../../hooks/useProfile";
import ChainLinkIcon from "../../../assets/chain_link_icon.png";
import "./ZdolnosciSection.css"
import { isStackBlitz } from "../../../shared/config/isStackBlitz";
import RecepturaZdolnosci from "../../RecepturaZdolnosci/RecepturaZdolnosci";

const ZdolnosciSection = () => {

    const profile = useProfile();

    const refDiv = useRef<HTMLDivElement>(null);

    const [receptaToShow, setReceptaToShow] = useState(0);

    type zdolnoscType = {
        nazwa: string, 
        czyPolaczone: boolean
    }

    const wyswietlRecepta = (idZdolnosci: number) => {
        setReceptaToShow(idZdolnosci);
    }

    const zamknijRecepture = () => {
        setReceptaToShow(0);
    }

    useEffect(()=>{
        fetch(getMainLink(isStackBlitz)+getZdolnosciScript+"id="+profile.idUzytkownika).then(response=>response.json()).then((data: any)=>{

            if(refDiv.current){
                refDiv.current.innerHTML="";
            }

            for(let i=1; i<(data[0]+2); i+=3){
                console.log('Zdolnosc: ',data[i],data[i+1], data[i+2]);
                const preperZdolnosc: zdolnoscType = {nazwa: data[i+1], czyPolaczone: (data[i+2]==1)}
                const divToPush = document.createElement("div");
                const spanToPush = document.createElement("span");
                const imgToPush = document.createElement("img");
                spanToPush.innerHTML=preperZdolnosc.nazwa+"<IoIosLink />";
                imgToPush.src=ChainLinkIcon;
                imgToPush.className="imgChain";
                imgToPush.onclick=function(){
                    wyswietlRecepta(data[i]);
                }
                divToPush.appendChild(spanToPush);
                if(preperZdolnosc.czyPolaczone) divToPush.appendChild(imgToPush);
                refDiv.current?.appendChild(divToPush);
            }

        })
    },[])

    return <div className="ZdolnosciSection">
        <div ref={refDiv}></div>
        { receptaToShow!=0 ? <div className="ReceptaZdolnosci"><RecepturaZdolnosci props={{id: receptaToShow}} /><button onClick={zamknijRecepture}>x</button></div> : ''}
    </div>
}

export default ZdolnosciSection