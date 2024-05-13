import StatBox from "../../StatBox/StatBox"
import './StatsSection.css'

const StatsSection = () => {
    return <div className="StatsSection">
        
        <StatBox whichOne="Umysl"/>
        <StatBox whichOne="Cialo" />
        <StatBox whichOne="Zrecznosc" />
        <StatBox whichOne="Niezlomnosc" />
        <StatBox whichOne="Intuicja" />
        <StatBox whichOne="Urok" />
        
    </div>
}

export default StatsSection