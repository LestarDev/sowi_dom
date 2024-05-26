import { useEffect, useState } from "react";
import getMainLink, { getReceptaZdolki } from "../../private/apiData";
import { isStackBlitz } from "../../shared/config/isStackBlitz";
import './ReceptaZdolnosci.css'
import useProfile from "../../hooks/useProfile";

type recepturaType = {
    idZdolnosci: number
}

const RecepturaZdolnosci = ({idZdolnosci}: recepturaType) => {

    // const idZdolnosci: string = props.id;

    const [obecnaRecepta, setObecnaRecepta] = useState({nazwaKoncowa: 'Ladowanie...', item1: '', item2: ''})

    useEffect(()=>{
        fetch(getMainLink(isStackBlitz)+getReceptaZdolki+"id="+idZdolnosci).then(response=>response.json()).then((data: any)=>{
            // console.log(data);
            setObecnaRecepta({nazwaKoncowa: data[1], item1: data[2], item2: data[3]});
        })
    },[useProfile().refreshPage])

    return <div className="recepta">
        <h2>{obecnaRecepta.nazwaKoncowa}</h2>
        <div><span>{obecnaRecepta.item1}</span>{obecnaRecepta.nazwaKoncowa=="Ladowanie..." ? "" : "+"}<span>{obecnaRecepta.item2}</span></div>
    </div>
}

export default RecepturaZdolnosci