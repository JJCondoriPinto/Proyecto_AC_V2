import { useEffect, useState } from "react";
import Card from "../components/Card";

export default function Aprendizaje() {

    const [formulario, setFormulario] = useState({
        nombre: "",
        apellido: "",
        edad: 0
    })

    useEffect(() => {
    }, [])

    function crearFormulario(e) {
        e.preventDefault()
        console.log(formulario);
    }
    
    return (
        <>
            <form onSubmit={crearFormulario} className="w-full h-full flex flex-col gap-4 justify-center items-center">
                <input 
                    value={formulario.nombre}
                    type="text" 
                    name="nombre" 
                    className="p-4 border border-black"
                    onChange={(e) => { setFormulario({
                        ...formulario,
                        nombre: e.target.value
                    }) }} />
                <input 
                    value={formulario.apellido}
                    type="text" 
                    name="apellido" 
                    className="p-4 border border-black"
                    onChange={(e) => { setFormulario({
                        ...formulario,
                        apellido: e.target.value
                    }) }} />
                <input 
                    value={formulario.edad}
                    type="text" 
                    name="edad" 
                    className="p-4 border border-black"
                    onChange={(e) => { setFormulario({
                        ...formulario,
                        edad: e.target.value
                    }) }} />
                <button type="submit" className="bg-slate-700 text-white p-5">
                    Enviar
                </button>
            </form>
        </>
    )
}
