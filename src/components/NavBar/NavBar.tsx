import useProfile from "../../hooks/useProfile"
import { CgProfile } from "react-icons/cg";
import { GiLevelFourAdvanced } from "react-icons/gi";
import { ImCoinDollar } from "react-icons/im";
import { LuMoonStar } from "react-icons/lu";
import './NavBar.css'
import NavButton from "../NavButton/NavButton";
import { FaRegHeart } from "react-icons/fa6";

type navBarType = {
    setLoginPage: React.Dispatch<React.SetStateAction<number>>
}

const NavBar = ({setLoginPage}: navBarType) => {

    const profile = useProfile();

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

   return <nav aria-label="nav bar">
    <ul className="nav-ul">
        <li className="nav-el"><CgProfile className="profileIcon" />{profile.nick}</li>
        <li className="nav-el">
                <div>
                    <GiLevelFourAdvanced />{profile.przeliczLvl(profile.lvl)}
                </div>
                <div>
                    <ImCoinDollar />{profile.slimaki}  
                </div>
                <div>
                    <LuMoonStar />{profile.Szczescie}

                </div>
        </li>
        <li className="nav-el hp-el">
            HP: {profile.getHP()} <FaRegHeart />
        </li>
        <li className="nav-el">
            <div>
                <button onClick={setHereSectionE} className="navClick b-1">Ekwipunek</button>
                <button onClick={setHereSectionU} className="navClick b-2">Umiejetnosci</button>
            </div>
            <div>
                <button onClick={setHereSectionZ} className="navClick b-3">Zdolnosci</button>
                <button onClick={setHereSectionH} className="navClick b-4">Handouty</button>
            </div>
            
            <div className="NavButton-div">

                <NavButton setLoginPage={setLoginPage} />
            </div>
            {
                //ekwipunek
                //umiejetnosci
                //zdolnosci
                //handouty
            }
        </li>
    </ul>
   </nav> 
}

export default NavBar