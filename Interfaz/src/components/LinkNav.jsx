import clsx from "clsx";
import { NavLink } from "react-router-dom";

export function LinkNav({ to, Icon, children }) {
    return (
        <NavLink to={to} className={({ isActive }) => clsx(
            "transition-opacity border-b-2 border-transparent hover:opacity-60 py-2 text-[0.8rem] text-center",
            { "opacity-60 border-current": isActive }
        )}>
            {<Icon className="fill-white mx-auto mb-1" width={24} height={24} />}
            {children}
        </NavLink>
    )
}