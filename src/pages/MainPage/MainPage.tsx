import useProfile from "../../hooks/useProfile"

const MainPage = () => {

    const profile = useProfile();

    profile.setNewAppName("Testq1");

    return (<div>
        {profile.nameOfApp}
    </div>)
}

export default MainPage