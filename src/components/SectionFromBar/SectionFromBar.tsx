import useProfile from "../../hooks/useProfile"
import EkwipunekSection from "../Stack/EkwipunekSection/EkwipunekSection";
import HandoutySection from "../Stack/HandoutySection/HandoutySection";
import UmiejetnosciSection from "../Stack/UmiejetnosciSection/UmiejetnosciSection";
import ZdolnosciSection from "../Stack/ZdolnosciSection/ZdolnosciSection";

const SectionFromBar = () => {
    const profile = useProfile();

    return <div>
        {profile.wybranyTyp=='Umiejetnosci'? <UmiejetnosciSection /> : ''}
        {profile.wybranyTyp=='Zdolnosci' ? <ZdolnosciSection /> : ''}
        {profile.wybranyTyp=='Ekwipunek' ? <EkwipunekSection /> : ''}
        {profile.wybranyTyp=='Handouty' ? <HandoutySection /> : ''}
    </div>
}

export default SectionFromBar