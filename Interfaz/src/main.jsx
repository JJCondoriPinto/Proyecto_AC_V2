import React from 'react'
import { RouterProvider } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import { routes } from './routes/index'
import './styles.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={routes} />
)
