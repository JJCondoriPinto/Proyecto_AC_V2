import { createBrowserRouter } from 'react-router-dom'
import Aprendizaje from '../pages/Aprendizaje'
import Juego from '../pages/Juego'
import DefaultLayout from '../layouts/DefaultLayout'
import JuegoVista from '../pages/JuegoVista'

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: "/aprendizaje",
                element: <Aprendizaje />
            },
            {
                path: "/juegos",
                element: <Juego />,
                children: [
                    {
                        path: ":juego",
                        element: <JuegoVista />
                    }
                ]
            },
        ]
    },
])