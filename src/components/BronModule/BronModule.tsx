import { useEffect, useRef } from "react";
import getMainLink, { getBron } from "../../private/apiData";
import { isStackBlitz } from "../../shared/config/isStackBlitz";
import './BronModule.css'
import useProfile from "../../hooks/useProfile";

const BronModule = ({props}) => {

    const idBroni = props.id;

    const profile = useProfile();

    const refDiv = useRef<HTMLDivElement>(null);

    useEffect(()=>{
        fetch(getMainLink(isStackBlitz)+getBron+"id="+idBroni).then(response=>response.json()).then((data: any)=>{

            if(refDiv.current){
                refDiv.current.innerHTML="";
            }

            console.log(data);
            const span1 = document.createElement('span');
            const span2 = document.createElement('span');
            const dwieOstatnie: string = (data[1]as string).slice(data[1].length-2, data[1].length);
            if(dwieOstatnie=="S*"){
                data[1]+=" ["+profile.getFirstCyfra(profile.Cialo)+"+"+profile.getFirstCyfra(profile.Zrecznosc)+"]";
            }else if(dwieOstatnie=="Zr"){
                data[1]+=" ["+profile.getFirstCyfra(profile.Zrecznosc)+"]";
            }else if(dwieOstatnie[1]=='S'){
                data[1]+=" ["+profile.getFirstCyfra(profile.Cialo)+"]";
            }
            span1.innerHTML='Obrazenia: '+data[1];
            span2.innerHTML='Cechy: '+data[2];
            refDiv.current?.appendChild(span1);
            refDiv.current?.appendChild(span2);
        })
    }, [])

    return <div className="BronModule">
        <div ref={refDiv}></div>
    </div>
}

export default BronModule