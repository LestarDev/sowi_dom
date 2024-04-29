import { useEffect, useRef } from "react"
import getMainLink, { getZdolnosciScript } from "../../../private/apiData"
import useProfile from "../../../hooks/useProfile";
import ChainLinkIcon from "../../../assets/chain_link_icon.png";
import "./ZdolnosciSection.css"
import { isStackBlitz } from "../../../shared/config/isStackBlitz";

const ZdolnosciSection = () => {

    const profile = useProfile();

    const refDiv = useRef<HTMLDivElement>(null);

    type zdolnoscType = {
        nazwa: string, 
        czyPolaczone: boolean
    }

    useEffect(()=>{
        fetch(getMainLink(isStackBlitz)+getZdolnosciScript+"id="+profile.idUzytkownika).then(response=>response.json()).then((data: any)=>{

            if(refDiv.current){
                refDiv.current.innerHTML="";
            }

            for(let i=1; i<(data[0]+1); i+=2){
                console.log('Zdolnosc: ',data[i], data[i+1]);
                const preperZdolnosc: zdolnoscType = {nazwa: data[i], czyPolaczone: (data[i+1]==1)}
                const divToPush = document.createElement("div");
                const spanToPush = document.createElement("span");
                const imgToPush = document.createElement("img");
                spanToPush.innerHTML=preperZdolnosc.nazwa+"<IoIosLink />";
                imgToPush.src=ChainLinkIcon;
                imgToPush.className="imgChain";
                divToPush.appendChild(spanToPush);
                if(preperZdolnosc.czyPolaczone) divToPush.appendChild(imgToPush);
                refDiv.current?.appendChild(divToPush);
            }

        })
    },[])

    return <div className="ZdolnosciSection">
        <div ref={refDiv}></div>
    </div>
}

export default ZdolnosciSection