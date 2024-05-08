import { useEffect, useState } from "react"
import NavBar from "../../components/NavBar/NavBar"
import OwlModule, { typeOfCard } from "../../components/OwlModule/OwlModule"
import OwlShopTitle from "../../components/OwlShopTitle/OwlShopTitle"
import useProfile from "../../hooks/useProfile"
import './Shop.css'
import getMainLink, { getUmiejetnosciScript, upgrade3UmiejkiScript } from "../../private/apiData"
import { isStackBlitz } from "../../shared/config/isStackBlitz"
import umiejetnoscType from "../../shared/config/umiejetnosciType"

export type messageShop = {
    message: typeOfCard,
    isToShow: boolean,
    nameOfcard: string
}

const Shop = () => {

    const profile = useProfile();

    
    const emptyMessageShop: messageShop = {message: "brak monet", isToShow: false, nameOfcard: ""}; 
    const emptyUmiejetnoscList: umiejetnoscType[] = [];
    
    const [messageToShop, setMessageToShop] = useState(emptyMessageShop);
    const [listUmiejetnosciToUpgrade, setListUmiejetnosciToUpgrade] = useState(emptyUmiejetnoscList);
    const [listOfUmiejki3ulepsz, setListOfUmiejki3ulepsz] = useState(emptyUmiejetnoscList);
    // todo: zmienic automatyczny sekcje z Ekwipunek na Umiejetnosci i pobierac z Umiejetnosci Section state'a

    const [countSelected3umiejki, setCountSelected3umiejki] = useState({counter: 0, tab: emptyUmiejetnoscList});

    const [offset, setOffset] = useState(0);

    const [refreshHere, setRefreshHere] = useState(false);

    const toRetunUpgradableUmiejetnosci: JSX.Element[] = [];
    const podnies3UmiejkiTab: JSX.Element[] = [];

    useEffect(()=>{
        const onScroll = () => setOffset(window.scrollY);
        fetch(getMainLink(isStackBlitz)+getUmiejetnosciScript+'id='+profile.idUzytkownika).then(response=>response.json()).then((data: any)=>{
            // console.log(data);
            for(let i=1; i<(data[0]*4); i+=4){
                if(profile.przelicznik(data[i+1],false,true)==4){
                    setListUmiejetnosciToUpgrade(previousList=>[...previousList,{name: data[i], value: data[i+1],type: data[i+2], id: data[i+3]}])
                }else{
                    setListOfUmiejki3ulepsz(previousList=>[...previousList,{name: data[i], value: data[i+1],type: data[i+2], id: data[i+3]}])
                }   
            }
        })
        window.removeEventListener('scroll', onScroll);
        window.addEventListener('scroll', onScroll, { passive: true });


        

        


        return () => window.removeEventListener('scroll', onScroll);
    },[profile.refreshPage, refreshHere])

    listUmiejetnosciToUpgrade.forEach(singleUmiejka=>{
        toRetunUpgradableUmiejetnosci.push(<OwlModule nazwa={"Awansuj umiejetnosc '"+singleUmiejka.name+"'"} koszt={1} type="brak monet" fun={setMessageToShop} />)
    })

    listOfUmiejki3ulepsz.forEach(singleUmiejka=>{
        podnies3UmiejkiTab.push(<label htmlFor={singleUmiejka.name}>{singleUmiejka.name}{'['}{profile.przelicznik(singleUmiejka.value)}{']'}<input type="checkbox" onChange={(e)=>{
            // console.log(e.target.checked);
            if(e.target.checked){
                setCountSelected3umiejki({counter: countSelected3umiejki.counter+1, tab: [...countSelected3umiejki.tab, singleUmiejka]})
            }else{
                setCountSelected3umiejki({counter: countSelected3umiejki.counter-1, tab: [...countSelected3umiejki.tab, singleUmiejka]})
                // setCountSelected3umiejki(prevVal=>prevVal-1)
            }
        }} name={singleUmiejka.name} id={singleUmiejka.name} /></label>)
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
                {
                    messageToShop.nameOfcard=="Rozwin 3 umiejetnosci [do x.4]" ? <div>
                        {podnies3UmiejkiTab.length<3 ? <h3>Uwaga, masz mniej niz 3 umiejetnosci</h3> : ''}
                        {
                            podnies3UmiejkiTab
                        }
                        <button className={countSelected3umiejki.counter==3 ? 'DoKupienia' : 'brakKupna'} onClick={()=>{
                            if(countSelected3umiejki.counter!=3) return;

                            fetch(getMainLink(isStackBlitz)+upgrade3UmiejkiScript+"idUz="+profile.idUzytkownika+
                            "&id1="+countSelected3umiejki.tab[0].id+"&id2="+countSelected3umiejki.tab[1].id+"&id3="+countSelected3umiejki.tab[2].id+
                            "&sowieMonety="+profile.sowieMonety).then(response=>response.text()).then((data: unknown)=>{
                                console.log(data as string);
                                setRefreshHere(prevVal=>!prevVal);
                            })

                            // fetch => set +1 these 3 umiejetnosci

                            setCountSelected3umiejki({counter: 0, tab: []});

                            setMessageToShop({message: messageToShop.message, isToShow: false, nameOfcard: ""});
                        }}>Kup</button>
                    </div> : <p>
                        {messageToShop.message}
                    </p>
                }
                <button onClick={()=>{
                    setMessageToShop({message: messageToShop.message, isToShow: false, nameOfcard: ""});
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