import useProfile from "../../hooks/useProfile"
import whichOneType from "../../shared/config/statsType";
import './StatBox.css'



const StatBox = ({props}) => {

    const profile = useProfile();

    props.wichOne as whichOneType;

    return <div className="StatBox">
        <div>{props.whichOne}</div>
        <div>
            {props.whichOne=='Cialo' ? profile.przelicznik(profile.Cialo):''}
            {props.whichOne=='Umysl' ? profile.przelicznik(profile.Umysl):''}
            {props.whichOne=='Urok' ? profile.przelicznik(profile.Urok):''}
            {props.whichOne=='Niezlomnosc' ? profile.przelicznik(profile.Niezlomnosc):''}
            {props.whichOne=='Zrecznosc' ? profile.przelicznik(profile.Zrecznosc):''}
            {props.whichOne=='Intuicja' ? profile.przelicznik(profile.Intuicja):''}
            <br></br>
            {'[ '}
            {props.whichOne=='Cialo' ? profile.pokazKostki(profile.Cialo):''}
            {props.whichOne=='Umysl' ? profile.pokazKostki(profile.Umysl):''}
            {props.whichOne=='Urok' ? profile.pokazKostki(profile.Urok):''}
            {props.whichOne=='Niezlomnosc' ? profile.pokazKostki(profile.Niezlomnosc):''}
            {props.whichOne=='Zrecznosc' ? profile.pokazKostki(profile.Zrecznosc):''}
            {props.whichOne=='Intuicja' ? profile.pokazKostki(profile.Intuicja):''}
            {' ]'}
        </div>
    </div>
}

export default StatBox