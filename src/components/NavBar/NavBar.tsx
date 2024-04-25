import useProfile from "../../hooks/useProfile"
import { CgProfile } from "react-icons/cg";
import { GiLevelFourAdvanced } from "react-icons/gi";
import './NavBar.css'

const NavBar = () => {

    const profile = useProfile();

   return <nav aria-label="nav bar">
    <ul className="nav-ul">
        <li className="nav-el"><CgProfile className="profileIcon" />{profile.nick}</li>
        <li className="nav-el">
            <div>
                <div>
                    <GiLevelFourAdvanced />{profile.przelicznik(profile.lvl)}
                </div>
                <div>
                    
                </div>
            </div>
        </li>
    </ul>
   </nav> 
}

export default NavBar