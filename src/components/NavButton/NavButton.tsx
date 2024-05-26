import { useState } from "react"
import './NavButton.css'
import useProfile from "../../hooks/useProfile";
import { choosenType } from "../../shared/config/currentSlice";

type navButtonType = {
    setLoginPage: React.Dispatch<React.SetStateAction<number>>
}

const NavButton = ({setLoginPage}: navButtonType) => {

    const profile = useProfile();

    const getInicjalWhichButton = (): number => {
        const wybranyTyp: choosenType = profile.wybranyTyp;
        if(wybranyTyp=="Umiejetnosci") return 1;
        if(wybranyTyp=="Zdolnosci") return 2;
        if(wybranyTyp=="Handouty") return 3;
        return 0
    }

    const [whichButton, setWhichButton] = useState(getInicjalWhichButton);

    const [isChooseWhichSection, setIsChooseWhichSection] = useState(false);

    const tabNamesOfButton: choosenType[] = ['Ekwipunek', 'Umiejetnosci', 'Zdolnosci', 'Handouty'];



    const nextButton = () => {
        setWhichButton(whichButton==3 ? 0 : whichButton+1);
        profile.setNewWybrany(tabNamesOfButton[whichButton==3 ? 0 : whichButton+1]);
        setLoginPage(1);
    }

    const previousButton = () => {
        setWhichButton(whichButton==0 ? 3 : whichButton-1);
        profile.setNewWybrany(tabNamesOfButton[whichButton==0 ? 3 : whichButton-1]);
        setLoginPage(1);
    }

    const setCurrentShowing = () => {
        profile.setNewWybrany(tabNamesOfButton[whichButton]);
        setLoginPage(1);
    }

    const setHereSectionE = () => {
        profile.setNewWybrany('Ekwipunek');
        //console.log(sectionName)
        setIsChooseWhichSection(false);
        setLoginPage(1);
    }

    const setHereSectionU = () => {
        profile.setNewWybrany('Umiejetnosci');
        //console.log(sectionName)
        setIsChooseWhichSection(false);
        setLoginPage(1);
    }

    const setHereSectionZ = () => {
        profile.setNewWybrany('Zdolnosci');
        //console.log(sectionName)
        setIsChooseWhichSection(false);
        setLoginPage(1);
    }

    const setHereSectionH = () => {
        profile.setNewWybrany('Handouty');
        //console.log(sectionName)
        setIsChooseWhichSection(false);
        setLoginPage(1);
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

        <div className="nav-choose-section" style={{display: (isChooseWhichSection ? 'flex' : 'none')}}>
                <div>
                    <button onClick={setHereSectionE} className="b-1">Ekwipunek</button>
                    <button onClick={setHereSectionU} className="b-2">Umiejetnosci</button>
                    <button onClick={setHereSectionZ} className="b-3">Zdolnosci</button>
                    <button onClick={setHereSectionH} className="b-4">Handouty</button>
                    <button onClick={()=>{
                        setIsChooseWhichSection(false);
                    }}>x</button>
                </div>
            </div>            
    </div>
}

export default NavButton