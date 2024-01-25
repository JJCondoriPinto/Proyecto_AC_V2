import { Link, Outlet } from "react-router-dom";

export default function DefaultLayout() {
  return (
    <>
        <aside className="flex flex-col">
            <Link to={"/aprendizaje"}>Aprendizaje</Link>
            <Link to={"/juegos"}>juegos</Link>
        </aside>
        <main>
          <Outlet />
        </main>
    </>
  )
}
