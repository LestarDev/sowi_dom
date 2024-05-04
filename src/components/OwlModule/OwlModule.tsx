import './OwlModule.css'

type owlCard = {
    nazwa: string,
    koszt: number
}


const OwlModule = ({nazwa, koszt}: owlCard) => {

    const nazwaHere = nazwa;
    const kosztHere = koszt;

    return <div className="OwlModule">
        <p>{nazwaHere}</p>
        <div>
            <h3>Koszt: {kosztHere}</h3>
            <button>Kup</button>
        </div>
    </div>
}

export default OwlModule