import { useDispatch, useSelector } from "react-redux"
import { CurrentState, setCialo, setIdUzytkownika, setIntuicja, setLvl, setNick, setNiezlomnosc, setUmysl, setUrok, setZrecznosc } from "../shared/config/currentSlice";

const useProfile = () => {

    const dispatch = useDispatch();

    const {nick, lvl, Umysl, Cialo, Zrecznosc} = (useSelector((state) => state) as any).currency;

    const setNewProfile = (data: CurrentState) => {
        dispatch(setNick(data.nick));
        dispatch(setLvl(data.lvl));
        dispatch(setUmysl(data.Umysl));
        dispatch(setCialo(data.Cialo));
        dispatch(setZrecznosc(data.Zrecznosc));
        dispatch(setNiezlomnosc(data.Niezlomnosc));
        dispatch(setIntuicja(data.Intuicja));
        dispatch(setUrok(data.Urok))
        dispatch(setIdUzytkownika(data.idUzytkownika))
    }

    const updateCialo = (data: number) => {
        dispatch(setCialo(data));
    }

    return ({
        setNewProfile, updateCialo,
        nick, lvl, Umysl, Cialo, Zrecznosc
    })

}


export default useProfile