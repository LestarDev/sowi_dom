import useProfile from "../hooks/useProfile"

const Box = () => {

    const profile = useProfile();

    const color = profile.Umysl==0 ? "cornflowerblue" : "tomato";

    return <div style={{width:"100px",height:"100px", background: color}}></div>
}

export default Box