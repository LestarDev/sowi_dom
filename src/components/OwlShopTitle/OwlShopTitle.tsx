import { useEffect } from "react";
import useProfile from "../../hooks/useProfile";
import getMainLink, { getMonetyScript } from "../../private/apiData";
import { isStackBlitz } from "../../shared/config/isStackBlitz";
import { GiOwl } from "react-icons/gi";
import './OwlShopTitle.css'

const OwlShopTitle = () => {

    const profile = useProfile();

    useEffect(()=>{
        fetch(getMainLink(isStackBlitz)+getMonetyScript+"id="+profile.idUzytkownika).then(response=>response.text()).then((data: unknown)=>{
            profile.setNewSowieMonety(data as number);
        })
    },[profile.refreshPage])

    return (<h2 className="OwlShopTitle">
        Sowi Sklep {profile.nick} - {'['}
            {profile.przeliczLvl(profile.sowieMonety)}
            <GiOwl />
        {']'}
    </h2>)
}

export default OwlShopTitle