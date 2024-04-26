import useProfile from "../../hooks/useProfile"
import whichOneType from "../../shared/config/statsType";
import './StatBox.css'



const StatBox = (whichOne: whichOneType) => {

    const profile = useProfile();

    

    return <div className="StatBox">
        <div>{whichOne}</div>
        <div>
            {whichOne=='Cialo' ? profile.Cialo:''}
            {whichOne=='Umysl' ? profile.Umysl:''}
            {whichOne=='Urok' ? profile.Urok:''}
            {whichOne=='Niezlomnosc' ? profile.Niezlomnosc:''}
            {whichOne=='Zrecznosc' ? profile.Zrecznosc:''}
        </div>
    </div>
}

export default StatBox