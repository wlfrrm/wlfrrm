import rur from "./ru.json";
import enr from "./en.json";

const [ ru, en ]: any = [rur, enr] as const;

export default (lang:string = "en") => {
    const dct = lang === "ru" ? ru : en;
    return ( key: string ) => {
        return dct[key] || key;
    }
}