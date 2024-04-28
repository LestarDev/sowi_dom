import useProfile from "../../hooks/useProfile"
import UmiejetnosciSection from "../Stack/UmiejetnosciSection/UmiejetnosciSection";
import ZdolnosciSection from "../Stack/ZdolnosciSection/ZdolnosciSection";

const SectionFromBar = () => {
    const profile = useProfile();

    return <div>
        {profile.wybranyTyp=='Umiejetnosci'? <UmiejetnosciSection /> : ''}
        {profile.wybranyTyp=='Zdolnosci' ? <ZdolnosciSection /> : ''}
    </div>
}

export default SectionFromBar