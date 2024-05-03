import { useState } from "react"
import './NavButton.css'
import useProfile from "../../hooks/useProfile";
import { choosenType } from "../../shared/config/currentSlice";

const NavButton = () => {

    const profile = useProfile();

    const [whichButton, setWhichButton] = useState(0);

    const [isChooseWhichSection, setIsChooseWhichSection] = useState(false);

    const tabNamesOfButton: choosenType[] = ['Ekwipunek', 'Umiejetnosci', 'Zdolnosci', 'Handouty'];



    const nextButton = () => {
        setWhichButton(whichButton==3 ? 0 : whichButton+1);
        profile.setNewWybrany(tabNamesOfButton[whichButton==3 ? 0 : whichButton+1]);
    }

    const previousButton = () => {
        setWhichButton(whichButton==0 ? 3 : whichButton-1);
        profile.setNewWybrany(tabNamesOfButton[whichButton==0 ? 3 : whichButton-1]);
    }

    const setCurrentShowing = () => {
        profile.setNewWybrany(tabNamesOfButton[whichButton]);
    }

    const setHereSectionE = () => {
        profile.setNewWybrany('Ekwipunek');
        //console.log(sectionName)
    }

    const setHereSectionU = () => {
        profile.setNewWybrany('Umiejetnosci');
        //console.log(sectionName)
    }

    const setHereSectionZ = () => {
        profile.setNewWybrany('Zdolnosci');
        //console.log(sectionName)
    }

    const setHereSectionH = () => {
        profile.setNewWybrany('Handouty');
        //console.log(sectionName)
    }

    const  showChoose = () => {
        setIsChooseWhichSection(true);
    }

    return <div>
        <div className="NavButtonButtonsConteiner">
            <button onClick={previousButton}>{'<'}</button>
            <button onClick={showChoose} className="NavButtonConteiner">
                <span className="NavButton span-1"></span>
                <span className="NavButton span-2"></span>
                <span className="NavButton span-3"></span>
            </button>
            <button onClick={nextButton}>{'>'}</button>
        </div>
        <button onClick={setCurrentShowing} className="NavButtonToShow">{tabNamesOfButton[whichButton]}</button>

        <div className="nav-choose-section" style={{display: (isChooseWhichSection ? 'block' : 'none')}}>
                <div>
                    <button onClick={setHereSectionE} className="navClick b-1">Ekwipunek</button>
                    <button onClick={setHereSectionU} className="navClick b-2">Umiejetnosci</button>
                    <button onClick={setHereSectionZ} className="navClick b-3">Zdolnosci</button>
                    <button onClick={setHereSectionH} className="navClick b-4">Handouty</button>
                    <button onClick={()=>{
                        setIsChooseWhichSection(false);
                    }}>x</button>
                </div>
            </div>            
    </div>
}

export default NavButton