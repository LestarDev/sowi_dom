import useProfile from "../../hooks/useProfile"
import EkwipunekSection from "../Stack/EkwipunekSection/EkwipunekSection";
import HandoutySection from "../Stack/HandoutySection/HandoutySection";
import UmiejetnosciSection from "../Stack/UmiejetnosciSection/UmiejetnosciSection";
import ZdolnosciSection from "../Stack/ZdolnosciSection/ZdolnosciSection";
import "./SectionFromBar.css"

const SectionFromBar = () => {
    const profile = useProfile();

    document.title = "Sowi Dom ["+profile.nick+"]";

    return <div>
        {profile.wybranyTyp=='Umiejetnosci'? <UmiejetnosciSection /> : ''}
        {profile.wybranyTyp=='Zdolnosci' ? <ZdolnosciSection /> : ''}
        {profile.wybranyTyp=='Ekwipunek' ? <EkwipunekSection /> : ''}
        {profile.wybranyTyp=='Handouty' ? <HandoutySection /> : ''}
    </div>
}

export default SectionFromBar