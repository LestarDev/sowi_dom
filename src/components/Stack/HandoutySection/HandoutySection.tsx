import { useEffect, useState } from "react";
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

    // const refDiv = useRef<HTMLDivElement>(null);

    const emptyHandout: handoutTyep = {
        tytul: '',
        isPrzeczytana: null,
        tres: ''
    }

    const [currentHandout, setCurrentHandout] = useState(emptyHandout);
    const [offset, setOffset] = useState(0);

    const emptyDivEl = <div className="HandoutySection"></div>;

    const [divElement, setDivElement] = useState(emptyDivEl);

    useEffect(()=>{
        setDivElement(emptyDivEl);
        const onScroll = () => setOffset(window.scrollY);
        fetch(getMainLink(isStackBlitz)+getKsiazka+"id="+profile.idUzytkownika).then(response=>response.json()).then((data: any)=>{
            // console.log(data);

            // if(refDiv.current){
            //     refDiv.current.innerHTML="";
            // }

            if(data[0]==0) return;

            for(let i=1; i<(data[0]*3); i+=3){
                const preItem: handoutTyep = {tytul: data[i],isPrzeczytana: (data[i+1]==1),tres: data[i+2]}
                // console.log(preItem);
                
                

                // const prepDiv = document.createElement('div');
                // const spanTresc = document.createElement('span');
                // const buttonTresc = document.createElement('button');
                // spanTresc.innerHTML=preItem.tytul;
                // buttonTresc.innerHTML="Czytaj";
                // buttonTresc.className = preItem.isPrzeczytana ? "publiczny" : "doPrzeczytania";
                // buttonTresc.onclick=function(){
                //     // if(!preItem.isPrzeczytana) return;
                //     setCurrentHandout(preItem);
                // }
                // prepDiv.appendChild(spanTresc);
                // prepDiv.append(buttonTresc);
                // refDiv.current?.appendChild(prepDiv)

                setDivElement(preDiv=><div>
                    {preDiv.props.children}
                    <div>
                        <span>{preItem.tytul}</span>
                        <button className={preItem.isPrzeczytana ? "publiczny" : "doPrzeczytania"} onClick={()=>{
                            setCurrentHandout(preItem);
                        }}>Czytaj</button>
                    </div>
                </div>)
            }

        })

        window.removeEventListener('scroll', onScroll);
        window.addEventListener('scroll', onScroll, { passive: true });
        window.removeEventListener('touchmove', onScroll);
        window.addEventListener('touchmove', onScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('touchmove', onScroll);
        }

    },[profile.refreshPage])

    const closeWindow = () => {
        setCurrentHandout(emptyHandout);
    }

    return <div>
        {
            divElement
        }
        {currentHandout.isPrzeczytana!=null ? (currentHandout.isPrzeczytana==false ? <>
            
            <div className="windowShowed" style={{transform: "translateY("+offset+"px)"}}>
                <div className="handout">
                    <span className="unreaded">Nie przeczytales jeszcze</span>
                    <button onClick={closeWindow}>x</button>
                </div>
            </div>
            
            </> : <><div className="windowShowed" style={{transform: "translateY("+offset+"px)"}}>
            <div className="handout">
                <textarea cols={40} rows={20} defaultValue={currentHandout.tres} readOnly />
                <button onClick={closeWindow}>x</button>
            </div>
            
            </div></>):''}
    </div>
}

export default HandoutySection