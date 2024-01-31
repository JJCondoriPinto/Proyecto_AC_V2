import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useVoice } from "../hooks/useVoice";
import { useEffect } from "react";

export default function DefaultLayout() {
  const [speak] = useVoice()
  
  useEffect(() => {
    speak("Bienvenido a tu asistente virtual")
  }, [])

  return (
    <>
      <div className="flex h-screen justify-center items-center bg-gradient-to-tr from-primary via-slate-800 to-slate-900 bg-opacity-95">

        {/* <div className="absolute z-20 top-0 inset-x-0 flex justify-center w-full h-full overflow-hidden pointer-events-none">
          <div className="w-[108rem] flex-none flex justify-end">
            <picture>
              <source srcSet="https://tailwindcss.com/_next/static/media/docs@30.8b9a76a2.avif" type="image/avif" />
              <img src="https://tailwindcss.com/_next/static/media/docs@30.8b9a76a2.avif" alt="" className="w-[71.75rem] flex-none max-w-none dark:hidden" decoding="async" />
            </picture>
            <picture>
              <source srcSet="https://tailwindcss.com/_next/static/media/docs-dark@30.1a9f8cbf.avif" type="image/avif" />
              <img src="https://tailwindcss.com/_next/static/media/docs-dark@30.1a9f8cbf.avif" alt="" className="w-[90rem] flex-none max-w-none hidden dark:block" decoding="async" />
            </picture>
          </div>
        </div> */}

        <div className="flex basis-1/2 h-96 shadow-2xl">

          <Sidebar />

          <main className="rounded-e-lg border border-gray-opacity flex-1 flex p-4 overflow-auto bg-slate-100">
            <Outlet />
          </main>

        </div>

      </div>
    </>
  )
}
