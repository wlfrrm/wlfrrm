import rur from "./ru.json";
import enr from "./en.json";

const [ ru, en ]: any = [rur, enr] as const;

let lang = "en";

export const setLang = (l: string) => {
    lang = l;
};

export default (key: string) => {
    if (lang === "ru") {
        return ru[key] || key;
    }
    return en[key] || key;
}