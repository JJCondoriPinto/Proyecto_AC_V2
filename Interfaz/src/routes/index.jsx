import { createBrowserRouter, redirect } from 'react-router-dom'
import Juegos from '../pages/Juegos'
import DefaultLayout from '../layouts/DefaultLayout'
import AprendizajeVista from '../pages/AprendizajeVista'
import CursosListado from '../pages/CursosListado'
import ListadoQuizziz from '../pages/ListadoQuizziz'
import FormularioQuizz from '../pages/FormularioQuizz'
import Ahorcado from '../pages/Ahorcado'
import Memorama from '../pages/Memorama'
import TestImage from '../pages/TestImage'
import { TestRelacionar } from '../pages/TestRelacionar'

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
                        path: "ahorcado",
                        children: [
                            {
                                path: "",
                                element: <CursosListado />
                            },
                            {
                                path: ":curso",
                                element: <Ahorcado />
                            }
                        ]
                    },
                    {
                        path: "test",
                        children: [
                            {
                                path: "",
                                element: <CursosListado />
                            },
                            {
                                path: ":curso",
                                children: [
                                    {
                                        path: "",
                                        element: <ListadoQuizziz />
                                    },
                                    {
                                        path: ":quizz",
                                        element: <FormularioQuizz />
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        path: 'memorama',
                        element: <Memorama />
                    },
                    {
                        path: 'testImage',
                        element: <TestImage />
                    },
                    {
                        path: 'testRelacionar',
                        children: [
                            {
                                path: "",
                                element: <CursosListado />
                            },
                            {
                                path: ":curso",
                                element: <TestRelacionar />
                            }
                        ]
                    },
                ]
            },
        ]
    },
])