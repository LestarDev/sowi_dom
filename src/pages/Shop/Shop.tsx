import { useEffect, useState } from "react"
import NavBar from "../../components/NavBar/NavBar"
import OwlModule, { typeOfCard } from "../../components/OwlModule/OwlModule"
import OwlShopTitle from "../../components/OwlShopTitle/OwlShopTitle"
import useProfile from "../../hooks/useProfile"
import './Shop.css'
import getMainLink, { getUmiejetnosciScript } from "../../private/apiData"
import { isStackBlitz } from "../../shared/config/isStackBlitz"
import umiejetnoscType from "../../shared/config/umiejetnosciType"

export type messageShop = {
    message: typeOfCard,
    isToShow: boolean,
}

const Shop = () => {

    const profile = useProfile();

    
    const emptyMessageShop: messageShop = {message: "brak monet", isToShow: false}; 
    const emptyUmiejetnoscList: umiejetnoscType[] = [];
    
    const [messageToShop, setMessageToShop] = useState(emptyMessageShop);
    const [listUmiejetnosciToUpgrade, setListUmiejetnosciToUpgrade] = useState(emptyUmiejetnoscList);
    // todo: zmienic automatyczny sekcje z Ekwipunek na Umiejetnosci i pobierac z Umiejetnosci Section state'a

    const [offset, setOffset] = useState(0);

    useEffect(()=>{
        const onScroll = () => setOffset(window.scrollY);
        fetch(getMainLink(isStackBlitz)+getUmiejetnosciScript+'id='+profile.idUzytkownika).then(response=>response.json()).then((data: any)=>{
            // console.log(data);
            for(let i=1; i<(data[0]*3); i+=3){
                if(profile.przelicznik(data[i+1],false,true)==4){
                    setListUmiejetnosciToUpgrade(previousList=>[...previousList,{name: data[i], value: data[i+1],type: data[i+2]}])
                }
            }
        })
        window.removeEventListener('scroll', onScroll);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    },[profile.refreshPage])

    // console.log("Lista umiejek to upgrade: ",listUmiejetnosciToUpgrade);
    const toRetunUpgradableUmiejetnosci: JSX.Element[] = [];
    listUmiejetnosciToUpgrade.forEach(singleUmiejka=>{
        toRetunUpgradableUmiejetnosci.push(<OwlModule nazwa={"Awansuj umiejetnosc '"+singleUmiejka.name+"'"} koszt={1} type="brak monet" fun={setMessageToShop} />)
    })


    return <div>
        <NavBar></NavBar>
        <OwlShopTitle></OwlShopTitle>
        <div className="owlShop">
            <OwlModule nazwa="Polaczenie dwoch zdolnosci" koszt={1} type={profile.sowieMonety >= 5 ? "Poinformuj MG o zakupie" : "brak monet"} fun={setMessageToShop} />
            <OwlModule nazwa="Wziecie nowej zdolnosci" koszt={1} type={profile.sowieMonety >= 5 ? "Poinformuj MG o zakupie" : "brak monet"} fun={setMessageToShop}/>
            <OwlModule nazwa="Zdobycie k4+1 Szczescia" koszt={1} type={profile.sowieMonety >= 5 ? "kupuj" : "brak monet"} fun={setMessageToShop}/>
            <OwlModule nazwa={"Zdobycie +0.1 lvl [na "+profile.przeliczLvl(profile.lvl*1 + 1)+"]"} koszt={1} type={profile.sowieMonety >= 5 ? "kupuj" : "brak monet"} fun={setMessageToShop}/>
            <OwlModule nazwa="Rozwin 3 umiejetnosci [do x.4]" koszt={1} type={profile.sowieMonety >= 5 ? "kupuj" : "brak monet"} fun={setMessageToShop} />
            
            {(2*(profile.przelicznik(profile.Cialo*1+1,true) as number))<=(profile.przeliczLvl(profile.lvl,false,true) as number) ? <OwlModule nazwa={'Podnies Cialo o 0.1 [na '+profile.przelicznik(profile.Cialo*1+1)+']'} koszt={1} type={profile.sowieMonety >= 5 ? "kupuj" : "brak monet"} fun={setMessageToShop} /> : ''}
            {(2*(profile.przelicznik(profile.Umysl*1+1,true) as number))<=(profile.przeliczLvl(profile.lvl,false,true) as number) ? <OwlModule nazwa={'Podnies Umysl o 0.1 [na '+profile.przelicznik(profile.Umysl*1+1)+']'} koszt={1} type={profile.sowieMonety >= 5 ? "kupuj" : "brak monet"} fun={setMessageToShop} /> : ''}
            {(2*(profile.przelicznik(profile.Zrecznosc*1+1,true) as number))<=(profile.przeliczLvl(profile.lvl,false,true) as number) ? <OwlModule nazwa={'Podnies Zrecznosc o 0.1 [na '+profile.przelicznik(profile.Zrecznosc*1+1)+']'} koszt={1} type={profile.sowieMonety >= 5 ? "kupuj" : "brak monet"} fun={setMessageToShop} /> : ''}
            {(2*(profile.przelicznik(profile.Niezlomnosc*1+1,true) as number))<=(profile.przeliczLvl(profile.lvl,false,true) as number) ? <OwlModule nazwa={'Podnies Niezlomnosc o 0.1 [na '+profile.przelicznik(profile.Niezlomnosc*1+1)+']'} koszt={1} type={profile.sowieMonety >= 5 ? "kupuj" : "brak monet"} fun={setMessageToShop} /> : ''}
            {(2*(profile.przelicznik(profile.Intuicja*1+1,true) as number))<=(profile.przeliczLvl(profile.lvl,false,true) as number) ? <OwlModule nazwa={'Podnies Intuicja o 0.1 [na '+profile.przelicznik(profile.Intuicja*1+1)+']'} koszt={1} type={profile.sowieMonety >= 5 ? "kupuj" : "brak monet"} fun={setMessageToShop} /> : ''}
            {(2*(profile.przelicznik(profile.Urok*1+1,true) as number))<=(profile.przeliczLvl(profile.lvl,false,true) as number) ? <OwlModule nazwa={'Podnies Urok o 0.1 [na '+profile.przelicznik(profile.Urok*1+1)+']'} koszt={1} type={profile.sowieMonety >= 5 ? "kupuj" : "brak monet"} fun={setMessageToShop} /> : ''}
        
            {
                toRetunUpgradableUmiejetnosci
            }

        </div>
        {messageToShop.isToShow ? <div className="shopInfoBox" style={{transform: "translateY("+offset+"px)"}}>
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