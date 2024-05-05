import './OwlModule.css'

type owlCard = {
    nazwa: string,
    koszt: number,
    type: "brak monet" | "Poinformuj MG o zakupie" | "kupuj",
}


const OwlModule = ({nazwa, koszt, type}: owlCard) => {

    const nazwaHere = nazwa;
    const kosztHere = koszt;
    const typeHere = type;

    return <div className="OwlModule">
        <p>{nazwaHere}</p>
        <div>
            <h3>Koszt: {kosztHere}</h3>
            <button onClick={()=>{
                typeHere=="Poinformuj MG o zakupie" ? alert(typeHere) : '';
                typeHere=="brak monet" ? alert(typeHere) : '';
                typeHere=="kupuj" ? '' : '';
            }} className={typeHere}>Kup</button>
        </div>
    </div>
}

export default OwlModule