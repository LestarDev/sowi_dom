import useProfile from "../../hooks/useProfile"
import EkwipunekSection from "../Stack/EkwipunekSection/EkwipunekSection";
import UmiejetnosciSection from "../Stack/UmiejetnosciSection/UmiejetnosciSection";
import ZdolnosciSection from "../Stack/ZdolnosciSection/ZdolnosciSection";

const SectionFromBar = () => {
    const profile = useProfile();

    return <div>
        {profile.wybranyTyp=='Umiejetnosci'? <UmiejetnosciSection /> : ''}
        {profile.wybranyTyp=='Zdolnosci' ? <ZdolnosciSection /> : ''}
        {profile.wybranyTyp=='Ekwipunek' ? <EkwipunekSection /> : ''}
    </div>
}

export default SectionFromBar