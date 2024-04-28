import { useDispatch, useSelector } from "react-redux"
import { CurrentState, choosenType, setCialo, setIdUzytkownika, setIntuicja, setLvl, setNick, setNiezlomnosc, setSzczescie, setUmysl, setUrok, setWybrany, setZrecznosc } from "../shared/config/currentSlice";

const useProfile = () => {

    const dispatch = useDispatch();

    const {nick, lvl, Umysl, Cialo, Zrecznosc, idUzytkownika, Szczescie, Urok, Niezlomnosc, Intuicja, wybranyTyp} = (useSelector((state) => state) as any).currency;

    wybranyTyp as choosenType;

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
        dispatch(setWybrany('Ekwipunek'));
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

    const pokazKostki = (toPrzelicz: string) => {
        console.log(typeof toPrzelicz)
        switch(toPrzelicz){
            case '1':
                return "k3";
            case '2':
                return "k4";
            case '3':
                return "k6";
            case '4':
                return "k8";
            case '5':
                return "k8+k3";
            case '6':
                return "k8+k4";
            case '7':
                return "k8+k6";
            case '8':
                return "2k8";
            case '9':
                return "2k8+k4";
            case '10':
                return "2k8+k6";
            case '11':
                return "3k8";
            case '12':
                return "k10+2k8";
            default:
                return "Error => useProfile => pokazKostki"

        }
    }

    const setNewWybrany = (newWybrany: choosenType) => {
        dispatch(setWybrany(newWybrany));
        console.log(newWybrany);
    }

    return ({
        przelicznik, setNewWybrany, pokazKostki,
        setNewProfile, setNewIdUzytkownika, setNewNick,
        setNewCialo, setNewIntuicja, setNewSzczescie, setNewNiezlomnosc, setNewUrok, setNewUmysl, setNewLvl,setNewZrecznosc,
        nick, lvl, Umysl, Cialo, Zrecznosc, idUzytkownika, Szczescie, Urok, Niezlomnosc, Intuicja, wybranyTyp,
    })

}


export default useProfile