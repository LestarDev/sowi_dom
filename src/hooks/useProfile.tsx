import { useDispatch, useSelector } from "react-redux"
import { CurrentState, setCialo, setIdUzytkownika, setIntuicja, setLvl, setNick, setNiezlomnosc, setSzczescie, setUmysl, setUrok, setZrecznosc } from "../shared/config/currentSlice";

const useProfile = () => {

    const dispatch = useDispatch();

    const {nick, lvl, Umysl, Cialo, Zrecznosc, idUzytkownika} = (useSelector((state) => state) as any).currency;

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
    }

    const setNewIdUzytkownika = (newId: number) => {
        dispatch(setIdUzytkownika(newId));
    }

    const setNewNick = (newNick: string) => {
        dispatch(setNick(newNick));
    }

    const setNewLvl = (newLvl: number) => {
        dispatch(setLvl(newLvl))
    }

    const setNewUmysl = (newUmysl: number) => {
        dispatch(setUmysl(newUmysl));
    }

    const setNewCialo = (newCialo: number) => {
        dispatch(setCialo(newCialo));
    }

    const setNewUrok = (newUrok: number) => {
        dispatch(setUrok(newUrok))
    }

    const setNewNiezlomnosc = (newNiezlomnosc: number) => {
        dispatch(setNiezlomnosc(newNiezlomnosc))
    }

    const setNewSzczescie = (newSzczescie: number) => {
        dispatch(setSzczescie(newSzczescie))
    }

    const setNewIntuicja = (newIntuicja: number) => {
        dispatch(setIntuicja(newIntuicja))
    }

    const setNewZrecznosc = (newZrecznosc: number) => {
        dispatch(setZrecznosc(newZrecznosc))
    }

    const przelicznik = (toPrzelicz: number) => {
        const pierwszaCyfra = Math.ceil(toPrzelicz/4);
        const drugaCyfraPrzygotowanie = toPrzelicz%4;
        const drugaCyfra = drugaCyfraPrzygotowanie==0 ? 4 : drugaCyfraPrzygotowanie;
        return pierwszaCyfra+'.'+drugaCyfra;
    }

    return ({
        przelicznik,
        setNewProfile, setNewIdUzytkownika, setNewNick,
        setNewCialo, setNewIntuicja, setNewSzczescie, setNewNiezlomnosc, setNewUrok, setNewUmysl, setNewLvl,setNewZrecznosc,
        nick, lvl, Umysl, Cialo, Zrecznosc, idUzytkownika
    })

}


export default useProfile