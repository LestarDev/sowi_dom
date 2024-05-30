import { useEffect, useRef, useState } from "react";
import useProfile from "../../../hooks/useProfile"
import getMainLink, { getEkwipunek } from "../../../private/apiData";
import { isStackBlitz } from "../../../shared/config/isStackBlitz";
import './Ekwipunek.css'
import { GiKatana } from "react-icons/gi";
import { CiBag1 } from "react-icons/ci";
import BronModule from "../../BronModule/BronModule";

const EkwipunekSection = () => {

    const profile = useProfile();

    const refDivOpenWindow = useRef<HTMLDivElement>(null);

    const emptyDiv = <div></div>;

    const [divElement, setDivElement] = useState(emptyDiv);

    type ekwipunekType = {
        id: number,
        nazwa: string,
        ilosc: string,
        czyBron: boolean,
        opis: string,
    }

    const emptyItem: ekwipunekType = {id: -1,nazwa:'', ilosc:'', czyBron: false, opis: ''}

    const [obecnyEkwipunek, setObecnyEkwipunek] = useState(emptyItem);

    const [offset, setOffset] = useState(0);

    const [isMoreInfo, setIsMoreInfo] = useState(false);

    useEffect(()=>{
        const onScroll = () => setOffset(window.scrollY);
        fetch(getMainLink(isStackBlitz)+getEkwipunek+"id="+profile.idUzytkownika).then(response=>response.json()).then((data: any)=>{
            // console.log(data);
            setDivElement(emptyDiv);
            for(let i=1; i<(data[0]*5); i+=5){
                const preItem: ekwipunekType = {id: Number(data[i]), nazwa: data[i+1], ilosc: data[i+2],czyBron: (data[i+3]=='1'), opis: data[i+4]};

                setDivElement(preElement=><div>
                    {preElement.props.children}
                    <div className="singleUmiejka">
                        <span>{preItem.nazwa}</span>
                        <span>({preItem.ilosc})</span>
                        <button onClick={()=>{setObecnyEkwipunek(preItem)}}>Info</button>
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
        setObecnyEkwipunek(emptyItem);
        setIsMoreInfo(false);
    }

    return <div className="section">
        {
            divElement
        }
        <div ref={refDivOpenWindow} style={{transform: "translateY("+offset+"px)"}} className={obecnyEkwipunek.nazwa=='' ? 'window' : 'windowShowed'}>
            <div className="eqBox">
                <div className="colorEq">
                    <div className="iconEq">
                        <div>

                            {obecnyEkwipunek.czyBron ? <GiKatana /> : <CiBag1 />}
                        </div>
                    </div>
                </div>
                <h2>{obecnyEkwipunek.nazwa}</h2>
                <div className="dataEQ">
                    <span>Ilosc: {obecnyEkwipunek.ilosc}</span>
                    <span>Opis: {obecnyEkwipunek.opis}</span>
                    {obecnyEkwipunek.czyBron ? <BronModule idBroni={obecnyEkwipunek.id} isMoreInfo={isMoreInfo} /> : ''}
                </div>
                <div className="buttonsEQ">
                    {obecnyEkwipunek.czyBron ? <button onClick={()=>setIsMoreInfo(prevV=>!prevV)}>{isMoreInfo ? "Less" : "More"} info</button> : ''}
                    <button onClick={closeWindow}>x</button>
                    {obecnyEkwipunek.czyBron ? <button>Przekaz</button> : ''}
                    
                </div>
            </div>
        </div>
    </div>
}

export default EkwipunekSection