import useProfile from "../../hooks/useProfile"
import UmiejetnosciSection from "../Stack/UmiejetnosciSection/UmiejetnosciSection";

const SectionFromBar = () => {
    const profile = useProfile();

    return <div>
        {profile.wybranyTyp=='Umiejetnosci'? <UmiejetnosciSection /> : ''}
    </div>
}

export default SectionFromBar