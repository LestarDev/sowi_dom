import useProfile from "../../hooks/useProfile"
import { CgProfile } from "react-icons/cg";
import { GiLevelFourAdvanced } from "react-icons/gi";
import { ImCoinDollar } from "react-icons/im";
import { LuMoonStar } from "react-icons/lu";
import './NavBar.css'
import NavButton from "../NavButton/NavButton";

const NavBar = () => {

    const profile = useProfile();

   return <nav aria-label="nav bar">
    <ul className="nav-ul">
        <li className="nav-el"><CgProfile className="profileIcon" />{profile.nick}</li>
        <li className="nav-el">
                <div>
                    <GiLevelFourAdvanced />{profile.przelicznik(profile.lvl)}
                </div>
                <div>
                    <ImCoinDollar />0  
                </div>
                <div>
                    <LuMoonStar />{profile.Szczescie}

                </div>
        </li>
        <li className="nav-el">
            <button className="navClick b-1">Ekwipunek</button>
            <button className="navClick b-2">Umiejetnosci</button>
            <button className="navClick b-3">Zdolnosci</button>
            <button className="navClick b-4">Handouty</button>
            <div className="NavButton-div">

                <NavButton />
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