import { useEffect, useRef, useState } from "react"
import getMainLink, { getUmiejetnosciScript } from "../../../private/apiData"
import useProfile from "../../../hooks/useProfile"
import "./UmiejetnosciSection.css"
import { isStackBlitz } from "../../../shared/config/isStackBlitz"
import SearchUmiejetnosci from "../../SearchUmiejetnosci/SearchUmiejetnosci"
import umiejetnoscType from "../../../shared/config/umiejetnosciType"
import { FaSearch } from "react-icons/fa";

const UmiejetnosciSection = () => {

    const profile = useProfile();

    

    const [windowUmiejkaData, setWindowUmiejkaData] = useState({value: 0, cecha: 0,nazwa:''});

    const [rnText, setRnText] = useState('');

    const [showSearch, setShowSearch] = useState(false);

    const refDiv = useRef<HTMLDivElement>(null);
    const refDivOpenWindow = useRef<HTMLDivElement>(null);
    const refInputSearch = useRef<HTMLInputElement>(null);

    const cechyNazwy = ["Umysl", "Cialo", "Zrecznosc","Niezlomnosc", "Intuicja", "Urok"];

    const openWindow = (danaUmiejka: umiejetnoscType) => {
        setWindowUmiejkaData({value: danaUmiejka.value, cecha: danaUmiejka.type, nazwa: danaUmiejka.name});
    }

    const closeWindow = () => {
        setWindowUmiejkaData({value:0, cecha: 0, nazwa:''});
    }

    const [offset, setOffset] = useState(0);

    const [modifyRoll, setModifyRoll] = useState(0);

    useEffect(()=>{
        const onScroll = () => setOffset(window.scrollY);
        fetch(getMainLink(isStackBlitz)+getUmiejetnosciScript+'id='+profile.idUzytkownika).then(response=>response.json()).then((data: any)=>{
            

            if(refDiv.current){
                refDiv.current.innerHTML="";
            }

            // console.log("Umiejetnosci:",data);

            if(data[0]==0) return;

            for(let i=1; i<(data[0]*4); i+=4){

                const preUmiejka: umiejetnoscType = {name: data[i], value: Number(data[i+1]),type: Number(data[i+2]), id: data[i+3]};

                //console.log(i,data[i],data[i+1],data[i+2]);
                if(refDiv.current){
                    //const divEl = createElement("div",{className: "singleUmiejka"},createElement("span",preUmiejka.name));
                    const divEl = document.createElement("div");
                    const firstSpan = document.createElement("span");
                    const secondSpan = document.createElement("span");
                    const buttonOpen = document.createElement("button");
                    divEl.className="singleUmiejka";
                    firstSpan.innerHTML=preUmiejka.name;
                    secondSpan.innerHTML=profile.przelicznik(preUmiejka.value) as string;
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
            <div ref={refDiv} className="section"></div>
            <div ref={refDivOpenWindow} className={windowUmiejkaData.cecha==0 ? "window" : "windowShowed"} style={{transform: "translateY("+offset+"px)"}}>
                <div className="umiejkaBox">
                    <h2>{windowUmiejkaData.nazwa}</h2>
                    <span>Umiejetnosc{modifyRoll ? `${modifyRoll>0 ? '+' : '-'}${modifyRoll}` : ''}: {profile.przelicznik(windowUmiejkaData.value+modifyRoll)}</span>
                    <span>Cecha: {cechyNazwy[windowUmiejkaData.cecha-1]} {'['}{profile.przelicznik(profile.getCeche(windowUmiejkaData.cecha))}{']'}</span>
                    <span>Rzucasz: <b>{profile.zlaczoneKostki(windowUmiejkaData.value, profile.getCeche(windowUmiejkaData.cecha))}</b></span>
                    <div>
                        <button onClick={()=>setModifyRoll(prevV=>prevV--)}>-</button>
                        <button onClick={closeWindow}>x</button>
                        <button onClick={()=>setModifyRoll(prevV=>prevV++)}>+</button>
                    </div>
                </div>
                
            </div></>

            : 

            <SearchUmiejetnosci props={{wyszukaj: rnText}} />
        }
        
    </div>
}

export default UmiejetnosciSection