import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export type choosenType = 'Ekwipunek' | 'Umiejetnosci' | 'Zdolnosci' | 'Handouty';


export interface CurrentState {
    nick: string,
    lvl: number,
    HP: number,
    Umysl: string,
    Cialo: string,
    Zrecznosc: string,
    Niezlomnosc: string,
    Intuicja: string,
    Urok: string,
    Szczescie: number,
    idUzytkownika: number,
    wybranyTyp: choosenType,
    refreshPage: boolean,
    slimaki: number,
    sowieMonety: number,
}


export const initialState: CurrentState = {
    nick: "",
    Cialo: '',
    HP: 0,
    idUzytkownika: 0,
    Intuicja: '',
    lvl: 0,
    Niezlomnosc: '',
    Szczescie: 0,
    Umysl: '',
    Urok: '',
    Zrecznosc: '',
    wybranyTyp: 'Ekwipunek',
    refreshPage: false,
    slimaki: 0,
    sowieMonety: 0,
}

export const thisSlice = createSlice({
    name: "current",
    initialState,
    reducers: {
        setNick: (state, action: PayloadAction<string>) =>{
            state.nick=action.payload;
        },

        setHP: (state,action: PayloadAction<number>) => {
            state.HP=action.payload;
        },
        setSzczescie: (state, action: PayloadAction<number>)=>{
            state.Szczescie=action.payload
        },

        setCialo: (state,action: PayloadAction<string>) => {
            state.Cialo=action.payload;
        },
        setIdUzytkownika: (state,action: PayloadAction<number>) => {
            state.idUzytkownika=action.payload;
        },
        setIntuicja: (state,action: PayloadAction<string>) => {
            state.Intuicja=action.payload;
        },
        setLvl: (state,action: PayloadAction<number>) => {
            state.lvl=action.payload;
        },
        setNiezlomnosc: (state,action: PayloadAction<string>) => {
            state.Niezlomnosc=action.payload;
        },
        setUmysl: (state,action: PayloadAction<string>) => {
            state.Umysl=action.payload;
        },
        setUrok: (state,action: PayloadAction<string>) => {
            state.Urok=action.payload;
        },
        setZrecznosc: (state,action: PayloadAction<string>) => {
            state.Zrecznosc=action.payload;
        },
        setWybrany: (state, action: PayloadAction<choosenType>) => {
            state.wybranyTyp=action.payload;
        },
        setRefresh: (state, action: PayloadAction<boolean>) => {
            state.refreshPage=action.payload;
        },
        setSlimaki: (state, action: PayloadAction<number>) => {
            state.slimaki=action.payload;
        },
        setSowieMonety: (state, action: PayloadAction<number>) => {
            state.sowieMonety=action.payload;
        }
    }
})

export const {setNick, setRefresh, setSlimaki, setSowieMonety, setCialo, setUmysl, setZrecznosc, setHP, setSzczescie, setIntuicja, setIdUzytkownika, setNiezlomnosc, setLvl, setUrok, setWybrany, } = thisSlice.actions

export default thisSlice.reducer