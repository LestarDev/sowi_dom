import useProfile from "../../hooks/useProfile"
import { CgProfile } from "react-icons/cg";
import { GiLevelFourAdvanced } from "react-icons/gi";

const NavBar = () => {

    const profile = useProfile();

   return <nav aria-label="nav bar">
    <ul>
        <li><CgProfile />{profile.nick}</li>
        <li><GiLevelFourAdvanced />{profile.przelicznik(profile.lvl)}</li>
    </ul>
   </nav> 
}

export default NavBar