import t from "../i18n";
import { Javascript, Python, Php, React, Rust, Postgresql,  } from '@thesvg/react';

export default ({ lang }: { lang: string }) => {
    const translate = t(lang);

    return <div className="w-full h-max flex flex-col justify-center gap-4 py-8
    bg-bgc bg-[linear-gradient(60deg,#03070A_64%,#090979_100%)]">
        <div className="flex gap-4 flex-wrap justify-center sm:justify-start">
            <h1 className="text-5xl text-txt m-5">{translate("body.title")}</h1>
            <p className="rounded-full h-max px-3 py-1 my-auto border-[0.15rem] border-primary
            text-primary text-lg">5+ {translate("exp.years")} {translate("exp.irience")}</p>
        </div>
        <div className="w-full h-max p-10 grid sm:grid-cols-2 md:grid-cols-3 gap-4 
        justify-center items-center">
            <div className="w-full h-full justify-between flex flex-col gap-6 border-[.15rem] border-sub 
            rounded-xl bg-[#FFFFFF05] hover:translate-y-[-0.5rem] hover:border-primary group
            duration-500 transition-all p-4">
                <div className="w-full flex justify-start gap-4 items-center h-max">
                    <Python className="w-16 h-16 scale-90"/><p className="text-4xl text-white 
                    group-hover:text-primary transition-all">Python</p>
                    <p className="rounded-full px-3 py-1 border-[0.15rem] border-primary
                    text-primary text-lg">3+ {translate("exp.years")}</p>
                </div>
                <p className="text-sub text-lg mb-auto">{translate("stack.python")}</p>
                <div className="flex flex-wrap gap-1 *:py-1 *:rounded-full *:bg-[#FFFFFF12]
                *:border-[.15rem] *:border-primary *:text-sub *:px-3">
                    <p>FastAPI</p>
                    <p>Django</p>
                    <p>SQLAlchemy</p>
                    <p>Aiogram</p>
                    <p>Pyrogram</p>
                    <p>Numpy</p>
                </div>
            </div>
            <div className="w-full h-full justify-between flex flex-col gap-6 border-[.15rem] border-sub 
            rounded-xl bg-[#FFFFFF05] hover:translate-y-[-0.5rem] hover:border-primary group
            duration-500 transition-all p-4">
                <div className="w-full flex justify-start gap-4 items-center h-max">
                    <Javascript className="w-16 h-16 scale-90"/><p className="text-4xl text-white 
                    group-hover:text-primary transition-all">Web, JS</p>
                    <p className="rounded-full px-3 py-1 border-[0.15rem] border-primary
                    text-primary text-lg">4+ {translate("exp.years")}</p>
                </div>
                <p className="text-sub text-lg mb-auto">{translate("stack.js")}</p>
                <div className="flex flex-wrap gap-1 *:py-1 *:rounded-full *:bg-[#FFFFFF12]
                *:border-[.15rem] *:border-primary *:text-sub *:px-3">
                    <p>HTML5</p>
                    <p>CSS3</p>
                    <p>SVG</p>
                    <p>Vanilla</p>
                    <p>Node</p>
                    <p>Three.js</p>
                    <p>Vite</p>
                    <p>Typescript</p>
                </div>
            </div>
            <div className="w-full h-full justify-between flex flex-col gap-6 border-[.15rem] border-sub 
            rounded-xl bg-[#FFFFFF05] hover:translate-y-[-0.5rem] hover:border-primary group
            duration-500 transition-all p-4">
                <div className="w-full flex justify-start gap-4 items-center h-max">
                    <Php variant="mono" color="#787CB5"
                    className="w-16 h-16 scale-90"/><p className="text-4xl text-white 
                    group-hover:text-primary transition-all">PHP</p>
                    <p className="rounded-full px-3 py-1 border-[0.15rem] border-primary
                    text-primary text-lg">6+ {translate("exp.mounths")}</p>
                </div>
                <p className="text-sub text-lg mb-auto">{translate("stack.php")}</p>
                <div className="flex flex-wrap gap-1 *:py-1 *:rounded-full *:bg-[#FFFFFF12]
                *:border-[.15rem] *:border-primary *:text-sub *:px-3">
                    <p>Laravel</p>
                    <p>Symfony</p>
                    <p>GraphQL</p>
                    <p>Wordpress</p>
                </div>
            </div>
            <div className="w-full h-full justify-between flex flex-col gap-6 border-[.15rem] border-sub 
            rounded-xl bg-[#FFFFFF05] hover:translate-y-[-0.5rem] hover:border-primary group
            duration-500 transition-all p-4">
                <div className="w-full flex justify-start gap-4 items-center h-max">
                    <React className="w-16 h-16 scale-90"/><p className="text-4xl text-white 
                    group-hover:text-primary transition-all">React.js</p>
                    <p className="rounded-full px-3 py-1 border-[0.15rem] border-primary
                    text-primary text-lg">1+ {translate("exp.years")}</p>
                </div>
                <p className="text-sub text-lg mb-auto">{translate("stack.react")}</p>
                <div className="flex flex-wrap gap-1 *:py-1 *:rounded-full *:bg-[#FFFFFF12]
                *:border-[.15rem] *:border-primary *:text-sub *:px-3">
                    <p>Astro.js</p>
                    <p>Next.js</p>
                    <p>SCSS</p>
                    <p>Tailwind.css</p>
                    <p>TSX/JSX</p>
                </div>
            </div>
            <div className="w-full h-full justify-between flex flex-col gap-6 border-[.15rem] border-sub 
            rounded-xl bg-[#FFFFFF05] hover:translate-y-[-0.5rem] hover:border-primary group
            duration-500 transition-all p-4">
                <div className="w-full flex justify-start gap-4 items-center h-max">
                    <Rust className="w-16 h-16"/><p className="text-4xl text-white 
                    group-hover:text-primary transition-all">Rust</p>
                    <p className="rounded-full px-3 py-1 border-[0.15rem] border-primary
                    text-primary text-lg">1+ {translate("exp.years")}</p>
                </div>
                <p className="text-sub text-lg mb-auto">{translate("stack.rust")}</p>
                <div className="flex flex-wrap gap-1 *:py-1 *:rounded-full *:bg-[#FFFFFF12]
                *:border-[.15rem] *:border-primary *:text-sub *:px-3">
                    <p>Tokio</p>
                    <p>Iced</p>
                    <p>Cargo</p>
                </div>
            </div>
            <div className="w-full h-full justify-between flex flex-col gap-6 border-[.15rem] border-sub 
            rounded-xl bg-[#FFFFFF05] hover:translate-y-[-0.5rem] hover:border-primary group
            duration-500 transition-all p-4">
                <div className="w-full flex justify-start gap-4 items-center h-max">
                    <Postgresql className="w-16 h-16"/><p className="text-4xl text-white 
                    group-hover:text-primary transition-all">{translate("stack.more_title")}</p>
                </div>
                <p className="text-sub text-lg mb-auto">{translate("stack.more")}</p>
                <div className="flex flex-wrap gap-1 *:py-1 *:rounded-full *:bg-[#FFFFFF12]
                *:border-[.15rem] *:border-primary *:text-sub *:px-3">
                    <p>MySQL</p>
                    <p>PostgreSQL</p>
                    <p>RedisDB</p>
                    <p>Ngnix</p>
                    <p>Docker</p>
                    <p>Linux</p>
                    <p>Git</p>
                    <p>Shell</p>
                    <p>Blockchain</p>
                    <p>Cryptography</p>
                </div>
            </div>
        </div>
    </div>
}