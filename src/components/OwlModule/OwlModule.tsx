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

    return <div className="OwlModule">
        <p>{nazwa}</p>
        <div>
            <h3>Koszt: {koszt}</h3>
            <button onClick={()=>{
               fun({message: type, isToShow: true, nameOfcard: nazwa});
            }} className={type}>Kup</button>
        </div>
    </div>
}

export default OwlModule