# SOWI DOM
Technology: React + TypeScript + Vite => HTML,CSS,PHP,SQL

## Author: Mateusz Borkowski

PHP and SQL server used: `zsti.me/`. This server is only for ZSTI Gliwice students

### More info:

- Configure the top-level `apiData.tsx` property like this:

```js
const mainLink = "${Your Link}";

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

export default getMainLink
```

- To run this project on github remember to start with `.github/workflows/mozaZadziala.yml` not 'root/'

- In `vite.config.ts` change base to your project name

```JS
export default defineConfig({
  plugins: [react()],
  base: "/${Your project name}/",
})

```

## Version: 0.5.0

Version 1.0.0 will be delivered as soon as my dear Artist will do a figma for me :3