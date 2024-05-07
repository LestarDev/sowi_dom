import { messageShop } from '../../pages/Shop/Shop';
import umiejetnoscType from '../../shared/config/umiejetnosciType';
import './OwlModule.css'

export type typeOfCard = "brak monet" | "Poinformuj MG o zakupie" | "kupuj";

type owlCard = {
    nazwa: string,
    koszt: number,
    type: typeOfCard,
    fun: React.Dispatch<React.SetStateAction<messageShop>>,
    dodatkowaTab?: umiejetnoscType[]
}


const OwlModule = ({nazwa, koszt, type, fun, dodatkowaTab}: owlCard) => {

    const nazwaHere = nazwa;
    const kosztHere = koszt;
    const typeHere = type;
    const isUlepsz3umiejki = typeof dodatkowaTab != undefined;

    return <div className="OwlModule">
        <p>{nazwaHere}</p>
        <div className={isUlepsz3umiejki ? 'ulepsz 3 umiejki' : ''}>
            <h3>Koszt: {kosztHere}</h3>
            <button onClick={()=>{
               fun({message: typeHere, isToShow: true});
            }} className={typeHere}>Kup</button>
        </div>
    </div>
}

export default OwlModule