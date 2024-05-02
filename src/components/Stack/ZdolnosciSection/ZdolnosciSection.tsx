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

    const [infoToShow, setInfoToShow] = useState("");

    type zdolnoscType = {
        nazwa: string, 
        czyPolaczone: boolean,
        tresc: string
    }

    const wyswietlRecepta = (idZdolnosci: number) => {
        setReceptaToShow(idZdolnosci);
    }

    const zamknijRecepture = () => {
        setReceptaToShow(0);
    }

    const showInfo = (newInfo: string) => {
        setInfoToShow(newInfo);
    }

    const hideInfo = () => {
        setInfoToShow("");
    }

    useEffect(()=>{
        fetch(getMainLink(isStackBlitz)+getZdolnosciScript+"id="+profile.idUzytkownika).then(response=>response.json()).then((data: any)=>{

            if(refDiv.current){
                refDiv.current.innerHTML="";
            }
            // console.log(data);
            for(let i=1; i<(data[0]*4); i+=4){
                //console.log('Zdolnosc: ',data[i],data[i+1], data[i+2]);
                const preperZdolnosc: zdolnoscType = {nazwa: data[i+1], czyPolaczone: (data[i+2]==1), tresc: data[i+3]}
                const divToPush = document.createElement("div");
                const spanToPush = document.createElement("span");
                const imgToPush = document.createElement("img");
                const buttonInfo = document.createElement('button');
                spanToPush.innerHTML=preperZdolnosc.nazwa+"<IoIosLink />";
                imgToPush.src=ChainLinkIcon;
                imgToPush.className="imgChain";
                imgToPush.onclick=function(){
                    wyswietlRecepta(data[i]);
                }
                buttonInfo.innerHTML="Info";
                buttonInfo.onclick=function(){
                    showInfo(preperZdolnosc.tresc);
                }
                divToPush.appendChild(spanToPush);
                if(preperZdolnosc.czyPolaczone) divToPush.appendChild(imgToPush);
                divToPush.appendChild(buttonInfo);
                refDiv.current?.appendChild(divToPush);
            }

        })
    },[])

    return <div className="ZdolnosciSection">
        <div ref={refDiv}></div>
        {infoToShow!="" ? <div className="windowShowed">
            <div className="zdolnoscInfoBox">
                <textarea cols={40} rows={10} defaultValue={infoToShow} readOnly />
                <button onClick={hideInfo}>x</button>
            </div>
        </div> : ''}
        { receptaToShow!=0 ? <div className="ReceptaZdolnosci">
            <div className="zdolnosciBox">
            <RecepturaZdolnosci props={{id: receptaToShow}} />
            <button onClick={zamknijRecepture}>x</button>
            </div>
            </div> : ''}
    </div>
}

export default ZdolnosciSection