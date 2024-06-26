import { useEffect, useState } from "react"
import useProfile from "../../hooks/useProfile"
import getMainLink, { AdminGetIDsScript } from "../../private/apiData";
import { isStackBlitz } from "../../shared/config/isStackBlitz";
import { GiLevelFourAdvanced, GiOwl } from "react-icons/gi";
import './Admin.css'

type uzytkownikType = {
    id: number,
    nick: string,
    lvl: number,
    sowieMonety: number
}

type adminType = {
    loginSetPage: React.Dispatch<React.SetStateAction<number>>
}

const Admin = ({loginSetPage}: adminType) => {

    const profile = useProfile();

    const emptyUzytkownicyToShow = <div className="uzytkownicyToLogin"></div>;

    const [uzytkownicyToLogin, setUzytkownicyToLogin] = useState(emptyUzytkownicyToShow);

    useEffect(()=>{
        fetch(getMainLink(isStackBlitz)+AdminGetIDsScript).then(response=>response.json()).then((data: any)=>{
            // console.log(data);
            setUzytkownicyToLogin(emptyUzytkownicyToShow);
            for(let i=1; i<(Number(data[0])*4); i+=4){
                const uzytkownikToAdd: uzytkownikType = {id: Number(data[i]), nick: data[i+1], lvl: Number(data[i+2]), sowieMonety: Number(data[i+3])}
                // console.log(i,uzytkownikToAdd)
                setUzytkownicyToLogin(prevEl=><div>
                    {prevEl.props.children}
                    <div className="singleUzytkownik">
                        <span>{uzytkownikToAdd.id}</span>
                        <span>{uzytkownikToAdd.nick}</span>
                        <div>
                            <span>{profile.przeliczLvl(uzytkownikToAdd.lvl)}</span>
                            <GiLevelFourAdvanced />
                        </div>
                        <div>
                            <span>{profile.przeliczLvl(uzytkownikToAdd.sowieMonety, true)}</span>
                            <GiOwl />
                        </div>
                        <button onClick={()=>{
                            profile.setNewIdUzytkownika(uzytkownikToAdd.id);
                            loginSetPage(1);
                        }}>Zaloguj</button>
                    </div>
                </div>);
                // console.log("[Inner for]",uzytkownicyToLogin);
            }

            // console.log(uzytkownicyToLogin);

        })
    },[profile.refreshPage])

    return <div id="Admin">
        {
            uzytkownicyToLogin
        }
    </div>
}

export default Admin