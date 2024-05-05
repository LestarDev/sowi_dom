import { useState } from "react"
import NavBar from "../../components/NavBar/NavBar"
import OwlModule, { typeOfCard } from "../../components/OwlModule/OwlModule"
import OwlShopTitle from "../../components/OwlShopTitle/OwlShopTitle"
import useProfile from "../../hooks/useProfile"
import './Shop.css'

export type messageShop = {
    message: typeOfCard,
    isToShow: boolean,
}

const Shop = () => {

    const profile = useProfile();


    const emptyMessageShop: messageShop = {message: "brak monet", isToShow: false}; 

    const [messageToShop, setMessageToShop] = useState(emptyMessageShop);

    return <div>
        <NavBar></NavBar>
        <OwlShopTitle></OwlShopTitle>
        <div className="owlShop">
            <OwlModule nazwa="Polaczenie dwoch zdolnosci" koszt={1} type={profile.sowieMonety >= 5 ? "Poinformuj MG o zakupie" : "brak monet"} fun={setMessageToShop} />
            <OwlModule nazwa="Wziecie nowej zdolnosci" koszt={1} type={profile.sowieMonety >= 5 ? "Poinformuj MG o zakupie" : "brak monet"} fun={setMessageToShop}/>
            <OwlModule nazwa="Zdobycie k4+1 Szczescia" koszt={1} type={profile.sowieMonety >= 5 ? "kupuj" : "brak monet"} fun={setMessageToShop}/>
            <OwlModule nazwa={"Zdobycie +0.1 lvl [na "+profile.przeliczLvl(profile.lvl*1 + 1)+"]"} koszt={1} type={profile.sowieMonety >= 5 ? "kupuj" : "brak monet"} fun={setMessageToShop}/>
        </div>
        {messageToShop.isToShow ? <div className="shopInfoBox">
            <div>
                {messageToShop.message}
                <button onClick={()=>{
                    setMessageToShop({message: messageToShop.message, isToShow: false});
                }}>x</button>
            </div>
        </div> : ''}
        {/* Sowi Sklep: 

- Połączenie Dwóch Zdolności 

- Wzięcie nowej zdolności 

- Zdobycie k4+1 Szczęścia 

- Podniesienie o 0.1 lvl’a 

- Podniesienie statystyki o 0.1 (Maxymalnie do x.y, gdzie 2x>=lvl) 

- Przesun Granice Umiejetnosci [tj. Awansuj z x.4 na (x+1).1 

- Rozwin 3 umiejetnosci o 0.1 [do max x.4]  */}
    </div>
}

export default Shop