import { useEffect } from "react"
import getMainLink, { getUmiejetnosci } from "../../../private/apiData"
import useProfile from "../../../hooks/useProfile"

const UmiejetnosciSection = () => {

    const profile = useProfile();

    type umiejetnoscType = {
        name: string,
        value: number
    }

    useEffect(()=>{
        fetch(getMainLink(true)+getUmiejetnosci+'id='+profile.idUzytkownika).then(response=>response.json()).then((data: unknown)=>{
            console.log(data);
            //const thisManyUmiejetnosci = 
        })
    },[])

    return <div>

    </div>
}

export default UmiejetnosciSection