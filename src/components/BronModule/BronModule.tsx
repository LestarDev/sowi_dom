import { useEffect, useState } from "react";
import getMainLink, { getBron } from "../../private/apiData";
import { isStackBlitz } from "../../shared/config/isStackBlitz";
import './BronModule.css'
import useProfile from "../../hooks/useProfile";

type propsType = {
    idBroni: number,
    isMoreInfo: boolean
}

const BronModule = ({idBroni, isMoreInfo}: propsType) => {

    // const idBroni = props.id;

    const profile = useProfile();

    const [divElement, setDivElement] = useState(<div></div>);
    

    useEffect(()=>{
        fetch(getMainLink(isStackBlitz)+getBron+"id="+idBroni).then(response=>response.json()).then((data: string[])=>{


            const dwieOstatnie: string = data[1].slice(-2);
            if(dwieOstatnie=="S*"){
                data[1]+=" ["+profile.przelicznik(profile.Cialo.split(', ').length,true)+"+"+profile.przelicznik(profile.Zrecznosc.split(', ').length,true)+"]";
            }else if(dwieOstatnie=="Zr"){
                data[1]+=" ["+profile.przelicznik(profile.Zrecznosc.split(', ').length,true)+"]";
            }else if(dwieOstatnie[1]=='S'){
                data[1]+=" ["+profile.przelicznik(profile.Cialo.split(', ').length, true)+"]";
            }

            const preperInfo: string[] = data[2].split(', ');

            // console.log("PreperInfo", preperInfo);

            const infoToShow: JSX.Element[] = [];

            preperInfo.forEach((iName)=>{
                infoToShow.push(<p>{profile.getInfo(iName)}</p>);
                // console.log("Info to show",infoToShow);
            })
            
        

            setDivElement(
                <div>
                    <span>Obrazenia: {data[1]}</span>
                    <span>Cechy: {data[2]}</span>
                    {isMoreInfo ? <div>
                        {infoToShow}
                    </div> : ''}
                </div>
            )
        })
    }, [profile.refreshPage, isMoreInfo])

    return <div className="BronModule">
        {
            divElement
        }
    </div>
}

export default BronModule