import { useRef, useState } from "react";
import useProfile from "../../hooks/useProfile"
import MainPage from "../MainPage/MainPage";
import { getProfileScript } from "../../private/apiData";
import getMainLink from "../../private/apiData";
import './LoginPage.css'
import { isStackBlitz } from "../../shared/config/isStackBlitz";
import { initialState } from "../../shared/config/currentSlice";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import Shop from "../Shop/Shop";

const LoginPage = () => {

    const [isMainToReturn, setIsMainToReturn] = useState(0);
    // 0 => Login page
    // 1 => Main page
    // 2 => Sowi shop

    const [isToShowPassword, setIsToShowPassword] = useState(false);

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
                setIsMainToReturn(1);
            }
            // setUUID(data as number);
            // console.log("Profile id: "+profile.idUzytkownika)
            
        })

        
        
    }

    const logOut = () => {
        profile.setNewProfile(initialState);
        setIsMainToReturn(0);
    }

    return <>
        {isMainToReturn==0 ? <div className="FormConteiner">
            <form method="POST" onSubmit={e => e.preventDefault()}>
                <label htmlFor="loginID">Login: <input type="text" id="loginID" name="login" ref={loginRef} required /></label>
                <label htmlFor="passwordID">Password: <input type={isToShowPassword ? "text" : "password"} id="passwordID" name="password" ref={passwordRef} required/> 
                    <div onClick={()=>{
                        setIsToShowPassword(!isToShowPassword);
                    }}>
                        {isToShowPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                    </div>
                </label>
                <input type="submit" onClick={(e)=>{
                    e.preventDefault();
                    moveToMainPage();
                }} value="Login" />
            </form>
        </div> : ''}

        {isMainToReturn==1 ? <div className="mainPage">
            <MainPage />
            <div className="mainButtons">
                <button onClick={logOut} className="logoutButton">Wyloguj</button>
                <button onClick={()=>{
                    setIsMainToReturn(2);
                }}>Sowi sklep</button>
                <button onClick={()=>{
                    profile.setRefreshPage(!profile.refreshPage);
                }}>Odswiez</button>
            </div>
        </div> : ''}

        {isMainToReturn==2 ? <div className="sowiSklep">
            <Shop />
            <div className="mainButtons">
                <button onClick={logOut} className="logoutButton">Wyloguj</button>
                <button onClick={()=>{
                    setIsMainToReturn(1);
                }}>Glowne Konto</button>
                <button onClick={()=>{
                    profile.setRefreshPage(!profile.refreshPage);
                }}>Odswiez</button>
            </div>
        </div> : ''}
    </>
}

export default LoginPage