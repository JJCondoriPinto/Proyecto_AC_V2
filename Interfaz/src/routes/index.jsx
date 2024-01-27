import { createBrowserRouter, redirect } from 'react-router-dom'
import Juegos from '../pages/Juegos'
import DefaultLayout from '../layouts/DefaultLayout'
import JuegoVista from '../pages/JuegoVista'
import AprendizajeVista from '../pages/AprendizajeVista'
import CursosListado from '../pages/CursosListado'

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: "",
                loader: () => redirect('/aprendizaje')
            },
            {
                path: "/aprendizaje",
                children: [
                    {
                        path: "",
                        element: <CursosListado />,
                    },
                    {
                        path: ":curso",
                        element: <AprendizajeVista />
                    },
                ]
            },
            {
                path: "/juegos",
                children: [
                    {
                        path: "",
                        element: <Juegos />,
                    },
                    {
                        path: ":juego",
                        children: [
                            {
                                path: "",
                                element: <CursosListado />
                            },
                            {
                                path: ":curso",
                                element: <JuegoVista />
                            }
                        ]
                    },
                ]
            },
        ]
    },
])