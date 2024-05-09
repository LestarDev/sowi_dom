import StatBox from "../../StatBox/StatBox"
import './StatsSection.css'

const StatsSection = () => {
    return <div className="StatsSection">
        
        <StatBox props={{whichOne: 'Umysl'}} />
        <StatBox props={{whichOne: 'Cialo'}} />
        <StatBox props={{whichOne: 'Zrecznosc'}} />
        <StatBox props={{whichOne: 'Niezlomnosc'}} />
        <StatBox props={{whichOne: 'Intuicja'}} />
        <StatBox props={{whichOne: 'Urok'}} />
    </div>
}

export default StatsSection