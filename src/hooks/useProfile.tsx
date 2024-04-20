import { useDispatch, useSelector } from "react-redux"
import { CurrentState, setCialo, setIdUzytkownika, setIntuicja, setLogin, setLvl, setNick, setNiezlomnosc, setPassword, setUmysl, setUrok, setZrecznosc } from "../shared/config/currentSlice";

const useProfile = () => {

    const dispatch = useDispatch();

    const {nick, lvl, Umysl, Cialo, Zrecznosc, login, password, idUzytkownika} = (useSelector((state) => state) as any).currency;

    const setNewProfile = (data: CurrentState) => {
        dispatch(setNick(data.nick));
        dispatch(setLvl(data.lvl));
        dispatch(setUmysl(data.Umysl));
        dispatch(setCialo(data.Cialo));
        dispatch(setZrecznosc(data.Zrecznosc));
        dispatch(setNiezlomnosc(data.Niezlomnosc));
        dispatch(setIntuicja(data.Intuicja));
        dispatch(setUrok(data.Urok))
        dispatch(setIdUzytkownika(data.idUzytkownika));
        dispatch(setLogin(data.login));
        dispatch(setPassword(data.password));
    }

    const setLogowanie = (log: string, pas: string) => {
        dispatch(setLogin(log));
        dispatch(setPassword(pas));
    }

    const setNewIdUzytkownika = (newId: number) => {
        dispatch(setIdUzytkownika(newId));
    }

    const setNewNick = (newNick: string) => {
        dispatch(setNick(newNick));
    }

    return ({
        setNewProfile, setLogowanie, setNewIdUzytkownika, setNewNick,
        nick, lvl, Umysl, Cialo, Zrecznosc, login, password, idUzytkownika
    })

}


export default useProfile