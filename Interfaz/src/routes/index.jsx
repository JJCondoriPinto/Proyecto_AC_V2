import { createBrowserRouter, redirect } from 'react-router-dom'
import Aprendizaje from '../pages/Aprendizaje'
import Juegos from '../pages/Juegos'
import DefaultLayout from '../layouts/DefaultLayout'
import JuegoVista from '../pages/JuegoVista'
import AprendizajeVista from '../pages/AprendizajeVista'

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
                        element: <Aprendizaje />,
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
                        element: <JuegoVista />
                    },
                ]
            },
        ]
    },
])