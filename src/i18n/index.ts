import ruRaw from "./ru.json";
import enRaw from "./en.json";

const ru: any = ruRaw;
const en: any = enRaw;

export const t = (lang: "en" | "ru", key: string) => {
    const dict = lang === "ru" ? ru : en;
    return dict[key] ?? key;
};