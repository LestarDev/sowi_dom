const mainLink = "https://mlp-rpg.zsti.me/phpData/";

const getMainLink = (isStackBlitz?: boolean) => {
    if(isStackBlitz==true) return mainLink+'stackblitz/';
    return mainLink
}

// php => catch(Zly link) => pobierz link ktory chce sie wbic, odswierz z headerem tego linku

export const getProfileScript = "getUzytkownik.php?";
export const getNickScript="getNick.php?";
export const getUmiejetnosciScript="getUmiejetnosci.php?";
export const getZdolnosciScript = "getZdolnosci.php?";
export const getUmiejkiLike = "getUmiejetnosciLike.php?";

export default getMainLink