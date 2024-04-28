import { useEffect, useRef } from "react"
import getMainLink, { getZdolnosciScript } from "../../../private/apiData"
import useProfile from "../../../hooks/useProfile";
import { IoIosLink } from "react-icons/io";

const ZdolnosciSection = () => {

    const profile = useProfile();

    const refDiv = useRef<HTMLDivElement>(null);

    type zdolnoscType = {
        nazwa: string, 
        czyPolaczone: boolean
    }

    useEffect(()=>{
        fetch(getMainLink(true)+getZdolnosciScript+"id="+profile.idUzytkownika).then(response=>response.json()).then((data: any)=>{

            if(refDiv.current){
                refDiv.current.innerHTML="";
            }

            for(let i=1; i<(data[0]+1); i+=2){
                console.log('Zdolnosc: ',data[i], data[i+1]);
                const preperZdolnosc: zdolnoscType = {nazwa: data[i], czyPolaczone: (data[i+1]==1)}
                const divToPush = document.createElement("div");
                const spanToPush = document.createElement("span");
                spanToPush.innerHTML=preperZdolnosc.nazwa+"<IoIosLink />";
                divToPush.appendChild(spanToPush);
                refDiv.current?.appendChild(divToPush);
            }

        })
    },[])

    return <div>
        <div ref={refDiv}></div>
    </div>
}

export default ZdolnosciSection