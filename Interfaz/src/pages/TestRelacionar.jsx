import { useState, useEffect } from "react";
import { CursoInformacion } from "./Tarjeta";
import { useParams } from "react-router-dom";
import { obtener_topicos_curso } from "../services/topicos";

export function TestRelacionar() {
  const { curso } = useParams()
  const [cursoInfo, setCursoInfo] = useState()

  useEffect(() => {
    if (curso) {
      obtener_topicos_curso(curso)
        .then(res => {
          const data_curso = {
            curso: res.data.curso.nombre,
            test: {
              temas: res.data.topicos.reduce((acc, curr) => acc.concat({
                item: curr.nombre,
                parte: acc.length + 1
              }), []),
              definicion: res.data.topicos.reduce((acc, curr) => acc.concat({
                def: curr.informacion,
                esde: acc.length + 1
              }), []),
            }
          }
          setCursoInfo(data_curso)
        })
        .catch(err => {
          console.error(err);
        })
    }
  }, [])

  return (
    <>
      <div className='bg-slate-900 p-2 w-full'>
        {cursoInfo ? (
          <CursoInformacion curso={cursoInfo} />
        ) : null}
      </div>
    </>
  );
}