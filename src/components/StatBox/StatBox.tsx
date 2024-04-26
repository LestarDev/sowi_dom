import useProfile from "../../hooks/useProfile"

type whichOneType = 'Cialo' | 'Umysl' | 'Urok' | 'Niezlomnosc' | 'Zrecznosc';

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