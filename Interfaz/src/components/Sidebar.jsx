import { BookIcon, BoxesIcon } from "./Icons";
import { LinkNav } from "./LinkNav";

export default function Sidebar() {
    return (
        <aside className="flex flex-col rounded-s-lg bg-gradient-to-tr from-slate-950 to-primary px-2 text-white py-4 gap-2">
            <LinkNav
                to={"/aprendizaje"}
                Icon={BookIcon}
            >
                Aprendizaje
            </LinkNav>
            <LinkNav
                to={"/juegos"}
                Icon={BoxesIcon}
            >
                Juegos
            </LinkNav>
        </aside>
    )
}
