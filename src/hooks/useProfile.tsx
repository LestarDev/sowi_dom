import { useDispatch, useSelector } from "react-redux"
import { CurrentState, choosenType, setCialo, setHP, setIdUzytkownika, setIntuicja, setLvl, setNick, setNiezlomnosc, setRefresh, setSlimaki, setSowieMonety, setSzczescie, setUmysl, setUrok, setWybrany, setZrecznosc } from "../shared/config/currentSlice";

// const ILOSC_RANG = 5; //Ilosc rang dostepnych w grze

const useProfile = () => {

    const dispatch = useDispatch();

    const {nick,HP, lvl, Umysl, slimaki, sowieMonety, refreshPage, Cialo, Zrecznosc, idUzytkownika, Szczescie, Urok, Niezlomnosc, Intuicja, wybranyTyp}: {
        nick: string, HP: number, lvl: number, Umysl: string, slimaki: number, sowieMonety: number, refreshPage: boolean, Cialo: string, Zrecznosc: string, idUzytkownika: number, Szczescie: number, Urok: string, Niezlomnosc: string, Intuicja: string, wybranyTyp: choosenType
    } = (useSelector((state: any) => state) as any).currency;

    // wybranyTyp as choosenType;

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

    const setNewUmysl = (newUmysl: string) => {
        dispatch(setUmysl(newUmysl));
    }

    const setNewCialo = (newCialo: string) => {
        dispatch(setCialo(newCialo));
    }

    const setNewUrok = (newUrok: string) => {
        dispatch(setUrok(newUrok))
    }

    const setNewNiezlomnosc = (newNiezlomnosc: string) => {
        dispatch(setNiezlomnosc(newNiezlomnosc))
    }

    const setNewSzczescie = (newSzczescie: number) => {
        dispatch(setSzczescie(newSzczescie))
    }

    const setNewIntuicja = (newIntuicja: string) => {
        dispatch(setIntuicja(newIntuicja))
    }

    const setNewZrecznosc = (newZrecznosc: string) => {
        dispatch(setZrecznosc(newZrecznosc))
    }
    
    const daneKostek = [3,4,6,8,10,12,20];
    const daneRang = [true, false, false, false, false, true, true, true]
    
    const przeliczUmiejka = (toPrzelicz: number, pushTab: boolean = false): string | number[] => {
      const rangaUmiejki = Math.floor(toPrzelicz/6);
      const mocOstatniejRangi = toPrzelicz%6;
      const tabAllKostki: number[] = [];
      
      for(let i=0; i<rangaUmiejki; i++){
        tabAllKostki.push(daneKostek[(daneRang[i] ? 6 : 5)])
      } 
      
      tabAllKostki.push(daneKostek[(daneRang[rangaUmiejki] ? mocOstatniejRangi : mocOstatniejRangi-1)])
      
      if(pushTab) return tabAllKostki;

      if(rangaUmiejki>1) return 'k'+tabAllKostki.join(", k")
      
      return 'k'+tabAllKostki[0]

    }

    /* input 
    0: Array [ "k8" ]
    1: Array(3) [ "k20", "k12", "k8" ]
    2: Array [ "k10" ]

    Output:

    [
        "Podstawa: k20, k10, k8",
        "Srednio zaawansowany: k12",
        "Mistrzowski: k8"
    ]

    */

    const RANGI_TAB = ["Podstawa", "Sredniozaawansowany", "Zaawansowany", "Mistrzowski", "Arcymistrzowski"];

    const splitToRangaUmiejka = (mainArray: number[][]): string[] => {
        const arrayToReturn: string[] = []; // ILOSC_RANG*n

        for(let i=0; i<RANGI_TAB.length; i++){
            const arrayMeanTime: number[] = [];
            for(let j=0; j<mainArray.length; j++){
                if(mainArray[j][i])
                arrayMeanTime.push(mainArray[j][i]); //k20 => 20
            }
            if(arrayMeanTime.length){
                // const arrayToSort: number[] = arrayMeanTime.map((v)=> Number(v));
                if(arrayMeanTime.length>1) arrayMeanTime.sort((a, b)=>b-a);

                arrayToReturn.push(RANGI_TAB[i]+': k'+arrayMeanTime.join(', k'));
            }
        }

        return arrayToReturn;
    }

    type DiceLevel = { [key: string]: string };
    
    

// Mapa poziomów kostek
const diceLevels: DiceLevel = {
  "1.1": "k3",
  "1.2": "k4",
  "1.3": "k6",
  "1.4": "k8",
  "2.1": "k8+k3",
  "2.2": "k8+k4",
  "2.3": "k8+k6",
  "2.4": "2k8",
  "3.1": "2k8+k4",
  "3.2": "2k8+k6",
  "3.3": "3k8",
  "3.4": "k10+2k8",
  "4.1": "k10+2k8+k6",
  "4.2": "k10+3k8",
  "4.3": "2k10+2k8",
  "4.4": "3k10+k8",
  "4.5": "4k10+1",
  "5.1": "4k10+k8",
  "5.2": "2k12+3k10",
  "5.3": "2k12+3k10+3",
  "5.4": "5k12+3",
  "5.5": "k20+4k12+3",
  "5.6": "2k20+3k12+3",
  "5.7": "3k20+2k12+3",
  "5.8": "4k20+k12+3",
  "5.9": "5k20+3",
  "6.1": "6k20+5",
  "6.2": "7k20+7",
  "6.3": "8k20+10",
  "6.4": "10k20+10",
};

function combineDice(dice1: string, dice2: string): string {
  const diceMap: { [key: string]: number } = {};

  const addDiceToMap = (dice: string) => {
    const diceParts = dice.split("+");
    diceParts.forEach(part => {
      const match = part.match(/(\d*)k(\d+)/);
      if (match) {
        const count = parseInt(match[1] || "1", 10);
        const type = match[2];
        diceMap[type] = (diceMap[type] || 0) + count;
      }
    });
  };

  addDiceToMap(dice1);
  addDiceToMap(dice2);

  return Object.keys(diceMap)
    .map(key => `${diceMap[key] === 1 ? '' : diceMap[key]}k${key}`)
    .join("+");
}

const zlaczoneKostki = (val1: number, val2: number): string => {

if(val1>Object.keys(diceLevels).length || val2>Object.keys(diceLevels).length) return 'SUKCES'

if(val1<=0 || val2<=0) return 'PECH';

  const levelKeys = Object.keys(diceLevels);
  const level1 = levelKeys[val1 - 1];
  const level2 = levelKeys[val2 - 1];

  const dice1 = diceLevels[level1];
  const dice2 = diceLevels[level2];

  return (combineDice(dice1, dice2) ?? "").split("+").reverse().join("+");
}


    const przelicznik = (toPrzelicz: number, isReturnFirst: boolean = false, isReturnSecond: boolean = false): string | number => {
        if(toPrzelicz<0) return "PECH";
        if(toPrzelicz==0) return "0 XD";

        if(isReturnFirst) return Object.keys(diceLevels)[toPrzelicz-1].split(".")[0]
        if(isReturnSecond) return Object.keys(diceLevels)[toPrzelicz-1].split(".")[1]

        return Object.keys(diceLevels)[toPrzelicz-1];

    }

    const przeliczLvl = (toPrzelicz: number, isSowiaMoneta: boolean=false, isReturnFirst: boolean = false): string | number => {
        if(toPrzelicz==0) return '0';
        const pierwszaCyfra: number = Math.ceil((toPrzelicz-(isSowiaMoneta ? 4 : 0))/5);
        if(isReturnFirst) return pierwszaCyfra;
        const drugaCyfra: number = ((toPrzelicz-(isSowiaMoneta ? 0 : 1)))%5;
        return pierwszaCyfra+'.'+drugaCyfra;
    }

    const pokazKostki = (toPrzelicz: string): string => {
        // console.log("Pokaz kostki: ",typeof toPrzelicz)
        // if(toPrzelicz <= 0) return "PECH";
        // return Object.values(diceLevels)[toPrzelicz-1] ?? "0";

        // const przelicz = toPrzelicz.split(', ');

        // const toReturn: string[] = przelicz.map((v)=>v);

        // return przelicz;
        return toPrzelicz

    }

    

    const setNewWybrany = (newWybrany: choosenType) => {
        dispatch(setWybrany(newWybrany));
        //console.log(newWybrany);
    }

    const getHP = ():number => {
        const prepHPzCiala: number = (10+Cialo.split(', ').length)*2;
        const prepLvl = przeliczLvl(lvl,false,true) as number;   

        const prepHPzLvla: number = (prepLvl-1)*3;




        return (HP+prepHPzCiala+prepHPzLvla)
    }

    const setNewAddHP = (newHP: number) => {
        dispatch(setHP(newHP));
    }

    const infoCechy: DiceLevel = {
        "szybka":"Przeciwnik ma -0.1 do Uniku oraz Parowania",
        "podwójny atak": "Jesli udalo Ci sie zaatakowac przeciwnika mozesz go zaatakowac po raz drugi [dla niego to ta sama reakcja]",
        "trujący (X)": "Przeciwnik po Twoim ataku i na koncu swojej tury wykonuje test odp na trucizny [TESTY]w przeciwnym razie [traci k3 HP i dostaje debuff Zatruty (+1)] za kazdy nieudany test",
        "wytrzymała": "Bron jest niesamowidzie wytrzymala i bardzo trudna do zniszczenia",
        "precyzyjna (X)": "Jesli zadasz choc 1HP zaatakowana istota traci dodatkowe [INSERT]HP bez wzgledu na wlasne zdolnosci"
    }

    const getInfo = (nameCecha: string): string => {
        if(nameCecha.indexOf('(')==-1) return infoCechy[nameCecha.toLowerCase()] ?? `Brak ${nameCecha}`;
        
        const rangaCechy: string = nameCecha.split('(')[1][0];

        const preperOpis = infoCechy[nameCecha.toLowerCase().split('(')[0]+"(X)"] ?? `Brak ${nameCecha.toLowerCase().split('(')[0]+"(X)"}`;

        // const preperTab = preperOpis.split("[TESTY]");

        if(preperOpis.indexOf("[TESTY]")==-1) return preperOpis.split("[INSERT]").join(rangaCechy);
        
        const toJoin: string[] = []

        for(let i=0; i<Number(rangaCechy); i++){
            toJoin.push((8+i*4).toString()+', ');
        }

        return preperOpis.split("[TESTY]").join(toJoin.join(""));
    }

    const getCeche = (typeCecha: number): string => {
        //console.log(typeof typeCecha);
        switch(typeCecha){
            case 1:
                return Umysl;
            case 2:
                return Cialo;
            case 3:
                return Zrecznosc;
            case 4:
                return Niezlomnosc;
            case 5:
                return Intuicja;
            case 6:
                return Urok;
            default:
                return ''
        }
    }

    return ({
        przelicznik, setNewWybrany, pokazKostki, zlaczoneKostki, przeliczLvl, getHP, getCeche, getInfo, przeliczUmiejka,
        setNewProfile, setNewIdUzytkownika, setNewNick,
        splitToRangaUmiejka,
        setNewCialo, setNewIntuicja, setNewSzczescie, setNewNiezlomnosc, setNewUrok, setNewUmysl, setNewLvl,setNewZrecznosc, setNewAddHP, setRefreshPage, setNewSlimaki, setNewSowieMonety,
        nick, lvl, Umysl, sowieMonety, Cialo, Zrecznosc, idUzytkownika, Szczescie, Urok, Niezlomnosc, Intuicja, wybranyTyp, refreshPage, slimaki, 
    })

}


export default useProfile