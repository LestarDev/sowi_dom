import { useDispatch, useSelector } from "react-redux"
import { CurrentState, choosenType, setCialo, setHP, setIdUzytkownika, setIntuicja, setLvl, setNick, setNiezlomnosc, setRefresh, setSlimaki, setSowieMonety, setSzczescie, setUmysl, setUrok, setWybrany, setZrecznosc } from "../shared/config/currentSlice";

const useProfile = () => {

    const dispatch = useDispatch();

    const {nick,HP, lvl, Umysl, slimaki, sowieMonety, refreshPage, Cialo, Zrecznosc, idUzytkownika, Szczescie, Urok, Niezlomnosc, Intuicja, wybranyTyp} = (useSelector((state: any) => state) as any).currency;

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
        if(toPrzelicz==0) return "0 XD";
        const pierwszaCyfra = Math.ceil(toPrzelicz/4);
        const drugaCyfraPrzygotowanie = toPrzelicz%4;
        const drugaCyfra = drugaCyfraPrzygotowanie==0 ? 4 : drugaCyfraPrzygotowanie;
        return pierwszaCyfra+'.'+drugaCyfra;
    }

    const przeliczLvl = (toPrzelicz: number, isSowiaMoneta: boolean=false) => {

        // 1=>1.0
        // 2=? 1.1
        //3=> 1.2
        //4=> 1.3
        //5 => 1.4
        // 6 => 2.0
        // 7=> 2.1
        const pierwszaCyfra = Math.ceil((toPrzelicz-(isSowiaMoneta ? 1 : 0))/5);
        const drugaCyfra = ((toPrzelicz-(isSowiaMoneta ? 0 : 1)))%5;
        return pierwszaCyfra+'.'+drugaCyfra;
    }

    const getFirstCyfra = (toPrzelicz: number) => {
        return Math.ceil(toPrzelicz/4);
    }

    const pokazKostki = (toPrzelicz: string) => {
        //console.log(typeof toPrzelicz)
        switch(toPrzelicz){
            case '0':
                return "PECH";
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
                return "Ladowanie..."

        }
    }

    const zlaczoneKostki = (toPrzelicz_1: string, toPrzelicz_2: string) => {

        if(toPrzelicz_1=='0' || toPrzelicz_2=='0') return 'PECH';

        if(toPrzelicz_1=='1'){
            switch(toPrzelicz_2){
                case '1':
                    return '2k3';
                case '2':
                    return 'k4+k3';
                case '3':
                    return 'k6+k3';
                case '4':
                    return 'k8+k3';
                case '5':
                    return 'k8+2k3';
                case '6':
                    return 'k8+k4+k3';
                case '7':
                    return 'k8+k6+k3';
                case '8':
                    return '2k8+k3';
                case '9':
                    return '2k8+k4+k3';
                case '10':
                    return '2k8+k6+k3';
                case '11':
                    return '3k8+k3';
                case '12':
                    return 'k10+2k8+k3';
            }
        }

        if(toPrzelicz_1=='2'){
            switch(toPrzelicz_2){
                case '1':
                    return 'k4+k3';
                case '2':
                    return '2k4';
                case '3':
                    return 'k6+k4';
                case '4':
                    return 'k8+k4';
                case '5':
                    return 'k8+k4+k3';
                case '6':
                    return 'k8+2k4';
                case '7':
                    return 'k8+k6+k4';
                case '8':
                    return '2k8+k4';
                case '9':
                    return '2k8+2k4';
                case '10':
                    return '2k8+k6+k4';
                case '11':
                    return '3k8+k4';
                case '12':
                    return 'k10+2k8+k4';
            }
        }

        if(toPrzelicz_1=='3'){
            switch(toPrzelicz_2){
                case '1':
                    return 'k6+k3';
                case '2':
                    return 'k6+k4';
                case '3':
                    return '2k6';
                case '4':
                    return 'k8+k6';
                case '5':
                    return 'k8+k6+k3';
                case '6':
                    return 'k8+k6+k4';
                case '7':
                    return 'k8+2k6';
                case '8':
                    return '2k8+k6';
                case '9':
                    return '2k8+k6+k4';
                case '10':
                    return '2k8+2k6';
                case '11':
                    return '3k8+k6';
                case '12':
                    return 'k10+2k8+k6';
            }
        }

        if(toPrzelicz_1=='4'){
            switch(toPrzelicz_2){
                case '1':
                    return 'k8+k3';
                case '2':
                    return 'k8+k4';
                case '3':
                    return 'k8+k6';
                case '4':
                    return '2k8';
                case '5':
                    return '2k8+k3';
                case '6':
                    return '2k8+k4';
                case '7':
                    return '2k8+k6';
                case '8':
                    return '3k8';
                case '9':
                    return '3k8+k4';
                case '10':
                    return '3k8+k6';
                case '11':
                    return '4k8';
                case '12':
                    return 'k10+3k8';
            }
        }

        if(toPrzelicz_1=='5'){
            switch(toPrzelicz_2){
                case '1':
                    return 'k8+2k3';
                case '2':
                    return 'k8+k4+k3';
                case '3':
                    return 'k8+k6+k3';
                case '4':
                    return '2k8+k3';
                case '5':
                    return '2k8+2k3';
                case '6':
                    return '2k8+k4+k3';
                case '7':
                    return '2k8+k6+k3';
                case '8':
                    return '3k8+k3';
                case '9':
                    return '3k8+k4+k3';
                case '10':
                    return '3k8+k6+k3';
                case '11':
                    return '4k8+k3';
                case '12':
                    return 'k10+3k8+k3';
            }
        }

        if(toPrzelicz_1=='6'){
            switch(toPrzelicz_2){
                case '1':
                    return 'k8+k4+k3';
                case '2':
                    return 'k8+2k4';
                case '3':
                    return 'k8+k6+k4';
                case '4':
                    return '2k8+k4';
                case '5':
                    return '2k8+k4+k3';
                case '6':
                    return '2k8+2k4';
                case '7':
                    return '2k8+k6+k4';
                case '8':
                    return '3k8+k4';
                case '9':
                    return '3k8+2k4';
                case '10':
                    return '3k8+k6+k4';
                case '11':
                    return '4k8+k4';
                case '12':
                    return 'k10+3k8+k4';
            }
        }

        if(toPrzelicz_1=='7'){
            switch(toPrzelicz_2){
                case '1':
                    return 'k8+k6+k3';
                case '2':
                    return 'k8+k6+k4';
                case '3':
                    return 'k8+2k6';
                case '4':
                    return '2k8+k6';
                case '5':
                    return '2k8+k6+k3';
                case '6':
                    return '2k8+k6+k4';
                case '7':
                    return '2k8+2k6';
                case '8':
                    return '3k8+k6';
                case '9':
                    return '3k8+k6+k4';
                case '10':
                    return '3k8+2k6';
                case '11':
                    return '4k8+k6';
                case '12':
                    return 'k10+3k8+k6';
            }
        }

        if(toPrzelicz_1=='8'){
            switch(toPrzelicz_2){
                case '1':
                    return '2k8+k3';
                case '2':
                    return '2k8+k4';
                case '3':
                    return '2k8+k6';
                case '4':
                    return '3k8';
                case '5':
                    return '3k8+k3';
                case '6':
                    return '3k8+k4';
                case '7':
                    return '3k8+k6';
                case '8':
                    return '4k8';
                case '9':
                    return '4k8+k4';
                case '10':
                    return '4k8+k6';
                case '11':
                    return '5k8';
                case '12':
                    return 'k10+4k8';
            }
        }

        if(toPrzelicz_1=='9'){
            switch(toPrzelicz_2){
                case '1':
                    return '2k8+k4+k3';
                case '2':
                    return '2k8+2k4';
                case '3':
                    return '2k8+k6+k4';
                case '4':
                    return '3k8+k4';
                case '5':
                    return '3k8+k4+k3';
                case '6':
                    return '3k8+2k4';
                case '7':
                    return '3k8+k6+k4';
                case '8':
                    return '4k8+k4';
                case '9':
                    return '4k8+2k4';
                case '10':
                    return '4k8+k6+k4';
                case '11':
                    return '5k8+k4';
                case '12':
                    return 'k10+4k8+k4';
            }
        }

        if(toPrzelicz_1=='10'){
            switch(toPrzelicz_2){
                case '1':
                    return '2k8+k6+k3';
                case '2':
                    return '2k8+k6+k4';
                case '3':
                    return '2k8+2k6';
                case '4':
                    return '3k8+k6';
                case '5':
                    return '3k8+k6+k3';
                case '6':
                    return '3k8+k6+k4';
                case '7':
                    return '3k8+2k6';
                case '8':
                    return '4k8+k6';
                case '9':
                    return '4k8+k6+k4';
                case '10':
                    return '4k8+2k6';
                case '11':
                    return '5k8+k6';
                case '12':
                    return 'k10+4k8+k6';
            }
        }

        if(toPrzelicz_1=='11'){
            switch(toPrzelicz_2){
                case '1':
                    return '3k8+k3';
                case '2':
                    return '3k8+k4';
                case '3':
                    return '3k8+k6';
                case '4':
                    return '4k8';
                case '5':
                    return '4k8+k3';
                case '6':
                    return '4k8+k4';
                case '7':
                    return '4k8+k6';
                case '8':
                    return '5k8';
                case '9':
                    return '5k8+k4';
                case '10':
                    return '5k8+k6';
                case '11':
                    return '6k8';
                case '12':
                    return 'k10+5k8';
            }
        }

        if(toPrzelicz_1=='12'){
            switch(toPrzelicz_2){
                case '1':
                    return 'k10+2k8+k3';
                case '2':
                    return 'k10+2k8+k4';
                case '3':
                    return 'k10+2k8+k6';
                case '4':
                    return 'k10+3k8';
                case '5':
                    return 'k10+3k8+k3';
                case '6':
                    return 'k10+3k8+k4';
                case '7':
                    return 'k10+3k8+k6';
                case '8':
                    return 'k10+4k8';
                case '9':
                    return 'k10+4k8+k4';
                case '10':
                    return 'k10+4k8+k6';
                case '11':
                    return 'k10+4k8';
                case '12':
                    return '2k10+4k8';
            }
        }

        return 'Error => useProfile => zlaczoneKostki('+toPrzelicz_1+', '+toPrzelicz_2+')!';
    }

    const setNewWybrany = (newWybrany: choosenType) => {
        dispatch(setWybrany(newWybrany));
        //console.log(newWybrany);
    }

    const getHP = () => {
        const prepHPzCiala: number = (10+Cialo*1)*2;
        const prepLvl = Math.ceil((lvl*1)/5);   

        const prepHPzLvla: number = (prepLvl-1)*3;




        return (HP*1+prepHPzCiala+prepHPzLvla)
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