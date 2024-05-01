import { useEffect, useState } from "react";
import getMainLink, { getReceptaZdolki } from "../../private/apiData";
import { isStackBlitz } from "../../shared/config/isStackBlitz";
import './ReceptaZdolnosci.css'

const RecepturaZdolnosci = ({props}: any) => {

    const idZdolnosci: string = props.id;

    const [obecnaRecepta, setObecnaRecepta] = useState({nazwaKoncowa: '', item1: '', item2: ''})

    useEffect(()=>{
        fetch(getMainLink(isStackBlitz)+getReceptaZdolki+"id="+idZdolnosci).then(response=>response.json()).then((data: any)=>{
            // console.log(data);
            setObecnaRecepta({nazwaKoncowa: data[1], item1: data[2], item2: data[3]});
        })
    },[])

    return <div className="recepta">
        <h2>{obecnaRecepta.nazwaKoncowa}</h2>
        <div><span>{obecnaRecepta.item1}</span>+<span>{obecnaRecepta.item2}</span></div>
    </div>
}

export default RecepturaZdolnosci