import { useState } from "react"

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
        <div>
            <button onClick={previousButton}>{'<'}</button>
            <button>
                <span className="NavButton span-1"></span>
                <span className="NavButton span-2"></span>
                <span className="NavButton span-3"></span>
            </button>
            <button onClick={nextButton}>{'>'}</button>
        </div>
        <button>{tabNamesOfButton[whichButton]}</button>
    </div>
}

export default NavButton