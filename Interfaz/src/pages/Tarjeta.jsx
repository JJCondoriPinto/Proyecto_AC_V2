import clsx from 'clsx';
import React from 'react';
import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export const CursoInformacion = ({ curso }) => {

    const [selectedTema, setSelectedTema] = useState(null);
    const [selectedDefinicion, setSelectedDefinicion] = useState(null);
    const [temasAleatorios, temasSunfle] = useState([])
    const [definicionesAleatorias, definicionesSunfle] = useState([])
    const [aciertos, setAciertos] = useState(0);
    const [fallas, setFallas] = useState(0);

    const [seleccionados, setSeleccionados] = useState({
        temas: [],
        definiciones: []
    })


    const handleTemaClick = (parte, index) => {
        setSelectedTema(parte);
        if (!seleccionados.temas.some(s => s === index))
            setSeleccionados(prev => ({
                ...prev,
                temas: prev.temas.concat([index])
            }))
    };

    const handleDefinicionClick = (esde, index) => {
        if (selectedTema) {
            setSelectedDefinicion(esde);
            if (selectedTema === esde) {
                toast.success("Correcto")
                setAciertos(prev => prev + 1);
                if (!seleccionados.definiciones.some(s => s === index))
                    setSeleccionados(prev => ({
                        ...prev,
                        definiciones: prev.definiciones.concat([index])
                    }))
            } else {
                toast.error("Incorrecto, le quedan " + (5 - (fallas + 1)) + ` intento${((5 - (fallas + 1)) === 1) ? '' : 's'}`)
                setFallas(prev => prev + 1);
            }
        }
    };

    useEffect(() => {
        if (fallas === 5) {
            notify('Intentos excedidos, vuelva a empezar');
            setAciertos(0)
            setFallas(0)
            setSelectedDefinicion(null)
            setSelectedTema(null)
            setSeleccionados({
                temas: [],
                definiciones: []
            })
        } else if (aciertos === curso.test.temas.length) {
            notify('Aciertos  ' + aciertos + " fallidos " + fallas);
            setAciertos(0)
            setFallas(0)
            setSelectedDefinicion(null)
            setSelectedTema(null)
            setSeleccionados({
                temas: [],
                definiciones: []
            })
        }
    }, [aciertos, fallas]);

    useEffect(() => {
        const shuffleArray = (array) => {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        };
        temasSunfle(shuffleArray(curso.test.temas));
        definicionesSunfle(shuffleArray(curso.test.definicion));
    }, []);

    const notify = (text) => toast.success(text);

    return (
        <div className='flex flex-col w-full h-full overflow-auto'>
            <div className='flex flex-col gap-2'>
                <h3 className='font-semibold  text-white  bg-slate-800 w-full p-3 flex items-center justify-center'>TEMAS Y DEFINICIONES</h3>
                <h2 className='text-white font-medium p-3 bg-slate-800 w-full flex items-center justify-center'>Curso: {curso.curso}</h2>
            </div>
            <div className='flex w-full bg-slate-900 p-3 gap-16 text-white'>
                <div className=' flex flex-col bg-slate-900 justify-center gap-2'>
                    {temasAleatorios.map((tema, index) => (
                        <h3 key={index} onClick={() => handleTemaClick(tema.parte, index)} className={clsx(
                            "cursor-pointer p-4text-white font-semibold text-[0.8rem] p-2 font-mono rounded-lg max-w-100 max-h-100 text-center transition ease-in-out hover:-translate-y-1 hover:scale-100 hover:bg-green-400 duration-300 whitespace-normal",
                            { "bg-blue-500": !seleccionados.temas.some(v => v === index) },
                            { "bg-green-400": seleccionados.temas.some(v => v === index) },
                        )} >
                            {tema.item}: {tema.parte}
                        </h3>
                    ))}
                </div>
                <div className='bg-slate-900 justify center gap-4' >
                    {definicionesAleatorias.map((definicion, index) => (
                        <h3 key={index} onClick={() => handleDefinicionClick(definicion.esde, index)} className={clsx(
                            "cursor-pointer p-4text-white font-semibold text-[0.8rem] p-2 font-mono rounded-lg max-w-100 max-h-100 text-center transition ease-in-out hover:-translate-y-1 hover:scale-100 hover:bg-green-400 duration-300 whitespace-normal",
                            { "bg-blue-500": !seleccionados.definiciones.some(v => v === index) },
                            { "bg-green-400": seleccionados.definiciones.some(v => v === index) },
                        )} >
                            {definicion.def}: {definicion.esde}
                        </h3>
                    ))}
                </div>
            </div>
            <div className='bg-slate-800 p-2 flex justify-center'>
                <div className=' p-3 max-w-40 max-h-50 bg-orange-500/100  rounded-lg font-mono text-white '>
                    <h3 className="">Resultados:</h3>
                    <p>Aciertos: {aciertos}</p>
                    <p>Fallas: {fallas}</p>
                </div>
            </div>
            <Toaster position="top-center" />
        </div>
    );
};