import { useRef, useState } from "react";
import useProfile from "../../hooks/useProfile"
import MainPage from "../MainPage/MainPage";
import { getProfileScript } from "../../private/apiData";
import getMainLink from "../../private/apiData";
import './LoginPage.css'
import { isStackBlitz } from "../../shared/config/isStackBlitz";
import { initialState } from "../../shared/config/currentSlice";

const LoginPage = () => {

    const [isMainToReturn, setIsMainToReturn] = useState(false);

    const profile=useProfile();

    const loginRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    

    const moveToMainPage = () => {
        
        const loginValue = loginRef.current?.value
        const passwordValue = passwordRef.current?.value

        // profile.setLogowanie(loginValue as string, passwordValue as string);
        
        const link = getMainLink(isStackBlitz)+getProfileScript+"login="+loginValue+"&password="+passwordValue;
        //console.log(link)
        fetch(link).then((response)=>response.text()).then((data: unknown)=>{
            console.log(data);
            if(data!="Error login"){
                profile.setNewIdUzytkownika(data as number);
                setIsMainToReturn(true);
            }
            // setUUID(data as number);
            // console.log("Profile id: "+profile.idUzytkownika)
            
        })

        
        
    }

    const logOut = () => {
        profile.setNewProfile(initialState);
        setIsMainToReturn(false);
    }

    return <div className={isMainToReturn ? 'mainPage' : 'FormConteiner'}>
        {isMainToReturn ? <><MainPage />
        <button onClick={logOut} className="logoutButton">Wyloguj</button>
        </> : <form method="POST" onSubmit={e => e.preventDefault()}>
            <label htmlFor="loginID">Login: <input type="text" id="loginID" name="login" ref={loginRef} required/></label>
            <label htmlFor="passwordID">Password: <input type="text" id="passwordID" name="password" ref={passwordRef} required/></label>
            <input type="submit" onClick={(e)=>{
                e.preventDefault();
                moveToMainPage();
            }} value="Login" />
        </form>}
        
    </div>
}

export default LoginPage