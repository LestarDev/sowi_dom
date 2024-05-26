import { useEffect, useRef, useState } from "react";
import getMainLink, { getUmiejkiLike } from "../../private/apiData";
import { isStackBlitz } from "../../shared/config/isStackBlitz";
import useProfile from "../../hooks/useProfile";
import umiejetnoscType from "../../shared/config/umiejetnosciType";

const SearchUmiejetnosci = ({props}: any) => {
    const wyszukaj: string = props.wyszukaj;

    const profile = useProfile();

    const refDivOpenWindow = useRef<HTMLDivElement>(null);

    const [divElement, setDivElement] = useState(<div></div>);

    const [windowUmiejkaData, setWindowUmiejkaData] = useState({value: 0, cecha: 0,nazwa:''});

    useEffect(()=>{
        fetch(getMainLink(isStackBlitz)+getUmiejkiLike+"id="+profile.idUzytkownika+"&like="+wyszukaj).then(response=>response.json()).then((data: any)=>{
            
            
            if(data[0]==0){
                setDivElement(<div>
                    <p>Brak takiej umiejetnosci</p>
                </div>)
            }else{
                setDivElement(<div></div>);
            }
            
            for(let i=1; i<(data[0]+4); i+=4){

                const preUmiejka: umiejetnoscType = {name: data[i], value: Number(data[i+1]),type: Number(data[i+2]), id: data[i+3]};

                //console.log(i,data[i],data[i+1],data[i+2]);

                setDivElement(prevDiv=><div>
                    {prevDiv.props.children}
                    <div className="umiejkaBox">
                        <span>{preUmiejka.name}</span>
                        <span>{profile.przelicznik(preUmiejka.value)}</span>
                        <button onClick={()=>{openWindow(preUmiejka)}}>Info</button>
                    </div>
                </div>)

            }
        })
    },[props, profile.refreshPage])

    const openWindow = (danaUmiejka: umiejetnoscType) => {
        setWindowUmiejkaData({value: danaUmiejka.value, cecha: danaUmiejka.type, nazwa: danaUmiejka.name});
    }

    const closeWindow = () => {
        setWindowUmiejkaData({value:0, cecha: 0, nazwa:''});
    }

    return <>
        {
            divElement
        }
            <div ref={refDivOpenWindow} className={windowUmiejkaData.cecha==0 ? "window" : "windowShowed"}>
                <div>
                    <h2>{windowUmiejkaData.nazwa}</h2>
                    <span>Umiejetnosc: {profile.przelicznik(windowUmiejkaData.value)}</span>
                    <span>Cecha: {profile.przelicznik(profile.getCeche(windowUmiejkaData.cecha))}</span>
                    <span>{profile.zlaczoneKostki(windowUmiejkaData.value, profile.getCeche(windowUmiejkaData.cecha))}</span>
                    <button onClick={closeWindow}>x</button>
                </div>
                
            </div>
        </>
}

export default SearchUmiejetnosci