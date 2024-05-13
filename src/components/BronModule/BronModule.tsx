import { useEffect, useState } from "react";
import getMainLink, { getBron } from "../../private/apiData";
import { isStackBlitz } from "../../shared/config/isStackBlitz";
import './BronModule.css'
import useProfile from "../../hooks/useProfile";

const BronModule = ({props}: any) => {

    const idBroni = props.id;

    const profile = useProfile();

    const [divElement, setDivElement] = useState(<div></div>);
    

    useEffect(()=>{
        fetch(getMainLink(isStackBlitz)+getBron+"id="+idBroni).then(response=>response.json()).then((data: string[])=>{


            const dwieOstatnie: string = (data[1]).slice(data[1].length-2, data[1].length);
            if(dwieOstatnie=="S*"){
                data[1]+=" ["+profile.getFirstCyfra(profile.Cialo)+"+"+profile.getFirstCyfra(profile.Zrecznosc)+"]";
            }else if(dwieOstatnie=="Zr"){
                data[1]+=" ["+profile.getFirstCyfra(profile.Zrecznosc)+"]";
            }else if(dwieOstatnie[1]=='S'){
                data[1]+=" ["+profile.getFirstCyfra(profile.Cialo)+"]";
            }
            setDivElement(
                <div>
                    <span>Obrazenia: {data[1]}</span>
                    <span>Cechy: {data[2]}</span>
                </div>
            )
        })
    }, [])

    return <div className="BronModule">
        {
            divElement
        }
    </div>
}

export default BronModule