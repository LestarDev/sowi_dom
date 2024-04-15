import { useDispatch, useSelector } from "react-redux"
import { setNameOfApp } from "../shared/config/currentSlice"

const useProfile = () => {

    const dispatch = useDispatch();

    const {nameOfApp} = (useSelector((state) => state) as any).currency;

    const setNewAppName = (name: string) => {
        dispatch(setNameOfApp(name))
    }

    return ({
        setNewAppName,
        nameOfApp
    })

}


export default useProfile