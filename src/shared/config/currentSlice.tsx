import { PayloadAction, createSlice } from "@reduxjs/toolkit"



export interface CurrentState {
    nick: string,
    lvl: number,
    HP: number,
    Umysl: number,
    Cialo: number,
    Zrecznosc: number,
    Niezlomnosc: number,
    Intuicja: number,
    Urok: number,
    Szczescie: number,
    idUzytkownika: number,
}


const initialState: CurrentState = {
    nick: "",
    Cialo: 0,
    HP: 0,
    idUzytkownika: 0,
    Intuicja: 0,
    lvl: 0,
    Niezlomnosc: 0,
    Szczescie: 0,
    Umysl: 0,
    Urok: 0,
    Zrecznosc: 0,
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

        setCialo: (state,action: PayloadAction<number>) => {
            state.Cialo=action.payload;
        },
        setIdUzytkownika: (state,action: PayloadAction<number>) => {
            state.idUzytkownika=action.payload;
        },
        setIntuicja: (state,action: PayloadAction<number>) => {
            state.Intuicja=action.payload;
        },
        setLvl: (state,action: PayloadAction<number>) => {
            state.lvl=action.payload;
        },
        setNiezlomnosc: (state,action: PayloadAction<number>) => {
            state.Niezlomnosc=action.payload;
        },
        setUmysl: (state,action: PayloadAction<number>) => {
            state.Umysl=action.payload;
        },
        setUrok: (state,action: PayloadAction<number>) => {
            state.Urok=action.payload;
        },
        setZrecznosc: (state,action: PayloadAction<number>) => {
            state.Zrecznosc=action.payload;
        },
        
    }
})

export const {setNick, setCialo, setUmysl, setZrecznosc, setHP, setSzczescie, setIntuicja, setIdUzytkownika, setNiezlomnosc, setLvl, setUrok, } = thisSlice.actions

export default thisSlice.reducer