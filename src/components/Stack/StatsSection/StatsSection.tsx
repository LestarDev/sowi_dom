import StatBox from "../../StatBox/StatBox"
import './StatsSection.css'

const StatsSection = () => {
    return <div className="StatsSection">
        
        <StatBox props={{whichOne: 'Cialo'}} />
        <StatBox props={{whichOne: 'Umysl'}} />
        <StatBox props={{whichOne: 'Urok'}} />
        <StatBox props={{whichOne: 'Niezlomnosc'}} />
        <StatBox props={{whichOne: 'Zrecznosc'}} />
        <StatBox props={{whichOne: 'Intuicja'}} />
    </div>
}

export default StatsSection