type owlCard = {
    nazwa: string,
    koszt: number
}


const OwlModule = ({nazwa, koszt}: owlCard) => {

    const nazwaHere = nazwa;
    const kosztHere = koszt;

    return <div className="OwlModule">
        <h3>{kosztHere}</h3>
        <p>{nazwaHere}</p>
    </div>
}

export default OwlModule