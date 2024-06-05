import useProfile from "../../hooks/useProfile"
import whichOneType from "../../shared/config/statsType";
import './StatBox.css'

type propsType = {
    whichOne: whichOneType
}


const StatBox = ({whichOne}: propsType) => {

    const profile = useProfile();

    

    return <div className="StatBox">
        <div >{whichOne}</div>
        <div>
            {'[ '}
            {whichOne=='Cialo' ? profile.pokazKostki(profile.Cialo):''}
            {whichOne=='Umysl' ? profile.pokazKostki(profile.Umysl):''}
            {whichOne=='Urok' ? profile.pokazKostki(profile.Urok):''}
            {whichOne=='Niezlomnosc' ? profile.pokazKostki(profile.Niezlomnosc):''}
            {whichOne=='Zrecznosc' ? profile.pokazKostki(profile.Zrecznosc):''}
            {whichOne=='Intuicja' ? profile.pokazKostki(profile.Intuicja):''}
            {' ]'}
        </div>
    </div>
}

export default StatBox