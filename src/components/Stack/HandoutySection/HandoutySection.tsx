import { useEffect, useRef, useState } from "react";
import useProfile from "../../../hooks/useProfile"
import getMainLink, { getKsiazka } from "../../../private/apiData";
import { isStackBlitz } from "../../../shared/config/isStackBlitz";
import './HandoutySection.css'

const HandoutySection = () => {

    const profile = useProfile();

    type handoutTyep = {
        tytul: string,
        isPrzeczytana: boolean | null,
        tres: string
    }

    const refDiv = useRef<HTMLDivElement>(null);

    const emptyHandout: handoutTyep = {
        tytul: '',
        isPrzeczytana: null,
        tres: ''
    }

    const [currentHandout, setCurrentHandout] = useState(emptyHandout);

    useEffect(()=>{
        fetch(getMainLink(isStackBlitz)+getKsiazka+"id="+profile.idUzytkownika).then(response=>response.json()).then((data: any)=>{
            console.log(data);

            if(refDiv.current){
                refDiv.current.innerHTML="";
            }

            for(let i=1; i<(data[0]+3); i+=3){
                const preItem: handoutTyep = {tytul: data[i],isPrzeczytana: (data[i+1]==1),tres: data[i+2]}
                console.log(preItem);
                
                if(data[0]==0) return;

                const prepDiv = document.createElement('div');
                const spanTresc = document.createElement('span');
                const buttonTresc = document.createElement('button');
                spanTresc.innerHTML=preItem.tytul;
                buttonTresc.innerHTML="Czytaj";
                buttonTresc.className = preItem.isPrzeczytana ? "publiczny" : "doPrzeczytania";
                buttonTresc.onclick=function(){
                    // if(!preItem.isPrzeczytana) return;
                    setCurrentHandout(preItem);
                }
                prepDiv.appendChild(spanTresc);
                prepDiv.append(buttonTresc);
                refDiv.current?.appendChild(prepDiv)
            }

        })
    },[])

    const closeWindow = () => {
        setCurrentHandout(emptyHandout);
    }

    return <div>
        <div ref={refDiv}></div>
        {currentHandout.isPrzeczytana!=null ? <><div className="windowShowed">
            <div className="handout">
                <textarea cols={40} rows={20} defaultValue={currentHandout.tres} readOnly />
                <button onClick={closeWindow}>x</button>
            </div>
            
            </div></> : (currentHandout.isPrzeczytana==false ? <>
            
            <div className="windowShowed">
                <div className="handout">
                    <span>Nie przeczytales jeszcze</span>
                    <button onClick={closeWindow}>x</button>
                </div>
            </div>
            
            </> : '')}
    </div>
}

export default HandoutySection