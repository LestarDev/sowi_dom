import { useState } from "react"
import './NavButton.css'

const NavButton = () => {

    const [whichButton, setWhichButton] = useState(0);

    const tabNamesOfButton = ['Ekwipunek', 'Umiejetnosci', 'Zdolnosci', 'Handouty'];

    const nextButton = () => {
        setWhichButton(whichButton==3 ? 0 : whichButton+1);
    }

    const previousButton = () => {
        setWhichButton(whichButton==0 ? 3 : whichButton-1);
    }

    return <div>
        <div className="NavButtonButtonsConteiner">
            <button onClick={previousButton}>{'<'}</button>
            <button className="NavButtonConteiner">
                <span className="NavButton span-1"></span>
                <span className="NavButton span-2"></span>
                <span className="NavButton span-3"></span>
            </button>
            <button onClick={nextButton}>{'>'}</button>
        </div>
        <button className="NavButtonToShow">{tabNamesOfButton[whichButton]}</button>
    </div>
}

export default NavButton