import { useEffect } from "react";
import useProfile from "../../../hooks/useProfile"
import getMainLink, { getKsiazka } from "../../../private/apiData";
import { isStackBlitz } from "../../../shared/config/isStackBlitz";

const HandoutySection = () => {

    const profile = useProfile();

    type handoutTyep = {
        tytul: string,
        isKsiazka: boolean,
        isPrzeczytana: boolean,
        tres: string
    }

    useEffect(()=>{
        fetch(getMainLink(isStackBlitz)+getKsiazka+"id="+profile.idUzytkownika).then(response=>response.json()).then((data: any)=>{
            console.log(data);

            // if(refDiv.current){
            //     refDiv.current.innerHTML="";
            // }

            for(let i=1; i<(data[0]+4); i+=4){
                const preItem: handoutTyep = {tytul: data[i],isKsiazka: (data[i+1]==1), isPrzeczytana: (data[i+2]==1),tres: data[i+3]}
                console.log(preItem);
            }

        })
    },[])

    return <div></div>
}

export default HandoutySection