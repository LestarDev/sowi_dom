import { useEffect, useState } from "react"
import getMainLink, { getUmiejetnosci } from "../../../private/apiData"
import useProfile from "../../../hooks/useProfile"

const UmiejetnosciSection = () => {

    const profile = useProfile();

    type umiejetnoscType = {
        name: string,
        value: number
    }

    const emptyUmiejetnoscTab: umiejetnoscType[] = [];

    const [tabUmiejki, setTabUmiejki] = useState(emptyUmiejetnoscTab);



    useEffect(()=>{
        fetch(getMainLink(true)+getUmiejetnosci+'id='+profile.idUzytkownika).then(response=>response.json()).then((data: any)=>{
            
            for(let i=1; i<(data[0]+3); i+=2){
                const preperTab: umiejetnoscType[] = [...tabUmiejki,{name: data[i],value:data[i+1]}];
                console.log('Preper Tab: ',preperTab);
                setTabUmiejki(oldArray=>[...oldArray,{name: data[i], value: data[i+1]}]);
                console.log(i,data[i],data[i+1]);
                
            }

            
            //const thisManyUmiejetnosci = 
        }).then(()=>{
            console.log('Tab Umiejki: ',tabUmiejki); 
        })
    },[])

    return <div>
        {}
    </div>
}

export default UmiejetnosciSection