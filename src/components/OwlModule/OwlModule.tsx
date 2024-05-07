import { messageShop } from '../../pages/Shop/Shop';
import './OwlModule.css'

export type typeOfCard = "brak monet" | "Poinformuj MG o zakupie" | "kupuj";

type owlCard = {
    nazwa: string,
    koszt: number,
    type: typeOfCard,
    fun: React.Dispatch<React.SetStateAction<messageShop>>
}


const OwlModule = ({nazwa, koszt, type, fun}: owlCard) => {

    const nazwaHere = nazwa;
    const kosztHere = koszt;
    const typeHere = type;

    return <div className="OwlModule">
        <p>{nazwaHere}</p>
        <div>
            <h3>Koszt: {kosztHere}</h3>
            <button onClick={()=>{
               fun({message: typeHere, isToShow: true, nameOfcard: nazwaHere});
            }} className={typeHere}>Kup</button>
        </div>
    </div>
}

export default OwlModule