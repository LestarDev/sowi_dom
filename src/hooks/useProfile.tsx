import { useDispatch, useSelector } from "react-redux"
import { CurrentState, choosenType, setCialo, setHP, setIdUzytkownika, setIntuicja, setLvl, setNick, setNiezlomnosc, setRefresh, setSlimaki, setSowieMonety, setSzczescie, setUmysl, setUrok, setWybrany, setZrecznosc } from "../shared/config/currentSlice";

const useProfile = () => {

    const dispatch = useDispatch();

    const {nick,HP, lvl, Umysl, slimaki, sowieMonety, refreshPage, Cialo, Zrecznosc, idUzytkownika, Szczescie, Urok, Niezlomnosc, Intuicja, wybranyTyp}: {
        nick: string, HP: number, lvl: number, Umysl: number, slimaki: number, sowieMonety: number, refreshPage: boolean, Cialo: number, Zrecznosc: number, idUzytkownika: number, Szczescie: number, Urok: number, Niezlomnosc: number, Intuicja: number, wybranyTyp: choosenType
    } = (useSelector((state: any) => state) as any).currency;

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

    const setNewSowieMonety = (newMonety: number) => {
        dispatch(setSowieMonety(newMonety));
    }
    
    const setNewSlimaki = (newSlimaki: number) => {
        dispatch(setSlimaki(newSlimaki));
    }

    const setRefreshPage = (newRefresh: boolean) => {
        dispatch(setRefresh(newRefresh));
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
        // console.log("Set new cialo:", typeof newCialo)
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

    const przelicznik = (toPrzelicz: number, isReturnFirst: boolean = false, isReturnSecond: boolean = false) => {
        if(toPrzelicz==0) return "0 XD";
        const pierwszaCyfra = Math.ceil(toPrzelicz/4);
        if(isReturnFirst) return pierwszaCyfra;
        const drugaCyfraPrzygotowanie = toPrzelicz%4;
        const drugaCyfra = drugaCyfraPrzygotowanie==0 ? 4 : drugaCyfraPrzygotowanie;
        if(isReturnSecond) return drugaCyfra;
        return pierwszaCyfra+'.'+drugaCyfra;
    }

    const przeliczLvl = (toPrzelicz: number, isSowiaMoneta: boolean=false, isReturnFirst: boolean = false) => {
        if(toPrzelicz==0) return '0';
        // 1=>1.0
        // 2=? 1.1
        //3=> 1.2
        //4=> 1.3
        //5 => 1.4
        // 6 => 2.0
        // 7=> 2.1
        const pierwszaCyfra = Math.ceil((toPrzelicz-(isSowiaMoneta ? 4 : 0))/5);
        if(isReturnFirst) return pierwszaCyfra;
        const drugaCyfra = ((toPrzelicz-(isSowiaMoneta ? 0 : 1)))%5;
        return pierwszaCyfra+'.'+drugaCyfra;
    }

    const getFirstCyfra = (toPrzelicz: number) => {
        return Math.ceil(toPrzelicz/4);
    }

    const pokazKostki = (toPrzelicz: number) => {
        // console.log("Pokaz kostki: ",typeof toPrzelicz)
        const tabPrzelicz = ["PECH", "k3", "k4", "k6", "k8", "k8+k3", "k8+k4", "k8+k6", "2k8", "2k8+k4", "2k8+k6", "3k8", "k10+2k8"];
        return tabPrzelicz[toPrzelicz] ?? 0;
    }

    const zlaczoneKostkiTablica: string[][] = [
        ['2k3', 'k4+k3', 'k6+k3', 'k8+k3', 'k8+2k3', 'k8+k4+k3', 'k8+k6+k3', '2k8+k3', '2k8+k4+k3', '2k8+k6+k3', '3k8+k3', 'k10+2k8+k3'],
        ['k4+k3', '2k4', 'k6+k4', 'k8+k4', 'k8+k4+k3', 'k8+2k4', 'k8+k6+k4', '2k8+k4', '2k8+2k4', '2k8+k6+k4', '3k8+k4', 'k10+2k8+k4'],
        ['k6+k3', 'k6+k4', '2k6', 'k8+k6', 'k8+k6+k3', 'k8+k6+k4', 'k8+2k6', '2k8+k6', '2k8+k6+k4', '2k8+2k6', '3k8+k6', 'k10+2k8+k6'],
        ['k8+k3', 'k8+k4', 'k8+k6', '2k8', '2k8+k3', '2k8+k4', '2k8+k6', '3k8', '3k8+k4', '3k8+k6', '4k8', 'k10+3k8'],
        ['k8+2k3', 'k8+k4+k3', 'k8+k6+k3', '2k8+k3', '2k8+2k3', '2k8+k4+k3', '2k8+k6+k3', '3k8+k3', '3k8+k4+k3', '3k8+k6+k3', '4k8+k3', 'k10+3k8+k3'],
        ['k8+k4+k3', 'k8+2k4', 'k8+k6+k4', '2k8+k4', '2k8+k4+k3', '2k8+2k4', '2k8+k6+k4', '3k8+k4', '3k8+2k4', '3k8+k6+k4', '4k8+k4', 'k10+3k8+k4'],
        ['k8+k6+k3', 'k8+k6+k4', 'k8+2k6', '2k8+k6', '2k8+k6+k3', '2k8+k6+k4', '2k8+2k6', '3k8+k6', '3k8+k6+k4', '3k8+2k6', '4k8+k6', 'k10+3k8+k6'],
        ['2k8+k3', '2k8+k4', '2k8+k6', '3k8', '3k8+k3', '3k8+k4', '3k8+k6', '4k8', '4k8+k4', '4k8+k6', '5k8', 'k10+4k8'],
        ['2k8+k4+k3', '2k8+2k4', '2k8+k6+k4', '3k8+k4', '3k8+k4+k3', '3k8+2k4', '3k8+k6+k4', '4k8+k4', '4k8+2k4', '4k8+k6+k4', '5k8+k4', 'k10+4k8+k4'],
        ['2k8+k6+k3', '2k8+k6+k4', '2k8+2k6', '3k8+k6', '3k8+k6+k3', '3k8+k6+k4', '3k8+2k6', '4k8+k6', '4k8+k6+k4', '4k8+2k6', '5k8+k6', 'k10+4k8+k6'],
        ['3k8+k3', '3k8+k4', '3k8+k6', '4k8', '4k8+k3', '4k8+k4', '4k8+k6', '5k8', '5k8+k4', '5k8+k6', '6k8', 'k10+5k8'],
        ['k10+2k8+k3', 'k10+2k8+k4', 'k10+2k8+k6', 'k10+3k8', 'k10+3k8+k3', 'k10+3k8+k4', 'k10+3k8+k6', 'k10+4k8', 'k10+4k8+k4', 'k10+4k8+k6', 'k10+4k8', '2k10+4k8']
    ];

    const zlaczoneKostki = (toPrzelicz_2: number, toPrzelicz_1: number) => {

        if(toPrzelicz_1==0 || toPrzelicz_2==0) return 'PECH';

        return zlaczoneKostkiTablica[toPrzelicz_1-1][toPrzelicz_2-1] ?? `Error => useProfile => zlaczoneKostki(${toPrzelicz_1}, ${toPrzelicz_2})!`;
        
    }

    const setNewWybrany = (newWybrany: choosenType) => {
        dispatch(setWybrany(newWybrany));
        //console.log(newWybrany);
    }

    const getHP = () => {
        const prepHPzCiala: number = (10+Cialo*1)*2;
        const prepLvl = Math.ceil((lvl*1)/5);   

        const prepHPzLvla: number = (prepLvl-1)*3;




        return (HP+prepHPzCiala+prepHPzLvla)
    }

    const setNewAddHP = (newHP: number) => {
        dispatch(setHP(newHP));
    }

    return ({
        przelicznik, setNewWybrany, pokazKostki, zlaczoneKostki, przeliczLvl, getFirstCyfra, getHP,
        setNewProfile, setNewIdUzytkownika, setNewNick,
        setNewCialo, setNewIntuicja, setNewSzczescie, setNewNiezlomnosc, setNewUrok, setNewUmysl, setNewLvl,setNewZrecznosc, setNewAddHP, setRefreshPage, setNewSlimaki, setNewSowieMonety,
        nick, lvl, Umysl, sowieMonety, Cialo, Zrecznosc, idUzytkownika, Szczescie, Urok, Niezlomnosc, Intuicja, wybranyTyp, refreshPage, slimaki, 
    })

}


export default useProfile