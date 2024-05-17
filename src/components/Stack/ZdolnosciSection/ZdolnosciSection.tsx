import { useEffect, useState } from "react"
import getMainLink, { getZdolnosciScript } from "../../../private/apiData"
import useProfile from "../../../hooks/useProfile";
import "./ZdolnosciSection.css"
import { isStackBlitz } from "../../../shared/config/isStackBlitz";
import RecepturaZdolnosci from "../../RecepturaZdolnosci/RecepturaZdolnosci";
import { IoIosLink } from "react-icons/io";

const ZdolnosciSection = () => {

    const profile = useProfile();

    const emptyDiv = <div></div>

    const [receptaToShow, setReceptaToShow] = useState(0);
    const [divElement, setDivElement] = useState(emptyDiv);

    
    type zdolnoscType = {
        nazwa: string, 
        czyPolaczone: boolean,
        tresc: string
    }
    
    const emptyZdolnosc: zdolnoscType = {
        nazwa: '',
        czyPolaczone: false,
        tresc: ''
    }

    const [infoToShow, setInfoToShow] = useState(emptyZdolnosc);
    
    const wyswietlRecepta = (idZdolnosci: number) => {
        setReceptaToShow(idZdolnosci);
    }

    const zamknijRecepture = () => {
        setReceptaToShow(0);
    }

    const showInfo = (newInfo: zdolnoscType) => {
        setInfoToShow(newInfo);
    }

    const hideInfo = () => {
        setInfoToShow(emptyZdolnosc);
    }

    const [offset, setOffset] = useState(0);

    useEffect(()=>{
        const onScroll = () => setOffset(window.scrollY);
        fetch(getMainLink(isStackBlitz)+getZdolnosciScript+"id="+profile.idUzytkownika).then(response=>response.json()).then((data: any)=>{

            setDivElement(emptyDiv);
            // console.log(data);
            for(let i=1; i<(data[0]*4); i+=4){
                //console.log('Zdolnosc: ',data[i],data[i+1], data[i+2]);
                const preperZdolnosc: zdolnoscType = {nazwa: data[i+1], czyPolaczone: (data[i+2]==1), tresc: data[i+3]}

                setDivElement(prevEl=><div>
                    {prevEl.props.children}
                    <div>
                        <span>
                            {preperZdolnosc.nazwa}
                            {
                                preperZdolnosc.czyPolaczone ? <IoIosLink onClick={()=>{wyswietlRecepta(data[i])}} /> : ''
                            }
                            
                        </span>
                        <button onClick={()=>{showInfo(preperZdolnosc)}}>Info</button>
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

    return <div className="section">
        {
            divElement
        }
        {infoToShow.tresc!="" ? <div className="windowShowed" style={{transform: "translateY("+offset+"px)"}}>
            <div className="zdolnoscInfoBox">
                <h2>{infoToShow.nazwa}</h2>
                <textarea cols={40} rows={10} defaultValue={infoToShow.tresc + (infoToShow.czyPolaczone ? "\n \n Zdolnosc ta jest polaczona" : '')} readOnly />
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