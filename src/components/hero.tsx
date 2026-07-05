import t from "../i18n"
import { Code2 } from "lucide-react"

export default ({ lang }: { lang: string }) => {
    const translate = t(lang);

    return <div className="flex border-b border-sub justify-between items-center h-max w-full
    bg-[#03070A] bg-[linear-gradient(90deg,#03070A_64%,#090979_100%)]">
            <div className="w-max align-center justify-between flex flex-col gap-8 my-40 mx-8">
            <p className="text-primary border-[.17rem] text-2xl rounded-full w-max
            px-5 sm:px-8 py-2">{translate("hero.accent")}</p>
            <p className="text-txt text-5xl md:text-8xl">{translate("hero.title")}</p>
            <p className="text-lg md:text-2xl text-sub max-w-3xl">
                {translate("hero.subtitle")}
            </p>
            <div className="flex gap-4 items-center">
                <a href="https://github.com/wlfrrm" target="_blank" rel="noopener noreferrer">
                    <button className="backdrop text-txt py-2 px-12 rounded-full hover:bg-sub w-max 
                    text-3xl flex justify-between items-center gap-8">
                        GitHub <Code2 className="w-10 h-10" />
                    </button>
                </a>
                <a href="https://t.me/wlfrm" target="_blank" rel="noopener noreferrer">
                    <button className="bg-[#0088CC] text-txt p-4 rounded-xl hover:bg-[#0088CC]/80 w-max
                    text-3xl flex justify-between items-center transition-all duration-300 gap-8">
                        <svg xmlns="http://www.w3.org/2000/svg" width="2.4rem" height="2.4rem" viewBox="0 0 48 48" fill="white"><path d="M41.4193 7.30899C41.4193 7.30899 45.3046 5.79399 44.9808 9.47328C44.8729 10.9883 43.9016 16.2908 43.1461 22.0262L40.5559 39.0159C40.5559 39.0159 40.3401 41.5048 38.3974 41.9377C36.4547 42.3705 33.5408 40.4227 33.0011 39.9898C32.5694 39.6652 24.9068 34.7955 22.2086 32.4148C21.4531 31.7655 20.5897 30.4669 22.3165 28.9519L33.6487 18.1305C34.9438 16.8319 36.2389 13.8019 30.8426 17.4812L15.7331 27.7616C15.7331 27.7616 14.0063 28.8437 10.7686 27.8698L3.75342 25.7055C3.75342 25.7055 1.16321 24.0823 5.58815 22.459C16.3807 17.3729 29.6555 12.1786 41.4193 7.30899Z"/></svg>
                    </button>
                </a>
                <a href="https://max.ru/u/f9LHodD0cOLkNu8-Xo2IF0zTaZqygnUMrH-sa6D3XA0lntP2oWBAXxZqQTA" target="_blank" rel="noopener noreferrer">
                    <img src="https://maxicons.ru/icons/MAX.svg" alt="MAX" className="rounded-xl h-18 w-18" />                
                </a>
            </div>
            <p className="text-sub text-lg">{translate("hero.tgtroubles")} <a 
            className="underline hover:text-primary transition-all duration-300"
            href="https://t.me/proxy?server=proxyyy.wlfrm.fun&port=443&secret=dd69cc15b2e51995ec81e2a12f2c047f63"
            >{translate("hero.tgproxy")}</a></p>
        </div>
    </div>
}
