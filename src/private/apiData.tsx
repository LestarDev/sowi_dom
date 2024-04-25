const mainLink = "https://mlp-rpg.zsti.me/phpData/";

const getMainLink = (isStackBlitz?: boolean) => {
    if(isStackBlitz==true) return mainLink+'stackblitz/';
    return mainLink
}

export const getProfileScript = "getUzytkownik.php?";
export const getNickScript="getNick.php?";

export default getMainLink