import React from 'react'
import ReactDOM from 'react-dom/client'
import RouterRoute from './Router/routerRoute'
import '../src/styles/index.css'


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <RouterRoute />
    </React.StrictMode>,
)
