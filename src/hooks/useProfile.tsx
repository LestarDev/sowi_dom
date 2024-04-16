import { useDispatch, useSelector } from "react-redux"
import { CurrentState, setCialo, setIdUzytkownika, setIntuicja, setLvl, setNick, setNiezlomnosc, setUmysl, setUrok, setZrecznosc } from "../shared/config/currentSlice";

const useProfile = () => {

    const dispatch = useDispatch();

    const {nameOfApp} = (useSelector((state) => state) as any).currency;

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

    return ({
        setNewProfile,
        nameOfApp
    })

}


export default useProfile