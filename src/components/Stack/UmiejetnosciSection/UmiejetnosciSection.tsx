import { useEffect, useRef, useState } from "react"
import getMainLink, { getUmiejetnosciScript } from "../../../private/apiData"
import useProfile from "../../../hooks/useProfile"
import "./UmiejetnosciSection.css"
import { isStackBlitz } from "../../../shared/config/isStackBlitz"
import SearchUmiejetnosci from "../../SearchUmiejetnosci/SearchUmiejetnosci"
import umiejetnoscType from "../../../shared/config/umiejetnosciType"
import { FaSearch } from "react-icons/fa";
import { GrUpgrade } from "react-icons/gr";

type umiejetnosciSectionType = {
    setLoginPage: React.Dispatch<React.SetStateAction<number>>
}

const UmiejetnosciSection = ({setLoginPage}: umiejetnosciSectionType) => {

    const profile = useProfile();

    const emptyUmiejka: umiejetnoscType = {id: 0, name: '', type: 0, value: 0};    

    const [windowUmiejkaData, setWindowUmiejkaData] = useState(emptyUmiejka);

    const [rnText, setRnText] = useState('');

    const [showSearch, setShowSearch] = useState(false);

    const emptyDivElement = <div className="section"></div>;
    const [divElement, setDivElement] = useState(emptyDivElement);

    // const refDiv = useRef<HTMLDivElement>(null);
    const refDivOpenWindow = useRef<HTMLDivElement>(null);
    const refInputSearch = useRef<HTMLInputElement>(null);

    const cechyNazwy = ["Umysl", "Cialo", "Zrecznosc","Niezlomnosc", "Intuicja", "Urok"];

    const openWindow = (danaUmiejka: umiejetnoscType) => {
        setWindowUmiejkaData(danaUmiejka);
        // setWindowUmiejkaData({value: danaUmiejka.value, cecha: danaUmiejka.type, nazwa: danaUmiejka.name});
    }

    const closeWindow = () => {
        setWindowUmiejkaData(emptyUmiejka);
        // setWindowUmiejkaData({value:0, cecha: 0, nazwa:''});
        setModifyRoll(0);
    }

    const [offset, setOffset] = useState(0);

    const [modifyRoll, setModifyRoll] = useState(0);

    useEffect(()=>{
        const onScroll = () => setOffset(window.scrollY);
        fetch(getMainLink(isStackBlitz)+getUmiejetnosciScript+'id='+profile.idUzytkownika).then(response=>response.json()).then((data: any)=>{
            
            setDivElement(emptyDivElement)

            // console.log("Umiejetnosci:",data);

            if(data[0]==0) return;

            for(let i=1; i<(data[0]*4); i+=4){

                const preUmiejka: umiejetnoscType = {name: data[i], value: Number(data[i+1]),type: Number(data[i+2]), id: data[i+3]};


                setDivElement(prevEl=><div  className="UmiejetnosciSection">
                    {prevEl.props.children}
                    <div className="singleUmiejka">
                        <span>{preUmiejka.name}</span>
                        <span>{profile.przelicznik(preUmiejka.value)}</span>
                        <button onClick={()=>{openWindow(preUmiejka)}}>Info</button>
                    </div>
                </div>);

            }


            
            //const thisManyUmiejetnosci = 
        })

        window.removeEventListener('scroll', onScroll);
        window.addEventListener('scroll', onScroll, { passive: true });
        window.removeEventListener('touchmove', onScroll);
        window.addEventListener('touchmove', onScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('touchmove', onScroll);
        }

    },[showSearch, profile.refreshPage])

    const changeShow = () => {
        if(refInputSearch.current?.value!=""){
            setShowSearch(true);
        }else{
            setShowSearch(false);
        }
        if(refInputSearch.current){
            setRnText(refInputSearch.current.value);
        }
    }

    return <div className="UmiejetnosciSection">
        {
            //toDO: Zrobic wyszukiwarke z szukaniem po nazwie [Jesli cos w polu tekstowym render inny element z fetchem na like]
        }
        <div className="searchBar">
            <input type="text" placeholder="Szukaj..." onChange={changeShow} ref={refInputSearch} />
            <FaSearch />
        </div>
        {
            !showSearch ? <>
            {
                divElement
            }
            <div ref={refDivOpenWindow} className={windowUmiejkaData.type==0 ? "window" : "windowShowed"} style={{transform: "translateY("+offset+"px)"}}>
                <div className="umiejkaBox">
                    <h2>
                        {windowUmiejkaData.name}
                        {Number(profile.przelicznik(windowUmiejkaData.value,false,true))>=4 ? <div onClick={()=>{
                            setLoginPage(2);
                        }}><GrUpgrade /></div> : ''}
                    </h2>
                    <span>Umiejetnosc{modifyRoll ? `${modifyRoll>0 ? '+' : ''}${modifyRoll}` : ''}: {profile.przelicznik(windowUmiejkaData.value+modifyRoll)}</span>
                    <span>Cecha: {cechyNazwy[windowUmiejkaData.type-1]} {'['}{profile.przelicznik(profile.getCeche(windowUmiejkaData.type))}{']'}</span>
                    <span>Rzucasz: <b>{profile.zlaczoneKostki(windowUmiejkaData.value+modifyRoll, profile.getCeche(windowUmiejkaData.type))}</b></span>
                    <div>
                        <button onClick={()=>setModifyRoll(prevV=>prevV-1)}>-</button>
                        <button onClick={closeWindow}>x</button>
                        <button onClick={()=>setModifyRoll(prevV=>prevV+1)}>+</button>
                    </div>
                </div>
                
            </div></>

            : 

            <SearchUmiejetnosci wyszukaj={rnText} />
        }
        
    </div>
}

export default UmiejetnosciSection