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
import { MdError } from "react-icons/md";
import Admin from "../Admin/Admin";

const LoginPage = () => {

    const [isMainToReturn, setIsMainToReturn] = useState(0);
    // 0 => Login page
    // 1 => Main page
    // 2 => Sowi shop
    // 3 => Admin

    const [isToShowPassword, setIsToShowPassword] = useState(false);

    const profile=useProfile();

    const loginRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const [isError, setIsError] = useState(false);

    const moveToMainPage = () => {
        
        const loginValue = loginRef.current?.value.split("'").join("")
        const passwordValue = passwordRef.current?.value.split("'").join("")

        // profile.setLogowanie(loginValue as string, passwordValue as string);

        if(loginValue=="Admin" && passwordValue=="OptimusPrime9001!") {setIsMainToReturn(3); return}
        
        fetch(getMainLink(isStackBlitz)+getProfileScript+"login="+loginValue+"&password="+passwordValue).then((response)=>response.text()).then((data: unknown)=>{
            // console.log(data);

            if(data=="Error login"){
                setIsError(true);
                return;
            }
            
            setIsError(false);
            profile.setNewIdUzytkownika(data as number);
            setIsMainToReturn(1);



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
            {
                isError ? <p className="catchedError"><MdError />Wrong login or password</p> : ''
            }
            <form method="POST" onSubmit={e => e.preventDefault()}>
                <div className="inputsConteiner">
                    <div>
                        <label htmlFor="loginID">Login: </label>
                        <label htmlFor="passwordID">Password:  </label>
                    </div>
                    <div>
                        <input type="text" id="loginID" name="login" ref={loginRef} required />
                        <div>
                            <input type={isToShowPassword ? "text" : "password"} id="passwordID" name="password" ref={passwordRef} required/>
                            <div onClick={()=>{setIsToShowPassword(!isToShowPassword);}}>
                                {isToShowPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                            </div>
                        </div>
                    </div>
                    
                </div>
                
                <input type="submit" onClick={(e)=>{
                    e.preventDefault();
                    moveToMainPage();
                }} value="Login" />
            </form>
        </div> : ''}

        {isMainToReturn==1 ? <div className="mainPage">
            <MainPage setLoginPage={setIsMainToReturn} />
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
            <Shop loginSetPage={setIsMainToReturn} />
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

        {isMainToReturn==3 ? <>
        <Admin loginSetPage={setIsMainToReturn} />
        <div className="mainButtons">
            <button onClick={logOut} className="logoutButton">Wyloguj</button>
            <button onClick={()=>{
                    profile.setRefreshPage(!profile.refreshPage);
                }}>Odswiez</button>
        </div></> : ''}
    </>
}

export default LoginPage