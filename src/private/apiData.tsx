const mainLink = "https://mlp-rpg.zsti.me/phpData/";

const getMainLink = (isStackBlitz?: boolean) => {
    if(isStackBlitz==true) return mainLink+'stackblitz/';
    return mainLink
}

export const getProfileScript = "getUzytkownik.php?";
export const getNickScript="getNick.php?";
export const getUmiejetnosciScript="getUmiejetnosci.php?";
export const getZdolnosciScript = "getZdolnosci.php?";
export const getUmiejkiLike = "getUmiejetnosciLike.php?";
export const getReceptaZdolki = "getRecepturaZdolnosci.php?";
export const getEkwipunek = "getEkwipunek.php?";
export const getBron = "getBronData.php?";
export const getKsiazka = "getHandouty.php?";
export const getMonetyScript = "getSowieMonety.php?";

export default getMainLink