import { useRef, useState } from "react";
import useProfile from "../../hooks/useProfile"
import MainPage from "../MainPage/MainPage";
import mainLink, { getProfileScript } from "../../private/apiData";

const LoginPage = () => {

    const [isMainToReturn, setIsMainToReturn] = useState(false);

    const profile=useProfile();

    const loginRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    

    const moveToMainPage = () => {
        const loginValue = loginRef.current?.value
        const passwordValue = passwordRef.current?.value

        profile.setLogowanie(loginValue as string, passwordValue as string);
        
        const link = mainLink+getProfileScript+"login="+profile.login+"&password="+profile.password;
        console.log(link)
        fetch(link).then((response)=>response.text()).then((data: unknown)=>{
            console.log(data);
            if(data!="Error login"){
                profile.setNewIdUzytkownika(data as number);
            }
            // setUUID(data as number);
            console.log("Profile id: "+profile.idUzytkownika)
            setIsMainToReturn(true);
        })

        
        
    }

    

    return <div>
        {isMainToReturn ? <MainPage /> : <form>
            <label htmlFor="loginID"><input type="text" id="loginID" ref={loginRef} /></label>
            <label htmlFor="passwordID"><input type="text" id="passwordID" ref={passwordRef} /></label>
            <button onClick={moveToMainPage}></button>
        </form>}
    </div>
}

export default LoginPage