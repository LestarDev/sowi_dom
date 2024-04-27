import { useEffect, useRef, useState } from "react"
import getMainLink, { getUmiejetnosci } from "../../../private/apiData"
import useProfile from "../../../hooks/useProfile"

const UmiejetnosciSection = () => {

    const profile = useProfile();

    type umiejetnoscType = {
        name: string,
        value: number
    }

    const emptyUmiejetnoscTab: umiejetnoscType[] = [{name:'',value:0}];

    const [tabUmiejki, setTabUmiejki] = useState(emptyUmiejetnoscTab);

    const refDiv = useRef<HTMLDivElement>(null);

    useEffect(()=>{
        fetch(getMainLink(true)+getUmiejetnosci+'id='+profile.idUzytkownika).then(response=>response.json()).then((data: any)=>{
            
            const preperTab: umiejetnoscType[] = [];

            if(refDiv.current){
                refDiv.current.innerHTML="";
            }

            for(let i=1; i<(data[0]+3); i+=2){

                const preUmiejka: umiejetnoscType = {name: data[i], value: data[i+1]};

                console.log(i,data[i],data[i+1]);
                if(refDiv.current){
                    refDiv.current.innerHTML+=preUmiejka.name+' : '+preUmiejka.value+'<br> ';
                }
            }

            setTabUmiejki(oldArray=>[...oldArray, ...preperTab]);

            
            //const thisManyUmiejetnosci = 
        }).then(()=>{
            console.log('Tab Umiejki: ',tabUmiejki); 
        })
    },[])

    return <div ref={refDiv}>
    </div>
}

export default UmiejetnosciSection