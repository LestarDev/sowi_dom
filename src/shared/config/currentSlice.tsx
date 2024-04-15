import { PayloadAction, createSlice } from "@reduxjs/toolkit"



interface CurrentState {
    nameOfApp: string
}


const initialState: CurrentState = {
    nameOfApp: ""
}

export const thisSlice = createSlice({
    name: "current",
    initialState,
    reducers: {
        setNameOfApp: (state, action: PayloadAction<string>) =>{
            state.nameOfApp=action.payload;
        }
    }
})

export const {setNameOfApp} = thisSlice.actions

export default thisSlice.reducer