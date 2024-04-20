import { useState } from "react";
import useProfile from "../../hooks/useProfile"
import MainPage from "../MainPage/MainPage";

const LoginPage = () => {

    const [isMainToReturn, setIsMainToReturn] = useState(false);

    const profile=useProfile();

    

    const moveToMainPage = () => {
        profile.setLogowanie("Demonic", "Demonic742");
        setIsMainToReturn(true);
    }

    return <div style={{width: 100, height:100, background: "red"}} onClick={moveToMainPage}>
        {isMainToReturn ? <MainPage /> : <div />}
    </div>
}

export default LoginPage